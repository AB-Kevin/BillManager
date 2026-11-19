"use strict";

// Bill Aging: how old every open bill in the catalog is against the office's
// payment commitment (10 business days by default). Ported from the
// standalone Python "Bill Aging Dashboard"; the rules are the same, so a
// catalog's first-seen dates, overrides and history carry over unchanged.
//
// Everything here is pure -- no fs, no Electron -- so the rules can be unit
// tested (test/aging-core.test.js). main.js walks the folder, hashes files and
// reads tags, then hands the results to computeReport().
//
// Dates are "YYYY-MM-DD" strings in local time. Day arithmetic runs on UTC
// midnights so a daylight-saving change never shifts a day.

const crypto = require("crypto");

const DAY_MS = 24 * 60 * 60 * 1000;

const DEFAULT_SETTINGS = {
  commitment_days: 10,
  // "business" = Mon-Fri minus the holidays below; "calendar" = every day
  day_counting: "business",
  holidays: [
    "2026-01-01", "2026-05-25", "2026-07-03", "2026-09-07", "2026-11-26", "2026-12-25",
    "2027-01-01", "2027-05-31", "2027-07-05", "2027-09-06", "2027-11-25", "2027-12-24",
  ],
  tracked_folders: ["UB-04", "1500", "Member facing"],
  collections_folders: ["Collections"],
  excluded_folder_names: ["Archived", "archive"],
  entered_tag: "Entered",
  waiting_tag: "Waiting",
  collections_tag: "Collections",
  staff_tags: ["Dominic", "Taylor", "Yann", "Jon", "Niall"],
  stages: [
    { name: "Fresh", max: 2, color: "#3f8f6b" },
    { name: "Working", max: 5, color: "#6f9f3a" },
    { name: "Watch", max: 7, color: "#c9a227" },
    { name: "Urgent", max: 9, color: "#d9772b" },
    { name: "Due today", max: 10, color: "#c2452d" },
    { name: "Overdue", max: null, color: "#8e1f2f" },
  ],
  capacity_enabled: false,
  capacity_per_day: 20,
};

// What the window's Settings dialog (and capacity controls) may change.
const EDITABLE_SETTINGS = [
  "tracked_folders", "collections_folders", "stages", "capacity_enabled", "capacity_per_day",
  "staff_tags", "commitment_days", "day_counting", "holidays",
];

// BillManager only lists these (ACCEPTED_EXT in main.js); anything else in a
// tracked folder can't be tagged or archived, so it's flagged, not counted.
const BILL_EXTS = [".pdf", ".jpg", ".jpeg", ".png"];
const TEMP_RE = /(_tmp$|^~\$|\.tmp$|^desktop\.ini$|^thumbs\.db$)/i;
const PART_RE = /^(.*)_Part(\d+)$/i;
// Amounts in file names: "$977", "$2,611.50", "$17k" / "12k" (thousands), "80$".
// A trailing "$" has to touch its number, so "Room 12 $500" reads as $500,
// not $12 (the old Python dashboard read it as $12).
const AMOUNT_RE =
  /\$\s?(\d[\d,]*(?:\.\d{1,2})?)\s?([kK])?(?![A-Za-z0-9])|(?<![\w.$])(\d[\d,]*(?:\.\d{1,2})?)(?:\s?([kK])(?![A-Za-z0-9])\$?|\$)/g;

const CLOCK_CATEGORIES = new Set(["Main", "Collections", "Waiting"]);

// ---- small helpers -----------------------------------------------------------

function normTag(t) {
  return String(t).trim().replace(/\s+/g, " ").toLowerCase();
}

function extOf(name) {
  const i = name.lastIndexOf(".");
  return i > 0 ? name.slice(i).toLowerCase() : "";
}

function stemOf(name) {
  const i = name.lastIndexOf(".");
  return i > 0 ? name.slice(0, i) : name;
}

function isTempName(name) {
  return TEMP_RE.test(name);
}

function isBillFile(name) {
  return BILL_EXTS.includes(extOf(name));
}

function nameAmounts(stem) {
  const out = [];
  for (const m of stem.matchAll(AMOUNT_RE)) {
    const [num, k] = m[1] ? [m[1], m[2]] : [m[3], m[4]];
    const v = Number(num.replace(/,/g, ""));
    if (Number.isFinite(v)) out.push(k ? v * 1000 : v);
  }
  return out;
}

function stageFor(age, stages) {
  for (const s of stages) if (s.max == null || age <= s.max) return s.name;
  return stages[stages.length - 1].name;
}

// ---- dates -------------------------------------------------------------------

const pad = (n) => String(n).padStart(2, "0");

function isoToUtc(iso) {
  const [y, m, d] = iso.split("-").map(Number);
  return Date.UTC(y, m - 1, d);
}

function utcToIso(ms) {
  return new Date(ms).toISOString().slice(0, 10);
}

function addCalendarDays(iso, n) {
  return utcToIso(isoToUtc(iso) + n * DAY_MS);
}

function weekday(iso) {
  return new Date(isoToUtc(iso)).getUTCDay(); // 0 = Sunday
}

function localDate(ms) {
  const d = new Date(ms);
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

// Local wall-clock time, no zone: "2026-11-03T09:12:44" (or "...T09:12").
function localDateTime(ms, seconds = true) {
  const d = new Date(ms);
  const time = `${pad(d.getHours())}:${pad(d.getMinutes())}${seconds ? ":" + pad(d.getSeconds()) : ""}`;
  return `${localDate(ms)}T${time}`;
}

// The inverse of localDateTime (also takes fractional seconds, as Python wrote).
function parseLocalDateTime(s) {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})(?::(\d{2}))?/.exec(String(s));
  if (!m) return null;
  const [, y, mo, d, h, mi, sec] = m.map(Number);
  return new Date(y, mo - 1, d, h, mi, sec || 0).getTime();
}

function validIsoDate(y, m, d) {
  if (!(m >= 1 && m <= 12 && d >= 1 && d <= 31)) return null;
  const iso = `${String(y).padStart(4, "0")}-${pad(m)}-${pad(d)}`;
  return utcToIso(isoToUtc(iso)) === iso ? iso : null;
}

// "2026-11-26", "11/26/2026", "11/26/26" or "11-26-2026" -> "2026-11-26".
function parseAnyDate(s) {
  const t = String(s).trim();
  let m;
  if ((m = /^(\d{4})-(\d{1,2})-(\d{1,2})$/.exec(t))) return validIsoDate(+m[1], +m[2], +m[3]);
  if ((m = /^(\d{1,2})[/-](\d{1,2})[/-](\d{4}|\d{2})$/.exec(t))) {
    const y = m[3].length === 2 ? 2000 + +m[3] : +m[3];
    return validIsoDate(y, +m[1], +m[2]);
  }
  return null;
}

// Counts days either as calendar days or business days (Mon-Fri minus
// holidays). The day a bill is received is day 0; its age is the counted days
// after that up to and including today; it's due on the Nth counted day after
// receipt. A bill received on a weekend or holiday starts counting the next
// business day.
class DayCounter {
  constructor(mode, holidays) {
    this.business = mode === "business";
    this.holidays = new Set((holidays || []).map(parseAnyDate).filter(Boolean));
  }

  counts(iso) {
    if (!this.business) return true;
    const w = weekday(iso);
    return w !== 0 && w !== 6 && !this.holidays.has(iso);
  }

  // Signed number of counted days in (a, b].
  between(a, b) {
    if (!this.business) return Math.round((isoToUtc(b) - isoToUtc(a)) / DAY_MS);
    if (a === b) return 0;
    const [lo, hi, sign] = b > a ? [a, b, 1] : [b, a, -1];
    let n = 0;
    for (let d = lo; d < hi; ) {
      d = addCalendarDays(d, 1);
      if (this.counts(d)) n++;
    }
    return sign * n;
  }

  add(iso, n) {
    if (!this.business) return addCalendarDays(iso, n);
    let d = iso;
    while (n > 0) {
      d = addCalendarDays(d, 1);
      if (this.counts(d)) n--;
    }
    return d;
  }

  // Days a bill can fall due on: today through the due date of one received today.
  upcoming(today, n) {
    const end = this.add(today, n);
    const out = [];
    for (let d = today; d <= end; d = addCalendarDays(d, 1)) if (this.counts(d)) out.push(d);
    return out;
  }
}

// ---- settings ------------------------------------------------------------------

function stringList(v, fallback) {
  return Array.isArray(v) ? v.map((x) => String(x).trim()).filter(Boolean) : fallback;
}

// Defaults for anything missing or malformed, so a hand-edited or older file
// never breaks a scan.
function normalizeSettings(raw) {
  const s = raw && typeof raw === "object" ? raw : {};
  const d = DEFAULT_SETTINGS;
  const stages =
    Array.isArray(s.stages) && s.stages.length && s.stages.every((x) => x && typeof x.name === "string")
      ? s.stages.map((x, i, all) => ({
          name: x.name,
          max: i === all.length - 1 || x.max == null || !Number.isFinite(+x.max) ? null : +x.max,
          color: typeof x.color === "string" ? x.color : "#888888",
        }))
      : d.stages.map((x) => ({ ...x }));
  const days = Math.round(+s.commitment_days);
  const cap = Math.round(+s.capacity_per_day);
  return {
    commitment_days: days >= 1 ? days : d.commitment_days,
    day_counting: s.day_counting === "calendar" ? "calendar" : "business",
    holidays: [...new Set(stringList(s.holidays, d.holidays).map(parseAnyDate).filter(Boolean))].sort(),
    tracked_folders: stringList(s.tracked_folders, d.tracked_folders),
    collections_folders: stringList(s.collections_folders, d.collections_folders),
    excluded_folder_names: stringList(s.excluded_folder_names, d.excluded_folder_names),
    entered_tag: typeof s.entered_tag === "string" && s.entered_tag.trim() ? s.entered_tag : d.entered_tag,
    waiting_tag: typeof s.waiting_tag === "string" && s.waiting_tag.trim() ? s.waiting_tag : d.waiting_tag,
    collections_tag:
      typeof s.collections_tag === "string" && s.collections_tag.trim() ? s.collections_tag : d.collections_tag,
    staff_tags: stringList(s.staff_tags, d.staff_tags),
    stages,
    capacity_enabled: !!s.capacity_enabled,
    capacity_per_day: cap >= 1 ? cap : d.capacity_per_day,
  };
}

function applySettingsPatch(current, patch) {
  const next = { ...current };
  for (const k of EDITABLE_SETTINGS) if (patch && k in patch) next[k] = patch[k];
  return normalizeSettings(next);
}

// ---- overrides -------------------------------------------------------------------
// Manual receipt dates: [{ hash, path, date, set_on }]. Matched by content
// hash first, so one survives the file being moved or renamed, then by path.

function findOverride(overrides, hash, relPath) {
  return (
    overrides.find((o) => o.hash && o.hash === hash) || overrides.find((o) => o.path && o.path === relPath) || null
  );
}

// Adds, replaces or (with an empty date) removes the override for a bill.
function setOverride(overrides, { hash, path, date }, todayIso) {
  const rest = (overrides || []).filter((o) => o.hash !== hash && o.path !== path);
  if (!date) return rest;
  const iso = parseAnyDate(date);
  if (!iso) throw new Error(`Not a date: ${date}`);
  return [...rest, { hash, path, date: iso, set_on: todayIso }];
}

// ---- first seen / history merging ---------------------------------------------------
// Both live in a shared file on OneDrive that every computer's scans write, so
// a write merges with what's there instead of replacing it.

function mergeFirstSeen(a, b) {
  const out = { ...(a || {}) };
  for (const [h, v] of Object.entries(b || {})) if (!out[h] || v < out[h]) out[h] = v;
  return out;
}

function historyRows(bills, today) {
  const groups = new Map();
  for (const b of bills) {
    if (b.category === "Entered") continue;
    const key = `${b.category}\u0000${b.folder}`;
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(b);
  }
  return [...groups.keys()].sort().map((key) => {
    const bs = groups.get(key);
    const [category, folder] = key.split("\u0000");
    return {
      date: today,
      category,
      folder,
      open: bs.length,
      overdue: bs.filter((b) => b.days_left < 0).length,
      due_today: bs.filter((b) => b.days_left === 0).length,
      due_next_3: bs.filter((b) => b.days_left >= 0 && b.days_left <= 3).length,
      oldest_age: Math.max(...bs.map((b) => b.age)),
    };
  });
}

// One snapshot per day: the latest scan that day replaces the day's rows.
function mergeHistory(existing, today, rows) {
  return [...(existing || []).filter((r) => r && r.date !== today), ...rows].sort((a, b) =>
    a.date < b.date ? -1 : a.date > b.date ? 1 : 0
  );
}

// ---- the report ---------------------------------------------------------------------

function sha1(s) {
  return crypto.createHash("sha1").update(s).digest("hex");
}

/**
 * files: every file found under the catalog's subfolders (archives already
 *   skipped), each { rel, name, top, subfolder } plus, for bill files that
 *   could be read, { size, createdMs, modifiedMs, hash, tags, tagError },
 *   or { readError } when it couldn't be.
 * Returns { result, firstSeen }; firstSeen includes any new dates to save.
 */
function computeReport({
  root,
  files,
  skipped = {},
  topFolders = [],
  settings,
  tagCatalog = [],
  archiveFolder,
  firstSeen: firstSeenIn = {},
  overrides = [],
  history = [],
  nowMs,
}) {
  const tracked = new Set(settings.tracked_folders.map((f) => f.toLowerCase()));
  const collections = new Set(settings.collections_folders.map((f) => f.toLowerCase()));
  const staffNorm = new Map(settings.staff_tags.map((s) => [normTag(s), s]));
  const enteredTag = normTag(settings.entered_tag);
  const waitingTag = normTag(settings.waiting_tag);
  const collectionsTag = normTag(settings.collections_tag);
  const commitment = settings.commitment_days;
  const today = localDate(nowMs);
  const dc = new DayCounter(settings.day_counting, settings.holidays);

  const knownTags = new Set(tagCatalog.filter((t) => t && t.name).map((t) => normTag(t.name)));
  const tagColors = new Map(tagCatalog.filter((t) => t && t.name).map((t) => [normTag(t.name), t.color || null]));
  const staffColors = Object.fromEntries(settings.staff_tags.map((s) => [s, tagColors.get(normTag(s)) || null]));

  const firstSeen = { ...firstSeenIn };
  const bills = [];
  const attention = [];
  const counts = { scanned: 0, entered: 0, other: 0, temp_ignored: 0, not_bm: 0 };

  for (const f of files) {
    const topL = f.top.toLowerCase();
    const inTracked = tracked.has(topL);
    const inCollections = collections.has(topL);
    if (isTempName(f.name)) {
      counts.temp_ignored++;
      continue;
    }
    if (!isBillFile(f.name)) {
      counts.not_bm++;
      if (inTracked || inCollections) {
        attention.push({
          path: f.rel,
          folder: f.top,
          issue: "Not shown in BillManager",
          detail:
            "BillManager only lists PDF, JPG and PNG files, so this can't be tagged or archived there. " +
            "Not counted as a bill. Convert it to PDF or move it out.",
        });
      }
      continue;
    }
    counts.scanned++;
    if (f.readError) {
      attention.push({ path: f.rel, folder: f.top, issue: "Cannot read file", detail: f.readError });
      continue;
    }

    const tags = f.tags || [];
    const tagsN = new Set(tags.map(normTag));
    const created = f.createdMs;
    const modified = f.modifiedMs;

    // Received = when the file was created (uploaded or saved) in the catalog.
    // Dates in file names and the modified date are never used: names change
    // on rename, and tagging modifies the file. First seen is the earliest
    // created date recorded for this content on any computer, so a bill moved
    // to another folder keeps the date it first arrived.
    const createdIso = localDateTime(created);
    if (!firstSeen[f.hash] || createdIso < firstSeen[f.hash]) firstSeen[f.hash] = createdIso;
    const fsMs = parseLocalDateTime(firstSeen[f.hash]) ?? created;

    const override = findOverride(overrides, f.hash, f.rel);
    let receiptMs;
    let source;
    let uncertain = false;
    if (override) {
      const [y, m, d] = override.date.split("-").map(Number);
      receiptMs = new Date(y, m - 1, d).getTime();
      source = "Override";
    } else {
      receiptMs = fsMs;
      source = fsMs < created - 60 * 1000 ? "First seen" : "Created date";
      // Created more than a day after it was last modified: this copy was
      // made or re-synced onto this computer later than the bill came in.
      if (created - modified > DAY_MS) uncertain = true;
    }

    const receipt = localDate(receiptMs);
    const age = Math.max(0, dc.between(receipt, today));
    const due = dc.add(receipt, commitment);
    const daysLeft = dc.between(today, due);

    // Entered = done, wherever it sits. Otherwise the folder decides, and tags
    // refine the tracked folders.
    let category;
    if (tagsN.has(enteredTag)) category = "Entered";
    else if (inCollections || (inTracked && tagsN.has(collectionsTag))) category = "Collections";
    else if (inTracked && tagsN.has(waitingTag)) category = "Waiting";
    else if (inTracked) category = "Main";
    else category = "Other";
    if (category === "Entered") counts.entered++;
    else if (category === "Other") counts.other++;
    const isOpen = category !== "Entered";

    const stem = stemOf(f.name);
    const amounts = nameAmounts(stem);
    const part = PART_RE.exec(stem);
    const bill = {
      id: `${f.hash.slice(0, 12)}-${sha1(f.rel).slice(0, 6)}`,
      hash: f.hash,
      path: f.rel,
      name: f.name,
      folder: f.top,
      subfolder: f.subfolder,
      ext: extOf(f.name).slice(1),
      category,
      receipt,
      receipt_time: localDateTime(receiptMs, false),
      source,
      uncertain,
      created: localDateTime(created, false),
      modified: localDateTime(modified, false),
      age,
      due: isOpen ? due : null,
      days_left: isOpen ? daysLeft : null,
      stage: isOpen ? stageFor(age, settings.stages) : "Entered",
      tags,
      assignees: [...tagsN].filter((t) => staffNorm.has(t)).map((t) => staffNorm.get(t)),
      amount: amounts.length ? Math.round(amounts.reduce((a, b) => a + b, 0) * 100) / 100 : null,
      amounts,
      batch: part ? part[1] : null,
      size: f.size,
    };
    bills.push(bill);

    // Needs-attention only for bills on (or beside) the clock; Other and
    // Entered would just add noise.
    if (!CLOCK_CATEGORIES.has(category)) continue;
    const md = (ms) => {
      const [y, m, d] = localDate(ms).split("-");
      return `${m}/${d}/${y}`;
    };
    if (uncertain) {
      attention.push({
        id: bill.id,
        path: f.rel,
        folder: f.top,
        issue: "Date uncertain",
        detail:
          `Created ${md(created)}, after it was last modified ${md(modified)}: this copy was likely made or ` +
          `re-synced later than the bill came in. Using the created date ${md(receiptMs)}; use Date if that's wrong.`,
      });
    }
    if (f.tagError) {
      attention.push({
        id: bill.id,
        path: f.rel,
        folder: f.top,
        issue: "Unreadable file",
        detail: `Tags couldn't be read (${f.tagError}). Treated as untagged.`,
      });
    }
    const unknown = tags.filter((t) => !knownTags.has(normTag(t)));
    if (unknown.length) {
      attention.push({
        id: bill.id,
        path: f.rel,
        folder: f.top,
        issue: "Unknown tag",
        detail: "Not in the tag catalog: " + unknown.join(", "),
      });
    }
  }

  // The same content at two paths.
  const byHash = new Map();
  for (const b of bills) {
    if (!byHash.has(b.hash)) byHash.set(b.hash, []);
    byHash.get(b.hash).push(b);
  }
  for (const group of byHash.values()) {
    if (group.length < 2 || !group.some((b) => CLOCK_CATEGORIES.has(b.category))) continue;
    for (const b of group) {
      const others = group.filter((g) => g !== b).map((g) => g.path);
      b.duplicate_of = others;
      attention.push({
        id: b.id,
        path: b.path,
        folder: b.folder,
        issue: "Duplicate file",
        detail: "Same content also at: " + others.join("; "),
      });
    }
  }

  const todayRows = historyRows(bills, today);
  const horizon = addCalendarDays(today, 60);
  const result = {
    as_of: localDateTime(nowMs),
    today,
    today_counts: dc.counts(today),
    forecast_dates: dc.upcoming(today, commitment),
    holidays_ahead: dc.business ? [...dc.holidays].filter((h) => h >= today && h <= horizon).sort() : [],
    bills_folder: root,
    bills,
    attention,
    counts,
    skipped_archives: skipped,
    bm_archive_folder: archiveFolder || "Archived",
    image_tag_reader: "BillManager's exiftool",
    staff_colors: staffColors,
    folders_available: [...new Set(topFolders)].sort(),
    settings,
    history: mergeHistory(history, today, todayRows),
  };
  return { result, firstSeen, todayRows };
}

module.exports = {
  DEFAULT_SETTINGS,
  EDITABLE_SETTINGS,
  DayCounter,
  normTag,
  nameAmounts,
  stageFor,
  parseAnyDate,
  localDate,
  localDateTime,
  isTempName,
  isBillFile,
  normalizeSettings,
  applySettingsPatch,
  findOverride,
  setOverride,
  mergeFirstSeen,
  mergeHistory,
  historyRows,
  computeReport,
};
