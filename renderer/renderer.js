const ICONS = {
  upload: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
  folder: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>`,
  tag: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.41 0l8.29-8.29a1 1 0 0 0 0-1.41L12 2Z"/><circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none"/></svg>`,
  x: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  search: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#8A8B8D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  trash: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  plus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  pencil: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`,
  open: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  filetext: `<svg width="34" height="42" viewBox="0 0 34 42"><rect x="0.5" y="0.5" width="33" height="41" fill="#FFFFFF" stroke="#BBCFC4"/><rect x="7" y="11" width="20" height="2" fill="#006D46"/><rect x="7" y="18" width="20" height="1" fill="#D5D6D7"/><rect x="7" y="23" width="20" height="1" fill="#D5D6D7"/><rect x="7" y="28" width="12" height="1" fill="#D5D6D7"/></svg>`,
  emptyFolder: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#58595B" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>`,
  refresh: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15.3-6.4L21 8"/><polyline points="21 3 21 8 16 8"/><path d="M21 12a9 9 0 0 1-15.3 6.4L3 16"/><polyline points="3 21 3 16 8 16"/></svg>`,
  undo: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>`,
  download: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  check: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  grid: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="13" width="8" height="8" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/></svg>`,
  list: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="9" y1="6" x2="21" y2="6"/><line x1="9" y1="12" x2="21" y2="12"/><line x1="9" y1="18" x2="21" y2="18"/><line x1="4" y1="6" x2="4.01" y2="6"/><line x1="4" y1="12" x2="4.01" y2="12"/><line x1="4" y1="18" x2="4.01" y2="18"/></svg>`,
  sortAsc: `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 15 12 9 18 15"/></svg>`,
  sortDesc: `<svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  winMinimize: `<svg width="10" height="10" viewBox="0 0 10 10"><rect x="0" y="4.5" width="10" height="1" fill="currentColor"/></svg>`,
  winMaximize: `<svg width="10" height="10" viewBox="0 0 10 10"><rect x="0.5" y="0.5" width="9" height="9" fill="none" stroke="currentColor"/></svg>`,
  winRestore: `<svg width="10" height="10" viewBox="0 0 10 10"><rect x="2.5" y="0.5" width="7" height="7" fill="none" stroke="currentColor"/><path d="M0.5 2.5V9.5H7.5" fill="none" stroke="currentColor"/></svg>`,
  winClose: `<svg width="10" height="10" viewBox="0 0 10 10"><path d="M0.5 0.5 9.5 9.5 M9.5 0.5 0.5 9.5" stroke="currentColor"/></svg>`,
  eye: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z"/><circle cx="12" cy="12" r="3"/></svg>`,
  rotate: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18.4 7.6A7.5 7.5 0 1 0 20 12"/><polyline points="21 4 20 8 16 7"/></svg>`,
  chevronLeft: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="15 6 9 12 15 18"/></svg>`,
  chevronRight: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>`,
};

// The "Stack" app mark (design_handoff_billmanager_refresh — application icon spec):
// a rounded green square with two layered document sheets. `reversed` swaps it for
// the white-plate variant used on the About window's green band.
function appMark(size, reversed) {
  const square = reversed ? "#FFFFFF" : "#006D46";
  const back = "#BBCFC4";
  const front = reversed ? "#006D46" : "#FFFFFF";
  const mark = reversed ? "#FFFFFF" : "#006D46";
  return `<svg width="${size}" height="${size}" viewBox="0 0 32 32" aria-hidden="true">
    <rect width="32" height="32" rx="7" fill="${square}"/>
    <rect x="6" y="9" width="14" height="17" fill="${back}"/>
    <rect x="9" y="6" width="14" height="17" fill="${front}"/>
    <rect x="11.5" y="10" width="9" height="2" fill="${mark}"/>
    <rect x="11.5" y="14" width="9" height="1" fill="${back}"/>
    <rect x="11.5" y="17.5" width="6" height="1" fill="${back}"/>
  </svg>`;
}

// Grid vs list is a pure display preference, not catalog data — this app
// otherwise persists things like the last-opened folder as files under its
// own userData dir (see main.js), but that's for state other processes/a
// future session need to read back reliably. This one's cosmetic-only and
// renderer-local, so localStorage is the right-sized tool for it.
function loadViewMode() {
  try {
    return localStorage.getItem("bm-view-mode") === "list" ? "list" : "grid";
  } catch {
    return "grid";
  }
}
function saveViewMode(mode) {
  try {
    localStorage.setItem("bm-view-mode", mode);
  } catch {
    /* private-mode/storage-disabled — the preference just won't survive restart */
  }
}

// List-view column widths, same persistence rationale as viewMode above.
// Keyed by the resizable columns only — thumb/open are fixed, and Name is
// the flexible remainder (see .bm-list-header/.bm-list-row's shared
// grid-template-columns in styles.css) so it isn't stored here.
const DEFAULT_LIST_COL_WIDTHS = { dir: 140, tags: 130, size: 70, date: 110 };
function loadListColWidths() {
  try {
    const saved = JSON.parse(localStorage.getItem("bm-list-col-widths"));
    return { ...DEFAULT_LIST_COL_WIDTHS, ...saved };
  } catch {
    return { ...DEFAULT_LIST_COL_WIDTHS };
  }
}
function saveListColWidths(widths) {
  try {
    localStorage.setItem("bm-list-col-widths", JSON.stringify(widths));
  } catch {
    /* private-mode/storage-disabled — widths just won't survive restart */
  }
}

// Each sort column's natural starting direction when a header/the sort
// dropdown switches TO it (name/tag/dir read best A→Z; size/date read best
// biggest-or-newest-first) — a fresh switch always starts here rather than
// carrying over whatever direction the previously active column was in.
const SORT_DEFAULT_DIR = { name: "asc", date: "desc", tag: "asc", dir: "asc", size: "desc" };
// Shared by the sort dropdown and the list-view header cells: switching to a
// new column resets to its natural direction; clicking the column that's
// already active flips direction instead.
function setSortBy(key) {
  if (state.sortBy === key) {
    state.sortDir = state.sortDir === "asc" ? "desc" : "asc";
  } else {
    state.sortBy = key;
    state.sortDir = SORT_DEFAULT_DIR[key] || "asc";
  }
}

const state = {
  folder: null,
  files: [],
  selected: new Set(), // relative paths of every selected file — drives both the grid's green-box highlight and the preview pane
  selectAnchor: null, // relative path of the last plain/ctrl-clicked file — the fixed end of a shift-click range
  navCursor: null, // relative path of the last arrow-key-navigated-to file — the moving end for keyboard nav/shift-range
  search: "",
  activeTags: new Set(), // tag names currently filtering the grid (AND — a file matches only if it has all of them)
  activeFolder: null, // relative path of the subfolder filter, or null for "All files" (recursive)
  untaggedOnly: false, // true to show only files with zero tags
  looseOnly: false, // true to show only files directly in the catalog root (dir === "") — mutually exclusive with activeFolder, same as untaggedOnly is with activeTags
  sortBy: "name", // "name" | "date" | "tag" | "dir" | "size"
  sortDir: "asc", // "asc" | "desc" — see SORT_DEFAULT_DIR/setSortBy above
  viewMode: loadViewMode(), // "grid" | "list" — see loadViewMode/saveViewMode above
  listColWidths: loadListColWidths(), // { dir, tags, size, date } px — list-view column widths
  allFolders: [], // relative paths of every subfolder in the catalog, incl. empty ones — move destinations
  predefinedTags: [], // [{ name, shortcut, color }] — curated vocabulary + keyboard shortcuts, per folder
  tagModalOpen: false,
  tagModalDraft: null, // working copy of predefinedTags while the manage-tags modal is open
  recordingShortcutIdx: null, // index into tagModalDraft currently listening for a keypress
  colorPicker: null, // { idx, h, s, v } — the tag-row color picker popover, or null if closed
  aboutOpen: false,
  commenterName: "", // per-device name signed onto new comments — see main.js's settings.json
  commenterModalOpen: false, // shown unskippably on first launch (no commenterName yet), or on demand from the Options dialog
  commenterNameDraft: "", // working copy of commenterName while the name modal is open
  settingsModalOpen: false, // the rail's "Options" dialog — a home for per-device settings (currently comment name + theme + autosave folder)
  theme: "light", // "light" | "dark" | "midnight" — per-device, see main.js's settings.json
  autosaveFolder: "", // per-device absolute folder the Autosave button files things into — see main.js's settings.json; asked for on first use, changeable from Options
  refreshing: false, // true while re-scanning the folder for changes made outside the app
  loadingInitial: true, // true until the startup last-folder lookup + first scan finishes
  reviewMode: false, // true while review mode's full-size viewer replaces the rail+grid — see enterReviewMode
  reviewCursor: null, // relative path of the file currently shown in review mode
  reviewLastIndex: 0, // index reviewCursor was last found at in getFiltered() — see maybeAdvanceReview
  preReviewSelected: null, // Set snapshot of state.selected from just before review mode started, restored on exit
  preReviewAnchor: null, // ditto for state.selectAnchor
  appVersion: "",
  updateStatus: { state: "idle" }, // idle | checking | available | available-manual (Mac) | not-available | downloading | downloaded | error
  rollbackStatus: { state: "idle" }, // idle | checking | downloading | installing | manual (Mac) | error
  windowMaximized: false,
};

// Brand green and brand gray first (the system's two native tones), then a run of
// muted, desaturated accents for telling many custom tags apart without straying
// into saturated/primary territory the rest of the design system avoids.
const TAG_COLOR_PALETTE = ["#006D46", "#58595B", "#8A6F3D", "#4A6FA5", "#7A5980", "#5C7A3D", "#9C4A3D", "#3D6B7A"];

const app = document.getElementById("app");

// ---- Undo stack ----
// A plain LIFO stack of recent reversible actions, each an { label, undo } pair.
// Lives outside `state` (and outside render()'s reach otherwise) since it isn't
// itself rendered content, only something the toolbar button/Ctrl+Z reads the
// length and top label of. Cleared whenever a different folder is opened, since
// its entries close over paths in the *previous* catalog.
let undoStack = [];
const MAX_UNDO = 50; // oldest entries just age out; any trashed file they reference is purged on next launch anyway
let undoIdCounter = 0; // stable per-entry id — the preview pane's "Recent" list (see renderPreviewEmpty) needs to target one specific entry regardless of where it sits in the stack, which a plain array index can't survive across a re-render

function pushUndo(label, undo) {
  // `time`/`id` ride along for the preview pane's "Recent" activity list (see
  // renderPreviewEmpty) — this stack is otherwise purely an undo mechanism,
  // but every mutating action already funnels through here with a
  // human-readable label, which is exactly what a recent-activity feed needs.
  undoStack.push({ id: ++undoIdCounter, label, undo, time: Date.now() });
  if (undoStack.length > MAX_UNDO) undoStack.shift();
  render();
}

// Undoes the most recent action — the toolbar Undo button and Ctrl+Z.
async function performUndo() {
  const last = undoStack[undoStack.length - 1];
  if (!last) return;
  await undoActionById(last.id);
}

// Undoes one specific action regardless of where it sits in the stack — the
// "Recent" list's per-row undo button. Splicing it out (rather than only ever
// popping the top) means an action can be undone out of order; later entries
// still in the stack keep referencing whatever they originally closed over,
// which is usually fine (each undo call is self-contained) but can occasionally
// compound oddly if a later action really did depend on this one having
// happened first (e.g. a tag edit on a file an earlier-in-the-stack move is
// about to relocate) — an inherent tradeoff of allowing out-of-order undo at all.
async function undoActionById(id) {
  const idx = undoStack.findIndex((a) => a.id === id);
  if (idx === -1) return;
  const [action] = undoStack.splice(idx, 1);
  try {
    await action.undo();
  } catch (e) {
    alert(`Couldn't undo "${action.label}":\n${e.message || e}`);
  }
  await refreshFiles();
}

// ---- Pending metadata writes ----
// Every tag/comment edit fires its updateFileMeta IPC call without the caller
// waiting on it (so the UI stays responsive), which means a refresh can start
// while a write is still in flight. Since refreshFiles() re-reads every file's
// metadata straight off disk and replaces state.files wholesale, a write that
// hasn't landed yet gets clobbered by the stale read that follows it — the
// edit looks like it "disappeared". This is normally a narrow race, but it
// widens a lot on a network/cloud-synced folder (e.g. SharePoint/OneDrive)
// where each metadata write takes far longer than on local disk. Tracking
// every in-flight write here lets refreshFiles() wait for all of them to
// settle before it re-reads, so a refresh can never observe a half-written
// state.
const pendingMetaWrites = new Set();

function saveFileMeta(folder, path, patch) {
  const promise = attemptSaveFileMeta(folder, path, patch);
  pendingMetaWrites.add(promise);
  const forget = () => pendingMetaWrites.delete(promise);
  promise.then(forget, forget);
  return promise;
}

// A failed write used to fail silently: the optimistic in-memory edit stuck
// around until the next refresh quietly reverted it, with nothing to explain
// why. Surface it instead, same as the other file operations (move/delete/
// open) already do — most likely cause on a shared synced folder is another
// machine (or the sync client itself) holding the file locked. The main
// process already retries the write itself a couple of times before this
// catch ever runs, so landing here means those automatic retries didn't clear
// it — offer one manual retry, and if that fails too the lock is probably
// going to outlast the user sitting here, so tell them to come back later
// instead of prompting to retry again.
async function attemptSaveFileMeta(folder, path, patch, isRetry = false) {
  try {
    await window.api.updateFileMeta(folder, path, patch);
  } catch (e) {
    const name = path.split("/").pop();
    if (!isRetry && confirm(`Couldn't save changes to "${name}":\n${e.message || e}\n\nRetry?`)) {
      return attemptSaveFileMeta(folder, path, patch, true);
    }
    if (isRetry) {
      alert(`Still couldn't save changes to "${name}". Please try again in a few minutes.`);
    }
    throw e;
  }
}

async function waitForPendingMetaWrites() {
  // Iterate as a snapshot: awaiting can let new writes queue (e.g. an undo
  // callback firing its own save), so loop until nothing's left pending.
  while (pendingMetaWrites.size > 0) {
    await Promise.allSettled([...pendingMetaWrites]);
  }
}

function formatSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  // GB tier: a single catalog file never gets this big, but the preview
  // pane's "This folder" total (see renderPreviewEmpty) sums every file in
  // the folder, which routinely does.
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
}

function formatDate(ms) {
  return new Date(ms).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

// "Recent" activity timestamps (see renderPreviewEmpty) — a short window as
// minutes-ago, today's entries with a clock time, yesterday by name, and a
// plain date beyond that (formatDate above).
function formatRelativeTime(ms) {
  const now = Date.now();
  const diffMin = Math.floor((now - ms) / 60000);
  if (diffMin < 1) return "Just now";
  if (diffMin < 60) return `${diffMin} minute${diffMin === 1 ? "" : "s"} ago`;
  const d = new Date(ms);
  const today = new Date(now);
  if (d.toDateString() === today.toDateString()) {
    return `Today, ${d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" })}`;
  }
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (d.toDateString() === yesterday.toDateString()) return "Yesterday";
  return formatDate(ms);
}

function escapeHtml(str) {
  return String(str).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}

function extLabel(ext) {
  if (ext === ".pdf") return "PDF";
  if (ext === ".png") return "PNG";
  return "JPG";
}

// Returns every selected file, in `state.files` order (rather than Set
// iteration order) so the grid, mini-preview grid, and batch operations all
// see selected files in a stable, predictable order.
function getSelectedFiles() {
  return state.files.filter((f) => state.selected.has(f.path));
}

function getAllTags() {
  const counts = {};
  state.files.forEach((f) => f.tags.forEach((t) => (counts[t] = (counts[t] || 0) + 1)));
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

// Builds a nested folder tree from each file's `dir` (its parent folder's relative
// path, "" at the root). Intermediate folders that hold no files directly but do
// hold subfolders with files still get a node, so the tree stays connected.
function buildFolderTree(files) {
  const root = { name: "", path: "", children: new Map(), count: 0, total: 0 };
  files.forEach((f) => {
    if (!f.dir) {
      root.count++;
      return;
    }
    let node = root;
    let acc = "";
    for (const part of f.dir.split("/")) {
      acc = acc ? `${acc}/${part}` : part;
      if (!node.children.has(part)) {
        node.children.set(part, { name: part, path: acc, children: new Map(), count: 0, total: 0 });
      }
      node = node.children.get(part);
    }
    node.count++;
  });
  (function computeTotals(node) {
    node.total = node.count + [...node.children.values()].reduce((sum, c) => sum + computeTotals(c), 0);
    return node.total;
  })(root);
  return root;
}

function renderFolderTree(node, depth) {
  return [...node.children.values()]
    .sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }))
    .map(
      (child) => `
      <div class="bm-nav-item ${state.activeFolder === child.path ? "active" : ""}" data-folder="${child.path.replace(/"/g, "&quot;")}" style="padding-left:${10 + depth * 14}px">
        <span class="bm-nav-name">${ICONS.folder}<span class="bm-nav-name-text">${child.name}</span></span><span class="bm-nav-count">${child.total}</span>
      </div>
      ${renderFolderTree(child, depth + 1)}`
    )
    .join("");
}

function getTagColor(name) {
  const t = state.predefinedTags.find((p) => p.name === name);
  return (t && t.color) || null;
}

// ---- Color math (shared by tag-chip coloring and the tag manager's color picker) ----

function clamp(min, max, v) {
  return Math.min(max, Math.max(min, v));
}

function hexToRgb(hex) {
  const m = /^#?([0-9a-f]{6})$/i.exec(hex || "");
  const clean = m ? m[1] : "006d46";
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function rgbToHex(r, g, b) {
  const c = (n) => clamp(0, 255, Math.round(n)).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`.toUpperCase();
}

function rgbToHsv(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d) % 6;
    else if (max === g) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
    if (h < 0) h += 360;
  }
  const s = max === 0 ? 0 : d / max;
  return { h, s, v: max };
}

function hsvToRgb(h, s, v) {
  const c = v * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = v - c;
  let r, g, b;
  if (h < 60) [r, g, b] = [c, x, 0];
  else if (h < 120) [r, g, b] = [x, c, 0];
  else if (h < 180) [r, g, b] = [0, c, x];
  else if (h < 240) [r, g, b] = [0, x, c];
  else if (h < 300) [r, g, b] = [x, 0, c];
  else [r, g, b] = [c, 0, x];
  return { r: (r + m) * 255, g: (g + m) * 255, b: (b + m) * 255 };
}

// A pale tag color (the default "Waiting" sage, or any other light custom pick)
// reads poorly as text on its own tint, so it falls back to an outline treatment
// with a darkened readout instead — everything else gets a light filled tint.
// This is a general rule (works for any color a user picks), not a lookup of
// specific tag names.
function chipTone(hex) {
  if (!hex) return { bg: "var(--green-100)", color: "var(--green-500)", border: "transparent" };
  const { r, g, b } = hexToRgb(hex);
  const lin = (c) => {
    c /= 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  };
  const L = 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b);
  if (L > 0.55) {
    return { bg: "var(--white)", border: hex, color: `color-mix(in srgb, ${hex} 55%, black)` };
  }
  return { bg: `color-mix(in srgb, ${hex} 14%, white)`, border: "transparent", color: hex };
}

function tagStyleAttr(tagName) {
  const hex = getTagColor(tagName);
  if (!hex) return "";
  const tone = chipTone(hex);
  return ` style="--tag-bg:${tone.bg}; --tag-color:${tone.color}; --tag-border:${tone.border};"`;
}

function sortFiles(files) {
  const arr = [...files];
  const dm = state.sortDir === "desc" ? -1 : 1; // direction multiplier
  const byName = (a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
  if (state.sortBy === "name") {
    arr.sort((a, b) => dm * byName(a, b));
  } else if (state.sortBy === "date") {
    arr.sort((a, b) => dm * (a.created - b.created)); // dm=-1 (the default for "date") reads newest first
  } else if (state.sortBy === "size") {
    arr.sort((a, b) => dm * (a.size - b.size));
  } else if (state.sortBy === "dir") {
    arr.sort((a, b) => {
      const cmp = dm * (a.dir || "").localeCompare(b.dir || "", undefined, { sensitivity: "base" });
      return cmp !== 0 ? cmp : byName(a, b);
    });
  } else if (state.sortBy === "tag") {
    arr.sort((a, b) => {
      const at = [...a.tags].sort()[0] || "";
      const bt = [...b.tags].sort()[0] || "";
      if (!at && bt) return 1; // untagged files sink to the bottom regardless of direction
      if (at && !bt) return -1;
      const cmp = dm * at.localeCompare(bt, undefined, { sensitivity: "base" });
      return cmp !== 0 ? cmp : byName(a, b);
    });
  }
  return arr;
}

function getFiltered() {
  const filtered = state.files
    .filter((f) => f.name.toLowerCase().includes(state.search.toLowerCase()))
    .filter((f) => !state.untaggedOnly || f.tags.length === 0)
    .filter((f) => [...state.activeTags].every((t) => f.tags.includes(t)))
    .filter((f) => !state.activeFolder || f.dir === state.activeFolder || f.dir.startsWith(state.activeFolder + "/"))
    .filter((f) => !state.looseOnly || f.dir === "");
  return sortFiles(filtered);
}

async function refreshFiles(skipFocusNudge = false) {
  if (!state.folder) return;
  state.refreshing = true;
  render();
  try {
    // A tag/comment edit's write can still be in flight (comments are debounced
    // 300ms behind typing; nothing else here is awaited by its caller either) when
    // a refresh kicks off. Since listFiles reads straight off disk and replaces
    // state.files wholesale, reading before that write lands would make the edit
    // look like it never happened. Flush the debounce and wait out every pending
    // write first so the read below always reflects the latest edits.
    flushPendingComments();
    await waitForPendingMetaWrites();
    [state.files, state.allFolders] = await Promise.all([
      window.api.listFiles(state.folder),
      window.api.listFolders(state.folder),
    ]);
    // Drop any selected paths that no longer exist under this name (moved elsewhere
    // by this same action, deleted, or changed outside the app) rather than leaving
    // a stale selection the user can't see.
    const validPaths = new Set(state.files.map((f) => f.path));
    state.selected.forEach((p) => {
      if (!validPaths.has(p)) state.selected.delete(p);
    });
  } finally {
    state.refreshing = false;
  }
  render();
  // Works around a Windows/Chromium quirk where rebuilding the DOM (just done by
  // the render() above) can leave any <select> unresponsive to clicks until the
  // window loses and regains focus — see the main-process handler for details.
  // Skipped on the very first render of a freshly opened window (see caller),
  // since blurring/refocusing the window before Windows has finished giving it
  // focus is what was leaving the app opening behind other windows on launch.
  if (!skipFocusNudge) window.api.nudgeWindowFocus();
}

// Auto-refresh: periodically rescans the open folder for changes made outside
// the app (e.g. a sync client dropping in new bills) without waiting for a
// manual click on the refresh button. Skipped while a refresh is already
// running, the tag manager is open, or focus is in a text field — a background
// reload would otherwise clobber an in-progress tag-manager edit or comment
// being typed, since the reload's data reflects disk, not whatever's mid-edit.
const AUTO_REFRESH_INTERVAL_MS = 5 * 60 * 1000;

setInterval(() => {
  if (!state.folder || state.refreshing || state.tagModalOpen) return;
  if (isEditableTarget(document.activeElement)) return;
  refreshFiles(true); // skipFocusNudge — this isn't a user-initiated action, so it shouldn't blur/refocus the window
}, AUTO_REFRESH_INTERVAL_MS);

async function chooseFolder() {
  const folder = await window.api.selectFolder();
  if (!folder) return;
  await openFolder(folder);
}

// Shared by manual folder selection and the auto-reopen on launch. `isStartup`
// is set only by the launch-time auto-reopen, so the first refresh's focus
// nudge (see refreshFiles) is skipped there but still runs for a folder picked
// by hand mid-session.
async function openFolder(folder, isStartup = false) {
  state.folder = folder;
  state.selected = new Set();
  state.selectAnchor = null;
  state.activeTags = new Set();
  state.activeFolder = null;
  state.untaggedOnly = false;
  state.looseOnly = false;
  state.search = "";
  undoStack = []; // entries close over paths in the previous folder — discard them
  state.predefinedTags = await window.api.getTagConfig(folder);
  window.api.setLastFolder(folder);
  await refreshFiles(isStartup);
}

// Adds `tag` to every selected file that doesn't already have it. With a
// single file selected this is just that file; with many, it applies to the
// whole batch in one undo step.
async function addTag(raw) {
  const tag = (raw || "").trim();
  if (!tag) return;
  const files = getSelectedFiles().filter((f) => !f.tags.includes(tag));
  if (files.length === 0) return;
  const prev = files.map((f) => ({ path: f.path, tags: [...f.tags] }));
  files.forEach((f) => {
    f.tags = [...f.tags, tag];
  });
  render();
  await Promise.all(files.map((f) => saveFileMeta(state.folder, f.path, { tags: f.tags })));
  pushUndo(`Add tag "${tag}"`, () =>
    Promise.all(prev.map((p) => saveFileMeta(state.folder, p.path, { tags: p.tags })))
  );
}

// Removes `tag` from every selected file that currently has it.
async function removeTag(tag) {
  const files = getSelectedFiles().filter((f) => f.tags.includes(tag));
  if (files.length === 0) return;
  const prev = files.map((f) => ({ path: f.path, tags: [...f.tags] }));
  files.forEach((f) => {
    f.tags = f.tags.filter((t) => t !== tag);
  });
  render();
  await Promise.all(files.map((f) => saveFileMeta(state.folder, f.path, { tags: f.tags })));
  pushUndo(`Remove tag "${tag}"`, () =>
    Promise.all(prev.map((p) => saveFileMeta(state.folder, p.path, { tags: p.tags })))
  );
}

const commentDebounce = {}; // per-index timer while a comment's textarea is being typed in
function updateComment(idx, value) {
  const file = getSelectedFiles()[0];
  if (!file) return;
  file.comments[idx] = value;
  if (commentDebounce[idx]) clearTimeout(commentDebounce[idx].timer);
  commentDebounce[idx] = {
    timer: setTimeout(() => flushComment(idx), 300),
    flush: () => saveFileMeta(state.folder, file.path, { comments: file.comments }),
  };
}

// Immediately commits a comment edit that's still sitting in its debounce
// window, instead of waiting out the remaining delay. Used both when the
// debounce timer itself fires and — critically — right before a refresh reads
// the folder back off disk, so that read can never land ahead of this write.
function flushComment(idx) {
  const pending = commentDebounce[idx];
  if (!pending) return;
  clearTimeout(pending.timer);
  delete commentDebounce[idx];
  pending.flush();
}

function flushPendingComments() {
  Object.keys(commentDebounce).forEach((idx) => flushComment(idx));
}

// Captured when a comment textarea gains focus (see renderPreview), keyed by
// index, as the undo boundary for that field: whatever's typed before the next
// blur becomes one undo step, rather than one per keystroke.
const commentEditSnapshot = {};

// Signature line auto-appended as line two of every newly-created comment, so
// whoever reads it later knows who wrote it and when. Uses commenterName as
// typed/stored in settings.json (see main.js) rather than any OS-level
// account name, since one device can be shared and the name is meant to be
// whatever the person answered the "Your name for comments" prompt with.
function commentAttributionLine() {
  const name = state.commenterName || "Unknown";
  const stamp = new Date().toLocaleString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  return `— ${name} · ${stamp}`;
}

function addComment() {
  const file = getSelectedFiles()[0];
  if (!file) return;
  const prevComments = [...file.comments];
  const path = file.path;
  // Blank first line is where the user types; the signature is pre-filled as
  // line two so it's there even if they close the app before typing anything.
  file.comments = [...file.comments, `\n${commentAttributionLine()}`];
  render();
  saveFileMeta(state.folder, path, { comments: file.comments });
  const areas = document.querySelectorAll(".bm-comment-area");
  const last = areas[areas.length - 1];
  if (last) {
    last.focus();
    last.setSelectionRange(0, 0); // cursor at the very start, ahead of the signature
  }
  pushUndo("Add comment", () => saveFileMeta(state.folder, path, { comments: prevComments }));
}

function removeComment(idx) {
  const file = getSelectedFiles()[0];
  if (!file) return;
  const prevComments = [...file.comments];
  const path = file.path;
  if (commentDebounce[idx]) clearTimeout(commentDebounce[idx].timer);
  delete commentDebounce[idx];
  file.comments = file.comments.filter((_, i) => i !== idx);
  render();
  saveFileMeta(state.folder, path, { comments: file.comments });
  pushUndo("Remove comment", () => saveFileMeta(state.folder, path, { comments: prevComments }));
}

// Appends `text` as a new comment on every selected file at once — the
// multi-select preview's equivalent of "Add comment", since editing each
// file's own comment list individually isn't practical once more than one
// file is selected.
async function addCommentToSelected(text) {
  const comment = (text || "").trim();
  if (!comment) return;
  const signed = `${comment}\n${commentAttributionLine()}`;
  const files = getSelectedFiles();
  if (files.length === 0) return;
  const prev = files.map((f) => ({ path: f.path, comments: [...f.comments] }));
  files.forEach((f) => {
    f.comments = [...f.comments, signed];
  });
  render();
  await Promise.all(files.map((f) => saveFileMeta(state.folder, f.path, { comments: f.comments })));
  pushUndo(`Add comment to ${files.length} files`, () =>
    Promise.all(prev.map((p) => saveFileMeta(state.folder, p.path, { comments: p.comments })))
  );
}

async function openFile(relPath) {
  if (!state.folder) return;
  const error = await window.api.openFile(state.folder, relPath);
  if (error) alert(`Couldn't open "${relPath}":\n${error}`);
}

// Moves every selected file to `destDir`. A single file moves immediately, no
// confirmation, same as always. More than one asks for confirmation first
// (a batch move is harder to eyeball before it happens) and, since the
// preview pane is now a persistent surface rather than a transient action
// bar, keeps the moved files selected afterward at their new paths instead of
// clearing the selection.
async function moveSelected(destDir) {
  const files = getSelectedFiles();
  if (files.length === 0) return;

  if (files.length === 1) {
    const file = files[0];
    if (destDir === file.dir) return;
    const prevDir = file.dir;
    const name = file.name;
    try {
      const result = await window.api.moveFile(state.folder, file.path, destDir);
      if (result && result.error) {
        alert(result.error);
        return;
      }
      state.selected = new Set([result.path]);
      state.selectAnchor = result.path;
      const movedTo = result.path;
      pushUndo(`Move "${name}"`, async () => {
        const r = await window.api.moveFile(state.folder, movedTo, prevDir);
        if (r && r.error) throw new Error(r.error);
      });
    } catch (e) {
      // Shouldn't happen — the main-process move no longer throws — but resync
      // with disk regardless rather than leaving stale state on an unexpected failure.
      alert(`Couldn't move "${file.name}": ${e.message || e}`);
    } finally {
      await refreshFiles();
    }
    return;
  }

  const paths = files.map((f) => f.path);
  const destLabel = destDir || "Root folder";
  if (!confirm(`Move ${paths.length} files to "${destLabel}"?`)) return;
  let errors = [];
  let moved = [];
  try {
    const result = await window.api.moveFiles(state.folder, paths, destDir);
    moved = (result && result.moved) || [];
    errors = (result && result.errors) || [];
  } catch (e) {
    // Shouldn't happen — moveOneFile no longer throws — but if the IPC call
    // itself fails outright, still fall through to resync below rather than
    // leaving the UI stuck showing stale state.
    errors = paths.map((p) => ({ path: p, error: e.message || String(e) }));
  } finally {
    state.selected = new Set([...moved.map((m) => m.to), ...errors.map((e) => e.path)]);
    await refreshFiles();
  }
  if (moved.length > 0) {
    pushUndo(`Move ${moved.length} files`, () => undoBulkMove(moved));
  }
  if (errors.length > 0) {
    alert(
      `Moved ${paths.length - errors.length} of ${paths.length} file(s). ${errors.length} failed:\n\n` +
        errors.map((e) => `• ${e.path}: ${e.error}`).join("\n")
    );
  }
}

// Renames every selected file in place to a yyyyMMdd_HHmmss timestamp,
// preserving each one's extension — a one-click way to clear an "already
// exists in that folder" collision at the move destination without a trip to
// file explorer. With more than one file selected, every name gets a " (n)"
// suffix (1-indexed) so the batch doesn't collide with itself.
async function autorenameSelected() {
  const files = getSelectedFiles();
  if (files.length === 0 || !state.folder) return;

  if (files.length === 1) {
    const file = files[0];
    const prevName = file.name;
    try {
      const result = await window.api.autorenameFile(state.folder, file.path);
      if (result && result.error) {
        alert(result.error);
        return;
      }
      state.selected = new Set([result.path]);
      state.selectAnchor = result.path;
      const newPath = result.path;
      pushUndo(`Autorename "${prevName}"`, async () => {
        const r = await window.api.renameFile(state.folder, newPath, prevName);
        if (r && r.error) throw new Error(r.error);
      });
    } catch (e) {
      alert(`Couldn't rename "${prevName}": ${e.message || e}`);
    } finally {
      await refreshFiles();
    }
    return;
  }

  const paths = files.map((f) => f.path);
  const prevNames = new Map(files.map((f) => [f.path, f.name]));
  let moved = [];
  let errors = [];
  try {
    const result = await window.api.autorenameFiles(state.folder, paths);
    moved = (result && result.moved) || [];
    errors = (result && result.errors) || [];
  } catch (e) {
    errors = paths.map((p) => ({ path: p, error: e.message || String(e) }));
  } finally {
    state.selected = new Set([...moved.map((m) => m.to), ...errors.map((e) => e.path)]);
    await refreshFiles();
  }
  if (moved.length > 0) {
    pushUndo(`Autorename ${moved.length} files`, async () => {
      const errs = [];
      for (const { from, to } of moved) {
        const r = await window.api.renameFile(state.folder, to, prevNames.get(from));
        if (r && r.error) errs.push(`${to}: ${r.error}`);
      }
      if (errs.length > 0) throw new Error(`Some files couldn't be renamed back:\n${errs.join("\n")}`);
    });
  }
  if (errors.length > 0) {
    alert(
      `Renamed ${moved.length} of ${paths.length} file(s). ${errors.length} failed:\n\n` +
        errors.map((e) => `• ${e.path}: ${e.error}`).join("\n")
    );
  }
}

// Persists a newly chosen autosave folder to per-device settings (see main.js's
// settings.json) and updates state immediately — same optimistic-update-then-
// persist order as setTheme.
async function setAutosaveFolder(folder) {
  state.autosaveFolder = folder;
  render();
  await window.api.setAutosaveFolder(folder);
}

// Resolves the per-device autosave destination folder, asking the user to
// choose one via the native OS folder picker the first time the Autosave
// button is used and remembering it from then on (also reachable from the
// Options dialog's "Change" button to update it later). Returns null if
// there's no folder set yet and the user cancels the picker, so callers can
// bail out cleanly instead of autosaving nowhere.
async function ensureAutosaveFolder() {
  if (state.autosaveFolder) return state.autosaveFolder;
  const chosen = await window.api.selectFolder();
  if (!chosen) return null;
  await setAutosaveFolder(chosen);
  return chosen;
}

// Autosaves every selected file: a "Save As", not a Save — it copies the file
// under a fresh yyyyMMdd_HHmmss name (same naming scheme as Autorename) into
// the per-device autosave folder (see ensureAutosaveFolder) and leaves the
// original completely untouched in the catalog. Selection is left as-is
// since nothing about the original file changed. Undo simply deletes the
// copy that was created — there's nothing to restore, since the original was
// never moved or renamed.
async function autosaveSelected() {
  const files = getSelectedFiles();
  if (files.length === 0 || !state.folder) return;
  const destFolder = await ensureAutosaveFolder();
  if (!destFolder) return;

  if (files.length === 1) {
    const file = files[0];
    const prevName = file.name;
    try {
      const result = await window.api.autosaveFile(state.folder, file.path, destFolder);
      if (result && result.error) {
        alert(result.error);
        return;
      }
      const destFull = result.destFull;
      pushUndo(`Autosave "${prevName}"`, async () => {
        const r = await window.api.undoAutosave(destFull);
        if (r && r.error) throw new Error(r.error);
      });
    } catch (e) {
      alert(`Couldn't autosave "${prevName}": ${e.message || e}`);
    } finally {
      // Only matters if destFolder happens to be inside the catalog folder —
      // otherwise nothing about the listing changed, and this is a no-op.
      await refreshFiles();
    }
    return;
  }

  const paths = files.map((f) => f.path);
  let saved = [];
  let errors = [];
  try {
    const result = await window.api.autosaveFiles(state.folder, paths, destFolder);
    saved = (result && result.saved) || [];
    errors = (result && result.errors) || [];
  } catch (e) {
    errors = paths.map((p) => ({ path: p, error: e.message || String(e) }));
  } finally {
    await refreshFiles();
  }
  if (saved.length > 0) {
    pushUndo(`Autosave ${saved.length} files`, async () => {
      const errs = [];
      for (const { source, destFull } of saved) {
        const r = await window.api.undoAutosave(destFull);
        if (r && r.error) errs.push(`${source}: ${r.error}`);
      }
      if (errs.length > 0) throw new Error(`Some copies couldn't be undone:\n${errs.join("\n")}`);
    });
  }
  if (errors.length > 0) {
    alert(
      `Autosaved ${saved.length} of ${paths.length} file(s). ${errors.length} failed:\n\n` +
        errors.map((e) => `• ${e.path}: ${e.error}`).join("\n")
    );
  }
}

// Moves every file in `moved` (each an { from, to } pair from move-files-batch)
// back to the subfolder its `from` path lived in. Collisions since the original
// move (a same-named file reappearing at the old spot) are reported together
// rather than aborting the rest of the batch, mirroring moveSelected itself.
async function undoBulkMove(moved) {
  const errors = [];
  for (const { from, to } of moved) {
    const destDir = from.includes("/") ? from.slice(0, from.lastIndexOf("/")) : "";
    const result = await window.api.moveFile(state.folder, to, destDir);
    if (result && result.error) errors.push(`${to}: ${result.error}`);
  }
  if (errors.length > 0) {
    throw new Error(`Some files couldn't be moved back:\n${errors.join("\n")}`);
  }
}

// Deletes every selected file in one action. Each file is trashed
// independently, so one locked/in-use file doesn't block the rest, and Undo
// brings the whole batch back as one step.
async function deleteSelected() {
  const files = getSelectedFiles();
  if (files.length === 0 || !state.folder) return;
  const paths = files.map((f) => f.path);
  const label = files.length === 1 ? `"${files[0].name}"` : `${files.length} files`;
  if (!confirm(`Delete ${label} from disk? You can undo this with Ctrl+Z until you close the app.`)) return;
  let deleted = [];
  let errors = [];
  try {
    const result = await window.api.deleteFiles(state.folder, paths);
    deleted = (result && result.deleted) || [];
    errors = (result && result.errors) || [];
  } catch (e) {
    errors = paths.map((p) => ({ path: p, error: e.message || String(e) }));
  } finally {
    state.selected = new Set();
    await refreshFiles();
  }
  if (deleted.length > 0) {
    pushUndo(`Delete ${deleted.length} file${deleted.length === 1 ? "" : "s"}`, () => undoBulkDelete(deleted));
  }
  if (errors.length > 0) {
    alert(
      `Deleted ${deleted.length} of ${paths.length} file(s). ${errors.length} failed:\n\n` +
        errors.map((e) => `• ${e.path}: ${e.error}`).join("\n")
    );
  }
}

// Restores every file in `deleted` (each a { path, trashPath } pair from
// delete-files-batch) back to where it was. Collisions since the delete (a
// same-named file having reappeared at the old spot) are reported together
// rather than aborting the rest of the batch, mirroring undoBulkMove.
async function undoBulkDelete(deleted) {
  const errors = [];
  for (const { path: relPath, trashPath } of deleted) {
    const result = await window.api.restoreFile(trashPath, state.folder, relPath);
    if (result && result.error) errors.push(`${relPath}: ${result.error}`);
  }
  if (errors.length > 0) {
    throw new Error(`Some files couldn't be restored:\n${errors.join("\n")}`);
  }
}

// ---- Drag-and-drop import from the OS file explorer ----

// `absPaths` are the dropped items' resolved absolute OS paths (see the
// drop handler in renderGridInto, which resolves each File via
// window.api.getPathForFile before calling this). Imports into whatever
// subfolder is currently active (root if "All files"/no folder filter) —
// mirrors where the file grid drops you're currently looking at, the same
// destination moveSelected would use. Copies rather than moves (see
// importOneFile in main.js), so the newly-added files land selected and
// undoing sends them to trash — deleteSelected's own undo path, run
// forward instead of back.
async function importDroppedFiles(absPaths) {
  if (!state.folder || absPaths.length === 0) return;
  const destDir = state.activeFolder || "";
  let imported = [];
  let errors = [];
  try {
    const result = await window.api.importFiles(state.folder, absPaths, destDir);
    imported = (result && result.imported) || [];
    errors = (result && result.errors) || [];
  } catch (e) {
    errors = absPaths.map((p) => ({ path: p, error: e.message || String(e) }));
  } finally {
    if (imported.length > 0) {
      state.selected = new Set(imported);
      state.selectAnchor = imported[imported.length - 1];
    }
    await refreshFiles();
  }
  if (imported.length > 0) {
    pushUndo(`Import ${imported.length} file${imported.length === 1 ? "" : "s"}`, async () => {
      const r = await window.api.deleteFiles(state.folder, imported);
      if (r && r.errors && r.errors.length > 0) {
        throw new Error(r.errors.map((e) => `${e.path}: ${e.error}`).join("; "));
      }
      await refreshFiles();
    });
  }
  if (errors.length > 0) {
    const total = imported.length + errors.length;
    alert(
      `Imported ${imported.length} of ${total} file(s). ${errors.length} skipped:\n\n` +
        errors.map((e) => `• ${e.path}: ${e.error}`).join("\n")
    );
  }
}

// ---- Predefined tags (dropdown vocabulary + keyboard shortcuts) ----

function comboFromEvent(e) {
  if (["Control", "Meta", "Alt", "Shift"].includes(e.key)) return null;
  const parts = [];
  if (e.ctrlKey) parts.push("Ctrl");
  if (e.metaKey) parts.push("Cmd");
  if (e.altKey) parts.push("Alt");
  if (e.shiftKey) parts.push("Shift");
  let key = e.key;
  if (key === " ") key = "Space";
  else if (key.length === 1) key = key.toUpperCase();
  parts.push(key);
  return parts.join("+");
}

function isEditableTarget(elm) {
  return !!elm && (elm.tagName === "INPUT" || elm.tagName === "TEXTAREA" || elm.isContentEditable);
}

async function savePredefinedTags(tags) {
  state.predefinedTags = tags;
  if (state.folder) await window.api.saveTagConfig(state.folder, tags);
}

function openTagManager() {
  if (state.aboutOpen) closeAbout();
  // origName tracks each row's starting name so a save can tell a rename (row kept,
  // name changed) apart from a brand-new row (origName ""), and detect deletions
  // (an origName with no surviving row) — see computeTagChanges.
  state.tagModalDraft = state.predefinedTags.map((t) => ({ ...t, origName: t.name }));
  state.tagModalOpen = true;
  render();
}

// Diffs the draft against the predefined-tag list it started from, returning what
// changed in terms of actual tag *names* so those edits can be mirrored onto every
// file that carries them: a name edit becomes a rename, a row that disappeared
// (removed, or cleared to blank — which save() drops anyway) becomes a removal.
function computeTagChanges(before, draft) {
  const renameMap = new Map(); // origName -> new name
  const keptOrigNames = new Set();
  draft.forEach((t) => {
    if (!t.origName) return; // brand-new row, no existing file tags reference it
    const trimmed = (t.name || "").trim();
    if (!trimmed) return; // name cleared — treated as a removal below
    keptOrigNames.add(t.origName);
    if (trimmed !== t.origName) renameMap.set(t.origName, trimmed);
  });
  const removedNames = before.map((t) => t.name).filter((name) => !keptOrigNames.has(name));
  return { renameMap, removedNames };
}

// Mirrors a tag rename/removal onto every file's own tags, matching what the tag
// manager just did to the predefined vocabulary. Writes are fired off without
// waiting — state.files is mutated in place first, so the grid/sidebar reflect the
// change immediately regardless of how long the metadata writes take. Returns
// each touched file's pre-change tags, so the caller can build an undo entry.
function applyTagChangesToFiles(renameMap, removedNames) {
  const snapshots = [];
  if (renameMap.size === 0 && removedNames.length === 0) return snapshots;
  const removedSet = new Set(removedNames);
  state.files.forEach((file) => {
    if (!file.tags.some((t) => renameMap.has(t) || removedSet.has(t))) return;
    snapshots.push({ path: file.path, prevTags: [...file.tags] });
    const seen = new Set();
    const newTags = [];
    file.tags.forEach((t) => {
      if (removedSet.has(t)) return;
      const mapped = renameMap.get(t) || t;
      if (!seen.has(mapped)) {
        seen.add(mapped);
        newTags.push(mapped);
      }
    });
    file.tags = newTags;
    saveFileMeta(state.folder, file.path, { tags: newTags });
  });
  return snapshots;
}

// Undoes a tag-manager save: restores the previous predefined-tag vocabulary and
// every file's pre-change tags. Doesn't try to restore activeTags filter chips —
// a rename/removal already reconciled those going forward; unwinding that too
// would be one more thing to keep in sync for a cosmetic edge case.
async function undoTagManagerSave(prevPredefinedTags, fileTagSnapshots) {
  await savePredefinedTags(prevPredefinedTags);
  for (const { path, prevTags } of fileTagSnapshots) {
    await saveFileMeta(state.folder, path, { tags: prevTags });
  }
}

// Keeps the active tag-filter selection in sync so a rename doesn't silently drop
// a filter chip and a removal doesn't leave a chip pointing at a tag that's gone.
function reconcileActiveTags(renameMap, removedNames) {
  if (renameMap.size === 0 && removedNames.length === 0) return;
  const removedSet = new Set(removedNames);
  const next = new Set();
  state.activeTags.forEach((t) => {
    if (removedSet.has(t)) return;
    next.add(renameMap.get(t) || t);
  });
  state.activeTags = next;
}

function closeTagManager(save) {
  stopRecordingShortcut();
  closeColorPicker();
  if (save) {
    const { renameMap, removedNames } = computeTagChanges(state.predefinedTags, state.tagModalDraft);
    const prevPredefinedTags = state.predefinedTags.map((t) => ({ ...t }));
    const fileTagSnapshots = applyTagChangesToFiles(renameMap, removedNames);
    reconcileActiveTags(renameMap, removedNames);
    const cleaned = state.tagModalDraft
      .map((t) => ({ name: t.name.trim(), shortcut: t.shortcut || "", color: t.color || "" }))
      .filter((t) => t.name);
    savePredefinedTags(cleaned);
    if (fileTagSnapshots.length > 0 || renameMap.size > 0 || removedNames.length > 0) {
      pushUndo("Edit predefined tags", () => undoTagManagerSave(prevPredefinedTags, fileTagSnapshots));
    }
  }
  state.tagModalOpen = false;
  state.tagModalDraft = null;
  state.recordingShortcutIdx = null;
  render();
}

function addDraftTagRow() {
  const color = TAG_COLOR_PALETTE[state.tagModalDraft.length % TAG_COLOR_PALETTE.length];
  state.tagModalDraft.push({ name: "", shortcut: "", color, origName: "" });
  render();
}

function removeDraftTagRow(idx) {
  if (state.recordingShortcutIdx === idx) stopRecordingShortcut();
  if (state.colorPicker && state.colorPicker.idx === idx) closeColorPicker();
  state.tagModalDraft.splice(idx, 1);
  render();
}

function clearDraftShortcut(idx) {
  state.tagModalDraft[idx].shortcut = "";
  render();
}

let activeShortcutHandler = null;

function stopRecordingShortcut() {
  if (activeShortcutHandler) {
    document.removeEventListener("keydown", activeShortcutHandler, true);
    activeShortcutHandler = null;
  }
  state.recordingShortcutIdx = null;
}

function startRecordingShortcut(idx) {
  stopRecordingShortcut();
  state.recordingShortcutIdx = idx;
  render();
  const handler = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.key === "Escape") {
      stopRecordingShortcut();
      render();
      return;
    }
    const combo = comboFromEvent(e);
    if (!combo) return; // a bare modifier key — keep listening
    state.tagModalDraft.forEach((t, i) => {
      if (i !== idx && t.shortcut === combo) t.shortcut = "";
    });
    state.tagModalDraft[idx].shortcut = combo;
    stopRecordingShortcut();
    render();
  };
  activeShortcutHandler = handler;
  document.addEventListener("keydown", handler, true);
}

// ---- Tag row color picker (SV field + hue slider + RGB inputs) ----

let colorPickerOutsideHandler = null;

function attachColorPickerOutsideHandler() {
  detachColorPickerOutsideHandler();
  colorPickerOutsideHandler = (e) => {
    if (e.target.closest(".bm-color-popover") || e.target.closest(".bm-tagrow-swatch")) return;
    closeColorPicker();
  };
  // Bubble phase, not capture: a click on e.g. "Save changes" should still reach
  // that button's own handler before this closes the popover out from under it.
  document.addEventListener("click", colorPickerOutsideHandler);
}

function detachColorPickerOutsideHandler() {
  if (colorPickerOutsideHandler) {
    document.removeEventListener("click", colorPickerOutsideHandler);
    colorPickerOutsideHandler = null;
  }
}

function openColorPicker(idx) {
  const hex = state.tagModalDraft[idx].color || "#006D46";
  const { r, g, b } = hexToRgb(hex);
  state.colorPicker = { idx, ...rgbToHsv(r, g, b) };
  attachColorPickerOutsideHandler();
  render();
}

function closeColorPicker() {
  if (!state.colorPicker) return;
  state.colorPicker = null;
  detachColorPickerOutsideHandler();
  render();
}

function toggleColorPicker(idx) {
  if (state.colorPicker && state.colorPicker.idx === idx) closeColorPicker();
  else openColorPicker(idx);
}

// Generic press-drag-release helper: listens on `document` (not the element
// itself) for the duration of the drag, same pattern as the shortcut recorder
// above, so it survives the full re-render every move triggers.
function beginPointerDrag(onMove) {
  const move = (ev) => onMove(ev);
  const up = () => {
    document.removeEventListener("mousemove", move);
    document.removeEventListener("mouseup", up);
  };
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", up);
}

// Ctrl+Z (Cmd+Z on macOS, though this app targets Windows) mirrors the toolbar
// Undo button. Skipped while focus is in a text field so the browser's own
// native undo-within-a-field still works for in-progress typing — same guard
// the predefined-tag shortcut dispatch below uses.
document.addEventListener("keydown", (e) => {
  if (isEditableTarget(document.activeElement)) return;
  const combo = comboFromEvent(e);
  if (combo !== "Ctrl+Z" && combo !== "Cmd+Z") return;
  e.preventDefault();
  performUndo();
});

// Ctrl+A (Cmd+A on macOS, though this app targets Windows) selects every file
// in the current view — same result as checking the rule row's "Select all"
// box. Skipped in a text field so native select-all-text still works there
// (same guard Ctrl+Z uses), and while a modal's open, matching the arrow-key
// nav guard — selecting files behind an open tag manager/about/color picker
// would be a confusing side effect the user can't even see happen.
document.addEventListener("keydown", (e) => {
  if (isEditableTarget(document.activeElement)) return;
  const combo = comboFromEvent(e);
  if (combo !== "Ctrl+A" && combo !== "Cmd+A") return;
  if (!state.folder || state.reviewMode || state.tagModalOpen || state.aboutOpen || state.colorPicker || state.commenterModalOpen || state.settingsModalOpen) return;
  e.preventDefault();
  const filtered = getFiltered();
  if (filtered.length === 0) return;
  selectAllFiltered(filtered);
  state.navCursor = state.selectAnchor;
  render();
});

// Electron's default behavior for an unhandled drop is to navigate the whole
// window to the dropped file — never wanted here. #grid-wrap's own
// dragover/drop (see renderGridInto) already prevents this and imports;
// this is the fallback for anywhere else in the window (rail, preview,
// titlebar), where a drop should just do nothing rather than break the app.
window.addEventListener("dragover", (e) => e.preventDefault());
window.addEventListener("drop", (e) => e.preventDefault());

// Escape closes whichever modal is open (color picker first, since it's "inside"
// the tag manager), mirroring the ✕/Cancel/Close affordances each already has.
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  if (state.colorPicker) closeColorPicker();
  else if (state.tagModalOpen) closeTagManager(false);
  else if (state.aboutOpen) closeAbout();
  else if (state.commenterModalOpen) closeCommenterNameModal();
  else if (state.settingsModalOpen) closeSettingsModal();
  else if (state.reviewMode) exitReviewMode();
});

// Global shortcut dispatch: toggles the matching predefined tag on every
// selected file. If every selected file already has it, the shortcut removes
// it from all of them; otherwise it adds it to whichever ones are missing it.
document.addEventListener("keydown", (e) => {
  if (state.tagModalOpen || isEditableTarget(document.activeElement)) return;
  const files = getSelectedFiles();
  if (files.length === 0 || state.predefinedTags.length === 0) return;
  const combo = comboFromEvent(e);
  if (!combo) return;
  const match = state.predefinedTags.find((t) => t.shortcut && t.shortcut === combo);
  if (!match) return;
  e.preventDefault();
  if (files.every((f) => f.tags.includes(match.name))) removeTag(match.name);
  else addTag(match.name);
});

// Groups the on-screen cards into visual rows by comparing offsetTop, since the
// grid's column count is responsive (CSS auto-fill) and isn't known in JS. Bails
// out (returns the same index unmoved) if the live DOM doesn't match `filtered`
// one-for-one, which can only happen mid-render.
function moveGridRow(filtered, idx, dir) {
  const cards = document.querySelectorAll("#grid-wrap .bm-grid .bm-card");
  if (cards.length !== filtered.length) return idx;
  const rows = [];
  let lastTop = null;
  cards.forEach((card, i) => {
    const top = card.offsetTop;
    if (lastTop === null || Math.abs(top - lastTop) > 1) {
      rows.push([]);
      lastTop = top;
    }
    rows[rows.length - 1].push(i);
  });
  const rowIdx = rows.findIndex((r) => r.includes(idx));
  if (rowIdx === -1) return idx;
  const col = rows[rowIdx].indexOf(idx);
  const targetRow = rows[rowIdx + dir];
  if (!targetRow) return idx;
  return targetRow[Math.min(col, targetRow.length - 1)];
}

function scrollCardIntoView(path) {
  const card = document.querySelector(`#grid-wrap .bm-grid .bm-card[data-path="${CSS.escape(path)}"]`);
  if (card) card.scrollIntoView({ block: "nearest" });
}

// Arrow-key grid navigation. Left/Right step to the previous/next file in the
// current sort order; Up/Down step to the same column in the previous/next row
// (see moveGridRow). A plain arrow press collapses to a single selection and
// resets the anchor, mirroring a plain click; Shift+arrow instead extends the
// selection from the fixed anchor while the cursor keeps moving, mirroring
// shift-click. With nothing selected, any arrow key selects the first file.
document.addEventListener("keydown", (e) => {
  if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
  if (isEditableTarget(document.activeElement)) return;
  if (state.reviewMode) return; // the grid isn't even on screen — see the review-mode arrow handler below instead
  if (state.tagModalOpen || state.aboutOpen || state.colorPicker || state.commenterModalOpen || state.settingsModalOpen || state.recordingShortcutIdx !== null) return;
  const filtered = getFiltered();
  if (filtered.length === 0) return;

  const cursorPath = state.navCursor || state.selectAnchor;
  const idx = cursorPath ? filtered.findIndex((f) => f.path === cursorPath) : -1;
  if (idx === -1) {
    e.preventDefault();
    const target = filtered[0];
    state.selected = new Set([target.path]);
    state.selectAnchor = target.path;
    state.navCursor = target.path;
    render();
    scrollCardIntoView(target.path);
    return;
  }

  let newIdx = idx;
  if (e.key === "ArrowLeft") newIdx = Math.max(0, idx - 1);
  else if (e.key === "ArrowRight") newIdx = Math.min(filtered.length - 1, idx + 1);
  else newIdx = moveGridRow(filtered, idx, e.key === "ArrowUp" ? -1 : 1);
  if (newIdx === idx) return; // already at an edge — let the key event through

  e.preventDefault();
  const target = filtered[newIdx];
  if (e.shiftKey) {
    if (!state.selectAnchor) state.selectAnchor = cursorPath;
    const anchorIdx = filtered.findIndex((f) => f.path === state.selectAnchor);
    const [from, to] = anchorIdx < newIdx ? [anchorIdx, newIdx] : [newIdx, anchorIdx];
    state.selected = new Set(filtered.slice(from, to + 1).map((f) => f.path));
  } else {
    state.selected = new Set([target.path]);
    state.selectAnchor = target.path;
  }
  state.navCursor = target.path;
  render();
  scrollCardIntoView(target.path);
});

// ---- Review mode ----
// A focused, one-file-at-a-time view: the rail and file grid give way to a
// big preview (see renderReviewMain) while the right-hand pane keeps its
// normal tags/comments/location/delete controls, still driven by
// state.selected exactly as it is outside review mode — entering/moving
// through review just keeps state.selected pinned to state.reviewCursor
// (see setReviewCursorState) so renderPreviewSingle needs no other changes.

// Same idea as isEditableTarget, plus <select> — arrow keys are also how a
// focused dropdown's own value changes, so review-mode navigation needs to
// stay out of the way of both a text field *and* an open tag/location select.
function isEditableOrDropdownTarget(elm) {
  return isEditableTarget(elm) || (!!elm && elm.tagName === "SELECT");
}

function enterReviewMode() {
  if (!state.folder) return;
  const filtered = getFiltered();
  if (filtered.length === 0) return;
  state.preReviewSelected = new Set(state.selected);
  state.preReviewAnchor = state.selectAnchor;
  state.reviewMode = true;
  // Start from whatever's currently selected (navCursor tracks the most
  // recent click/arrow-nav target, selectAnchor a plain/ctrl-click without
  // subsequent arrow nav) if it's still in the filtered list, else the top.
  const startPath = state.navCursor || state.selectAnchor;
  const startIdx = startPath ? filtered.findIndex((f) => f.path === startPath) : -1;
  const idx = startIdx === -1 ? 0 : startIdx;
  state.reviewLastIndex = idx;
  setReviewCursorState(filtered[idx].path);
  render();
}

// Pure state mutation, no render() — shared by exitReviewMode (a user action,
// which does need to render) and maybeAdvanceReview (called from inside
// render() itself, where a nested render() would recurse).
function exitReviewModeState() {
  state.reviewMode = false;
  state.selected = state.preReviewSelected || new Set();
  state.selectAnchor = state.preReviewAnchor || null;
  state.navCursor = state.selectAnchor;
  state.reviewCursor = null;
  state.preReviewSelected = null;
  state.preReviewAnchor = null;
}

function exitReviewMode() {
  exitReviewModeState();
  render();
}

// Points review at `path`, keeping state.selected (and hence the right-hand
// preview pane) in lockstep — see the file-level comment above.
function setReviewCursorState(path) {
  state.reviewCursor = path;
  state.selected = new Set([path]);
  state.selectAnchor = path;
  state.navCursor = path;
}

// Previous/next buttons and arrow keys — pure navigation within the current
// filtered order, never touching the file's tags/folder/etc.
function reviewStep(dir) {
  if (!state.reviewMode) return;
  const filtered = getFiltered();
  const idx = filtered.findIndex((f) => f.path === state.reviewCursor);
  if (idx === -1) return; // maybeAdvanceReview (below) handles a vanished current file
  const newIdx = idx + dir;
  if (newIdx < 0 || newIdx >= filtered.length) return; // already at an edge
  setReviewCursorState(filtered[newIdx].path);
  state.reviewLastIndex = newIdx;
  render();
}

// Called at the top of render(): when the file under review stops matching
// the active search/tag/folder filter — tagged into a different bucket,
// moved to another folder, deleted, or (in the "no tag" filter) given its
// first tag — review is done with it, so it steps on to whatever now sits at
// about the same spot in the list, same as if Next had been clicked.
// Centralized here (rather than threaded through addTag/removeTag/
// moveSelected/deleteSelected/refreshFiles) since render() already runs
// after every one of those.
function maybeAdvanceReview() {
  if (!state.reviewMode) return;
  const filtered = getFiltered();
  const idx = filtered.findIndex((f) => f.path === state.reviewCursor);
  if (idx !== -1) {
    state.reviewLastIndex = idx;
    return;
  }
  if (filtered.length === 0) {
    exitReviewModeState();
    return;
  }
  const nextIdx = Math.min(state.reviewLastIndex, filtered.length - 1);
  setReviewCursorState(filtered[nextIdx].path);
  state.reviewLastIndex = nextIdx;
}

// Up/Left = previous, Down/Right = next — a distinct convention from the
// grid's own Left/Right-along-Up/Down-by-row scheme (see the arrow-key
// handler above), specific to review mode's linear, one-at-a-time flow.
document.addEventListener("keydown", (e) => {
  if (!state.reviewMode) return;
  if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
  if (isEditableOrDropdownTarget(document.activeElement)) return;
  e.preventDefault();
  reviewStep(e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 1);
});

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstChild;
}

function render() {
  // render() tears down and rebuilds the entire #app subtree on every call —
  // including the file grid and the rail's nav list — so their scroll
  // containers would otherwise snap back to the top on every single
  // selection, tag toggle, move, etc. Carry each one's scroll position over
  // to its freshly-rebuilt replacement. (Safe across a folder switch too:
  // refreshFiles() always renders once while the new folder's file list is
  // still empty, which clamps scrollTop back near 0 before the real content
  // — and its own render() — lands.)
  const prevGridWrap = document.getElementById("grid-wrap");
  const gridScrollTop = prevGridWrap ? prevGridWrap.scrollTop : 0;
  const prevRailScroll = document.querySelector(".bm-rail-scroll");
  const railScrollTop = prevRailScroll ? prevRailScroll.scrollTop : 0;

  app.innerHTML = "";
  app.appendChild(renderTitlebar());
  // While the startup last-folder lookup and its first file scan are in flight,
  // show a single loading screen instead of the rail/main/preview. Rendering the
  // rail mid-scan (folder set, but files/tags still empty) briefly shows "0
  // folders"/"no tags", then a moment later the real ones — that content-height
  // jump toggles the rail's vertical scrollbar on and off, which is what reads
  // as a horizontal-scrollbar "blink" during startup. Skipping straight to the
  // fully-loaded UI in one paint avoids that jump entirely.
  if (state.loadingInitial) {
    app.appendChild(renderLoadingScreen());
    return;
  }
  maybeAdvanceReview(); // may flip state.reviewMode/reviewCursor off before anything below reads them
  const body = el(`<div class="bm-body${state.reviewMode ? " bm-body-review" : ""}"></div>`);
  if (state.reviewMode) {
    body.appendChild(renderReviewMain());
  } else {
    body.appendChild(renderRail());
    body.appendChild(renderMain());
  }
  body.appendChild(renderPreview());
  app.appendChild(body);
  const newGridWrap = document.getElementById("grid-wrap");
  if (newGridWrap) newGridWrap.scrollTop = gridScrollTop;
  const newRailScroll = document.querySelector(".bm-rail-scroll");
  if (newRailScroll) newRailScroll.scrollTop = railScrollTop;
  if (state.tagModalOpen) {
    const overlay = renderTagManager();
    app.appendChild(overlay);
    // Needs real layout (getBoundingClientRect), so this only makes sense once
    // the overlay is actually attached — hence the separate pass after append.
    if (state.colorPicker) positionColorPopover(overlay);
  }
  if (state.aboutOpen) app.appendChild(renderAbout());
  if (state.settingsModalOpen) app.appendChild(renderSettingsModal());
  if (state.commenterModalOpen) app.appendChild(renderCommenterNameModal());
}

// Full-window loading state shown only during the startup sequence in init()
// (see the loadingInitial comment on render() above). Reuses the same spinning
// arrows icon/animation as the rail's refresh button.
function renderLoadingScreen() {
  return el(`
    <div class="bm-loading-screen">
      <div class="bm-loading-spinner">${ICONS.refresh}</div>
      <div class="bm-loading-text">Loading…</div>
    </div>
  `);
}

// ---- Title bar ----
// The window is frameless (see main.js) so the app draws its own chrome and
// wires the three controls to real window operations over IPC.
function renderTitlebar() {
  const bar = el(`
    <div class="bm-titlebar">
      <div class="bm-titlebar-brand">
        ${appMark(18)}
        <span class="bm-titlebar-title">BillManager</span>
      </div>
      <div class="bm-titlebar-controls">
        <button class="bm-titlebar-btn" id="win-minimize" title="Minimize">${ICONS.winMinimize}</button>
        <button class="bm-titlebar-btn" id="win-maximize" title="${state.windowMaximized ? "Restore" : "Maximize"}">${state.windowMaximized ? ICONS.winRestore : ICONS.winMaximize}</button>
        <button class="bm-titlebar-btn bm-titlebar-close" id="win-close" title="Close">${ICONS.winClose}</button>
      </div>
    </div>
  `);
  bar.querySelector("#win-minimize").addEventListener("click", () => window.api.windowMinimize());
  bar.querySelector("#win-maximize").addEventListener("click", () => window.api.windowMaximizeToggle());
  bar.querySelector("#win-close").addEventListener("click", () => window.api.windowClose());
  return bar;
}

// ---- Updates ----
// The main process owns autoUpdater and only reports status back over
// "update-status" — nothing here talks to GitHub directly. Each handler just
// mirrors that status into state and re-renders.
//
// "not-available" is shown only briefly (see NOT_AVAILABLE_DISPLAY_MS below):
// after the startup auto-check confirms there's nothing new, sitting on "Up to
// date" forever would be a permanent, slightly odd fixture in the footer — it
// reverts back to the normal "Check for updates" button on its own instead.
// Every other status (available/downloading/downloaded/error) is left as-is,
// since those need a person to actually do something about them.
const NOT_AVAILABLE_DISPLAY_MS = 4000;
let notAvailableResetTimer = null;

function setUpdateStatus(status) {
  if (notAvailableResetTimer) {
    clearTimeout(notAvailableResetTimer);
    notAvailableResetTimer = null;
  }
  state.updateStatus = status;
  render();
  if (status.state === "not-available") {
    notAvailableResetTimer = setTimeout(() => {
      notAvailableResetTimer = null;
      state.updateStatus = { state: "idle" };
      render();
    }, NOT_AVAILABLE_DISPLAY_MS);
  }
}

async function checkForUpdates() {
  setUpdateStatus({ state: "checking" });
  await window.api.checkForUpdates();
}

async function downloadUpdate() {
  setUpdateStatus({ ...state.updateStatus, state: "downloading", percent: 0 });
  await window.api.downloadUpdate();
}

function restartToInstall() {
  window.api.quitAndInstall();
}

// Mac builds can't silently install (see main.js's IS_MAC comment), so an
// available update there just opens the GitHub release page for the user to
// download and install by hand instead.
function openReleasesPage() {
  window.api.openReleasesPage();
}

// One line of caption text summarizing update state — used in both the sidebar
// footer and the About window (which shows it next to the version number).
function updateStatusLabel() {
  const s = state.updateStatus;
  if (s.state === "checking") return "Checking for updates…";
  if (s.state === "available" || s.state === "available-manual") return "Update available";
  if (s.state === "downloading") return `Downloading… ${s.percent ?? 0}%`;
  if (s.state === "downloaded") return "Update ready to install";
  if (s.state === "not-available") return "Up to date";
  if (s.state === "error") return "Update check failed";
  return "";
}

// ---- Roll back to previous version ----
// Shown as a small link/status pair right under the version number in the
// About window. Unlike the update flow above, this is user-initiated only
// and always asks for confirmation first, since it quits the app and
// replaces it with an older build.
function rollbackStatusLabel() {
  const s = state.rollbackStatus;
  if (s.state === "checking") return "Looking up the previous version…";
  if (s.state === "downloading") return `Downloading ${s.version ?? "previous version"}… ${s.percent ?? 0}%`;
  if (s.state === "installing") return "Quitting to roll back…";
  if (s.state === "manual") return `Opened ${s.version} on GitHub — install it by hand`;
  if (s.state === "error") return `Roll back failed: ${s.message || ""}`;
  return "";
}

function rollbackInProgress() {
  return ["checking", "downloading", "installing"].includes(state.rollbackStatus.state);
}

async function rollbackToPreviousVersion() {
  if (rollbackInProgress()) return;
  if (
    !confirm(
      "Roll back to the version before the current release?\n\nBillManager will download it from GitHub, then quit and reinstall it. Any unsaved changes should be saved first."
    )
  ) {
    return;
  }
  state.rollbackStatus = { state: "checking" };
  render();
  await window.api.rollbackToPreviousVersion();
}

function renderRailFooter() {
  const s = state.updateStatus;
  let action;
  if (s.state === "checking") {
    action = `<span class="bm-rail-update-row">${ICONS.refresh} Checking for updates…</span>`;
  } else if (s.state === "available") {
    action = `<button class="bm-btn bm-btn-primary bm-btn-maroon bm-btn-sm bm-btn-block" id="update-download">${ICONS.download} Download update ${s.version}</button>`;
  } else if (s.state === "available-manual") {
    action = `<button class="bm-btn bm-btn-primary bm-btn-maroon bm-btn-sm bm-btn-block" id="update-manual">${ICONS.download} Get update ${s.version}</button>`;
  } else if (s.state === "downloading") {
    action = `<span class="bm-rail-update-row">${ICONS.download} Downloading… ${s.percent ?? 0}%</span>`;
  } else if (s.state === "downloaded") {
    action = `<button class="bm-btn bm-btn-reversed bm-btn-sm bm-btn-block" id="update-restart">${ICONS.check} Restart to install</button>`;
  } else if (s.state === "not-available") {
    action = `<span class="bm-rail-update-row bm-rail-update-clickable" id="update-recheck">${ICONS.check} Up to date</span>`;
  } else if (s.state === "error") {
    action = `<span class="bm-rail-update-row bm-rail-update-error bm-rail-update-clickable" id="update-recheck" title="${(s.message || "").replace(/"/g, "&quot;")}">Update check failed</span>`;
  } else {
    action = `<button class="bm-btn bm-btn-reversed bm-btn-sm bm-btn-block" id="update-check">Check for updates</button>`;
  }

  const footer = el(`
    <div class="bm-rail-footer">
      <div class="bm-rail-footer-row">
        <span>Version ${state.appVersion}</span>
        <div class="bm-rail-footer-links">
          <button class="bm-rail-link" id="options-link">Options</button>
          <button class="bm-rail-link" id="about-link">About</button>
        </div>
      </div>
      ${action}
    </div>
  `);

  footer.querySelector("#options-link").addEventListener("click", openSettingsModal);
  footer.querySelector("#about-link").addEventListener("click", openAbout);
  const checkBtn = footer.querySelector("#update-check");
  if (checkBtn) checkBtn.addEventListener("click", checkForUpdates);
  const downloadBtn = footer.querySelector("#update-download");
  if (downloadBtn) downloadBtn.addEventListener("click", downloadUpdate);
  const manualBtn = footer.querySelector("#update-manual");
  if (manualBtn) manualBtn.addEventListener("click", openReleasesPage);
  const restartBtn = footer.querySelector("#update-restart");
  if (restartBtn) restartBtn.addEventListener("click", restartToInstall);
  const recheckBtn = footer.querySelector("#update-recheck");
  if (recheckBtn) recheckBtn.addEventListener("click", checkForUpdates);

  return footer;
}

function renderRail() {
  const tags = getAllTags();
  const folderTree = state.folder ? buildFolderTree(state.files) : null;
  const untaggedCount = state.files.filter((f) => f.tags.length === 0).length;
  const looseCount = state.files.filter((f) => f.dir === "").length;
  const rail = el(`
    <aside class="bm-rail">
      <div class="bm-rail-brand">
        <div class="bm-rail-title">BillManager</div>
        <div class="bm-rail-sub">Anabaptist Brotherhood · File Archive</div>
      </div>
      <div class="bm-rail-scroll">
        <div class="bm-choose-folder-wrap">
          <button class="bm-btn bm-btn-reversed bm-btn-block" id="choose-folder">${ICONS.upload} Choose folder</button>
          ${
            state.folder
              ? `<div class="bm-rail-path-row">
                   <div class="bm-rail-path">${state.folder}</div>
                   <button class="bm-refresh-btn ${state.refreshing ? "spinning" : ""}" id="refresh-folder-btn" title="Refresh — rescan this folder for changes" ${state.refreshing ? "disabled" : ""}>${ICONS.refresh}</button>
                 </div>`
              : `<div class="bm-rail-hint">Pick a folder to browse its PDFs, JPGs, and PNGs.</div>`
          }
        </div>
        ${
          state.folder
            ? `
        <div class="bm-rail-label">Folders</div>
        <div class="bm-nav-item ${state.activeTags.size === 0 && !state.activeFolder && !state.untaggedOnly && !state.looseOnly ? "active" : ""}" id="nav-all">
          <span class="bm-nav-name">${ICONS.folder}<span class="bm-nav-name-text">All files</span></span>
          <span class="bm-nav-count">${state.files.length}</span>
        </div>
        <div class="bm-nav-item dim ${state.looseOnly ? "active" : ""}" id="nav-loose">
          <span class="bm-nav-name"><span class="bm-nav-name-text">Loose files</span></span>
          <span class="bm-nav-count">${looseCount}</span>
        </div>
        ${
          folderTree.children.size > 0
            ? `<div class="bm-folder-nav-list" id="folder-nav-list">${renderFolderTree(folderTree, 0)}</div>`
            : ""
        }
        <div class="bm-rail-label-row">
          <div class="bm-rail-label">Tags</div>
          <button class="bm-rail-link" id="manage-tags-btn" title="Manage predefined tags">Manage</button>
        </div>
        <div class="bm-tag-nav-list" id="tag-nav-list">
          <div class="bm-tag-nav dim ${state.untaggedOnly ? "active" : ""}" id="nav-untagged">
            <span class="bm-tag-nav-name">No tags</span>
            <span class="bm-nav-count">${untaggedCount}</span>
          </div>
          ${
            tags.length === 0
              ? `<div class="bm-rail-empty">No tags yet</div>`
              : tags
                  .map(([tag, count]) => {
                    return `
              <div class="bm-tag-nav bm-tag-nav-pilled ${state.activeTags.has(tag) ? "active" : ""}" data-tag="${tag}">
                <span class="bm-tag-nav-pill-wrap"><span class="bm-tag"${tagStyleAttr(tag)}>${tag}</span></span>
                <span class="bm-nav-count">${count}</span>
              </div>`;
                  })
                  .join("")
          }
        </div>`
            : ""
        }
      </div>
    </aside>
  `);

  rail.querySelector("#choose-folder").addEventListener("click", chooseFolder);
  const refreshBtn = rail.querySelector("#refresh-folder-btn");
  if (refreshBtn) refreshBtn.addEventListener("click", refreshFiles);
  const manageBtn = rail.querySelector("#manage-tags-btn");
  if (manageBtn) manageBtn.addEventListener("click", openTagManager);
  const navAll = rail.querySelector("#nav-all");
  if (navAll) navAll.addEventListener("click", () => { state.activeTags = new Set(); state.activeFolder = null; state.untaggedOnly = false; state.looseOnly = false; render(); });
  const navLoose = rail.querySelector("#nav-loose");
  if (navLoose) navLoose.addEventListener("click", () => {
    state.looseOnly = !state.looseOnly;
    if (state.looseOnly) state.activeFolder = null; // mutually exclusive with browsing into a specific folder — same relationship activeFolder already has with untaggedOnly's sibling, activeTags
    render();
  });
  const navUntagged = rail.querySelector("#nav-untagged");
  if (navUntagged) navUntagged.addEventListener("click", () => {
    state.untaggedOnly = !state.untaggedOnly;
    if (state.untaggedOnly) state.activeTags = new Set();
    render();
  });
  rail.querySelectorAll(".bm-nav-item[data-folder]").forEach((elm) => {
    elm.addEventListener("click", () => {
      const p = elm.dataset.folder;
      state.activeFolder = state.activeFolder === p ? null : p;
      if (state.activeFolder) state.looseOnly = false;
      render();
    });
  });
  rail.querySelectorAll(".bm-tag-nav[data-tag]").forEach((elm) => {
    elm.addEventListener("click", () => {
      const t = elm.dataset.tag;
      state.untaggedOnly = false;
      if (state.activeTags.has(t)) state.activeTags.delete(t);
      else state.activeTags.add(t);
      render();
    });
  });

  rail.appendChild(renderRailFooter());

  return rail;
}

function renderMain() {
  const filtered = state.folder ? getFiltered() : [];
  const main = el(`
    <main class="bm-main">
      <div class="bm-toolbar">
        <button class="bm-btn bm-btn-primary bm-btn-sm bm-toolbar-review" id="review-mode-btn" ${state.folder && filtered.length > 0 ? "" : "disabled"}
          title="${filtered.length > 0 ? "Step through these files one at a time in a focused, full-size view" : "Nothing to review"}">
          ${ICONS.eye} Review mode
        </button>
        <div class="bm-field bm-toolbar-search">
          <label class="bm-field-label" for="search-input">Search</label>
          <div class="bm-search-input-wrap">
            ${ICONS.search}
            <input class="bm-input" id="search-input" placeholder="Search files by name…" value="${state.search.replace(/"/g, "&quot;")}" ${state.folder ? "" : "disabled"} />
          </div>
        </div>
        <div class="bm-field bm-toolbar-sort">
          <label class="bm-field-label" for="sort-select">Sort</label>
          <select class="bm-select" id="sort-select" ${state.folder ? "" : "disabled"}>
            <option value="name" ${state.sortBy === "name" && state.sortDir === "asc" ? "selected" : ""}>Name (A–Z)</option>
            <option value="date" ${state.sortBy === "date" && state.sortDir === "desc" ? "selected" : ""}>Newest first</option>
            <option value="tag" ${state.sortBy === "tag" && state.sortDir === "asc" ? "selected" : ""}>Tag (A–Z)</option>
          </select>
        </div>
        <div class="bm-view-toggle bm-toolbar-view" role="group" aria-label="View">
          <button class="bm-view-toggle-btn ${state.viewMode === "grid" ? "active" : ""}" id="view-grid-btn" title="Thumbnail view" ${state.folder ? "" : "disabled"}>${ICONS.grid}</button>
          <button class="bm-view-toggle-btn ${state.viewMode === "list" ? "active" : ""}" id="view-list-btn" title="List view" ${state.folder ? "" : "disabled"}>${ICONS.list}</button>
        </div>
        <button class="bm-btn bm-btn-ghost bm-btn-sm bm-toolbar-undo" id="undo-btn" ${undoStack.length === 0 ? "disabled" : ""}
          title="${undoStack.length > 0 ? `Undo: ${undoStack[undoStack.length - 1].label} (Ctrl+Z)` : "Nothing to undo"}">
          ${ICONS.undo} Undo
        </button>
      </div>
      <div class="bm-active-filters">
        ${
          state.activeFolder
            ? `<div class="bm-active-filter">${ICONS.folder} ${state.activeFolder} <button id="clear-folder">${ICONS.x}</button></div>`
            : ""
        }
        ${
          state.looseOnly
            ? `<div class="bm-active-filter">${ICONS.folder} Loose files <button id="clear-loose">${ICONS.x}</button></div>`
            : ""
        }
        ${
          state.untaggedOnly
            ? `<div class="bm-active-filter">${ICONS.tag} No tags <button id="clear-untagged">${ICONS.x}</button></div>`
            : ""
        }
        ${[...state.activeTags]
          .map(
            (t) =>
              `<div class="bm-active-filter"${tagStyleAttr(t)}>${ICONS.tag} ${t} <button class="bm-clear-tag-btn" data-tag="${t.replace(/"/g, "&quot;")}">${ICONS.x}</button></div>`
          )
          .join("")}
      </div>
      <div class="bm-rule-row">
        <label class="bm-checkbox-label"><input type="checkbox" id="select-all-checkbox" disabled /> Select all ${filtered.length}</label>
        <div class="bm-rule-row-meta" id="rule-row-meta"></div>
      </div>
      <div class="bm-grid-wrap" id="grid-wrap"></div>
    </main>
  `);

  main.querySelector("#review-mode-btn").addEventListener("click", enterReviewMode);
  const searchInput = main.querySelector("#search-input");
  searchInput.addEventListener("input", (e) => {
    state.search = e.target.value;
    const nowFiltered = getFiltered();
    renderRuleRowInto(main, nowFiltered);
    renderGridInto(main.querySelector("#grid-wrap"), nowFiltered);
  });
  main.querySelector("#sort-select").addEventListener("change", (e) => {
    setSortBy(e.target.value); // dropdown always names a different column than whatever's active, so this always takes the "switch" branch (that column's natural default direction) — never the toggle branch
    const nowFiltered = getFiltered();
    renderRuleRowInto(main, nowFiltered);
    renderGridInto(main.querySelector("#grid-wrap"), nowFiltered);
  });
  main.querySelector("#view-grid-btn").addEventListener("click", () => {
    if (state.viewMode === "grid") return;
    state.viewMode = "grid";
    saveViewMode("grid");
    render();
  });
  main.querySelector("#view-list-btn").addEventListener("click", () => {
    if (state.viewMode === "list") return;
    state.viewMode = "list";
    saveViewMode("list");
    render();
  });
  main.querySelector("#undo-btn").addEventListener("click", performUndo);
  const clearFolderBtn = main.querySelector("#clear-folder");
  if (clearFolderBtn) clearFolderBtn.addEventListener("click", () => { state.activeFolder = null; render(); });
  const clearLooseBtn = main.querySelector("#clear-loose");
  if (clearLooseBtn) clearLooseBtn.addEventListener("click", () => { state.looseOnly = false; render(); });
  const clearUntaggedBtn = main.querySelector("#clear-untagged");
  if (clearUntaggedBtn) clearUntaggedBtn.addEventListener("click", () => { state.untaggedOnly = false; render(); });
  main.querySelectorAll(".bm-clear-tag-btn").forEach((btn) => {
    btn.addEventListener("click", () => { state.activeTags.delete(btn.dataset.tag); render(); });
  });

  renderRuleRowInto(main, filtered);
  renderGridInto(main.querySelector("#grid-wrap"), filtered);
  return main;
}

// Selects every file in `filtered` (the current search/sort/tag/folder
// view) — shared by the rule row's "Select all" checkbox and the Ctrl+A
// shortcut below. Caller still owns render()/navCursor, matching every
// other selection helper in this file.
function selectAllFiltered(filtered) {
  filtered.forEach((f) => state.selected.add(f.path));
  state.selectAnchor = filtered.length > 0 ? filtered[filtered.length - 1].path : null;
}

// The "Select all N / N FILES · N FOLDERS" rule row above the grid. Rendered
// into the already-mounted toolbar so search/sort updates can refresh it
// without a full app re-render (see renderMain's input/change listeners).
function renderRuleRowInto(main, filtered) {
  if (!state.folder) {
    main.querySelector("#select-all-checkbox").disabled = true;
    main.querySelector("#select-all-checkbox").checked = false;
    main.querySelector("#rule-row-meta").textContent = "";
    return;
  }
  const selectedInFiltered = filtered.filter((f) => state.selected.has(f.path)).length;
  const allFilteredSelected = filtered.length > 0 && selectedInFiltered === filtered.length;
  const label = main.querySelector(".bm-checkbox-label");
  label.lastChild.textContent = ` Select all ${filtered.length}`;
  const cb = main.querySelector("#select-all-checkbox");
  cb.disabled = filtered.length === 0;
  cb.checked = allFilteredSelected;
  cb.indeterminate = selectedInFiltered > 0 && !allFilteredSelected;
  cb.onchange = () => {
    if (cb.checked) {
      selectAllFiltered(filtered);
    } else {
      filtered.forEach((f) => state.selected.delete(f.path));
    }
    state.navCursor = state.selectAnchor;
    render();
  };
  const folderCount = new Set(filtered.map((f) => f.dir).filter(Boolean)).size;
  main.querySelector("#rule-row-meta").textContent = `${filtered.length} FILES · ${folderCount} FOLDERS`;
}

function renderGridInto(container, filtered) {
  container.innerHTML = "";
  if (!state.folder) {
    container.appendChild(
      el(`
      <div class="bm-empty">
        ${ICONS.emptyFolder}
        <div class="bm-empty-title">No folder open</div>
        <div class="bm-empty-sub">Choose a folder from the sidebar to browse and catalog its PDFs, JPGs, and PNGs.</div>
      </div>
    `)
    );
    return;
  }

  // ---- Drag-and-drop import from the OS file explorer (see importDroppedFiles) ----
  // Wired here, before the empty/no-results branch below, so dropping into a
  // freshly-opened or filtered-to-nothing folder still works — not just a
  // populated grid. Single-slot assignment (not addEventListener) for the
  // same reason container.onclick below is: `container` (#grid-wrap) is
  // reused across partial re-renders, and stacking a new listener on every
  // keystroke would run the import multiple times per drop.
  let dragDepth = 0; // dragenter/dragleave fire once per child boundary crossed, not just the container's own edge — a counter is what tells "still inside" apart from "actually left".
  container.ondragenter = (e) => {
    e.preventDefault();
    dragDepth++;
    container.classList.add("drag-over");
  };
  container.ondragover = (e) => e.preventDefault(); // required for ondrop to fire at all
  container.ondragleave = () => {
    dragDepth = Math.max(0, dragDepth - 1);
    if (dragDepth === 0) container.classList.remove("drag-over");
  };
  container.ondrop = (e) => {
    e.preventDefault();
    dragDepth = 0;
    container.classList.remove("drag-over");
    const files = [...e.dataTransfer.files];
    if (files.length === 0) return; // a non-file drag (text, a link, …) — nothing to import
    // webUtils.getPathForFile (exposed via preload) is synchronous — a browser
    // File object carries no filesystem path of its own to read directly.
    const absPaths = files.map((f) => window.api.getPathForFile(f)).filter(Boolean);
    importDroppedFiles(absPaths);
  };

  if (filtered.length === 0) {
    container.appendChild(
      el(`
      <div class="bm-empty">
        ${ICONS.emptyFolder}
        <div class="bm-empty-title">${state.files.length === 0 ? "This folder is empty" : "Nothing matches"}</div>
        <div class="bm-empty-sub">${
          state.files.length === 0
            ? "No PDFs, JPGs, or PNGs found in this folder or its subfolders."
            : "Try a different search term or clear the active tag/folder filter."
        }</div>
      </div>
    `)
    );
    return;
  }

  const isList = state.viewMode === "list";
  // Column widths live as CSS custom properties on #grid-wrap itself (see
  // .bm-list-header/.bm-list-row's shared grid-template-columns in
  // styles.css) — inherited by both the header and every row below it, so a
  // live resize drag only ever has to touch this one element, not each row.
  applyListColWidths(container);
  if (isList) container.appendChild(renderListHeader());

  const grid = el(`<div class="bm-grid ${isList ? "bm-grid-list" : ""}"></div>`);
  filtered.forEach((f) => {
    const isSelected = state.selected.has(f.path);
    const card = isList ? buildListRow(f, isSelected) : buildGridCard(f, isSelected);
    wireFileItem(card, f, filtered);
    grid.appendChild(card);
  });
  // Clicking empty space within the grid (not on a card) clears the
  // selection, same as clicking blank space in a file explorer window.
  // `container` (#grid-wrap) is reused across partial re-renders — e.g. every
  // search keystroke — so this is assigned via .onclick (a single slot) rather
  // than addEventListener, which would otherwise stack a new listener each time.
  // (The list header is a sibling of `grid`, not inside it, so clicking a
  // header cell never satisfies this check — it's handled by its own sort/
  // resize listeners instead.)
  container.onclick = (e) => {
    if (e.target === container || e.target === grid) {
      state.selected = new Set();
      state.selectAnchor = null;
      state.navCursor = null;
      render();
    }
  };
  container.appendChild(grid);
}

function applyListColWidths(container) {
  for (const [key, val] of Object.entries(state.listColWidths)) {
    container.style.setProperty(`--col-${key}`, `${val}px`);
  }
}

// List-view column header: click a column to sort by it (click again to flip
// direction — see setSortBy); drag the handle on a resizable column's right
// edge to resize it. Name has no handle of its own — it's the flexible
// remainder (minmax(_, 1fr) in styles.css), so it just gives/takes space as
// its neighbors are resized, the same way Explorer's list view behaves.
function renderListHeader() {
  const cols = [
    { key: "name", label: "Name" },
    { key: "dir", label: "Folder", resize: "dir" },
    { key: "tag", label: "Tags", resize: "tags" },
    { key: "size", label: "Size", resize: "size" },
    { key: "date", label: "Date", resize: "date" },
  ];
  const header = el(`
    <div class="bm-list-header">
      <div class="bm-list-header-spacer"></div>
      ${cols
        .map(
          (c) => `
        <button class="bm-list-header-sort ${state.sortBy === c.key ? "active" : ""}" data-sort="${c.key}">
          <span>${c.label}</span>
          ${state.sortBy === c.key ? (state.sortDir === "desc" ? ICONS.sortDesc : ICONS.sortAsc) : ""}
          ${c.resize ? `<span class="bm-col-resize" data-col="${c.resize}" title="Drag to resize"></span>` : ""}
        </button>`
        )
        .join("")}
      <div class="bm-list-header-spacer"></div>
    </div>
  `);
  header.querySelectorAll("[data-sort]").forEach((btn) => {
    btn.addEventListener("click", () => {
      setSortBy(btn.dataset.sort);
      render();
    });
  });
  header.querySelectorAll(".bm-col-resize").forEach((handle) => {
    // Both events matter: mousedown starts the drag itself; click (fired on
    // mouseup, after the drag) must not also reach the parent button's sort
    // click handler — without this every resize would also flip the sort.
    handle.addEventListener("click", (e) => e.stopPropagation());
    handle.addEventListener("mousedown", (e) => {
      e.stopPropagation();
      e.preventDefault();
      startColumnResize(e, handle.dataset.col);
    });
  });
  return header;
}

// Live-resizes one column by writing straight to the --col-<key> custom
// property on #grid-wrap (see applyListColWidths) on every mousemove — no
// render() during the drag, so it stays smooth regardless of file count.
// Clamped so the row can never overflow #grid-wrap: Name (the flexible
// column) is guaranteed at least NAME_MIN, and the dragged column can't grow
// past whatever room that leaves once the other resizable columns' current
// widths are accounted for.
function startColumnResize(e, col) {
  const gridWrap = document.getElementById("grid-wrap");
  if (!gridWrap) return;
  const MIN = 50;
  const NAME_MIN = 80;
  const GRID_WRAP_PADDING = 64; // var(--space-6) on each side, per .bm-grid-wrap in styles.css
  const startX = e.clientX;
  const startWidth = state.listColWidths[col];
  const otherColsTotal = Object.entries(state.listColWidths)
    .filter(([k]) => k !== col)
    .reduce((sum, [, w]) => sum + w, 0);
  const available = gridWrap.clientWidth - GRID_WRAP_PADDING - 28 /* thumb */ - 24 /* open */ - NAME_MIN;
  const maxWidth = Math.max(MIN, available - otherColsTotal);

  let liveWidth = startWidth;
  beginPointerDrag((ev) => {
    liveWidth = clamp(MIN, maxWidth, startWidth + (ev.clientX - startX));
    gridWrap.style.setProperty(`--col-${col}`, `${liveWidth}px`);
  });
  // Runs after beginPointerDrag's own mouseup teardown (added first, so it
  // fires first) — by then liveWidth already holds the drag's final value.
  const commit = () => {
    state.listColWidths[col] = liveWidth;
    saveListColWidths(state.listColWidths);
    document.removeEventListener("mouseup", commit);
  };
  document.addEventListener("mouseup", commit);
}

// Thumbnail-view card: big preview plate, name/meta/dir/tags stacked below.
function buildGridCard(f, isSelected) {
  return el(`
    <div class="bm-card ${isSelected ? "selected" : ""}" data-path="${f.path.replace(/"/g, "&quot;")}">
      <div class="bm-card-thumb">
        <div class="bm-card-kind">${extLabel(f.ext)}</div>
        ${f.ext === ".pdf" ? ICONS.filetext : `<img src="${f.url}" />`}
        <button class="bm-card-open" data-open title="Open file">${ICONS.open}</button>
      </div>
      <div class="bm-card-body">
        <div class="bm-card-name">${f.name}</div>
        <div class="bm-card-meta">${formatSize(f.size)} · ${formatDate(f.mtime)}</div>
        ${f.dir ? `<div class="bm-card-dir" title="${f.dir.replace(/"/g, "&quot;")}">${ICONS.folder} ${f.dir}</div>` : ""}
        ${
          f.tags.length > 0
            ? `<div class="bm-card-tags">
                ${f.tags
                  .slice(0, 3)
                  .map((t) => `<span class="bm-tag"${tagStyleAttr(t)}>${t}</span>`)
                  .join("")}
                ${f.tags.length > 3 ? `<span class="bm-tag-more">+${f.tags.length - 3}</span>` : ""}
              </div>`
            : ""
        }
      </div>
    </div>
  `);
}

// List-view row: one file per line — small thumb, name, folder, tags and
// size/date as aligned columns, for scanning many files at once. Still a
// `.bm-card` (same class moveGridRow/scrollCardIntoView query for keyboard
// nav) so selection and arrow-key navigation need no view-mode branching —
// each row is its own visual row already, which is exactly what a list is.
function buildListRow(f, isSelected) {
  return el(`
    <div class="bm-card bm-list-row ${isSelected ? "selected" : ""}" data-path="${f.path.replace(/"/g, "&quot;")}">
      <div class="bm-list-thumb">${f.ext === ".pdf" ? ICONS.filetext : `<img src="${f.url}" />`}</div>
      <div class="bm-list-name" title="${f.name.replace(/"/g, "&quot;")}">${f.name}</div>
      <div class="bm-list-dir" title="${(f.dir || "").replace(/"/g, "&quot;")}">${f.dir ? `${ICONS.folder} ${f.dir}` : ""}</div>
      <div class="bm-list-tags">
        ${f.tags
          .slice(0, 2)
          .map((t) => `<span class="bm-tag"${tagStyleAttr(t)}>${t}</span>`)
          .join("")}
        ${f.tags.length > 2 ? `<span class="bm-tag-more">+${f.tags.length - 2}</span>` : ""}
      </div>
      <div class="bm-list-size">${formatSize(f.size)}</div>
      <div class="bm-list-date">${formatDate(f.mtime)}</div>
      <button class="bm-list-open" data-open title="Open file">${ICONS.open}</button>
    </div>
  `);
}

// Shared selection/open wiring for both a grid card and a list row.
function wireFileItem(card, f, filtered) {
  // File-explorer-style click selection: a plain click selects just this
  // file; Ctrl/Cmd-click toggles it into/out of the selection without
  // touching the rest; Shift-click selects the contiguous range between the
  // last plain/ctrl-clicked file (the anchor) and this one, in the grid's
  // current sort order.
  card.addEventListener("click", (e) => {
    if (e.shiftKey && state.selectAnchor) {
      const anchorIdx = filtered.findIndex((x) => x.path === state.selectAnchor);
      const clickIdx = filtered.findIndex((x) => x.path === f.path);
      if (anchorIdx === -1 || clickIdx === -1) {
        state.selected = new Set([f.path]);
        state.selectAnchor = f.path;
      } else {
        const [from, to] = anchorIdx < clickIdx ? [anchorIdx, clickIdx] : [clickIdx, anchorIdx];
        state.selected = new Set(filtered.slice(from, to + 1).map((x) => x.path));
      }
    } else if (e.ctrlKey || e.metaKey) {
      if (state.selected.has(f.path)) state.selected.delete(f.path);
      else state.selected.add(f.path);
      state.selectAnchor = f.path;
    } else {
      state.selected = new Set([f.path]);
      state.selectAnchor = f.path;
    }
    // Whatever the click did to the selection, the clicked card becomes the
    // keyboard nav cursor so a following arrow key continues from here.
    state.navCursor = f.path;
    render();
  });
  card.addEventListener("dblclick", () => openFile(f.path));
  card.querySelector("[data-open]").addEventListener("click", (e) => {
    e.stopPropagation();
    openFile(f.path);
  });
}

// The preview pane is now a permanent fixture of the layout (see render()),
// showing one of three things depending on the current selection: nothing
// selected, exactly one file (the original single-file editor), or many files
// (mini thumbnails + batch-aware move/tag/autorename/comment controls).
// Plain-language readout of whatever's currently narrowing getFiltered() —
// same underlying pieces as the toolbar's own "active filters" chips (see
// renderMain), just joined into one line for review mode's heading instead of
// individual removable pills, since review mode itself has no toolbar to
// clear them from (Exit review first, then clear a filter, if that's needed).
function reviewFilterSummary() {
  const parts = [];
  if (state.activeFolder) parts.push(state.activeFolder);
  if (state.looseOnly) parts.push("Loose files");
  if (state.untaggedOnly) parts.push("No tags");
  parts.push(...[...state.activeTags]);
  if (state.search) parts.push(`"${state.search}"`);
  return parts.length > 0 ? parts.join(" + ") : "All files";
}

// Review mode's big viewer — replaces the rail + file grid (see render()).
// Shows exactly the file at state.reviewCursor, full-size, with Previous/
// Next/Rotate/Exit controls; the right-hand pane alongside it is still the
// normal renderPreview()/renderPreviewSingle() output (with its own plate
// hidden — see renderPreviewSingle's `hidePlate`).
function renderReviewMain() {
  const filtered = getFiltered();
  const idx = filtered.findIndex((f) => f.path === state.reviewCursor);
  const file = filtered[idx];
  if (!file) {
    // Shouldn't happen — maybeAdvanceReview already exits review mode the
    // moment nothing matches — but fall back to something sane rather than
    // reference a file that isn't there.
    return el(`<main class="bm-review-main"></main>`);
  }
  const main = el(`
    <main class="bm-review-main">
      <div class="bm-review-topbar">
        <div class="bm-review-scope">Currently reviewing: ${escapeHtml(reviewFilterSummary())}</div>
        <div class="bm-review-controls-row">
          <button class="bm-btn bm-btn-ghost bm-btn-sm" id="review-exit-btn" title="Exit review mode (Esc)">${ICONS.x} Exit review</button>
          <div class="bm-review-counter">${idx + 1} of ${filtered.length}</div>
          <div class="bm-review-nav">
            <button class="bm-btn bm-btn-secondary bm-btn-sm" id="review-rotate-btn" title="Rotate view 90° — doesn't touch the file itself">${ICONS.rotate} Rotate view</button>
            <button class="bm-btn bm-btn-secondary bm-btn-sm" id="review-prev-btn" title="Previous file (←/↑)" ${idx === 0 ? "disabled" : ""}>${ICONS.chevronLeft} Previous</button>
            <button class="bm-btn bm-btn-secondary bm-btn-sm" id="review-next-btn" title="Next file (→/↓)" ${idx === filtered.length - 1 ? "disabled" : ""}>Next ${ICONS.chevronRight}</button>
          </div>
        </div>
      </div>
      <div class="bm-review-plate" id="review-plate" title="Double-click to open in default app">
        <div class="bm-rotate-frame">${renderMediaHtml(file)}</div>
      </div>
    </main>
  `);
  main.querySelector("#review-exit-btn").addEventListener("click", exitReviewMode);
  main.querySelector("#review-rotate-btn").addEventListener("click", () => rotateFile(file));
  main.querySelector("#review-prev-btn").addEventListener("click", () => reviewStep(-1));
  main.querySelector("#review-next-btn").addEventListener("click", () => reviewStep(1));
  const plate = main.querySelector("#review-plate");
  plate.addEventListener("dblclick", () => openFile(file.path));
  mountRotatedPlate(plate, file.rotation);
  return main;
}

function renderPreview() {
  const files = getSelectedFiles();
  if (files.length === 0) return renderPreviewEmpty();
  // In review mode state.selected is always pinned to exactly the file under
  // review (see setReviewCursorState), so this is always the single-file
  // branch — renderPreviewSingle just leaves its own plate out, since review
  // mode's big viewer (renderReviewMain) shows that file instead.
  if (files.length === 1) return renderPreviewSingle(files[0], { reviewMode: state.reviewMode });
  return renderPreviewMulti(files);
}

// Nothing-selected state. With no folder open there's nothing to report on,
// so it stays the plain centered message; with a folder open it becomes a
// small dashboard instead — a highlighted reminder of what to do, general
// stats about the whole open folder (not just the current search/filter),
// and a feed of recent actions built straight off the undo stack (see
// pushUndo) — every mutating action already funnels through there with a
// human-readable label, which is exactly what a recent-activity list needs.
function renderPreviewEmpty() {
  if (!state.folder) {
    return el(`
      <aside class="bm-preview bm-preview-empty">
        <div class="bm-preview-empty-inner">
          <div class="bm-preview-empty-icon">${ICONS.emptyFolder}</div>
          <div class="bm-preview-empty-title">Nothing selected</div>
          <div class="bm-preview-empty-hint">Choose a folder to get started.</div>
        </div>
      </aside>
    `);
  }

  // Scoped to state.activeFolder — the folder currently selected in the
  // rail's Folders list, or every file/folder in the catalog when it's null
  // ("All files"). Recursive, same as getFiltered's own folder match, so a
  // parent folder's stats include its subfolders' files too. Deliberately
  // NOT further narrowed by search/tag filters (unlike getFiltered) — those
  // are transient view filters, not something "This folder" should describe.
  const inScope = (dir) => !state.activeFolder || dir === state.activeFolder || dir.startsWith(state.activeFolder + "/");
  const filesInFolder = state.files.filter((f) => inScope(f.dir));
  const foldersInFolder = state.activeFolder
    ? state.allFolders.filter((f) => f.startsWith(state.activeFolder + "/"))
    : state.allFolders;
  const totalSize = filesInFolder.reduce((sum, f) => sum + f.size, 0);
  const taggedCount = filesInFolder.filter((f) => f.tags.length > 0).length;
  const untaggedCount = filesInFolder.filter((f) => f.tags.length === 0).length;
  // Direct children of the selected folder only — not sorted into any of its
  // subfolders. The complement to filesInFolder above, which is recursive.
  const looseCount = filesInFolder.filter((f) => f.dir === (state.activeFolder || "")).length;
  const recent = [...undoStack].reverse().slice(0, 8);

  const panel = el(`
    <aside class="bm-preview bm-preview-empty">
      <div class="bm-preview-empty-highlight">
        <div class="bm-preview-empty-title">Nothing selected</div>
        <div class="bm-preview-empty-hint">Click a file to preview it. Ctrl-click or Shift-click to select more than one.</div>
      </div>
      <div class="bm-preview-scroll">
        <div>
          <div class="bm-section-label">This folder</div>
          <div class="bm-stat-list">
            <div class="bm-stat-row"><span>Files</span><span class="bm-stat-value">${filesInFolder.length}</span></div>
            <div class="bm-stat-row"><span>Loose files</span><span class="bm-stat-value">${looseCount}</span></div>
            <div class="bm-stat-row"><span>Folders</span><span class="bm-stat-value">${foldersInFolder.length}</span></div>
            <div class="bm-stat-row"><span>Total size</span><span class="bm-stat-value">${formatSize(totalSize)}</span></div>
            <div class="bm-stat-row"><span>Tagged</span><span class="bm-stat-value">${taggedCount}</span></div>
            <div class="bm-stat-row"><span>Untagged</span><span class="bm-stat-value">${untaggedCount}</span></div>
          </div>
        </div>
        <div>
          <div class="bm-section-label">Recent</div>
          ${
            recent.length === 0
              ? `<span class="bm-tag-hint">No recent activity</span>`
              : `<div class="bm-recent-list">
                  ${recent
                    .map(
                      (a) => `
                    <div class="bm-recent-item">
                      <div class="bm-recent-item-text">
                        <div class="bm-recent-label">${a.label}</div>
                        <div class="bm-recent-time">${formatRelativeTime(a.time)}</div>
                      </div>
                      <button class="bm-recent-undo-btn" data-undo-id="${a.id}" title="Undo: ${a.label}">${ICONS.undo}</button>
                    </div>`
                    )
                    .join("")}
                </div>`
          }
        </div>
      </div>
    </aside>
  `);
  panel.querySelectorAll(".bm-recent-undo-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      undoActionById(Number(btn.dataset.undoId));
    });
  });
  return panel;
}

// The Location field (move-destination select + Autorename button) is shared
// between the single- and multi-file preview, since both are driven by the
// same moveSelected()/autorenameSelected() functions — only the label and the
// select's currently-highlighted option differ.
function renderLocationField(file) {
  if (state.allFolders.length === 0) return "";
  return `
    <div>
      <div class="bm-field">
        <label class="bm-field-label" for="move-select">${file ? "Location" : "Move selection to"}</label>
        <div class="bm-field-row">
          <select class="bm-select" id="move-select" title="Move the selected file(s) to a different subfolder">
            ${file ? "" : `<option value="__placeholder__" selected disabled>Choose a folder…</option>`}
            <option value="" ${file && file.dir === "" ? "selected" : ""}>Root folder</option>
            ${state.allFolders
              .map(
                (f) =>
                  `<option value="${f.replace(/"/g, "&quot;")}" ${file && file.dir === f ? "selected" : ""}>${f}</option>`
              )
              .join("")}
          </select>
          <button class="bm-btn bm-btn-secondary bm-btn-sm" id="autorename-btn" title="Rename to the current date and time, to clear a name collision at the destination">${ICONS.pencil} Autorename</button>
          <button class="bm-btn bm-btn-secondary bm-btn-sm" id="autosave-btn" title="Save a renamed copy to your autosave folder, leaving this file untouched (set the folder the first time, or in Options)">${ICONS.download} Autosave</button>
        </div>
      </div>
    </div>`;
}

function wireLocationField(panel) {
  const moveSelect = panel.querySelector("#move-select");
  if (moveSelect) {
    moveSelect.addEventListener("change", (e) => {
      if (e.target.value === "__placeholder__") return;
      moveSelected(e.target.value);
    });
  }
  const autorenameBtn = panel.querySelector("#autorename-btn");
  if (autorenameBtn) autorenameBtn.addEventListener("click", autorenameSelected);
  const autosaveBtn = panel.querySelector("#autosave-btn");
  if (autosaveBtn) autosaveBtn.addEventListener("click", autosaveSelected);
}

// Builds the actual <embed>/<img> for a file — shared by the single-file
// preview plate and review mode's big viewer (renderReviewMain), both of
// which wrap this in a .bm-rotate-frame (see mountRotatedPlate) so the
// rotate button's fix applies identically wherever the file shows up.
function renderMediaHtml(file) {
  return file.ext === ".pdf"
    // Chromium's built-in PDF viewer (what <embed type="application/pdf">
    // renders) honors these as URL fragment params: toolbar=0/navpanes=0
    // drop its own download/print/menu bar, and view=Fit zooms the page to
    // fit entirely within the plate instead of showing it at "actual size"
    // with scrollbars — the fix for a badly-formatted/oversized PDF page.
    ? `<embed src="${file.url}#toolbar=0&navpanes=0&view=Fit" type="application/pdf" />`
    : `<img src="${file.url}" alt="${file.name}" />`;
}

// Rotating a portrait scan 90°/270° swaps its effective aspect ratio, so the
// plain img/embed's own max-width/max-height:100% (sized against the plate's
// UN-rotated box) would end up either clipped by the plate's overflow:hidden
// or sitting tiny and off-center. Sizing the inner .bm-rotate-frame to the
// plate's own box swapped, *then* rotating that frame, makes the media fill
// the plate the same way it would if the file were natively that orientation.
// Re-measured via ResizeObserver (not just once) since the plate's box isn't
// known until layout, and can change under the reviewer's feet (window
// resize/maximize). Only one plate is ever on screen at a time, so a single
// tracked observer — disconnected and replaced on every mount — is enough.
let activePlateObserver = null;
function mountRotatedPlate(plateEl, rotation) {
  if (activePlateObserver) {
    activePlateObserver.disconnect();
    activePlateObserver = null;
  }
  const frame = plateEl.querySelector(".bm-rotate-frame");
  if (!frame) return;
  const swapped = rotation === 90 || rotation === 270;
  frame.style.transform = rotation ? `rotate(${rotation}deg)` : "";
  const sync = () => {
    const w = plateEl.clientWidth;
    const h = plateEl.clientHeight;
    frame.style.width = `${swapped ? h : w}px`;
    frame.style.height = `${swapped ? w : h}px`;
  };
  sync();
  activePlateObserver = new ResizeObserver(sync);
  activePlateObserver.observe(plateEl);
}

function saveRotation(folder, relPath, degrees) {
  const promise = window.api.setRotation(folder, relPath, degrees);
  pendingMetaWrites.add(promise); // same in-flight tracking as saveFileMeta, so a refresh can't race ahead of this write
  const forget = () => pendingMetaWrites.delete(promise);
  promise.then(forget, forget);
  return promise;
}

// Rotates `file` a further 90° clockwise for viewing within BillManager —
// see the ROTATIONS_FILE comment in main.js for why this is a display-only
// fix. Not pushed onto the undo stack like every other edit here: a wrong
// turn costs nothing more than three more clicks to undo, so a dedicated
// undo entry (and "Recent" activity clutter) isn't worth it for something
// this cheap to reverse.
async function rotateFile(file) {
  file.rotation = (file.rotation + 90) % 360;
  render();
  try {
    await saveRotation(state.folder, file.path, file.rotation);
  } catch {
    // Cosmetic-only — worst case it just doesn't survive the next refresh.
  }
}

function renderPreviewSingle(file, opts = {}) {
  // Review mode's big viewer (renderReviewMain) shows this file's plate
  // instead — showing it twice at once would be redundant screen space.
  const hidePlate = !!opts.reviewMode;
  const panel = el(`
    <aside class="bm-preview">
      <div class="bm-preview-header">
        <div class="bm-preview-header-top">
          <div class="bm-preview-name">${file.name}</div>
          <button class="bm-btn bm-btn-secondary bm-btn-sm" id="open-file-btn" title="Open in default app">${ICONS.open} Open</button>
        </div>
        <div class="bm-preview-meta">
          ${extLabel(file.ext)} · ${formatSize(file.size)} · ${formatDate(file.mtime)}${file.dir ? ` · ${file.dir}` : ""}
        </div>
        <div class="bm-preview-delete-row">
          <button class="bm-btn bm-btn-secondary bm-btn-maroon bm-btn-sm" id="delete-btn">${ICONS.trash} Delete file</button>
        </div>
      </div>
      ${
        hidePlate
          ? ""
          : `<div class="bm-preview-plate" id="preview-frame-wrap" title="Double-click to open in default app">
        <div class="bm-rotate-frame">${renderMediaHtml(file)}</div>
      </div>`
      }
      <div class="bm-preview-scroll">
        ${renderLocationField(file)}
        <div>
          <div class="bm-section-label">Tags</div>
          <div class="bm-tag-editor" id="tag-editor">
            ${
              file.tags.length === 0
                ? `<span class="bm-tag-hint">No tags yet</span>`
                : file.tags
                    .map(
                      (t) => `<span class="bm-tag" data-tag="${t}"${tagStyleAttr(t)}>${t}<button class="bm-tag-remove" data-remove-tag="${t}">${ICONS.x}</button></span>`
                    )
                    .join("")
            }
          </div>
          <div class="bm-tag-add-row">
            ${(() => {
              const available = state.predefinedTags.filter((t) => !file.tags.includes(t.name));
              if (state.predefinedTags.length === 0) {
                return `<span class="bm-tag-hint">No predefined tags yet — <button class="bm-inline-link" id="open-tag-manager-hint">add some</button>.</span>`;
              }
              return `
                <select class="bm-select" id="tag-select" ${available.length === 0 ? "disabled" : ""}>
                  <option value="">${available.length === 0 ? "All tags applied" : "Add a tag…"}</option>
                  ${available
                    .map(
                      (t) =>
                        `<option value="${t.name.replace(/"/g, "&quot;")}">${t.name}${t.shortcut ? ` (${t.shortcut})` : ""}</option>`
                    )
                    .join("")}
                </select>`;
            })()}
          </div>
        </div>
        <div>
          <div class="bm-section-label">Comments</div>
          <div class="bm-comments-list" id="comments-list">
            ${
              file.comments.length === 0
                ? `<span class="bm-tag-hint">No comments yet</span>`
                : file.comments
                    .map(
                      (c, i) => `
                <div class="bm-comment-row" data-idx="${i}">
                  <textarea class="bm-comment-area" data-idx="${i}" placeholder="Write a comment…">
${escapeHtml(c)}</textarea>
                  <button class="bm-comment-remove" data-idx="${i}" title="Delete comment">${ICONS.x}</button>
                </div>`
                    )
                    .join("")
            }
          </div>
          <button class="bm-btn bm-btn-ghost bm-btn-sm" id="add-comment-btn">${ICONS.plus} Add comment</button>
        </div>
      </div>
    </aside>
  `);

  panel.querySelector("#open-file-btn").addEventListener("click", () => openFile(file.path));
  const plate = panel.querySelector("#preview-frame-wrap");
  if (plate) {
    plate.addEventListener("dblclick", () => openFile(file.path));
    mountRotatedPlate(plate, file.rotation);
  }
  wireLocationField(panel);
  const tagSelect = panel.querySelector("#tag-select");
  if (tagSelect) {
    tagSelect.addEventListener("change", (e) => {
      if (e.target.value) addTag(e.target.value);
    });
  }
  const openHint = panel.querySelector("#open-tag-manager-hint");
  if (openHint) openHint.addEventListener("click", openTagManager);
  panel.querySelectorAll("[data-remove-tag]").forEach((btn) => {
    btn.addEventListener("click", () => removeTag(btn.dataset.removeTag));
  });
  panel.querySelectorAll(".bm-comment-area").forEach((area) => {
    area.addEventListener("focus", (e) => {
      const idx = Number(e.target.dataset.idx);
      const f = getSelectedFiles()[0];
      if (f) commentEditSnapshot[idx] = { path: f.path, comments: [...f.comments] };
    });
    area.addEventListener("input", (e) => updateComment(Number(e.target.dataset.idx), e.target.value));
    area.addEventListener("blur", (e) => {
      const idx = Number(e.target.dataset.idx);
      const before = commentEditSnapshot[idx];
      delete commentEditSnapshot[idx];
      const f = getSelectedFiles()[0];
      if (!before || !f || f.path !== before.path) return;
      if (JSON.stringify(before.comments) === JSON.stringify(f.comments)) return; // nothing changed since focus
      const path = before.path;
      const prevComments = before.comments;
      pushUndo("Edit comment", () => saveFileMeta(state.folder, path, { comments: prevComments }));
    });
  });
  panel.querySelectorAll(".bm-comment-remove").forEach((btn) => {
    btn.addEventListener("click", () => removeComment(Number(btn.dataset.idx)));
  });
  panel.querySelector("#add-comment-btn").addEventListener("click", addComment);
  panel.querySelector("#delete-btn").addEventListener("click", deleteSelected);

  return panel;
}

function renderPreviewMulti(files) {
  const totalSize = files.reduce((sum, f) => sum + f.size, 0);
  const sharedTags = files[0].tags.filter((t) => files.every((f) => f.tags.includes(t)));

  const panel = el(`
    <aside class="bm-preview">
      <div class="bm-preview-header">
        <div class="bm-preview-header-top">
          <div class="bm-preview-name">${files.length} files selected</div>
        </div>
        <div class="bm-preview-meta">${formatSize(totalSize)} total</div>
        <div class="bm-preview-delete-row">
          <button class="bm-btn bm-btn-secondary bm-btn-maroon bm-btn-sm" id="delete-btn">${ICONS.trash} Delete ${files.length} files</button>
        </div>
      </div>
      <div class="bm-preview-multi-grid" id="preview-multi-grid">
        ${files
          .map(
            (f) => `
          <div class="bm-mini-card" data-path="${f.path.replace(/"/g, "&quot;")}" title="${f.name.replace(/"/g, "&quot;")}">
            <div class="bm-mini-thumb">${f.ext === ".pdf" ? ICONS.filetext : `<img src="${f.url}" alt="" />`}</div>
            <div class="bm-mini-name">${f.name}</div>
          </div>`
          )
          .join("")}
      </div>
      <div class="bm-preview-scroll">
        ${renderLocationField(null)}
        <div>
          <div class="bm-section-label">Tags shared by all ${files.length}</div>
          <div class="bm-tag-editor" id="tag-editor">
            ${
              sharedTags.length === 0
                ? `<span class="bm-tag-hint">No shared tags</span>`
                : sharedTags
                    .map(
                      (t) => `<span class="bm-tag" data-tag="${t}"${tagStyleAttr(t)}>${t}<button class="bm-tag-remove" data-remove-tag="${t}">${ICONS.x}</button></span>`
                    )
                    .join("")
            }
          </div>
          <div class="bm-tag-add-row">
            ${(() => {
              const available = state.predefinedTags.filter((t) => !sharedTags.includes(t.name));
              if (state.predefinedTags.length === 0) {
                return `<span class="bm-tag-hint">No predefined tags yet — <button class="bm-inline-link" id="open-tag-manager-hint">add some</button>.</span>`;
              }
              return `
                <select class="bm-select" id="tag-select" ${available.length === 0 ? "disabled" : ""}>
                  <option value="">${available.length === 0 ? "All tags applied" : "Add a tag to all…"}</option>
                  ${available
                    .map(
                      (t) =>
                        `<option value="${t.name.replace(/"/g, "&quot;")}">${t.name}${t.shortcut ? ` (${t.shortcut})` : ""}</option>`
                    )
                    .join("")}
                </select>`;
            })()}
          </div>
        </div>
        <div>
          <div class="bm-section-label">Comments</div>
          <div class="bm-comment-row">
            <textarea class="bm-comment-area" id="bulk-comment-area" placeholder="Write a comment to add to all ${files.length} files…"></textarea>
          </div>
          <button class="bm-btn bm-btn-ghost bm-btn-sm" id="add-comment-btn">${ICONS.plus} Add to ${files.length} files</button>
        </div>
      </div>
    </aside>
  `);

  panel.querySelector("#delete-btn").addEventListener("click", deleteSelected);
  panel.querySelectorAll(".bm-mini-card").forEach((card) => {
    card.addEventListener("click", () => {
      const p = card.dataset.path;
      state.selected = new Set([p]);
      state.selectAnchor = p;
      render();
    });
  });
  wireLocationField(panel);
  const tagSelect = panel.querySelector("#tag-select");
  if (tagSelect) {
    tagSelect.addEventListener("change", (e) => {
      if (e.target.value) addTag(e.target.value);
    });
  }
  const openHint = panel.querySelector("#open-tag-manager-hint");
  if (openHint) openHint.addEventListener("click", openTagManager);
  panel.querySelectorAll("[data-remove-tag]").forEach((btn) => {
    btn.addEventListener("click", () => removeTag(btn.dataset.removeTag));
  });
  panel.querySelector("#add-comment-btn").addEventListener("click", () => {
    const area = panel.querySelector("#bulk-comment-area");
    addCommentToSelected(area.value);
  });

  return panel;
}

function renderTagManager() {
  const draft = state.tagModalDraft;
  const overlay = el(`
    <div class="bm-modal-overlay" id="tag-modal-overlay">
      <div class="bm-modal">
        <div class="bm-modal-header">
          <div class="bm-modal-title">Manage predefined tags</div>
          <div class="bm-modal-sub">Curate the tag vocabulary and assign a keyboard shortcut to toggle each tag on the selected file. Renaming or deleting a tag here updates every file that has it.</div>
        </div>
        <div class="bm-modal-body">
          ${
            draft.length === 0
              ? `<div class="bm-tag-hint" style="padding-bottom:8px;">No predefined tags yet. Add one below.</div>`
              : `<div class="bm-tagrow-list">
              ${draft
                .map((t, i) => {
                  const recording = state.recordingShortcutIdx === i;
                  return `
                <div class="bm-tagrow" data-idx="${i}">
                  <button class="bm-tagrow-swatch" data-idx="${i}" style="background:${t.color || "#006D46"}" title="Tag color"></button>
                  <input class="bm-input bm-tagrow-name" data-idx="${i}" placeholder="Tag name" value="${t.name.replace(/"/g, "&quot;")}" />
                  <button class="bm-shortcut-btn ${recording ? "recording" : ""}" data-idx="${i}">
                    ${recording ? "Press a key…" : t.shortcut || "Set shortcut"}
                  </button>
                  <button class="bm-tagrow-remove" data-idx="${i}" title="Delete tag">${ICONS.x}</button>
                  ${state.colorPicker && state.colorPicker.idx === i ? renderColorPopoverHtml() : ""}
                </div>`;
                })
                .join("")}
            </div>`
          }
          <button class="bm-add-tagrow-btn" id="add-tagrow-btn">${ICONS.plus} Add tag</button>
        </div>
        <div class="bm-modal-footer">
          <button class="bm-btn bm-btn-ghost bm-btn-sm" id="tag-modal-cancel">Cancel</button>
          <button class="bm-btn bm-btn-primary bm-btn-maroon bm-btn-sm" id="tag-modal-save">Save changes</button>
        </div>
      </div>
    </div>
  `);

  overlay.addEventListener("mousedown", (e) => {
    if (e.target === overlay) closeTagManager(false);
  });
  overlay.querySelector("#tag-modal-cancel").addEventListener("click", () => closeTagManager(false));
  overlay.querySelector("#tag-modal-save").addEventListener("click", () => closeTagManager(true));
  overlay.querySelector("#add-tagrow-btn").addEventListener("click", addDraftTagRow);
  overlay.querySelectorAll(".bm-tagrow-name").forEach((input) => {
    input.addEventListener("input", (e) => {
      draft[Number(e.target.dataset.idx)].name = e.target.value;
    });
  });
  overlay.querySelectorAll(".bm-tagrow-swatch").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      toggleColorPicker(Number(btn.dataset.idx));
    });
  });
  overlay.querySelectorAll(".bm-shortcut-btn").forEach((btn) => {
    btn.addEventListener("click", () => startRecordingShortcut(Number(btn.dataset.idx)));
  });
  overlay.querySelectorAll(".bm-tagrow-remove").forEach((btn) => {
    btn.addEventListener("click", () => removeDraftTagRow(Number(btn.dataset.idx)));
  });

  if (state.colorPicker) wireColorPopover(overlay);

  return overlay;
}

// Markup for the color picker popover — only rendered under the tag row whose
// swatch is currently toggled open (see renderTagManager).
function renderColorPopoverHtml() {
  const { h, s, v } = state.colorPicker;
  const { r, g, b, hex } = popoverRgbHex();
  const hueColor = `hsl(${h}, 100%, 50%)`;
  return `
    <div class="bm-color-popover" id="color-popover">
      <div class="bm-sv-field" id="sv-field" style="background: linear-gradient(to top, #000, rgba(0,0,0,0)), linear-gradient(to right, #fff, ${hueColor});">
        <div class="bm-sv-handle" id="sv-handle" style="left:${s * 100}%; top:${(1 - v) * 100}%; background:${hex};"></div>
      </div>
      <div class="bm-hue-row">
        <div class="bm-hue-chip" style="background:${hex};"></div>
        <div class="bm-hue-slider" id="hue-slider">
          <div class="bm-hue-handle" id="hue-handle" style="left:${(h / 360) * 100}%;"></div>
        </div>
      </div>
      <div class="bm-rgb-grid">
        <div class="bm-field">
          <label class="bm-field-label">R</label>
          <input class="bm-input" id="rgb-r" type="number" min="0" max="255" value="${r}" />
        </div>
        <div class="bm-field">
          <label class="bm-field-label">G</label>
          <input class="bm-input" id="rgb-g" type="number" min="0" max="255" value="${g}" />
        </div>
        <div class="bm-field">
          <label class="bm-field-label">B</label>
          <input class="bm-input" id="rgb-b" type="number" min="0" max="255" value="${b}" />
        </div>
      </div>
      <div class="bm-picker-footer">
        <span class="bm-hex-readout">${hex}</span>
        <button class="bm-btn bm-btn-ghost bm-btn-sm" id="color-picker-done">Done</button>
      </div>
    </div>
  `;
}

// Derives {r,g,b,hex} from the current state.colorPicker h/s/v.
function popoverRgbHex() {
  const { h, s, v } = state.colorPicker;
  const { r, g, b } = hsvToRgb(h, s, v);
  return { r: Math.round(r), g: Math.round(g), b: Math.round(b), hex: rgbToHex(r, g, b) };
}

// Patches the popover's own DOM (handle positions, hue-dependent gradient, hex
// readout, RGB inputs) and the swatch button back on the tag row — without a
// full render(). A drag can fire many mousemove events per second; re-running
// render() (which rebuilds the whole app, file grid included) on each one would
// be visibly janky, and re-rendering the RGB inputs on every keystroke would
// wipe focus/cursor mid-type. Skips writing into whichever RGB input currently
// has focus so typing in it isn't clobbered by its own change.
function patchColorPopover(overlay, idx) {
  const popover = overlay.querySelector("#color-popover");
  if (!popover) return;
  const { h, s, v } = state.colorPicker;
  const { r, g, b, hex } = popoverRgbHex();

  const svHandle = popover.querySelector("#sv-handle");
  svHandle.style.left = `${s * 100}%`;
  svHandle.style.top = `${(1 - v) * 100}%`;
  svHandle.style.background = hex;
  popover.querySelector("#sv-field").style.background =
    `linear-gradient(to top, #000, rgba(0,0,0,0)), linear-gradient(to right, #fff, hsl(${h}, 100%, 50%))`;
  popover.querySelector("#hue-handle").style.left = `${(h / 360) * 100}%`;
  popover.querySelector(".bm-hue-chip").style.background = hex;
  popover.querySelector(".bm-hex-readout").textContent = hex;

  [
    ["#rgb-r", r],
    ["#rgb-g", g],
    ["#rgb-b", b],
  ].forEach(([sel, value]) => {
    const input = popover.querySelector(sel);
    if (document.activeElement !== input) input.value = value;
  });

  const swatch = overlay.querySelector(`.bm-tagrow-swatch[data-idx="${idx}"]`);
  if (swatch) swatch.style.background = hex;
}

// Anchors the (position: fixed) popover under its tag row's swatch, using the
// swatch's real on-screen position now that the modal is attached to the DOM.
// Clamped so it can't run off the right edge on a narrower window.
function positionColorPopover(overlay) {
  const popover = overlay.querySelector("#color-popover");
  const swatch = overlay.querySelector(`.bm-tagrow-swatch[data-idx="${state.colorPicker.idx}"]`);
  if (!popover || !swatch) return;
  const rect = swatch.getBoundingClientRect();
  const left = Math.max(8, Math.min(rect.left, window.innerWidth - 300 - 8));
  popover.style.top = `${rect.bottom + 6}px`;
  popover.style.left = `${left}px`;
}

// Wires interaction for the popover markup renderColorPopoverHtml() just emitted.
// Called after renderTagManager mounts the modal, only while a picker is open.
function wireColorPopover(overlay) {
  const idx = state.colorPicker.idx;
  const popover = overlay.querySelector("#color-popover");
  if (!popover) return;

  popover.addEventListener("mousedown", (e) => e.stopPropagation());

  function applyHsvFromEvent(ev, rect, axis) {
    if (axis === "sv") {
      state.colorPicker.s = clamp(0, 1, (ev.clientX - rect.left) / rect.width);
      state.colorPicker.v = 1 - clamp(0, 1, (ev.clientY - rect.top) / rect.height);
    } else {
      state.colorPicker.h = clamp(0, 1, (ev.clientX - rect.left) / rect.width) * 360;
    }
    state.tagModalDraft[idx].color = popoverRgbHex().hex;
    patchColorPopover(overlay, idx);
  }

  const svField = popover.querySelector("#sv-field");
  svField.addEventListener("mousedown", (e) => {
    const rect = svField.getBoundingClientRect();
    applyHsvFromEvent(e, rect, "sv");
    beginPointerDrag((ev) => applyHsvFromEvent(ev, rect, "sv"));
  });

  const hueSlider = popover.querySelector("#hue-slider");
  hueSlider.addEventListener("mousedown", (e) => {
    const rect = hueSlider.getBoundingClientRect();
    applyHsvFromEvent(e, rect, "hue");
    beginPointerDrag((ev) => applyHsvFromEvent(ev, rect, "hue"));
  });

  function applyRgbFromInputs() {
    const r = clamp(0, 255, parseInt(popover.querySelector("#rgb-r").value, 10) || 0);
    const g = clamp(0, 255, parseInt(popover.querySelector("#rgb-g").value, 10) || 0);
    const b = clamp(0, 255, parseInt(popover.querySelector("#rgb-b").value, 10) || 0);
    state.tagModalDraft[idx].color = rgbToHex(r, g, b);
    state.colorPicker = { idx, ...rgbToHsv(r, g, b) };
    patchColorPopover(overlay, idx);
  }
  popover.querySelector("#rgb-r").addEventListener("input", applyRgbFromInputs);
  popover.querySelector("#rgb-g").addEventListener("input", applyRgbFromInputs);
  popover.querySelector("#rgb-b").addEventListener("input", applyRgbFromInputs);
  popover.querySelector("#color-picker-done").addEventListener("click", () => closeColorPicker());
}

// ---- About window ----
function openAbout() {
  if (state.tagModalOpen) closeTagManager(false);
  state.aboutOpen = true;
  render();
}

function closeAbout() {
  state.aboutOpen = false;
  render();
}

function renderAbout() {
  const status = updateStatusLabel();
  const rollbackBusy = rollbackInProgress();
  const rollbackCaption = rollbackStatusLabel() || "This may take a while.";
  const overlay = el(`
    <div class="bm-modal-overlay" id="about-overlay">
      <div class="bm-about-modal">
        <div class="bm-about-chrome">
          <span class="bm-about-chrome-title">About BillManager</span>
          <button class="bm-about-close" id="about-close-x">${ICONS.x}</button>
        </div>
        <div class="bm-about-band">
          ${appMark(72, true)}
          <div>
            <div class="bm-about-title">BillManager</div>
            <div class="bm-about-tagline">Anabaptist Brotherhood internal software</div>
            <div class="bm-about-version">Version ${state.appVersion}${status ? ` · ${status}` : ""}</div>
            <div class="bm-about-rollback">
              <button class="bm-about-rollback-btn" id="about-rollback-btn" ${rollbackBusy ? "disabled" : ""}>${ICONS.undo} Roll back to previous version</button>
              <span class="bm-about-rollback-status">${rollbackCaption}</span>
            </div>
          </div>
        </div>
        <div class="bm-about-body">
          <div class="bm-about-desc">BillManager keeps the Brotherhood's medical bills, receipts and member correspondence in one reviewed archive. It is used by office staff only and is not distributed to members.</div>
          <div>
            <div class="bm-about-credits-label">Credits</div>
            <div class="bm-about-credits-grid">
              <span class="bm-credit-name">Kevin Beachy</span><span class="bm-credit-role">Project lead</span>
              <span class="bm-credit-name">Ethan Zook</span><span class="bm-credit-role">Debugging</span>
              <span class="bm-credit-name">Dominic Yoder</span><span class="bm-credit-role">Debugging</span>
              <span class="bm-credit-name">Claude Code</span><span class="bm-credit-role">Development assistance</span>
              <span class="bm-credit-name">Claude Design</span><span class="bm-credit-role">UI/UX design</span>
            </div>
          </div>
          <div class="bm-about-footer">
            <a href="#" class="bm-about-repo-link" id="about-repo-link">github.com/AB-Kevin/BillManager</a>
            <button class="bm-btn bm-btn-primary bm-btn-sm" id="about-close-btn">Close</button>
          </div>
        </div>
      </div>
    </div>
  `);

  overlay.addEventListener("mousedown", (e) => {
    if (e.target === overlay) closeAbout();
  });
  overlay.querySelector("#about-close-x").addEventListener("click", closeAbout);
  overlay.querySelector("#about-close-btn").addEventListener("click", closeAbout);
  overlay.querySelector("#about-repo-link").addEventListener("click", (e) => {
    e.preventDefault();
    window.api.openRepo();
  });
  overlay.querySelector("#about-rollback-btn").addEventListener("click", rollbackToPreviousVersion);

  return overlay;
}

// ---- Options (device settings) ----
// Home for per-device settings — right now just the comment name, but a
// natural place to add more later without cluttering the rail footer with a
// growing row of links.
function openSettingsModal() {
  if (state.tagModalOpen) closeTagManager(false);
  if (state.aboutOpen) closeAbout();
  state.settingsModalOpen = true;
  render();
}

function closeSettingsModal() {
  state.settingsModalOpen = false;
  render();
}

const THEME_CHOICES = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "midnight", label: "Midnight" },
];

// Sets the <html data-theme> attribute the whole stylesheet keys off of (see
// the [data-theme="dark"]/[data-theme="midnight"] blocks at the top of
// styles.css) — "light" matches no block, which is exactly right since :root
// already *is* the light theme.
function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme || "light");
}

async function setTheme(theme) {
  if (theme === state.theme) return;
  state.theme = theme;
  applyTheme(theme);
  render();
  await window.api.setTheme(theme);
}

function renderSettingsModal() {
  const overlay = el(`
    <div class="bm-modal-overlay" id="settings-modal-overlay">
      <div class="bm-modal bm-settings-modal">
        <div class="bm-modal-header">
          <div class="bm-modal-title">Options</div>
          <div class="bm-modal-sub">Settings here are stored on this device only, separate from the catalog folder — each computer can have its own.</div>
        </div>
        <div class="bm-modal-body">
          <div class="bm-settings-row">
            <div>
              <div class="bm-settings-row-label">Appearance</div>
              <div class="bm-settings-row-value">Applies immediately on this device.</div>
            </div>
            <div class="bm-theme-toggle" role="group">
              ${THEME_CHOICES.map(
                (t) =>
                  `<button class="bm-theme-toggle-btn ${state.theme === t.value ? "active" : ""}" data-theme-choice="${t.value}">${t.label}</button>`
              ).join("")}
            </div>
          </div>
          <div class="bm-settings-row">
            <div>
              <div class="bm-settings-row-label">Comment name</div>
              <div class="bm-settings-row-value">${escapeHtml(state.commenterName || "Not set")}</div>
            </div>
            <button class="bm-btn bm-btn-secondary bm-btn-sm" id="settings-change-name-btn">Change</button>
          </div>
          <div class="bm-settings-row">
            <div>
              <div class="bm-settings-row-label">Autosave folder</div>
              <div class="bm-settings-row-value">${escapeHtml(state.autosaveFolder || "Not set")}</div>
            </div>
            <button class="bm-btn bm-btn-secondary bm-btn-sm" id="settings-change-autosave-btn">Change</button>
          </div>
        </div>
        <div class="bm-modal-footer">
          <button class="bm-btn bm-btn-primary bm-btn-maroon bm-btn-sm" id="settings-modal-close">Close</button>
        </div>
      </div>
    </div>
  `);

  overlay.addEventListener("mousedown", (e) => {
    if (e.target === overlay) closeSettingsModal();
  });
  overlay.querySelector("#settings-modal-close").addEventListener("click", closeSettingsModal);
  overlay.querySelectorAll(".bm-theme-toggle-btn").forEach((btn) => {
    btn.addEventListener("click", () => setTheme(btn.dataset.themeChoice));
  });
  overlay.querySelector("#settings-change-name-btn").addEventListener("click", () => {
    state.settingsModalOpen = false;
    openCommenterNameModal();
  });
  overlay.querySelector("#settings-change-autosave-btn").addEventListener("click", async () => {
    const chosen = await window.api.selectFolder();
    if (chosen) await setAutosaveFolder(chosen);
  });

  return overlay;
}

// ---- Commenting name ----
// Per-device name (see main.js's settings.json) that commentAttributionLine
// signs onto every new comment. Shown unskippably on first launch — there's
// no Cancel/✕/backdrop-close/Escape until a name has actually been saved —
// and reopenable any time after that from the Options dialog to change it.
function openCommenterNameModal() {
  if (state.tagModalOpen) closeTagManager(false);
  if (state.aboutOpen) closeAbout();
  if (state.settingsModalOpen) closeSettingsModal();
  state.commenterNameDraft = state.commenterName;
  state.commenterModalOpen = true;
  render();
}

function closeCommenterNameModal() {
  if (!state.commenterName) return; // first-run prompt — must save a name to leave
  state.commenterModalOpen = false;
  render();
}

async function saveCommenterName(name) {
  const trimmed = (name || "").trim();
  if (!trimmed) return;
  state.commenterName = trimmed;
  state.commenterModalOpen = false;
  render();
  await window.api.setCommenterName(trimmed);
}

function renderCommenterNameModal() {
  const isFirstRun = !state.commenterName;
  const overlay = el(`
    <div class="bm-modal-overlay" id="commenter-modal-overlay">
      <div class="bm-modal bm-commenter-modal">
        <div class="bm-modal-header">
          <div class="bm-modal-title">${isFirstRun ? "What's your name?" : "Your name for comments"}</div>
          <div class="bm-modal-sub">Comments are automatically signed with this name and the date and time, so it's stored on this device only — each computer can have its own.</div>
        </div>
        <div class="bm-modal-body">
          <input class="bm-input" id="commenter-name-input" placeholder="e.g. Kevin Beachy" value="${state.commenterNameDraft.replace(/"/g, "&quot;")}" />
        </div>
        <div class="bm-modal-footer">
          ${isFirstRun ? "" : `<button class="bm-btn bm-btn-ghost bm-btn-sm" id="commenter-modal-cancel">Cancel</button>`}
          <button class="bm-btn bm-btn-primary bm-btn-maroon bm-btn-sm" id="commenter-modal-save" disabled>Save</button>
        </div>
      </div>
    </div>
  `);

  const input = overlay.querySelector("#commenter-name-input");
  const saveBtn = overlay.querySelector("#commenter-modal-save");
  saveBtn.disabled = !input.value.trim();
  input.addEventListener("input", () => {
    saveBtn.disabled = !input.value.trim();
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !saveBtn.disabled) saveCommenterName(input.value);
  });
  overlay.addEventListener("mousedown", (e) => {
    if (e.target === overlay) closeCommenterNameModal();
  });
  const cancelBtn = overlay.querySelector("#commenter-modal-cancel");
  if (cancelBtn) cancelBtn.addEventListener("click", closeCommenterNameModal);
  saveBtn.addEventListener("click", () => saveCommenterName(input.value));
  setTimeout(() => {
    input.focus();
    input.select();
  }, 0);

  return overlay;
}

// On launch, silently try to reopen whatever folder was open last time. Falls
// back to the normal empty state if there's no remembered folder, or listing it
// fails (e.g. it was deleted or a removable drive is unplugged).
(async function init() {
  // Applied before the first render (and before any other await) so the
  // loading screen itself paints in the right theme instead of flashing
  // light-then-switching.
  state.theme = (await window.api.getTheme()) || "light";
  applyTheme(state.theme);
  render(); // paint the loading screen immediately, before any of the awaits below
  state.appVersion = await window.api.getAppVersion();
  state.commenterName = (await window.api.getCommenterName()) || "";
  state.commenterNameDraft = state.commenterName;
  if (!state.commenterName) state.commenterModalOpen = true;
  state.autosaveFolder = (await window.api.getAutosaveFolder()) || "";
  window.api.onUpdateStatus((status) => setUpdateStatus(status));
  window.api.onRollbackStatus((status) => {
    state.rollbackStatus = status;
    render();
  });
  checkForUpdates(); // not awaited — a startup check shouldn't hold up opening the last folder
  state.windowMaximized = await window.api.windowIsMaximized();
  window.api.onWindowState((s) => {
    state.windowMaximized = s.maximized;
    render();
  });

  const lastFolder = await window.api.getLastFolder();
  if (lastFolder) {
    try {
      await openFolder(lastFolder, true);
    } catch {
      state.folder = null;
    }
  }
  state.loadingInitial = false;
  render();
})();
