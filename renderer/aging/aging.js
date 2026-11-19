"use strict";

// The Bill Aging window (see the Bill Aging section of main.js, and
// aging-core.js for how each bill's dates and category are worked out). It
// reports on whichever folder the main window has open and follows it when
// that changes. Charts are plain SVG. Filters, the View and saved reports are
// remembered on this computer (localStorage); settings and receipt-date
// overrides are the catalog's, shared by everyone.

// ------------------------------------------------------------------ state
let DATA = null;
let FOLDER = null;
let filtersRestored = false;
let lastScanAt = 0;
const S = { sort: { key: "age", dir: -1 } };
// The brand's muted accents (BillManager's tag palette), then a few more.
const FOLDER_COLORS = ["#006D46", "#4A6FA5", "#8A6F3D", "#7A5980", "#5C7A3D", "#9C4A3D", "#3D6B7A", "#58595B", "#B0708F", "#6B8F3D"];
const CATS = [
  { key: "Main", label: "Main", color: "#006D46", note: "on the payment clock" },
  { key: "Waiting", label: "Waiting", color: "#8A6F3D", note: "tagged Waiting · off the clock" },
  { key: "Collections", label: "Collections", color: "#3D6B7A", note: "tracked separately" },
  { key: "Other", label: "Other folders", color: "#7A5980", note: "untracked folders" },
  { key: "Entered", label: "Entered", color: "#8A8B8D", note: "done, not yet archived" },
];
const OPEN_CATS = ["Main", "Waiting", "Collections", "Other"];
const ENTERED_COLOR = "#8A8B8D";
const UNASSIGNED_COLOR = "#A7ADB4";
const VIEW = Object.assign({ cats: ["Main"], split: "folder" }, lsGet("bill-aging-view", {}));
const FOCUS_RESCAN_MIN_GAP_MS = 30 * 1000;

const $ = (id) => document.getElementById(id);
const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const fmtD = (iso) => { if (!iso) return ""; const [y, m, d] = iso.slice(0, 10).split("-"); return `${m}/${d}/${y}`; };
const shortD = (iso) => { const [, m, d] = iso.slice(0, 10).split("-"); return `${+m}/${+d}`; };
const dow = (iso) => ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][new Date(iso + "T12:00").getDay()];
function lsGet(k, def) { try { return JSON.parse(localStorage.getItem(k)) ?? def; } catch { return def; } }
function lsSet(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch { /* ignore */ } }

// status helpers (Entered bills have no due date, so never count as due/overdue)
const hasDue = (b) => b.days_left != null;
const isOver = (b) => hasDue(b) && b.days_left < 0;
const isToday = (b) => hasDue(b) && b.days_left === 0;
const inNext = (b, n) => hasDue(b) && b.days_left >= 0 && b.days_left <= n;

// ------------------------------------------------------------------ theme
// main.js sets Electron's themeSource from BillManager's Appearance option,
// which is what prefers-color-scheme reports here -- so this follows both the
// option and, on "System", Windows itself.
const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");
function applyTheme() { document.documentElement.setAttribute("data-theme", darkQuery.matches ? "dark" : "light"); }
applyTheme();
darkQuery.addEventListener("change", applyTheme);

// ------------------------------------------------------------------ loading
// `action` is a call into main.js that resolves to a fresh scan.
async function load(action = () => window.aging.scan(FOLDER)) {
  const btn = $("btn-refresh");
  btn.disabled = true; btn.textContent = "Scanning…";
  try {
    const data = await action();
    DATA = data;
    lastScanAt = Date.now();
    $("error").hidden = true;
    $("content").hidden = false;
    render();
  } catch (e) {
    $("error").hidden = false;
    $("error").textContent = "Couldn't load bills: " + cleanError(e);
  } finally {
    btn.disabled = !FOLDER; btn.textContent = "Refresh";
  }
}

// Electron prefixes errors thrown in main.js with "Error invoking remote method '…': Error: ".
function cleanError(e) { return String(e?.message || e).replace(/^Error invoking remote method '[^']+': (?:\w*Error: )?/, ""); }

function setFolder(folder) {
  FOLDER = folder || null;
  $("folder-path").textContent = FOLDER || "";
  if (!FOLDER) {
    DATA = null;
    $("content").hidden = true;
    $("error").hidden = false;
    $("error").textContent = "No folder is open in BillManager. Open the Bills folder there, then come back.";
    $("btn-refresh").disabled = true;
    return;
  }
  load();
}

// ------------------------------------------------------------------ view
const set = () => DATA.settings;
const isBiz = () => (set().day_counting || "business") === "business";
const unit = () => (isBiz() ? "business days" : "days");
const unitShort = () => (isBiz() ? "bus. days" : "days");
const catOf = (k) => CATS.find((c) => c.key === k) || { key: k, label: k, color: "#888" };
const viewBills = () => DATA.bills.filter((b) => VIEW.cats.includes(b.category));
const openBills = () => viewBills().filter((b) => b.category !== "Entered");
const billById = (id) => DATA && DATA.bills.find((b) => b.id === id);
function viewLabel() {
  const c = VIEW.cats;
  if (!c.length) return "nothing selected";
  if (OPEN_CATS.every((k) => c.includes(k)) && c.length === 4) return "All open";
  if (c.length === CATS.length) return "Everything";
  return CATS.filter((x) => c.includes(x.key)).map((x) => x.label).join(" + ");
}
function setView(cats, keepSplit) {
  VIEW.cats = CATS.map((c) => c.key).filter((k) => cats.includes(k));
  if (!keepSplit && VIEW.cats.length >= 3 && VIEW.split === "folder") VIEW.split = "category";
  lsSet("bill-aging-view", VIEW);
  renderAll();
}

function renderViewBar() {
  const counts = Object.fromEntries(CATS.map((c) => [c.key, DATA.bills.filter((b) => b.category === c.key).length]));
  $("view-chips").innerHTML = CATS.map((c) => `<button class="chip ${VIEW.cats.includes(c.key) ? "on" : ""}" data-c="${c.key}" title="${esc(c.note)} · Ctrl-click to show only this">` +
    `<i style="background:${c.color}"></i>${esc(c.label)} <span>${counts[c.key]}</span></button>`).join("");
  $("view-chips").querySelectorAll(".chip").forEach((b) => b.onclick = (e) => {
    const k = b.dataset.c;
    // plain click toggles; Ctrl/Shift-click shows only that one
    if (e.ctrlKey || e.shiftKey || e.metaKey) return setView([k]);
    const next = VIEW.cats.includes(k) ? VIEW.cats.filter((x) => x !== k) : [...VIEW.cats, k];
    setView(next.length ? next : [k], true);
  });
  $("split").value = VIEW.split;
  document.querySelectorAll(".vlabel").forEach((el) => el.textContent = "· " + viewLabel());
}

// ------------------------------------------------------------------ grouping (Split by)
function folderColor(f) {
  const uniq = [...new Set([...set().tracked_folders, ...set().collections_folders, ...DATA.folders_available])];
  return FOLDER_COLORS[Math.max(0, uniq.indexOf(f)) % FOLDER_COLORS.length];
}
function staffColor(s) { return (DATA.staff_colors || {})[s] || FOLDER_COLORS[Math.max(0, set().staff_tags.indexOf(s)) % FOLDER_COLORS.length]; }
function stageColor(name) { return name === "Entered" ? ENTERED_COLOR : (set().stages.find((s) => s.name === name) || {}).color || "#888"; }
function primaryStaff(b) { return b.assignees[0] || "Unassigned"; }

/** Ordered groups for the current Split-by, limited to what's present in `bills`. */
function groupsFor(bills) {
  const present = (fn) => new Set(bills.map(fn));
  switch (VIEW.split) {
    case "category": {
      const p = present((b) => b.category);
      return CATS.filter((c) => p.has(c.key)).map((c) => ({ key: c.key, label: c.label, color: c.color, test: (b) => b.category === c.key }));
    }
    case "stage": {
      const p = present((b) => b.stage);
      return [...set().stages.map((s) => s.name), "Entered"].filter((s) => p.has(s))
        .map((s) => ({ key: s, label: s, color: stageColor(s), test: (b) => b.stage === s }));
    }
    case "staff": {
      const p = present(primaryStaff);
      return [...set().staff_tags, "Unassigned"].filter((s) => p.has(s))
        .map((s) => ({ key: s, label: s, color: s === "Unassigned" ? UNASSIGNED_COLOR : staffColor(s), test: (b) => primaryStaff(b) === s }));
    }
    default: {
      const p = present((b) => b.folder);
      const order = [...set().tracked_folders, ...set().collections_folders, ...[...p].sort()];
      return [...new Set(order)].filter((f) => p.has(f)).map((f) => ({ key: f, label: f, color: folderColor(f), test: (b) => b.folder === f }));
    }
  }
}
const segs = (bills, groups) => groups.map((g) => ({ key: g.key, value: bills.filter(g.test).length, color: g.color }));
const breakdown = (bills, groups) => groups.map((g) => [g.label, bills.filter(g.test).length]).filter(([, n]) => n).map(([l, n]) => `${l}: ${n}`).join("\n");

// ------------------------------------------------------------------ render
function render() {
  const N = set().commitment_days;
  $("asof").textContent = "Data as of " + new Date(DATA.as_of).toLocaleString([], { dateStyle: "medium", timeStyle: "short" });
  $("commit-note").textContent = `${N} ${isBiz() ? "business-day" : "calendar-day"} payment commitment`;
  $("fc-days").textContent = N;
  const hol = DATA.holidays_ahead || [];
  $("hol-note").textContent = isBiz()
    ? `Counting business days (Mon–Fri${hol.length ? ", skipping holiday " + hol.map(shortD).join(", ") : ""}).`
    : "Counting calendar days.";
  $("cap-toggle").checked = !!set().capacity_enabled;
  $("cap-value").value = set().capacity_per_day;
  $("notice").hidden = !DATA.log_error;
  $("notice").textContent = DATA.log_error || "";
  buildFilterOptions();
  renderPresets();
  renderAll();
  renderAttention();
  const c = DATA.counts;
  const skTxt = Object.entries(DATA.skipped_archives || {}).map(([f, n]) => `${f} (${n})`).join(", ");
  $("foot").textContent = `Scanned ${c.scanned} bills (PDF/JPG/PNG) · ${c.entered} tagged Entered · ${c.other} in other folders · ` +
    `${c.not_bm || 0} other file types ignored · ${c.temp_ignored} temp files ignored · Skipped archives: ${skTxt || "none"} ` +
    `(BillManager archive: ${DATA.bm_archive_folder}) · Folder: ${DATA.bills_folder}`;
}
function renderAll() {
  renderViewBar();
  renderTiles();
  renderForecast();
  renderAge();
  renderStaff();
  renderTrend();
  renderTable();
}

function tile(k, v, d, color, onclick, extraClass) {
  const el = document.createElement("div");
  el.className = "tile" + (extraClass ? " " + extraClass : "");
  el.style.borderLeftColor = color || "var(--line)";
  el.innerHTML = `<div class="k">${esc(k)}</div><div class="v">${esc(v)}</div><div class="d">${esc(d || "")}</div>`;
  if (onclick) el.onclick = onclick;
  return el;
}
const toReport = (f, sort) => () => { applyFilters(f, sort); $("report").scrollIntoView({ behavior: "smooth" }); };

function renderTiles() {
  const o = openBills(), all = viewBills();
  const overdue = o.filter(isOver), today = o.filter(isToday), next3 = o.filter((b) => inNext(b, 3));
  const oldest = o.reduce((a, b) => (b.age > (a?.age ?? -1) ? b : a), null);
  const unc = all.filter((b) => b.uncertain);
  const entered = all.length - o.length;
  const N = set().commitment_days;
  const t = $("tiles"); t.innerHTML = "";
  t.append(
    tile("Open · " + viewLabel(), o.length, entered ? `+ ${entered} Entered in view` : [...new Set(o.map((b) => b.folder))].slice(0, 4).join(" · "), "var(--accent)", toReport({ cat: "@view" })),
    tile(`Past ${N} ${unitShort()}`, overdue.length, overdue.length ? "overdue" : "none — on track", stageColor("Overdue"), toReport({ cat: "@view", status: "overdue" })),
    tile("Due today", today.length, DATA.today_counts === false ? "not a business day" : "day " + N, stageColor("Due today"), toReport({ cat: "@view", status: "today" })),
    tile(`Due next 3 ${unitShort()}`, next3.length, "incl. today", stageColor("Urgent"), toReport({ cat: "@view", status: "next3" })),
    tile("Oldest open", oldest ? oldest.age : "—", oldest ? `${unit()} · ${oldest.name} (${oldest.folder})` : "", stageColor(oldest?.stage), toReport({ cat: "@view" }, { key: "age", dir: -1 })),
    tile("Date uncertain", unc.length, "in view · needs a receipt date", "var(--warn)", toReport({ cat: "@view", source: "uncertain" })),
  );
  // one tile per category: click = view only that category
  const ts = $("tiles-side"); ts.innerHTML = "";
  for (const c of CATS) {
    const bs = DATA.bills.filter((b) => b.category === c.key);
    const d = c.key === "Entered" ? c.note : `${bs.filter(isOver).length} past ${N} · oldest ${bs.length ? Math.max(...bs.map((b) => b.age)) : 0} ${unitShort()}`;
    ts.append(tile(c.label, bs.length, d, c.color, () => setView([c.key]), VIEW.cats.length === 1 && VIEW.cats[0] === c.key ? "active" : ""));
  }
  ts.append(tile("Needs attention", DATA.attention.length, "see list below", "var(--warn)", () => $("attention-card").scrollIntoView({ behavior: "smooth" })));
}

// ------------------------------------------------------------------ charts (plain SVG)
const tip = $("tip");
function showTip(e, text) { tip.hidden = false; tip.textContent = text; tip.style.left = e.clientX + 12 + "px"; tip.style.top = e.clientY + 12 + "px"; }
function hideTip() { tip.hidden = true; }

/**
 * Stacked bar chart.
 * cols: [{label, sub, segs:[{key,value,color}], band, onClick, tip}]
 * opts: {line:[values], capacity:number}
 */
function stackedBars(el, cols, opts = {}) {
  const W = el.clientWidth || 600, H = el.clientHeight || 260;
  const pad = { l: 34, r: opts.line ? 36 : 10, t: 12, b: 40 };
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const totals = cols.map((c) => c.segs.reduce((a, s) => a + s.value, 0));
  const maxY = niceMax(Math.max(1, ...totals, opts.capacity || 0));
  const maxL = opts.line ? niceMax(Math.max(1, ...opts.line)) : 0;
  const bw = iw / cols.length, gap = Math.min(10, bw * 0.22);
  const y = (v) => pad.t + ih - (v / maxY) * ih;
  const yl = (v) => pad.t + ih - (v / maxL) * ih;
  let s = `<svg viewBox="0 0 ${W} ${H}" role="img">`;
  for (const v of ticks(maxY)) {
    s += `<line class="gridline" x1="${pad.l}" x2="${W - pad.r}" y1="${y(v)}" y2="${y(v)}"/>`;
    s += `<text x="${pad.l - 6}" y="${y(v) + 4}" text-anchor="end">${v}</text>`;
  }
  if (opts.line) for (const v of ticks(maxL)) s += `<text x="${W - pad.r + 6}" y="${yl(v) + 4}">${v}</text>`;
  cols.forEach((c, i) => {
    const x = pad.l + i * bw + gap / 2, w = bw - gap;
    let acc = 0;
    c.segs.forEach((sg) => {
      if (!sg.value) return;
      const y0 = y(acc + sg.value), h = y(acc) - y0;
      s += `<rect class="bar" data-i="${i}" x="${x}" y="${y0}" width="${w}" height="${Math.max(0, h - 1)}" rx="2" fill="${sg.color}"/>`;
      acc += sg.value;
    });
    if (totals[i]) s += `<text x="${x + w / 2}" y="${y(totals[i]) - 4}" text-anchor="middle" class="total">${totals[i]}</text>`;
    if (c.band) s += `<rect x="${x}" y="${pad.t + ih + 3}" width="${w}" height="4" rx="1" fill="${c.band}"/>`;
    s += `<text x="${x + w / 2}" y="${pad.t + ih + 20}" text-anchor="middle" class="label">${esc(c.label)}</text>`;
    if (c.sub) s += `<text x="${x + w / 2}" y="${pad.t + ih + 33}" text-anchor="middle">${esc(c.sub)}</text>`;
    s += `<rect class="bar hit" data-i="${i}" x="${x}" y="${pad.t}" width="${w}" height="${ih}" fill="transparent"/>`;
  });
  if (opts.capacity) {
    s += `<line x1="${pad.l}" x2="${W - pad.r}" y1="${y(opts.capacity)}" y2="${y(opts.capacity)}" class="capacity"/>`;
    s += `<text x="${W - pad.r - 4}" y="${y(opts.capacity) - 5}" text-anchor="end" class="capacity-label">capacity ${opts.capacity}/day</text>`;
  }
  if (opts.line) {
    const pts = opts.line.map((v, i) => `${pad.l + i * bw + bw / 2},${yl(v)}`).join(" ");
    s += `<polyline points="${pts}" class="runline"/>`;
    opts.line.forEach((v, i) => { s += `<circle cx="${pad.l + i * bw + bw / 2}" cy="${yl(v)}" r="2.5" class="runpoint"/>`; });
  }
  s += `<line class="axis" x1="${pad.l}" x2="${W - pad.r}" y1="${pad.t + ih}" y2="${pad.t + ih}"/></svg>`;
  el.innerHTML = s;
  el.querySelectorAll(".bar").forEach((r) => {
    const c = cols[+r.dataset.i];
    r.addEventListener("mousemove", (e) => showTip(e, c.tip));
    r.addEventListener("mouseleave", hideTip);
    r.addEventListener("click", () => { hideTip(); c.onClick && c.onClick(); });
  });
}
function niceMax(v) { const steps = [1, 2, 5, 10]; const p = 10 ** Math.floor(Math.log10(v)); for (const s of steps) if (s * p >= v) return s * p; return 10 * p; }
function ticks(max) { const n = 4; return Array.from({ length: n + 1 }, (_, i) => Math.round((max / n) * i)).filter((v, i, a) => a.indexOf(v) === i); }
function legend(el, items) {
  el.innerHTML = items.map((it) => `<span><i class="${it.line ? "line" : ""}" style="background:${it.color}"></i>${esc(it.label)}</span>`).join("");
}
function emptyChart(el, legendEl, msg) {
  el.innerHTML = `<p class="hint chart-empty">${esc(msg)}</p>`;
  if (legendEl) legendEl.innerHTML = "";
}

function renderForecast() {
  const o = openBills(), today = DATA.today, N = +set().commitment_days;
  if (!o.length) return emptyChart($("chart-forecast"), $("legend-forecast"), "No open bills in this view (Entered bills have no due date).");
  const groups = groupsFor(o);
  const cols = [];
  const overdue = o.filter(isOver);
  cols.push({ label: "Overdue", sub: "backlog", segs: segs(overdue, groups), band: stageColor("Overdue"),
    tip: `Already past ${N} ${unit()}: ${overdue.length}\n${breakdown(overdue, groups)}`, onClick: toReport({ cat: "@view", status: "overdue" }) });
  for (const iso of DATA.forecast_dates) {
    const bs = o.filter((b) => b.due === iso);
    const isT = iso === today;
    cols.push({ label: isT ? "Today" : shortD(iso), sub: isT ? shortD(iso) : dow(iso), segs: segs(bs, groups),
      tip: `${dow(iso)} ${fmtD(iso)} — ${bs.length} due\n${breakdown(bs, groups)}`, onClick: toReport({ cat: "@view", duefrom: iso, dueto: iso }) });
  }
  let run = 0;
  const line = cols.map((c) => (run += c.segs.reduce((a, s) => a + s.value, 0)));
  const cap = set().capacity_enabled ? +set().capacity_per_day : 0;
  stackedBars($("chart-forecast"), cols, { line, capacity: cap });
  legend($("legend-forecast"), [...groups.map((g) => ({ label: g.label, color: g.color })), { label: "Running total (right axis)", color: "var(--ink)", line: true }]);
}

function renderAge() {
  const bills = viewBills(), N = +set().commitment_days;
  if (!bills.length) return emptyChart($("chart-age"), $("legend-age"), "No bills in this view.");
  const groups = groupsFor(bills);
  const maxAge = Math.max(...bills.map((b) => b.age));
  const buckets = [];
  for (let a = 0; a <= N; a++) buckets.push({ label: String(a), min: a, max: a });
  buckets.push({ label: `${N + 1}–${N + 4}`, min: N + 1, max: N + 4 }, { label: `${N + 5}–30`, min: N + 5, max: 30 });
  if (maxAge > 30) buckets.push(maxAge > 60 ? { label: "31–60", min: 31, max: 60 } : { label: "31+", min: 31, max: 99999 });
  if (maxAge > 60) buckets.push({ label: "61+", min: 61, max: 99999 });
  const cols = buckets.filter((b) => b.min <= b.max).map((bk) => {
    const bs = bills.filter((b) => b.age >= bk.min && b.age <= bk.max);
    const stage = stageFor(bk.min);
    // The unit is said once, under the first bar; repeating it under the
    // narrow range bars made neighbouring labels run into each other.
    return { label: bk.label, sub: "", segs: segs(bs, groups), band: stageColor(stage),
      tip: `${bk.label} ${bk.min === 1 && bk.max === 1 ? unit().replace(/s$/, "") : unit()} old (${stage}) — ${bs.length}\n${breakdown(bs, groups)}`,
      onClick: toReport({ cat: "@view", agemin: bk.min, agemax: bk.max === 99999 ? "" : bk.max }) };
  });
  cols[0].sub = unitShort() + " old";
  stackedBars($("chart-age"), cols);
  legend($("legend-age"), groups.map((g) => ({ label: g.label, color: g.color })));
}
function stageFor(age) { for (const s of set().stages) if (s.max == null || age <= s.max) return s.name; return set().stages.at(-1).name; }

function renderTrend() {
  const el = $("chart-trend");
  const cats = VIEW.cats.filter((c) => c !== "Entered");
  if (!cats.length) return emptyChart(el, $("legend-trend"), "The trend tracks open bills; Entered isn't recorded.");
  const byDate = {};
  for (const r of DATA.history || []) {
    if (!cats.includes(r.category)) continue;
    const d = (byDate[r.date] ||= { open: 0, overdue: 0 });
    d.open += +r.open; d.overdue += +r.overdue;
  }
  const dates = Object.keys(byDate).sort().slice(-60);
  if (dates.length < 2) {
    el.innerHTML = `<p class="hint chart-empty short">The trend builds up as this report is opened on different days.<br>${dates.length} day recorded so far.</p>`;
    $("legend-trend").innerHTML = "";
    return;
  }
  const W = el.clientWidth || 600, H = el.clientHeight || 200, pad = { l: 34, r: 10, t: 10, b: 26 };
  const iw = W - pad.l - pad.r, ih = H - pad.t - pad.b;
  const maxY = niceMax(Math.max(1, ...dates.map((d) => byDate[d].open)));
  const x = (i) => pad.l + (iw * i) / (dates.length - 1), y = (v) => pad.t + ih - (v / maxY) * ih;
  let s = `<svg viewBox="0 0 ${W} ${H}">`;
  for (const v of ticks(maxY)) s += `<line class="gridline" x1="${pad.l}" x2="${W - pad.r}" y1="${y(v)}" y2="${y(v)}"/><text x="${pad.l - 6}" y="${y(v) + 4}" text-anchor="end">${v}</text>`;
  const series = [["open", "var(--accent)"], ["overdue", stageColor("Overdue")]];
  for (const [k, c] of series) {
    s += `<polyline fill="none" stroke="${c}" stroke-width="2" points="${dates.map((d, i) => `${x(i)},${y(byDate[d][k])}`).join(" ")}"/>`;
    dates.forEach((d, i) => { s += `<circle class="pt" data-i="${i}" cx="${x(i)}" cy="${y(byDate[d][k])}" r="3" fill="${c}"/>`; });
  }
  const every = Math.ceil(dates.length / 8);
  dates.forEach((d, i) => { if (i % every === 0 || i === dates.length - 1) s += `<text x="${x(i)}" y="${H - 8}" text-anchor="middle">${shortD(d)}</text>`; });
  el.innerHTML = s + "</svg>";
  el.querySelectorAll(".pt").forEach((p) => {
    const d = dates[+p.dataset.i];
    p.addEventListener("mousemove", (e) => showTip(e, `${fmtD(d)}\nOpen: ${byDate[d].open}\nPast ${set().commitment_days} ${unitShort()}: ${byDate[d].overdue}`));
    p.addEventListener("mouseleave", hideTip);
  });
  legend($("legend-trend"), [{ label: "Open", color: "var(--accent)", line: true }, { label: "Overdue", color: stageColor("Overdue"), line: true }]);
}

// ------------------------------------------------------------------ staff
function renderStaff() {
  const o = openBills();
  const rows = [...set().staff_tags.map((s) => ({ name: s, key: s, color: staffColor(s), bs: o.filter((b) => b.assignees.includes(s)) })),
    { name: "Unassigned", key: "__none", color: UNASSIGNED_COLOR, bs: o.filter((b) => !b.assignees.length) }];
  const t = $("staff-table");
  t.innerHTML = `<tr><th>Staff</th><th class="n">Open</th><th class="n">Overdue</th><th class="n">Due today</th><th class="n">Due next 3 days</th><th class="n">Oldest</th></tr>` +
    rows.map((r) => {
      const od = r.bs.filter(isOver).length;
      return `<tr class="click" data-k="${esc(r.key)}"><td><i class="dot" style="background:${r.color}"></i>${esc(r.name)}</td><td class="n">${r.bs.length}</td>` +
        `<td class="n ${od ? "over" : ""}">${od}</td><td class="n">${r.bs.filter(isToday).length}</td>` +
        `<td class="n">${r.bs.filter((b) => inNext(b, 3)).length}</td>` +
        `<td class="n">${r.bs.length ? Math.max(...r.bs.map((b) => b.age)) + "d" : "—"}</td></tr>`;
    }).join("");
  t.querySelectorAll("tr.click").forEach((tr) => tr.onclick = toReport({ cat: "@view", staff: tr.dataset.k }));
}

// ------------------------------------------------------------------ filters / report
const F_IDS = { cat: "f-cat", folder: "f-folder", staff: "f-staff", status: "f-status", stage: "f-stage", agemin: "f-agemin",
  agemax: "f-agemax", duefrom: "f-duefrom", dueto: "f-dueto", source: "f-source", q: "f-q" };
const PRESETS = [
  ["Overdue", { cat: "@view", status: "overdue" }],
  ["Due today", { cat: "@view", status: "today" }],
  ["Due next 3 days", { cat: "@view", status: "next3" }],
  ["Due this week", { cat: "@view", status: "next7" }],
  ["Everything in view", { cat: "@view" }],
  ["Unassigned", { cat: "@view", staff: "__none" }],
  ["Date uncertain", { cat: "", source: "uncertain" }],
  ["All open, every folder", { cat: "@open" }],
  ["Overdue, every folder", { cat: "@open", status: "overdue" }],
  ["Entered, not archived", { cat: "Entered" }],
];

function getFilters() { const f = {}; for (const [k, id] of Object.entries(F_IDS)) f[k] = $(id).value; return f; }
function applyFilters(f, sort) {
  for (const [k, id] of Object.entries(F_IDS)) $(id).value = f[k] ?? (k === "cat" ? "@view" : "");
  if (sort) S.sort = sort;
  lsSet("bill-aging-filters", getFilters());
  renderTable();
}

function buildFilterOptions() {
  const keep = getFilters();
  const folders = [...new Set(DATA.bills.map((b) => b.folder))].sort();
  $("f-folder").innerHTML = `<option value="">All</option>` + folders.map((f) => `<option>${esc(f)}</option>`).join("");
  $("f-staff").innerHTML = `<option value="">Anyone</option><option value="__none">Unassigned</option>` + set().staff_tags.map((s) => `<option>${esc(s)}</option>`).join("");
  $("f-stage").innerHTML = `<option value="">Any</option>` + set().stages.map((s) => `<option>${esc(s.name)}</option>`).join("") + `<option>Entered</option>`;
  applyFiltersSilently(filtersRestored ? keep : lsGet("bill-aging-filters", null) || keep);
  filtersRestored = true;
  // A remembered value that's no longer offered (a removed folder or stage) falls back to "any".
  for (const id of Object.values(F_IDS)) {
    const sel = $(id);
    if (sel.tagName === "SELECT" && ![...sel.options].some((o) => o.value === sel.value)) sel.value = id === "f-cat" ? "@view" : "";
  }
}
function applyFiltersSilently(f) { for (const [k, id] of Object.entries(F_IDS)) if (f[k] !== undefined) $(id).value = f[k]; }

function renderPresets() {
  const saved = lsGet("bill-aging-saved", {});
  const el = $("presets");
  el.innerHTML = PRESETS.map(([n], i) => `<button data-p="${i}">${esc(n)}</button>`).join("") +
    Object.keys(saved).map((n) => `<button class="saved" data-s="${esc(n)}">${esc(n)}<span class="x" data-del="${esc(n)}" title="Delete saved report">×</span></button>`).join("");
  el.querySelectorAll("button").forEach((b) => b.onclick = (e) => {
    if (e.target.dataset.del) {
      const all = lsGet("bill-aging-saved", {}); delete all[e.target.dataset.del]; lsSet("bill-aging-saved", all); renderPresets(); return;
    }
    if (b.dataset.p) applyFilters(PRESETS[+b.dataset.p][1]);
    else {
      const sv = lsGet("bill-aging-saved", {})[b.dataset.s] || {};
      if (sv._view) { VIEW.split = sv._view.split || VIEW.split; setView(sv._view.cats, true); }
      applyFilters(sv);
    }
  });
}

function catMatch(cat, b) {
  if (cat === "@view") return VIEW.cats.includes(b.category);
  if (cat === "@open") return b.category !== "Entered";
  return !cat || b.category === cat;
}

function filtered() {
  const f = getFilters();
  const q = f.q.trim().toLowerCase();
  return DATA.bills.filter((b) => {
    if (!catMatch(f.cat, b)) return false;
    if (f.folder && b.folder !== f.folder) return false;
    if (f.staff === "__none" ? b.assignees.length : f.staff && !b.assignees.includes(f.staff)) return false;
    if (f.status === "overdue" && !isOver(b)) return false;
    if (f.status === "today" && !isToday(b)) return false;
    if (f.status === "next3" && !inNext(b, 3)) return false;
    if (f.status === "next7" && !inNext(b, 7)) return false;
    if (f.status === "ontrack" && !(hasDue(b) && b.days_left > 0)) return false;
    if (f.stage && b.stage !== f.stage) return false;
    if (f.agemin !== "" && b.age < +f.agemin) return false;
    if (f.agemax !== "" && b.age > +f.agemax) return false;
    if (f.duefrom && !(b.due && b.due >= f.duefrom)) return false;
    if (f.dueto && !(b.due && b.due <= f.dueto)) return false;
    if (f.source === "uncertain" ? !b.uncertain : f.source && b.source !== f.source) return false;
    if (q && !(b.name.toLowerCase().includes(q) || b.tags.join(" ").toLowerCase().includes(q) || b.folder.toLowerCase().includes(q))) return false;
    return true;
  });
}

const COLS = [
  ["name", "File"], ["folder", "Folder"], ["category", "Category"], ["receipt", "Received"], ["source", "Date source"],
  ["age", "Age", "n"], ["due", "Due"], ["days_left", "Days left", "n"], ["stage", "Stage"], ["tags", "Tags"], ["amount", "Amount", "n"],
];
function describeFilters() {
  const f = getFilters(), parts = [];
  const lab = (id) => $(id).selectedOptions?.[0]?.textContent;
  parts.push(f.cat === "@view" ? "View: " + viewLabel() : "Category: " + lab("f-cat"));
  if (f.folder) parts.push("Folder: " + f.folder);
  if (f.staff) parts.push("Staff: " + lab("f-staff"));
  if (f.status) parts.push("Status: " + lab("f-status"));
  if (f.stage) parts.push("Stage: " + f.stage);
  if (f.agemin !== "" || f.agemax !== "") parts.push(`Age: ${f.agemin || 0}–${f.agemax || "any"} ${unit()}`);
  if (f.duefrom || f.dueto) parts.push(`Due: ${fmtD(f.duefrom) || "any"} – ${fmtD(f.dueto) || "any"}`);
  if (f.source) parts.push("Date source: " + lab("f-source"));
  if (f.q) parts.push(`Search: "${f.q}"`);
  return parts.join(" · ");
}

function renderTable() {
  if (!DATA) return;
  const rows = filtered();
  const { key, dir } = S.sort;
  rows.sort((a, b) => {
    let va = a[key], vb = b[key];
    if (Array.isArray(va)) { va = va.join(","); vb = vb.join(","); }
    if (va == null && vb == null) return b.age - a.age;
    if (va == null) return 1; if (vb == null) return -1;
    return (va > vb ? 1 : va < vb ? -1 : 0) * dir || (b.age - a.age);
  });
  const od = rows.filter(isOver).length;
  const amt = rows.reduce((a, b) => a + (b.amount || 0), 0);
  const byCat = CATS.map((c) => [c.label, rows.filter((b) => b.category === c.key).length]).filter(([, n]) => n);
  $("result-line").innerHTML = `<b>${rows.length}</b> bill${rows.length === 1 ? "" : "s"}` +
    (byCat.length > 1 ? ` (${byCat.map(([l, n]) => `${esc(l)} ${n}`).join(", ")})` : "") +
    (od ? ` · <span class="over">${od} overdue</span>` : "") +
    (rows.length ? ` · oldest ${Math.max(...rows.map((b) => b.age))} ${unit()}` : "") +
    (amt ? ` · $${amt.toLocaleString(undefined, { maximumFractionDigits: 2 })} where the amount is in the file name` : "");
  $("print-head").innerHTML = `<h1>Bill Aging Report</h1><div>${esc(describeFilters())}</div>` +
    `<div>Data as of ${esc(new Date(DATA.as_of).toLocaleString())} · ${rows.length} bills${od ? ` · ${od} overdue` : ""} · ${set().commitment_days} ${unit()} commitment · ages and days left in ${unit()}</div>`;
  const lbl = (k, l) => ((k === "age" || k === "days_left") && isBiz() ? l + " (bd)" : l);
  const head = `<tr>${COLS.map(([k, l, c]) => `<th title="${k === "age" || k === "days_left" ? esc(unit()) : ""}" data-k="${k}" class="${c || ""} ${key === k ? "sorted" + (dir > 0 ? " asc" : "") : ""}">${lbl(k, l)}</th>`).join("")}<th class="act"></th></tr>`;
  const body = rows.map((b) => {
    const dl = !hasDue(b) ? "—" : b.days_left < 0 ? `<span class="over">${b.days_left}</span>` : b.days_left <= 1 ? `<span class="warn">${b.days_left}</span>` : b.days_left;
    return `<tr>
      <td class="file"><button class="filelink" data-show="${b.id}" title="Show ${esc(b.path)} in BillManager">${esc(b.name)}</button></td>
      <td>${esc(b.folder)}${b.subfolder ? `<span class="src"> / ${esc(b.subfolder)}</span>` : ""}</td>
      <td><i class="dot" style="background:${catOf(b.category).color}"></i>${esc(catOf(b.category).label)}</td>
      <td>${fmtD(b.receipt)}</td>
      <td class="src">${esc(b.source)}${b.uncertain ? ' <span class="warn" title="Receipt date uncertain">⚠</span>' : ""}</td>
      <td class="n">${b.age}</td>
      <td>${b.due ? fmtD(b.due) : "—"}</td>
      <td class="n">${dl}</td>
      <td><span class="pill" style="background:${stageColor(b.stage)}">${esc(b.stage)}</span></td>
      <td>${b.tags.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</td>
      <td class="n">${b.amount != null ? "$" + b.amount.toLocaleString() : ""}</td>
      <td class="act"><div class="row-actions">
        <button class="sm" data-open="${b.id}" title="Open the file">Open</button>
        <button class="sm" data-folder="${b.id}" title="Show in File Explorer">Folder</button>
        <button class="sm" data-date="${b.id}" title="Set receipt date">Date</button></div></td></tr>`;
  }).join("");
  const t = $("bills-table");
  t.innerHTML = head + (body || `<tr><td colspan="12" class="src empty-row">No bills match these filters.</td></tr>`);
  t.querySelectorAll("th[data-k]").forEach((th) => th.onclick = () => {
    const k = th.dataset.k;
    S.sort = { key: k, dir: S.sort.key === k ? -S.sort.dir : (["age", "amount"].includes(k) ? -1 : 1) };
    renderTable();
  });
  bindRowActions(t);
}

function fileAction(id, fn) {
  const b = billById(id);
  if (!b) return alert("That bill isn't in the latest scan. Refresh and try again.");
  Promise.resolve(fn(b)).catch((e) => alert(cleanError(e)));
}

function bindRowActions(root) {
  root.querySelectorAll("[data-show]").forEach((el) => el.onclick = () => fileAction(el.dataset.show, async (b) => {
    if (!(await window.aging.reveal(FOLDER, b.path))) alert("BillManager's main window is closed.");
  }));
  root.querySelectorAll("[data-open]").forEach((el) => el.onclick = () => fileAction(el.dataset.open, async (b) => {
    const err = await window.aging.openFile(FOLDER, b.path);
    if (err) alert(err);
  }));
  root.querySelectorAll("[data-folder]").forEach((el) => el.onclick = () => fileAction(el.dataset.folder, (b) => window.aging.showInFolder(FOLDER, b.path)));
  root.querySelectorAll("[data-date]").forEach((el) => el.onclick = () => openOverride(el.dataset.date));
}

// ------------------------------------------------------------------ attention
function renderAttention() {
  const order = ["Date uncertain", "Not shown in BillManager", "Unreadable file", "Unknown tag", "Duplicate file", "Cannot read file"];
  const rows = [...DATA.attention].sort((a, b) => order.indexOf(a.issue) - order.indexOf(b.issue) || a.path.localeCompare(b.path));
  $("att-count").textContent = `(${rows.length})`;
  $("att-table").innerHTML = rows.length
    ? `<tr><th>Issue</th><th>File</th><th>Details</th><th></th></tr>` + rows.map((a) => `<tr>
        <td><b>${esc(a.issue)}</b></td><td class="mono">${a.id ? `<button class="filelink" data-show="${a.id}" title="Show in BillManager">${esc(a.path)}</button>` : esc(a.path)}</td><td>${esc(a.detail)}</td>
        <td><div class="row-actions">${a.id ? `<button class="sm" data-open="${a.id}">Open</button>` : ""}
        ${a.issue === "Date uncertain" ? `<button class="sm primary" data-date="${a.id}">Set date</button>` : ""}</div></td></tr>`).join("")
    : `<tr><td class="src">Nothing needs attention.</td></tr>`;
  bindRowActions($("att-table"));
}

// ------------------------------------------------------------------ override dialog
let OV_BILL = null;
function openOverride(id) {
  const b = billById(id);
  if (!b) return;
  OV_BILL = b;
  $("ov-file").textContent = b.path;
  $("ov-info").textContent = `Currently ${fmtD(b.receipt)} (${b.source}). File created ${fmtD(b.created)}, last modified ${fmtD(b.modified)}.`;
  $("ov-date").value = b.receipt;
  $("ov-clear").hidden = b.source !== "Override";
  showDialog("override");
}
$("override").addEventListener("close", () => {
  const v = $("override").returnValue;
  const b = OV_BILL;
  if (!b) return;
  const date = v === "save" ? $("ov-date").value : v === "clear" ? "" : null;
  if (date === null || (v === "save" && !date)) return;
  load(() => window.aging.setOverride(FOLDER, { hash: b.hash, path: b.path, date }));
});

// ------------------------------------------------------------------ settings dialog
function openSettings() {
  if (!DATA) return;
  const s = set();
  const all = [...new Set([...DATA.folders_available, ...s.tracked_folders, ...s.collections_folders])].sort();
  $("s-tracked").innerHTML = all.map((f) => `<label><input type="checkbox" value="${esc(f)}" ${s.tracked_folders.includes(f) ? "checked" : ""}> ${esc(f)}</label>`).join("");
  $("s-collections").innerHTML = all.map((f) => `<label><input type="checkbox" value="${esc(f)}" ${s.collections_folders.includes(f) ? "checked" : ""}> ${esc(f)}</label>`).join("");
  $("s-stages").innerHTML = `<div class="stage-row src"><span>Name</span><span>Up to age (days)</span><span>Color</span></div>` +
    s.stages.map((st, i) => `<div class="stage-row"><input type="text" value="${esc(st.name)}" data-i="${i}" data-f="name">` +
      `<input type="number" class="num" min="0" value="${st.max ?? ""}" ${st.max == null ? 'disabled placeholder="older"' : ""} data-i="${i}" data-f="max">` +
      `<input type="color" value="${st.color}" data-i="${i}" data-f="color"></div>`).join("");
  $("s-days").value = s.commitment_days;
  document.querySelector(`input[name="s-count"][value="${s.day_counting || "business"}"]`).checked = true;
  $("s-holidays").value = (s.holidays || []).map(fmtD).join("\n");
  $("s-staff").value = s.staff_tags.join(", ");
  showDialog("settings");
}

// A dialog keeps its last returnValue when closed with Esc, which would
// otherwise replay the previous Save.
function showDialog(id) {
  $(id).returnValue = "";
  $(id).showModal();
}
$("settings").addEventListener("close", () => {
  if ($("settings").returnValue !== "save" || !DATA) return;
  const checked = (id) => [...$(id).querySelectorAll("input:checked")].map((i) => i.value);
  const stages = set().stages.map((st) => ({ ...st }));
  $("s-stages").querySelectorAll("input[data-i]").forEach((inp) => {
    const st = stages[+inp.dataset.i], f = inp.dataset.f;
    if (f === "max") { if (st.max != null) st.max = inp.value === "" ? st.max : +inp.value; }
    else st[f] = inp.value;
  });
  const tracked = checked("s-tracked"), coll = checked("s-collections");
  saveSettings({
    tracked_folders: tracked.filter((f) => !coll.includes(f)),
    collections_folders: coll,
    stages,
    commitment_days: Math.max(1, +$("s-days").value || 10),
    day_counting: document.querySelector('input[name="s-count"]:checked')?.value || "business",
    holidays: parseHolidays($("s-holidays").value),
    staff_tags: $("s-staff").value.split(",").map((x) => x.trim()).filter(Boolean),
  });
});
function saveSettings(patch) { return load(() => window.aging.saveSettings(FOLDER, patch)); }

function parseHolidays(text) {
  const out = [];
  for (const raw of text.split(/[\n,;]+/)) {
    const t = raw.trim();
    let m;
    if ((m = t.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/))) out.push(`${m[1]}-${m[2].padStart(2, "0")}-${m[3].padStart(2, "0")}`);
    else if ((m = t.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/))) out.push(`${m[3].length === 2 ? "20" + m[3] : m[3]}-${m[1].padStart(2, "0")}-${m[2].padStart(2, "0")}`);
  }
  return [...new Set(out)].sort();
}

// ------------------------------------------------------------------ save report dialog
$("save-report").addEventListener("close", () => {
  const name = $("sr-name").value.trim();
  if ($("save-report").returnValue !== "save" || !name) return;
  const all = lsGet("bill-aging-saved", {});
  all[name] = { ...getFilters(), _view: { cats: [...VIEW.cats], split: VIEW.split } };
  lsSet("bill-aging-saved", all);
  renderPresets();
});

// ------------------------------------------------------------------ export
async function exportCsv() {
  const rows = filtered();
  const cols = [["name", "File"], ["path", "Path"], ["folder", "Folder"], ["category", "Category"], ["receipt", "Received"], ["source", "Date source"],
    ["uncertain", "Date uncertain"], ["age", "Age (" + unit() + ")"], ["due", "Due"], ["days_left", "Days left (" + unit() + ")"], ["stage", "Stage"], ["tags", "Tags"],
    ["assignees", "Staff"], ["amount", "Amount (from name)"], ["created", "File created"], ["modified", "File modified"]];
  const q = (v) => { const s = Array.isArray(v) ? v.join("; ") : v == null ? "" : String(v); return /[",\n]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
  const lines = [`# Bill Aging Report — ${describeFilters()} — data as of ${DATA.as_of}`, cols.map((c) => c[1]).join(","),
    ...rows.map((b) => cols.map(([k]) => q(b[k])).join(","))];
  try {
    await window.aging.saveCsv(`bill-aging-${DATA.today}.csv`, "﻿" + lines.join("\r\n"));
  } catch (e) {
    alert("Couldn't save the CSV: " + cleanError(e));
  }
}

// ------------------------------------------------------------------ wire up
$("btn-refresh").onclick = () => FOLDER && load();
$("btn-settings").onclick = openSettings;
$("btn-csv").onclick = exportCsv;
$("btn-print").onclick = () => window.print();
$("btn-save").onclick = () => { $("sr-name").value = describeFilters().slice(0, 40); showDialog("save-report"); $("sr-name").select(); };
$("btn-clear").onclick = () => applyFilters({ cat: "@view" });
$("view-allopen").onclick = () => setView(OPEN_CATS);
$("split").onchange = () => { VIEW.split = $("split").value; lsSet("bill-aging-view", VIEW); renderForecast(); renderAge(); };
Object.values(F_IDS).forEach((id) => $(id).addEventListener(id === "f-q" ? "input" : "change", () => { lsSet("bill-aging-filters", getFilters()); renderTable(); }));
$("cap-toggle").onchange = () => saveSettings({ capacity_enabled: $("cap-toggle").checked });
$("cap-value").onchange = () => saveSettings({ capacity_per_day: Math.max(1, +$("cap-value").value || 20) });
let rt; window.addEventListener("resize", () => { clearTimeout(rt); rt = setTimeout(() => DATA && (renderForecast(), renderAge(), renderTrend()), 150); });
// Coming back from tagging bills in the main window: rescan, so the numbers
// match. Scans reuse the main window's tag reads, so this is quick.
window.addEventListener("focus", () => {
  if (!FOLDER || document.querySelector("dialog[open]") || Date.now() - lastScanAt < FOCUS_RESCAN_MIN_GAP_MS) return;
  lastScanAt = Date.now(); // a failing scan shouldn't retry on every focus either
  load();
});
window.aging.onFolder(setFolder);
window.aging.getFolder().then(setFolder);
