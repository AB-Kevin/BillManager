const ICONS = {
  upload: `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>`,
  folder: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>`,
  tag: `<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2H2v10l9.29 9.29a1 1 0 0 0 1.41 0l8.29-8.29a1 1 0 0 0 0-1.41L12 2Z"/><circle cx="7" cy="7" r="1.5" fill="currentColor" stroke="none"/></svg>`,
  x: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
  search: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#a89f8a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`,
  trash: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>`,
  plus: `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  pencil: `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/></svg>`,
  open: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`,
  filetext: `<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#9c4a3d" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="15" y2="17"/></svg>`,
  emptyFolder: `<svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#77705f" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>`,
  refresh: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12a9 9 0 0 1 15.3-6.4L21 8"/><polyline points="21 3 21 8 16 8"/><path d="M21 12a9 9 0 0 1-15.3 6.4L3 16"/><polyline points="3 21 3 16 8 16"/></svg>`,
  undo: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/></svg>`,
  download: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  check: `<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
};

const state = {
  folder: null,
  files: [],
  selectedPath: null, // relative path (with "/" separators) of the selected file — unique across subfolders
  checked: new Set(), // relative paths checkbox-selected for a bulk action (independent of selectedPath)
  search: "",
  activeTags: new Set(), // tag names currently filtering the grid (AND — a file matches only if it has all of them)
  activeFolder: null, // relative path of the subfolder filter, or null for "All files" (recursive)
  untaggedOnly: false, // true to show only files with zero tags
  sortBy: "name", // "name" | "date" | "tag"
  allFolders: [], // relative paths of every subfolder in the catalog, incl. empty ones — move destinations
  predefinedTags: [], // [{ name, shortcut, color }] — curated vocabulary + keyboard shortcuts, per folder
  tagModalOpen: false,
  tagModalDraft: null, // working copy of predefinedTags while the manage-tags modal is open
  recordingShortcutIdx: null, // index into tagModalDraft currently listening for a keypress
  refreshing: false, // true while re-scanning the folder for changes made outside the app
  appVersion: "",
  updateStatus: { state: "idle" }, // idle | checking | available | available-manual (Mac) | not-available | downloading | downloaded | error
};

const TAG_COLOR_PALETTE = ["#2e6b5c", "#b9812c", "#9c4a3d", "#4a6fa5", "#7a5980", "#5c7a3d", "#a55a4a", "#3d6b7a"];

const app = document.getElementById("app");

// ---- Undo stack ----
// A plain LIFO stack of recent reversible actions, each an { label, undo } pair.
// Lives outside `state` (and outside render()'s reach otherwise) since it isn't
// itself rendered content, only something the toolbar button/Ctrl+Z reads the
// length and top label of. Cleared whenever a different folder is opened, since
// its entries close over paths in the *previous* catalog.
let undoStack = [];
const MAX_UNDO = 50; // oldest entries just age out; any trashed file they reference is purged on next launch anyway

function pushUndo(label, undo) {
  undoStack.push({ label, undo });
  if (undoStack.length > MAX_UNDO) undoStack.shift();
  render();
}

async function performUndo() {
  const action = undoStack.pop();
  if (!action) return;
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
  const promise = window.api.updateFileMeta(folder, path, patch).catch((e) => {
    // A failed write used to fail silently: the optimistic in-memory edit stuck
    // around until the next refresh quietly reverted it, with nothing to explain
    // why. Surface it instead, same as the other file operations (move/delete/
    // open) already do — most likely cause on a shared synced folder is another
    // machine (or the sync client itself) holding the file locked.
    alert(`Couldn't save changes to "${path.split("/").pop()}":\n${e.message || e}`);
    throw e;
  });
  pendingMetaWrites.add(promise);
  const forget = () => pendingMetaWrites.delete(promise);
  promise.then(forget, forget);
  return promise;
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
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function formatDate(ms) {
  return new Date(ms).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}

function escapeHtml(str) {
  return String(str).replace(/[&<>]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" }[c]));
}

function extLabel(ext) {
  if (ext === ".pdf") return "PDF";
  if (ext === ".png") return "PNG";
  return "JPG";
}

function getSelected() {
  return state.files.find((f) => f.path === state.selectedPath) || null;
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
      <div class="fm-folder-nav ${state.activeFolder === child.path ? "active" : ""}" data-folder="${child.path.replace(/"/g, "&quot;")}" style="padding-left:${10 + depth * 14}px">
        ${ICONS.folder}<span class="fm-folder-nav-name">${child.name}</span><span class="fm-nav-count">${child.total}</span>
      </div>
      ${renderFolderTree(child, depth + 1)}`
    )
    .join("");
}

function getTagColor(name) {
  const t = state.predefinedTags.find((p) => p.name === name);
  return (t && t.color) || null;
}

// Colored chips fall back to the default teal styling (see --chip-color/--chip-bg in CSS)
// when a tag has no predefined color, e.g. legacy tags applied before this feature existed.
function chipStyleAttr(tagName) {
  const c = getTagColor(tagName);
  return c ? ` style="--chip-color:${c}; --chip-bg: color-mix(in srgb, ${c} 16%, white);"` : "";
}

function sortFiles(files) {
  const arr = [...files];
  if (state.sortBy === "name") {
    arr.sort((a, b) => a.name.localeCompare(b.name, undefined, { sensitivity: "base" }));
  } else if (state.sortBy === "date") {
    arr.sort((a, b) => b.created - a.created); // newest first
  } else if (state.sortBy === "tag") {
    arr.sort((a, b) => {
      const at = [...a.tags].sort()[0] || "";
      const bt = [...b.tags].sort()[0] || "";
      if (!at && bt) return 1; // untagged files sink to the bottom
      if (at && !bt) return -1;
      const cmp = at.localeCompare(bt, undefined, { sensitivity: "base" });
      return cmp !== 0 ? cmp : a.name.localeCompare(b.name, undefined, { sensitivity: "base" });
    });
  }
  return arr;
}

function getFiltered() {
  const filtered = state.files
    .filter((f) => f.name.toLowerCase().includes(state.search.toLowerCase()))
    .filter((f) => !state.untaggedOnly || f.tags.length === 0)
    .filter((f) => [...state.activeTags].every((t) => f.tags.includes(t)))
    .filter((f) => !state.activeFolder || f.dir === state.activeFolder || f.dir.startsWith(state.activeFolder + "/"));
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
    // Drop any checked paths that no longer exist under this name (moved elsewhere
    // by this same action, deleted, or changed outside the app) rather than leaving
    // a stale bulk-selection the user can't see.
    const validPaths = new Set(state.files.map((f) => f.path));
    state.checked.forEach((p) => {
      if (!validPaths.has(p)) state.checked.delete(p);
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
  state.selectedPath = null;
  state.checked = new Set();
  state.activeTags = new Set();
  state.activeFolder = null;
  state.untaggedOnly = false;
  state.search = "";
  undoStack = []; // entries close over paths in the previous folder — discard them
  state.predefinedTags = await window.api.getTagConfig(folder);
  window.api.setLastFolder(folder);
  await refreshFiles(isStartup);
}

async function addTag(raw) {
  const tag = (raw || "").trim();
  if (!tag) return;
  const file = getSelected();
  if (!file || file.tags.includes(tag)) return;
  const prevTags = [...file.tags];
  const path = file.path;
  const newTags = [...file.tags, tag];
  file.tags = newTags;
  render();
  await saveFileMeta(state.folder, path, { tags: newTags });
  pushUndo(`Add tag "${tag}"`, () => saveFileMeta(state.folder, path, { tags: prevTags }));
}

async function removeTag(tag) {
  const file = getSelected();
  if (!file) return;
  const prevTags = [...file.tags];
  const path = file.path;
  file.tags = file.tags.filter((t) => t !== tag);
  render();
  await saveFileMeta(state.folder, path, { tags: file.tags });
  pushUndo(`Remove tag "${tag}"`, () => saveFileMeta(state.folder, path, { tags: prevTags }));
}

const commentDebounce = {}; // per-index timer while a comment's textarea is being typed in
function updateComment(idx, value) {
  const file = getSelected();
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

function addComment() {
  const file = getSelected();
  if (!file) return;
  const prevComments = [...file.comments];
  const path = file.path;
  file.comments = [...file.comments, ""];
  render();
  const areas = document.querySelectorAll(".fm-comment-area");
  const last = areas[areas.length - 1];
  if (last) last.focus();
  pushUndo("Add comment", () => saveFileMeta(state.folder, path, { comments: prevComments }));
}

function removeComment(idx) {
  const file = getSelected();
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

async function openFile(relPath) {
  if (!state.folder) return;
  const error = await window.api.openFile(state.folder, relPath);
  if (error) alert(`Couldn't open "${relPath}":\n${error}`);
}

async function moveFile(destDir) {
  const file = getSelected();
  if (!file || destDir === file.dir) return;
  const prevDir = file.dir;
  const name = file.name;
  try {
    const result = await window.api.moveFile(state.folder, file.path, destDir);
    if (result && result.error) {
      alert(result.error);
      return;
    }
    state.selectedPath = result.path;
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
}

// Moves every checked file to `destDir` in one action — e.g. filter the grid to
// a tag, "Select all", then move the whole batch. Failures (a name collision at
// the destination) don't block the rest of the batch; they're reported together
// once the attempt finishes.
async function bulkMoveChecked(destDir) {
  const paths = [...state.checked];
  if (paths.length === 0 || !state.folder) return;
  const destLabel = destDir || "Root folder";
  if (!confirm(`Move ${paths.length} file${paths.length === 1 ? "" : "s"} to "${destLabel}"?`)) return;
  let errors = [];
  let moved = [];
  try {
    const result = await window.api.moveFiles(state.folder, paths, destDir);
    moved = (result && result.moved) || [];
    errors = (result && result.errors) || [];
  } catch (e) {
    // Shouldn't happen — moveOneFile no longer throws — but if the IPC call
    // itself fails outright, still fall through to clear the selection and
    // resync below rather than leaving the UI stuck showing stale state.
    errors = paths.map((p) => ({ path: p, error: e.message || String(e) }));
  } finally {
    state.checked = new Set();
    await refreshFiles();
  }
  if (moved.length > 0) {
    pushUndo(`Move ${moved.length} file${moved.length === 1 ? "" : "s"}`, () => undoBulkMove(moved));
  }
  if (errors.length > 0) {
    alert(
      `Moved ${paths.length - errors.length} of ${paths.length} file(s). ${errors.length} failed:\n\n` +
        errors.map((e) => `• ${e.path}: ${e.error}`).join("\n")
    );
  }
}

// Moves every file in `moved` (each an { from, to } pair from move-files-batch)
// back to the subfolder its `from` path lived in. Collisions since the original
// move (a same-named file reappearing at the old spot) are reported together
// rather than aborting the rest of the batch, mirroring bulkMoveChecked itself.
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

async function deleteFile() {
  const file = getSelected();
  if (!file) return;
  if (!confirm(`Delete "${file.name}" from disk? You can undo this with Ctrl+Z until you close the app.`)) return;
  const path = file.path;
  const name = file.name;
  const result = await window.api.deleteFile(state.folder, path);
  if (result && result.error) {
    alert(result.error);
    return;
  }
  state.selectedPath = null;
  pushUndo(`Delete "${name}"`, async () => {
    const r = await window.api.restoreFile(result.trashPath, state.folder, path);
    if (r && r.error) throw new Error(r.error);
  });
  await refreshFiles();
}

// Deletes every checked file in one action — mirrors bulkMoveChecked. Each file
// is trashed independently (same mechanism as a single delete), so Undo can
// bring the whole batch back as one step.
async function bulkDeleteChecked() {
  const paths = [...state.checked];
  if (paths.length === 0 || !state.folder) return;
  if (
    !confirm(
      `Delete ${paths.length} file${paths.length === 1 ? "" : "s"} from disk? You can undo this with Ctrl+Z until you close the app.`
    )
  )
    return;
  let deleted = [];
  let errors = [];
  try {
    const result = await window.api.deleteFiles(state.folder, paths);
    deleted = (result && result.deleted) || [];
    errors = (result && result.errors) || [];
  } catch (e) {
    errors = paths.map((p) => ({ path: p, error: e.message || String(e) }));
  } finally {
    state.checked = new Set();
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

// Global shortcut dispatch: toggles the matching predefined tag on the selected file.
document.addEventListener("keydown", (e) => {
  if (state.tagModalOpen || isEditableTarget(document.activeElement)) return;
  const file = getSelected();
  if (!file || state.predefinedTags.length === 0) return;
  const combo = comboFromEvent(e);
  if (!combo) return;
  const match = state.predefinedTags.find((t) => t.shortcut && t.shortcut === combo);
  if (!match) return;
  e.preventDefault();
  if (file.tags.includes(match.name)) removeTag(match.name);
  else addTag(match.name);
});

function el(html) {
  const t = document.createElement("template");
  t.innerHTML = html.trim();
  return t.content.firstChild;
}

function render() {
  app.innerHTML = "";
  app.appendChild(renderSidebar());
  app.appendChild(renderMain());
  const selected = getSelected();
  if (selected) app.appendChild(renderPreview(selected));
  if (state.tagModalOpen) app.appendChild(renderTagManager());
}

// ---- Updates ----
// The main process owns autoUpdater and only reports status back over
// "update-status" — nothing here talks to GitHub directly. Each handler just
// mirrors that status into state and re-renders the sidebar footer.
function setUpdateStatus(status) {
  state.updateStatus = status;
  render();
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

function renderUpdateFooter() {
  const s = state.updateStatus;
  let body;
  if (s.state === "checking") {
    body = `<span class="fm-update-text">${ICONS.refresh} Checking for updates…</span>`;
  } else if (s.state === "available") {
    body = `<button class="fm-update-action" id="update-download">${ICONS.download} Download update ${s.version}</button>`;
  } else if (s.state === "available-manual") {
    body = `<button class="fm-update-action" id="update-manual">${ICONS.download} Get update ${s.version} (opens browser)</button>`;
  } else if (s.state === "downloading") {
    body = `<span class="fm-update-text">${ICONS.download} Downloading… ${s.percent ?? 0}%</span>`;
  } else if (s.state === "downloaded") {
    body = `<button class="fm-update-action" id="update-restart">${ICONS.check} Restart to install ${s.version}</button>`;
  } else if (s.state === "not-available") {
    body = `<span class="fm-update-text">${ICONS.check} Up to date</span>`;
  } else if (s.state === "error") {
    body = `<span class="fm-update-text fm-update-error" title="${(s.message || "").replace(/"/g, "&quot;")}">Update check failed</span>`;
  } else {
    body = `<button class="fm-update-action" id="update-check">${ICONS.refresh} Check for updates</button>`;
  }

  const footer = el(`
    <div class="fm-update-footer">
      <span class="fm-update-version">v${state.appVersion}</span>
      ${body}
    </div>
  `);

  const checkBtn = footer.querySelector("#update-check");
  if (checkBtn) checkBtn.addEventListener("click", checkForUpdates);
  const downloadBtn = footer.querySelector("#update-download");
  if (downloadBtn) downloadBtn.addEventListener("click", downloadUpdate);
  const manualBtn = footer.querySelector("#update-manual");
  if (manualBtn) manualBtn.addEventListener("click", openReleasesPage);
  const restartBtn = footer.querySelector("#update-restart");
  if (restartBtn) restartBtn.addEventListener("click", restartToInstall);
  // "Up to date"/"failed" are transient — clicking them re-checks like the idle button does.
  if (s.state === "not-available" || s.state === "error") {
    footer.querySelector(".fm-update-text").addEventListener("click", checkForUpdates);
    footer.classList.add("fm-update-clickable");
  }

  return footer;
}

function renderSidebar() {
  const tags = getAllTags();
  const folderTree = state.folder ? buildFolderTree(state.files) : null;
  const untaggedCount = state.files.filter((f) => f.tags.length === 0).length;
  const sidebar = el(`
    <aside class="fm-sidebar">
      <div class="fm-brand">
        <div>
          <div class="fm-brand-title">BillManager</div>
          <div class="fm-brand-sub">File Archive</div>
        </div>
      </div>
      <button class="fm-folder-btn" id="choose-folder">${ICONS.upload} Choose folder</button>
      ${
        state.folder
          ? `<div class="fm-folder-path-row">
               <div class="fm-folder-path">${state.folder}</div>
               <button class="fm-refresh-btn ${state.refreshing ? "spinning" : ""}" id="refresh-folder-btn" title="Refresh — rescan this folder for changes" ${state.refreshing ? "disabled" : ""}>${ICONS.refresh}</button>
             </div>`
          : `<div class="fm-hint">Pick a folder to browse its PDFs, JPGs, and PNGs.</div>`
      }
      ${
        state.folder
          ? `
      <div class="fm-nav-item ${state.activeTags.size === 0 && !state.activeFolder && !state.untaggedOnly ? "active" : ""}" id="nav-all">
        <span style="display:flex;align-items:center;gap:7px">${ICONS.folder} All files</span>
        <span class="fm-nav-count">${state.files.length}</span>
      </div>
      ${
        folderTree.children.size > 0
          ? `<div class="fm-folder-nav-list" id="folder-nav-list">${renderFolderTree(folderTree, 0)}</div>`
          : ""
      }
      <div class="fm-tags-heading-row">
        <div class="fm-tags-heading">Tags</div>
        <button class="fm-manage-tags-btn" id="manage-tags-btn" title="Manage predefined tags">${ICONS.pencil} Manage</button>
      </div>
      <div class="fm-tag-nav-list" id="tag-nav-list">
        <div class="fm-tag-nav ${state.untaggedOnly ? "active" : ""}" id="nav-untagged">
          ${ICONS.tag}
          <span class="fm-tag-nav-name">No tags</span>
          <span class="fm-nav-count">${untaggedCount}</span>
        </div>
        ${
          tags.length === 0
            ? `<div style="font-size:12px;color:#6f7480;padding:4px 10px;">No tags yet</div>`
            : tags
                .map(([tag, count]) => {
                  const color = getTagColor(tag);
                  return `
              <div class="fm-tag-nav ${state.activeTags.has(tag) ? "active" : ""}" data-tag="${tag}">
                ${color ? `<span class="fm-tag-dot" style="background:${color}"></span>` : ICONS.tag}
                <span class="fm-tag-nav-name">${tag}</span>
                <span class="fm-nav-count">${count}</span>
              </div>`;
                })
                .join("")
        }
      </div>`
          : ""
      }
    </aside>
  `);

  sidebar.querySelector("#choose-folder").addEventListener("click", chooseFolder);
  const refreshBtn = sidebar.querySelector("#refresh-folder-btn");
  if (refreshBtn) refreshBtn.addEventListener("click", refreshFiles);
  const manageBtn = sidebar.querySelector("#manage-tags-btn");
  if (manageBtn) manageBtn.addEventListener("click", openTagManager);
  const navAll = sidebar.querySelector("#nav-all");
  if (navAll) navAll.addEventListener("click", () => { state.activeTags = new Set(); state.activeFolder = null; state.untaggedOnly = false; render(); });
  const navUntagged = sidebar.querySelector("#nav-untagged");
  if (navUntagged) navUntagged.addEventListener("click", () => {
    state.untaggedOnly = !state.untaggedOnly;
    if (state.untaggedOnly) state.activeTags = new Set();
    render();
  });
  sidebar.querySelectorAll(".fm-folder-nav").forEach((elm) => {
    elm.addEventListener("click", () => {
      const p = elm.dataset.folder;
      state.activeFolder = state.activeFolder === p ? null : p;
      render();
    });
  });
  sidebar.querySelectorAll(".fm-tag-nav[data-tag]").forEach((elm) => {
    elm.addEventListener("click", () => {
      const t = elm.dataset.tag;
      state.untaggedOnly = false;
      if (state.activeTags.has(t)) state.activeTags.delete(t);
      else state.activeTags.add(t);
      render();
    });
  });

  sidebar.appendChild(renderUpdateFooter());

  return sidebar;
}

function renderMain() {
  const filtered = state.folder ? getFiltered() : [];
  const main = el(`
    <main class="fm-main">
      <div class="fm-topbar">
        <div class="fm-search">
          ${ICONS.search}
          <input id="search-input" placeholder="Search files by name…" value="${state.search.replace(/"/g, "&quot;")}" ${state.folder ? "" : "disabled"} />
        </div>
        <div class="fm-sort">
          <label for="sort-select">Sort</label>
          <select id="sort-select" ${state.folder ? "" : "disabled"}>
            <option value="name" ${state.sortBy === "name" ? "selected" : ""}>Name (A–Z)</option>
            <option value="date" ${state.sortBy === "date" ? "selected" : ""}>Date created (newest)</option>
            <option value="tag" ${state.sortBy === "tag" ? "selected" : ""}>Tag (A–Z)</option>
          </select>
        </div>
        <button class="fm-undo-btn" id="undo-btn" ${undoStack.length === 0 ? "disabled" : ""}
          title="${undoStack.length > 0 ? `Undo: ${undoStack[undoStack.length - 1].label} (Ctrl+Z)` : "Nothing to undo"}">
          ${ICONS.undo} Undo
        </button>
        ${
          state.activeFolder
            ? `<div class="fm-active-filter">${ICONS.folder} ${state.activeFolder} <button id="clear-folder">${ICONS.x}</button></div>`
            : ""
        }
        ${
          state.untaggedOnly
            ? `<div class="fm-active-filter">${ICONS.tag} No tags <button id="clear-untagged">${ICONS.x}</button></div>`
            : ""
        }
        ${[...state.activeTags]
          .map(
            (t) =>
              `<div class="fm-active-filter"${chipStyleAttr(t)}>${ICONS.tag} ${t} <button class="fm-clear-tag-btn" data-tag="${t.replace(/"/g, "&quot;")}">${ICONS.x}</button></div>`
          )
          .join("")}
      </div>
      <div class="fm-bulkbar-wrap" id="bulkbar-wrap"></div>
      <div class="fm-grid-wrap" id="grid-wrap"></div>
    </main>
  `);

  const searchInput = main.querySelector("#search-input");
  searchInput.addEventListener("input", (e) => {
    state.search = e.target.value;
    const nowFiltered = getFiltered();
    renderBulkBarInto(main.querySelector("#bulkbar-wrap"), nowFiltered);
    renderGridInto(main.querySelector("#grid-wrap"), nowFiltered);
  });
  main.querySelector("#sort-select").addEventListener("change", (e) => {
    state.sortBy = e.target.value;
    const nowFiltered = getFiltered();
    renderBulkBarInto(main.querySelector("#bulkbar-wrap"), nowFiltered);
    renderGridInto(main.querySelector("#grid-wrap"), nowFiltered);
  });
  main.querySelector("#undo-btn").addEventListener("click", performUndo);
  const clearFolderBtn = main.querySelector("#clear-folder");
  if (clearFolderBtn) clearFolderBtn.addEventListener("click", () => { state.activeFolder = null; render(); });
  const clearUntaggedBtn = main.querySelector("#clear-untagged");
  if (clearUntaggedBtn) clearUntaggedBtn.addEventListener("click", () => { state.untaggedOnly = false; render(); });
  main.querySelectorAll(".fm-clear-tag-btn").forEach((btn) => {
    btn.addEventListener("click", () => { state.activeTags.delete(btn.dataset.tag); render(); });
  });

  renderBulkBarInto(main.querySelector("#bulkbar-wrap"), filtered);
  renderGridInto(main.querySelector("#grid-wrap"), filtered);
  return main;
}

// Bulk-selection bar above the grid: a "select all (currently filtered)" checkbox,
// plus — once anything is checked — a destination picker and Move/Clear actions.
// Rendered into its own container (like renderGridInto) so search/sort updates
// can refresh it without a full app re-render.
function renderBulkBarInto(container, filtered) {
  container.innerHTML = "";
  if (!state.folder || filtered.length === 0) return;

  const checkedInFiltered = filtered.filter((f) => state.checked.has(f.path)).length;
  const allFilteredChecked = checkedInFiltered === filtered.length;

  const bar = el(`
    <div class="fm-bulkbar">
      <label class="fm-bulk-selectall">
        <input type="checkbox" id="select-all-checkbox" />
        <span>${state.checked.size > 0 ? `${state.checked.size} selected` : `Select all ${filtered.length}`}</span>
      </label>
      ${
        state.checked.size > 0
          ? `<div class="fm-bulk-actions">
              ${
                state.allFolders.length > 0
                  ? `<select id="bulk-move-select" title="Move ${state.checked.size} selected file${state.checked.size === 1 ? "" : "s"} to…">
                      <option value="">Root folder</option>
                      ${state.allFolders
                        .map((f) => `<option value="${f.replace(/"/g, "&quot;")}">${f}</option>`)
                        .join("")}
                    </select>
                    <button class="fm-btn-primary" id="bulk-move-btn">${ICONS.folder} Move</button>`
                  : `<span class="fm-tag-hint">No other subfolders to move into yet.</span>`
              }
              <button class="fm-btn-danger" id="bulk-delete-btn">${ICONS.trash} Delete</button>
              <button class="fm-btn-secondary" id="bulk-clear-btn">Clear</button>
            </div>`
          : ""
      }
    </div>
  `);

  const selectAllCb = bar.querySelector("#select-all-checkbox");
  selectAllCb.checked = allFilteredChecked;
  selectAllCb.indeterminate = checkedInFiltered > 0 && !allFilteredChecked;
  selectAllCb.addEventListener("change", () => {
    if (selectAllCb.checked) filtered.forEach((f) => state.checked.add(f.path));
    else filtered.forEach((f) => state.checked.delete(f.path));
    render();
  });
  const moveBtn = bar.querySelector("#bulk-move-btn");
  if (moveBtn) {
    moveBtn.addEventListener("click", () => {
      bulkMoveChecked(bar.querySelector("#bulk-move-select").value);
    });
  }
  const deleteBtn = bar.querySelector("#bulk-delete-btn");
  if (deleteBtn) deleteBtn.addEventListener("click", bulkDeleteChecked);
  const clearBtn = bar.querySelector("#bulk-clear-btn");
  if (clearBtn) {
    clearBtn.addEventListener("click", () => {
      state.checked = new Set();
      render();
    });
  }

  container.appendChild(bar);
}

function renderGridInto(container, filtered) {
  container.innerHTML = "";
  if (!state.folder) {
    container.appendChild(
      el(`
      <div class="fm-empty">
        ${ICONS.emptyFolder}
        <div class="fm-empty-title">No folder open</div>
        <div class="fm-empty-sub">Choose a folder from the sidebar to browse and catalog its PDFs, JPGs, and PNGs.</div>
      </div>
    `)
    );
    return;
  }

  if (filtered.length === 0) {
    container.appendChild(
      el(`
      <div class="fm-empty">
        ${ICONS.emptyFolder}
        <div class="fm-empty-title">${state.files.length === 0 ? "This folder is empty" : "Nothing matches"}</div>
        <div class="fm-empty-sub">${
          state.files.length === 0
            ? "No PDFs, JPGs, or PNGs found in this folder or its subfolders."
            : "Try a different search term or clear the active tag/folder filter."
        }</div>
      </div>
    `)
    );
    return;
  }

  const grid = el(`<div class="fm-grid"></div>`);
  filtered.forEach((f) => {
    const isSelected = state.selectedPath === f.path;
    const card = el(`
      <div class="fm-card ${isSelected ? "selected" : ""}" data-path="${f.path.replace(/"/g, "&quot;")}">
        <div class="fm-card-tab ${f.ext === ".pdf" ? "pdf" : "img"}">${extLabel(f.ext)}</div>
        <input type="checkbox" class="fm-card-check" title="Select for bulk action" />
        <button class="fm-card-open" data-open title="Open file">${ICONS.open}</button>
        <div class="fm-card-thumb">${f.ext === ".pdf" ? ICONS.filetext : `<img src="${f.url}" />`}</div>
        <div class="fm-card-body">
          <div class="fm-card-name">${f.name}</div>
          <div class="fm-card-meta">${formatSize(f.size)} · ${formatDate(f.mtime)}</div>
          ${f.dir ? `<div class="fm-card-dir" title="${f.dir.replace(/"/g, "&quot;")}">${ICONS.folder} ${f.dir}</div>` : ""}
          ${
            f.tags.length > 0
              ? `<div class="fm-card-tags">
                  ${f.tags
                    .slice(0, 3)
                    .map((t) => `<span class="fm-chip"${chipStyleAttr(t)}>${t}</span>`)
                    .join("")}
                  ${f.tags.length > 3 ? `<span class="fm-chip-more">+${f.tags.length - 3}</span>` : ""}
                </div>`
              : ""
          }
        </div>
      </div>
    `);
    card.addEventListener("click", () => {
      // Clicking the already-selected file again closes the preview instead of
      // just re-selecting it, so there's a one-click way to get the wider grid back.
      state.selectedPath = state.selectedPath === f.path ? null : f.path;
      render();
    });
    card.addEventListener("dblclick", () => openFile(f.path));
    card.querySelector("[data-open]").addEventListener("click", (e) => {
      e.stopPropagation();
      openFile(f.path);
    });
    const checkbox = card.querySelector(".fm-card-check");
    checkbox.checked = state.checked.has(f.path);
    checkbox.addEventListener("click", (e) => {
      e.stopPropagation(); // don't also select this card for preview
      if (e.target.checked) state.checked.add(f.path);
      else state.checked.delete(f.path);
      render();
    });
    grid.appendChild(card);
  });
  container.appendChild(grid);
}

function renderPreview(file) {
  const panel = el(`
    <aside class="fm-preview">
      <div class="fm-preview-header">
        <div class="fm-preview-header-top">
          <div class="fm-preview-name">${file.name}</div>
          <button class="fm-open-btn" id="open-file-btn" title="Open in default app">${ICONS.open} Open</button>
        </div>
        ${file.dir ? `<div class="fm-preview-dir">${ICONS.folder} ${file.dir}</div>` : ""}
        <div class="fm-preview-meta">
          <span>${extLabel(file.ext)}</span>
          <span>${formatSize(file.size)}</span>
          <span>${formatDate(file.mtime)}</span>
        </div>
      </div>
      <div class="fm-preview-frame-wrap" id="preview-frame-wrap" title="Double-click to open in default app">
        ${
          file.ext === ".pdf"
            ? `<embed src="${file.url}" type="application/pdf" />`
            : `<img src="${file.url}" alt="${file.name}" />`
        }
      </div>
      <div class="fm-preview-scroll">
        ${
          state.allFolders.length > 0
            ? `<div class="fm-section-label">${ICONS.folder} Location</div>
        <div class="fm-move-row">
          <select id="move-select" title="Move to a different subfolder">
            <option value="" ${file.dir === "" ? "selected" : ""}>Root folder</option>
            ${state.allFolders
              .map(
                (f) =>
                  `<option value="${f.replace(/"/g, "&quot;")}" ${file.dir === f ? "selected" : ""}>${f}</option>`
              )
              .join("")}
          </select>
        </div>`
            : ""
        }
        <div class="fm-section-label">${ICONS.tag} Tags</div>
        <div class="fm-tag-editor" id="tag-editor">
          ${
            file.tags.length === 0
              ? `<span style="font-size:12px;color:#a89f8a;">No tags yet</span>`
              : file.tags
                  .map(
                    (t) => `<span class="fm-chip-editable" data-tag="${t}"${chipStyleAttr(t)}>${t}<button data-remove-tag="${t}">${ICONS.x}</button></span>`
                  )
                  .join("")
          }
        </div>
        <div class="fm-tag-add-row">
          ${(() => {
            const available = state.predefinedTags.filter((t) => !file.tags.includes(t.name));
            if (state.predefinedTags.length === 0) {
              return `<span class="fm-tag-hint">No predefined tags yet — <button class="fm-inline-link" id="open-tag-manager-hint">add some</button>.</span>`;
            }
            return `
              <select id="tag-select" ${available.length === 0 ? "disabled" : ""}>
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
        <div class="fm-section-label">Comments</div>
        <div class="fm-comments-list" id="comments-list">
          ${
            file.comments.length === 0
              ? `<span class="fm-tag-hint">No comments yet</span>`
              : file.comments
                  .map(
                    (c, i) => `
              <div class="fm-comment-row" data-idx="${i}">
                <textarea class="fm-comment-area" data-idx="${i}" placeholder="Write a comment…">${escapeHtml(c)}</textarea>
                <button class="fm-comment-remove" data-idx="${i}" title="Delete comment">${ICONS.x}</button>
              </div>`
                  )
                  .join("")
          }
        </div>
        <button class="fm-add-comment-btn" id="add-comment-btn">${ICONS.plus} Add comment</button>
        <div class="fm-delete-row">
          <button class="fm-delete-btn" id="delete-btn">${ICONS.trash} Delete file</button>
        </div>
      </div>
    </aside>
  `);

  panel.querySelector("#open-file-btn").addEventListener("click", () => openFile(file.path));
  panel.querySelector("#preview-frame-wrap").addEventListener("dblclick", () => openFile(file.path));
  const moveSelect = panel.querySelector("#move-select");
  if (moveSelect) moveSelect.addEventListener("change", (e) => moveFile(e.target.value));
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
  panel.querySelectorAll(".fm-comment-area").forEach((area) => {
    area.addEventListener("focus", (e) => {
      const idx = Number(e.target.dataset.idx);
      const f = getSelected();
      if (f) commentEditSnapshot[idx] = { path: f.path, comments: [...f.comments] };
    });
    area.addEventListener("input", (e) => updateComment(Number(e.target.dataset.idx), e.target.value));
    area.addEventListener("blur", (e) => {
      const idx = Number(e.target.dataset.idx);
      const before = commentEditSnapshot[idx];
      delete commentEditSnapshot[idx];
      const f = getSelected();
      if (!before || !f || f.path !== before.path) return;
      if (JSON.stringify(before.comments) === JSON.stringify(f.comments)) return; // nothing changed since focus
      const path = before.path;
      const prevComments = before.comments;
      pushUndo("Edit comment", () => saveFileMeta(state.folder, path, { comments: prevComments }));
    });
  });
  panel.querySelectorAll(".fm-comment-remove").forEach((btn) => {
    btn.addEventListener("click", () => removeComment(Number(btn.dataset.idx)));
  });
  panel.querySelector("#add-comment-btn").addEventListener("click", addComment);
  panel.querySelector("#delete-btn").addEventListener("click", deleteFile);

  return panel;
}

function renderTagManager() {
  const draft = state.tagModalDraft;
  const overlay = el(`
    <div class="fm-modal-overlay" id="tag-modal-overlay">
      <div class="fm-modal">
        <div class="fm-modal-header">
          <div class="fm-modal-title">Manage predefined tags</div>
          <div class="fm-modal-sub">Curate the tag vocabulary and assign a keyboard shortcut to toggle each tag on the selected file. Renaming or deleting a tag here updates every file that has it.</div>
        </div>
        <div class="fm-modal-body">
          ${
            draft.length === 0
              ? `<div class="fm-tag-hint" style="padding:6px 0 14px;">No predefined tags yet. Add one below.</div>`
              : `<div class="fm-tagrow-list">
              ${draft
                .map((t, i) => {
                  const recording = state.recordingShortcutIdx === i;
                  return `
                <div class="fm-tagrow" data-idx="${i}">
                  <input type="color" class="fm-tagrow-color" data-idx="${i}" value="${t.color || "#2e6b5c"}" title="Tag color" />
                  <input class="fm-tagrow-name" data-idx="${i}" placeholder="Tag name" value="${t.name.replace(/"/g, "&quot;")}" />
                  <button class="fm-shortcut-btn ${recording ? "recording" : ""}" data-idx="${i}">
                    ${recording ? "Press a key…" : t.shortcut || "Set shortcut"}
                  </button>
                  ${t.shortcut && !recording ? `<button class="fm-shortcut-clear" data-idx="${i}" title="Clear shortcut">${ICONS.x}</button>` : `<span class="fm-shortcut-clear-spacer"></span>`}
                  <button class="fm-tagrow-remove" data-idx="${i}" title="Delete tag">${ICONS.trash}</button>
                </div>`;
                })
                .join("")}
            </div>`
          }
          <button class="fm-add-tagrow-btn" id="add-tagrow-btn">${ICONS.plus} Add tag</button>
        </div>
        <div class="fm-modal-footer">
          <button class="fm-btn-secondary" id="tag-modal-cancel">Cancel</button>
          <button class="fm-btn-primary" id="tag-modal-save">Save</button>
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
  overlay.querySelectorAll(".fm-tagrow-name").forEach((input) => {
    input.addEventListener("input", (e) => {
      draft[Number(e.target.dataset.idx)].name = e.target.value;
    });
  });
  overlay.querySelectorAll(".fm-tagrow-color").forEach((input) => {
    input.addEventListener("input", (e) => {
      draft[Number(e.target.dataset.idx)].color = e.target.value;
    });
  });
  overlay.querySelectorAll(".fm-shortcut-btn").forEach((btn) => {
    btn.addEventListener("click", () => startRecordingShortcut(Number(btn.dataset.idx)));
  });
  overlay.querySelectorAll(".fm-shortcut-clear").forEach((btn) => {
    btn.addEventListener("click", () => clearDraftShortcut(Number(btn.dataset.idx)));
  });
  overlay.querySelectorAll(".fm-tagrow-remove").forEach((btn) => {
    btn.addEventListener("click", () => removeDraftTagRow(Number(btn.dataset.idx)));
  });

  return overlay;
}

// On launch, silently try to reopen whatever folder was open last time. Falls
// back to the normal empty state if there's no remembered folder, or listing it
// fails (e.g. it was deleted or a removable drive is unplugged).
(async function init() {
  state.appVersion = await window.api.getAppVersion();
  window.api.onUpdateStatus((status) => setUpdateStatus(status));

  const lastFolder = await window.api.getLastFolder();
  if (lastFolder) {
    try {
      await openFolder(lastFolder, true);
      return;
    } catch {
      state.folder = null;
    }
  }
  render();
})();
