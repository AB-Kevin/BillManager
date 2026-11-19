"use strict";

// The Bill Aging rules (aging-core.js): how a bill's receipt date, age, due
// date and category are worked out. These decide what the office reports as
// overdue, so a change here should be a deliberate one.

const test = require("node:test");
const assert = require("node:assert/strict");
const aging = require("../aging-core");

const HOLIDAYS = ["2026-11-26", "2026-12-25"];
const at = (y, m, d, h = 12, mi = 0) => new Date(y, m - 1, d, h, mi).getTime();

test("business days skip weekends and office holidays", () => {
  const dc = new aging.DayCounter("business", HOLIDAYS);
  assert.equal(dc.between("2026-11-20", "2026-11-30"), 5); // Fri -> Mon, over a weekend and Thanksgiving
  assert.equal(dc.between("2026-11-30", "2026-11-20"), -5);
  assert.equal(dc.between("2026-11-21", "2026-11-21"), 0);
  assert.equal(dc.add("2026-11-19", 10), "2026-12-04");
  // received on a Saturday: the clock starts the next business day
  assert.equal(dc.add("2026-11-21", 1), "2026-11-23");
  assert.deepEqual(dc.upcoming("2026-11-21", 3), ["2026-11-23", "2026-11-24", "2026-11-25"]);
});

test("calendar days count every day", () => {
  const dc = new aging.DayCounter("calendar", HOLIDAYS);
  assert.equal(dc.between("2026-11-20", "2026-11-30"), 10);
  assert.equal(dc.add("2026-11-19", 10), "2026-11-29");
  // across the end of daylight saving time (Nov 1, 2026)
  assert.equal(dc.between("2026-10-31", "2026-11-02"), 2);
});

test("amounts are read from file names, thousands and several at once included", () => {
  assert.deepEqual(aging.nameAmounts("John Smith $977"), [977]);
  assert.deepEqual(aging.nameAmounts("Jane $2,611.50 bill"), [2611.5]);
  assert.deepEqual(aging.nameAmounts("80$ copay"), [80]);
  assert.deepEqual(aging.nameAmounts("Hospital $17k"), [17000]);
  assert.deepEqual(aging.nameAmounts("$155 & $1766"), [155, 1766]);
  assert.deepEqual(aging.nameAmounts("LexmarkScan_11-03-2026-151244_Part2"), []);
  assert.deepEqual(aging.nameAmounts("abc123$"), []);
  // a number before the amount isn't the amount
  assert.deepEqual(aging.nameAmounts("Patient 15 $2055"), [2055]);
  assert.deepEqual(aging.nameAmounts("Room 12 $500 and 30$"), [500, 30]);
});

test("holiday dates are accepted in the formats people type", () => {
  assert.equal(aging.parseAnyDate("2026-11-26"), "2026-11-26");
  assert.equal(aging.parseAnyDate("11/26/2026"), "2026-11-26");
  assert.equal(aging.parseAnyDate("11/26/26"), "2026-11-26");
  assert.equal(aging.parseAnyDate("2/30/2026"), null);
  assert.equal(aging.parseAnyDate("soon"), null);
});

test("a hand-edited or missing settings file falls back to the defaults", () => {
  const s = aging.normalizeSettings({ commitment_days: "abc", day_counting: "weekly", stages: "nope", tracked_folders: ["A", " "] });
  assert.equal(s.commitment_days, 10);
  assert.equal(s.day_counting, "business");
  assert.deepEqual(s.tracked_folders, ["A"]);
  assert.equal(s.stages.at(-1).max, null);
  // only the editable keys can be changed from the window
  const patched = aging.applySettingsPatch(s, { commitment_days: 5, excluded_folder_names: [] });
  assert.equal(patched.commitment_days, 5);
  assert.deepEqual(patched.excluded_folder_names, s.excluded_folder_names);
});

test("overrides follow a bill's content, and an empty date removes one", () => {
  let o = aging.setOverride([], { hash: "h1", path: "UB-04/a.pdf", date: "11/02/2026" }, "2026-11-19");
  assert.deepEqual(o, [{ hash: "h1", path: "UB-04/a.pdf", date: "2026-11-02", set_on: "2026-11-19" }]);
  assert.equal(aging.findOverride(o, "h1", "Collections/a.pdf").date, "2026-11-02");
  o = aging.setOverride(o, { hash: "h1", path: "UB-04/a.pdf", date: "" }, "2026-11-19");
  assert.deepEqual(o, []);
  assert.throws(() => aging.setOverride([], { hash: "h", path: "p", date: "nope" }, "2026-11-19"));
});

test("merging the shared log keeps the earliest first-seen date and one snapshot per day", () => {
  assert.deepEqual(aging.mergeFirstSeen({ a: "2026-11-05T09:00:00", b: "2026-11-01T09:00:00" }, { a: "2026-11-03T08:00:00", c: "2026-11-04T10:00:00" }), {
    a: "2026-11-03T08:00:00",
    b: "2026-11-01T09:00:00",
    c: "2026-11-04T10:00:00",
  });
  const h = aging.mergeHistory(
    [{ date: "2026-11-18", category: "Main", folder: "UB-04", open: 3 }, { date: "2026-11-19", category: "Main", folder: "UB-04", open: 9 }],
    "2026-11-19",
    [{ date: "2026-11-19", category: "Main", folder: "UB-04", open: 4 }]
  );
  assert.deepEqual(h.map((r) => [r.date, r.open]), [["2026-11-18", 3], ["2026-11-19", 4]]);
});

// ---- computeReport ------------------------------------------------------------

function file(rel, extra = {}) {
  const parts = rel.split("/");
  return {
    rel,
    name: parts.at(-1),
    top: parts[0],
    subfolder: parts.slice(1, -1).join("/"),
    size: 100,
    createdMs: at(2026, 11, 16, 9),
    modifiedMs: at(2026, 11, 16, 9),
    hash: "hash-" + rel,
    tags: [],
    tagError: null,
    ...extra,
  };
}

function report(files, extra = {}) {
  return aging.computeReport({
    root: "C:/Bills",
    files,
    topFolders: ["UB-04", "Collections", "Receipts"],
    settings: aging.normalizeSettings({ holidays: HOLIDAYS }),
    tagCatalog: [{ name: "Entered" }, { name: "Waiting" }, { name: "Taylor", color: "#123456" }],
    nowMs: at(2026, 11, 19, 15), // Thursday
    ...extra,
  });
}

test("a bill's category comes from its tags first, then its folder", () => {
  const { result } = report([
    file("UB-04/a.pdf"),
    file("UB-04/b.pdf", { tags: ["Entered"] }),
    file("UB-04/c.pdf", { tags: [" waiting "] }),
    file("Collections/d.pdf"),
    file("Receipts/e.pdf"),
    file("Receipts/f.pdf", { tags: ["Entered"] }),
  ]);
  const cat = Object.fromEntries(result.bills.map((b) => [b.name, b.category]));
  assert.deepEqual(cat, { "a.pdf": "Main", "b.pdf": "Entered", "c.pdf": "Waiting", "d.pdf": "Collections", "e.pdf": "Other", "f.pdf": "Entered" });
  assert.deepEqual(result.counts, { scanned: 6, entered: 2, other: 1, temp_ignored: 0, not_bm: 0 });
  const entered = result.bills.find((b) => b.name === "b.pdf");
  assert.equal(entered.due, null);
  assert.equal(entered.stage, "Entered");
});

test("age and due date count business days from the day received", () => {
  const { result } = report([file("UB-04/a.pdf", { tags: ["Taylor"] })]); // received Mon Nov 16
  const [b] = result.bills;
  assert.equal(b.receipt, "2026-11-16");
  assert.equal(b.source, "Created date");
  assert.equal(b.age, 3);
  assert.equal(b.due, "2026-12-01"); // 10 business days, skipping Thanksgiving
  assert.equal(b.days_left, 7);
  assert.equal(b.stage, "Working");
  assert.deepEqual(b.assignees, ["Taylor"]);
  assert.equal(result.staff_colors.Taylor, "#123456");
  assert.equal(result.forecast_dates[0], "2026-11-19");
  assert.deepEqual(result.holidays_ahead, HOLIDAYS);
});

test("first seen keeps the date a bill first arrived, and an override beats both", () => {
  const firstSeen = { "hash-UB-04/a.pdf": "2026-11-02T08:30:00" };
  let out = report([file("UB-04/a.pdf")], { firstSeen });
  assert.equal(out.result.bills[0].receipt, "2026-11-02");
  assert.equal(out.result.bills[0].source, "First seen");
  assert.equal(out.firstSeen["hash-UB-04/a.pdf"], "2026-11-02T08:30:00");

  // a new bill is recorded
  out = report([file("UB-04/new.pdf")]);
  assert.equal(out.firstSeen["hash-UB-04/new.pdf"], "2026-11-16T09:00:00");

  const overrides = [{ hash: "hash-UB-04/a.pdf", path: "elsewhere.pdf", date: "2026-11-10" }];
  out = report([file("UB-04/a.pdf")], { firstSeen, overrides });
  assert.equal(out.result.bills[0].receipt, "2026-11-10");
  assert.equal(out.result.bills[0].source, "Override");
});

test("needs attention: uncertain dates, unknown tags, duplicates, unreadable and non-bill files", () => {
  const { result } = report([
    file("UB-04/copied.pdf", { createdMs: at(2026, 11, 18), modifiedMs: at(2026, 11, 2) }),
    file("UB-04/odd.pdf", { tags: ["pending answer"] }),
    file("UB-04/one.pdf", { hash: "same" }),
    file("Collections/two.pdf", { hash: "same" }),
    file("UB-04/broken.pdf", { tagError: "bad xref" }),
    file("UB-04/note.html"),
    file("UB-04/~$draft.pdf"),
    file("Receipts/odd2.pdf", { tags: ["pending answer"] }), // Other folders aren't flagged
  ]);
  const issues = result.attention.map((a) => `${a.issue}: ${a.path}`).sort();
  assert.deepEqual(issues, [
    "Date uncertain: UB-04/copied.pdf",
    "Duplicate file: Collections/two.pdf",
    "Duplicate file: UB-04/one.pdf",
    "Not shown in BillManager: UB-04/note.html",
    "Unknown tag: UB-04/odd.pdf",
    "Unreadable file: UB-04/broken.pdf",
  ]);
  assert.equal(result.counts.temp_ignored, 1);
  assert.equal(result.counts.not_bm, 1);
});

test("the day's history rows count open bills by category and folder", () => {
  const { todayRows, result } = report(
    [file("UB-04/a.pdf"), file("UB-04/b.pdf", { createdMs: at(2026, 10, 20), modifiedMs: at(2026, 10, 20) }), file("UB-04/c.pdf", { tags: ["Entered"] })],
    { history: [{ date: "2026-11-18", category: "Main", folder: "UB-04", open: 1 }] }
  );
  assert.deepEqual(todayRows, [
    { date: "2026-11-19", category: "Main", folder: "UB-04", open: 2, overdue: 1, due_today: 0, due_next_3: 0, oldest_age: 22 },
  ]);
  assert.deepEqual(result.history.map((r) => r.date), ["2026-11-18", "2026-11-19"]);
});
