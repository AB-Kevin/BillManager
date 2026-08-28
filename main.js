const { app, BrowserWindow, ipcMain, dialog, shell } = require("electron");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const { pathToFileURL } = require("url");
const { execFileSync } = require("child_process");
const { exiftool } = require("exiftool-vendored");
const { autoUpdater } = require("electron-updater");

const ACCEPTED_EXT = [".pdf", ".jpg", ".jpeg", ".png"];

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: "#FFFFFF",
    autoHideMenuBar: true,
    frame: false,
    icon: path.join(__dirname, "build", "icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "renderer", "index.html"));

  // The renderer draws its own title bar (see the design refresh) since the
  // window is frameless; mirror maximize/unmaximize back to it so the
  // restore/maximize glyph can reflect the real window state.
  mainWindow.on("maximize", () => sendWindowState());
  mainWindow.on("unmaximize", () => sendWindowState());
}

function sendWindowState() {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("window-state", { maximized: mainWindow.isMaximized() });
  }
}

ipcMain.handle("window-minimize", () => {
  mainWindow?.minimize();
});
ipcMain.handle("window-maximize-toggle", () => {
  if (!mainWindow) return;
  if (mainWindow.isMaximized()) mainWindow.unmaximize();
  else mainWindow.maximize();
});
ipcMain.handle("window-close", () => {
  mainWindow?.close();
});
ipcMain.handle("window-is-maximized", () => !!mainWindow?.isMaximized());

// Deleted files land here instead of being unlinked outright, so the renderer's
// Undo stack can restore one. The stack only lives in memory, so anything still
// sitting here is unreachable the moment the app restarts — safe to purge for
// good on every launch, before any new deletes have a chance to land in it.
const TRASH_DIR = path.join(app.getPath("userData"), "trash");

app.whenReady().then(() => {
  try {
    fs.rmSync(TRASH_DIR, { recursive: true, force: true });
  } catch {}
  fs.mkdirSync(TRASH_DIR, { recursive: true });
  createWindow();
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("will-quit", () => {
  exiftool.end();
});

// --- Auto-update -----------------------------------------------------------
// Driven entirely from the renderer's "Check for Updates" button — we never
// check or download silently in the background, so nothing happens on the
// user's bandwidth/disk without them asking for it first.
autoUpdater.autoDownload = false;
autoUpdater.autoInstallOnAppQuit = false;
// Lets "Check for Updates" actually hit GitHub when running unpacked (npm
// start), reading dev-app-update.yml instead of silently no-op'ing. Has no
// effect on a packaged build — those always use the real app-update.yml
// electron-builder generates, regardless of this flag.
autoUpdater.forceDevUpdateConfig = true;

// Mac builds are only ad-hoc signed (no paid Apple Developer ID), which is
// enough for the app to launch but not enough for Squirrel.Mac — the
// mechanism electron-updater uses under the hood on macOS — to silently
// install an update; it requires a real Developer ID signature to do that.
// So on Mac, "checking for updates" still works (it just reads the version
// info electron-builder publishes), but instead of downloading/installing
// in-app, we hand the user off to the GitHub release page to grab the new
// .dmg themselves.
const IS_MAC = process.platform === "darwin";
const REPO_URL = "https://github.com/AB-Kevin/BillManager";
const RELEASES_URL = `${REPO_URL}/releases/latest`;

function sendUpdateStatus(status) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send("update-status", status);
  }
}

autoUpdater.on("checking-for-update", () => {
  sendUpdateStatus({ state: "checking" });
});
autoUpdater.on("update-available", (info) => {
  if (IS_MAC) {
    sendUpdateStatus({ state: "available-manual", version: info.version });
  } else {
    sendUpdateStatus({ state: "available", version: info.version });
  }
});
autoUpdater.on("update-not-available", () => {
  sendUpdateStatus({ state: "not-available" });
});
autoUpdater.on("download-progress", (progress) => {
  sendUpdateStatus({ state: "downloading", percent: Math.round(progress.percent) });
});
autoUpdater.on("update-downloaded", (info) => {
  sendUpdateStatus({ state: "downloaded", version: info.version });
});
autoUpdater.on("error", (err) => {
  sendUpdateStatus({ state: "error", message: err?.message || String(err) });
});

ipcMain.handle("check-for-updates", async () => {
  try {
    await autoUpdater.checkForUpdates();
  } catch (err) {
    sendUpdateStatus({ state: "error", message: err?.message || String(err) });
  }
});

ipcMain.handle("download-update", async () => {
  try {
    await autoUpdater.downloadUpdate();
  } catch (err) {
    sendUpdateStatus({ state: "error", message: err?.message || String(err) });
  }
});

ipcMain.handle("quit-and-install", () => {
  autoUpdater.quitAndInstall();
});

ipcMain.handle("open-releases-page", () => {
  shell.openExternal(RELEASES_URL);
});

ipcMain.handle("open-repo-page", () => {
  shell.openExternal(REPO_URL);
});

ipcMain.handle("get-app-version", () => app.getVersion());

// Tags and comments are stored as native file metadata (no sidecar file):
//   - PDFs: the document's own Info dictionary (Keywords / Subject).
//   - JPG/PNG: embedded Keywords for tags, the Comment tag (JPEG COM segment /
//     PNG "Comment" text chunk) for comments.
function toStringArray(value) {
  if (value == null) return [];
  const arr = Array.isArray(value) ? value.map((v) => String(v)) : [String(value)];
  return arr.map((v) => v.trim()).filter(Boolean);
}

// None of these underlying fields natively support multiple values, so a file's
// comments are stored as a single string joined with a distinctive separator and
// split back apart on read. The separator is chosen to still read reasonably if
// the file is inspected with another metadata tool.
const COMMENT_SEP = "\n\n----------\n\n";

function serializeComments(comments) {
  return (comments || [])
    .map((c) => (c || "").trim())
    .filter(Boolean)
    .join(COMMENT_SEP);
}

function parseComments(raw) {
  if (!raw) return [];
  return String(raw)
    .split(COMMENT_SEP)
    .map((c) => c.trim())
    .filter(Boolean);
}

async function readFileMeta(full, ext) {
  try {
    if (ext === ".pdf") {
      // Some PDFs (notably ones that have been through a scan/print-to-PDF
      // driver, e.g. Foxit's PDF printer) carry an embedded XMP metadata
      // stream alongside the Info dictionary — often with an empty
      // dc:subject/dc:description left behind by that driver. exiftool's
      // default read pulls in every tag group, and when an unqualified
      // "Keywords"/"Subject" name exists in more than one group, it can
      // resolve to that other (empty) group's value instead of PDF's, even
      // though we explicitly asked for "-PDF:Keywords"/"-PDF:Subject". The
      // write always lands correctly in the Info dictionary, so this only
      // shows up on the read: the tag/comment looks like it was never saved
      // the next time the folder is refreshed, even though it's still on
      // disk. "-G" makes exiftool return fully group-qualified keys (e.g.
      // "PDF:Keywords") so the lookup below can never be shadowed by another
      // group's same-named tag.
      const tags = await exiftool.read(full, ["-G", "-PDF:Keywords", "-PDF:Subject"]);
      return { tags: toStringArray(tags["PDF:Keywords"]), comments: parseComments(tags["PDF:Subject"]) };
    }
    const tags = await exiftool.read(full);
    return { tags: toStringArray(tags.Keywords), comments: parseComments(tags.Comment) };
  } catch {
    return { tags: [], comments: [] };
  }
}

async function writeFileMeta(full, ext, tags, comments) {
  const serialized = serializeComments(comments);
  if (ext === ".pdf") {
    // PDF:Keywords/PDF:Subject are plain string fields in the Info dictionary
    // (not exiftool List-type tags), so keywords are joined into one string
    // ourselves rather than handed over as an array, same as before. The
    // important change is passing values through exiftool-vendored's
    // object-based write API instead of building raw `-Tag=value` strings into
    // writeArgs by hand: exiftool runs with `-stay_open True -@ -`, meaning
    // arguments are sent to it one per line, and a hand-built writeArgs string
    // goes in completely unescaped. COMMENT_SEP embeds literal newlines, and so
    // does any comment the user typed across multiple lines, so an argument
    // like `-PDF:Subject=first\n\nsecond` would silently split into several
    // arguments and corrupt (in practice: reject) the write. The object API
    // HTML-encodes values like these before building its own arguments, which
    // is exactly what already made this safe for the JPG/PNG branch below.
    await exiftool.write(
      full,
      { "PDF:Keywords": tags.join(", "), "PDF:Subject": serialized },
      { writeArgs: ["-overwrite_original"] }
    );
    return;
  }
  await exiftool.write(full, { Keywords: tags, Comment: serialized }, { writeArgs: ["-overwrite_original"] });
}

ipcMain.handle("select-folder", async () => {
  const result = await dialog.showOpenDialog(mainWindow, {
    properties: ["openDirectory"],
  });
  if (result.canceled || result.filePaths.length === 0) return null;
  return result.filePaths[0];
});

// Remembers the last folder opened so the app can reopen it automatically on
// next launch. Lives in the app's own userData directory, not the catalog folder.
const LAST_FOLDER_FILE = path.join(app.getPath("userData"), "last-folder.json");

ipcMain.handle("get-last-folder", async () => {
  try {
    const { folder } = JSON.parse(fs.readFileSync(LAST_FOLDER_FILE, "utf8"));
    // Confirm it's still there — a removable drive or deleted folder should fall
    // back to the normal "no folder open" state rather than error on launch.
    if (folder && fs.statSync(folder).isDirectory()) return folder;
  } catch {}
  return null;
});

ipcMain.handle("set-last-folder", async (event, folder) => {
  fs.mkdirSync(path.dirname(LAST_FOLDER_FILE), { recursive: true });
  fs.writeFileSync(LAST_FOLDER_FILE, JSON.stringify({ folder }), "utf8");
  return true;
});

// Recursively collects accepted files under `root`, descending into subfolders.
// Dotfiles/dotfolders (e.g. a leftover legacy ".catalog-tags.json", ".git") are
// skipped. Each result's `dir` is the relative path (using "/" separators) of its
// parent folder, "" at the root.
function walkFiles(root, dir = "") {
  const abs = path.join(root, dir);
  const entries = fs.readdirSync(abs, { withFileTypes: true });
  let results = [];
  for (const e of entries) {
    if (e.name.startsWith(".")) continue;
    const relPath = dir ? `${dir}/${e.name}` : e.name;
    if (e.isDirectory()) {
      results = results.concat(walkFiles(root, relPath));
    } else if (e.isFile() && ACCEPTED_EXT.includes(path.extname(e.name).toLowerCase())) {
      results.push({ relPath, dir });
    }
  }
  return results;
}

// Recursively collects all subfolders under `root` (dotfolders skipped), as
// relative paths using "/" separators. Includes folders even if they (or their
// descendants) hold no accepted files, so a subfolder created outside the app
// still shows up as a move destination.
function walkFolders(root, dir = "") {
  const abs = path.join(root, dir);
  let results = [];
  const entries = fs.readdirSync(abs, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith(".")) continue;
    if (e.isDirectory()) {
      const relPath = dir ? `${dir}/${e.name}` : e.name;
      results.push(relPath);
      results = results.concat(walkFolders(root, relPath));
    }
  }
  return results;
}

ipcMain.handle("list-folders", async (event, folder) => {
  return walkFolders(folder).sort((a, b) => a.localeCompare(b, undefined, { sensitivity: "base" }));
});

// fs.renameSync fails with EXDEV when `src` and `dest` are on different drives —
// which the trash dir (always under the app's userData, typically the system
// drive) and a catalog folder (could be anywhere, including a removable or
// network drive) routinely are. Falls back to a copy-then-delete in that case.
function moveFileSafe(src, dest) {
  try {
    fs.renameSync(src, dest);
  } catch (e) {
    if (e.code !== "EXDEV") throw e;
    fs.copyFileSync(src, dest);
    fs.unlinkSync(src);
  }
}

// Moves a file into `destDir` (a relative subfolder path, or "" for the catalog
// root). Refuses to clobber an existing file of the same name at the destination
// rather than overwriting it silently.
function moveOneFile(folder, relPath, destDir) {
  const name = path.basename(relPath);
  const newRelPath = destDir ? `${destDir}/${name}` : name;
  const srcFull = path.join(folder, relPath);
  const destFull = path.join(folder, newRelPath);
  if (srcFull === destFull) return { path: relPath };
  if (fs.existsSync(destFull)) {
    return { error: `"${name}" already exists in that folder.` };
  }
  try {
    fs.mkdirSync(path.dirname(destFull), { recursive: true });
    fs.renameSync(srcFull, destFull);
  } catch (e) {
    // The file may be transiently locked (antivirus scan, an open preview, a
    // sync client) — report it as a per-file failure instead of throwing.
    // Letting this throw would reject the whole IPC call (fatal for a batch:
    // it aborts every other file still queued behind it, and leaves the
    // renderer's own post-move cleanup/refresh never running).
    return { error: `Couldn't move "${name}": ${e.message}` };
  }
  return { path: newRelPath };
}

ipcMain.handle("move-file", async (event, folder, relPath, destDir) => {
  return moveOneFile(folder, relPath, destDir);
});

// ---- Importing files dragged in from the OS file explorer ----

// Expands one dropped OS path into a flat list of { srcAbs, relDest } pairs
// ready to import. A plain file imports under just its own name; a dropped
// directory recurses, preserving its internal structure under a folder named
// after the directory itself (dotfiles/dotfolders skipped, same convention
// walkFiles/walkFolders use for the catalog's own tree) — dragging a folder
// of scanned bills in behaves the same way it would in a real file manager.
function expandDroppedPath(absPath, relDest) {
  const stat = fs.statSync(absPath);
  if (stat.isFile()) return [{ srcAbs: absPath, relDest: relDest || path.basename(absPath) }];
  if (!stat.isDirectory()) return [];
  const base = relDest || path.basename(absPath);
  let results = [];
  for (const e of fs.readdirSync(absPath, { withFileTypes: true })) {
    if (e.name.startsWith(".")) continue;
    const childAbs = path.join(absPath, e.name);
    const childRel = `${base}/${e.name}`;
    if (e.isDirectory()) results = results.concat(expandDroppedPath(childAbs, childRel));
    else if (e.isFile()) results.push({ srcAbs: childAbs, relDest: childRel });
  }
  return results;
}

// Copies one external file into `destDir` under the catalog folder — a COPY,
// not a move (moveOneFile's move-within-the-catalog semantics don't apply;
// the source lives outside anything the app manages, and dropping a file
// shouldn't remove it from wherever the user dragged it from). Rejects
// anything that isn't a catalog-accepted extension up front, and refuses to
// clobber an existing file at the destination, same policy as moveOneFile.
function importOneFile(folder, srcAbs, relDest, destDir) {
  const name = path.basename(relDest);
  const ext = path.extname(name).toLowerCase();
  if (!ACCEPTED_EXT.includes(ext)) {
    return { error: `"${name}" isn't a PDF, JPG, or PNG — skipped.` };
  }
  const newRelPath = destDir ? `${destDir}/${relDest}` : relDest;
  const destFull = path.join(folder, newRelPath);
  if (path.resolve(srcAbs) === path.resolve(destFull)) {
    return { error: `"${name}" is already in that folder.` };
  }
  if (fs.existsSync(destFull)) {
    return { error: `"${name}" already exists in that folder.` };
  }
  try {
    fs.mkdirSync(path.dirname(destFull), { recursive: true });
    fs.copyFileSync(srcAbs, destFull);
  } catch (e) {
    return { error: `Couldn't import "${name}": ${e.message}` };
  }
  return { path: newRelPath };
}

// `absPaths` are the dropped items' own absolute OS paths (files or
// directories) — resolved renderer-side via webUtils.getPathForFile, since a
// browser File object never carries one. Each is attempted independently, per
// the collision/failure policy above, so one bad file never blocks the rest.
ipcMain.handle("import-files", async (event, folder, absPaths, destDir) => {
  let entries = [];
  for (const p of absPaths) {
    try {
      entries = entries.concat(expandDroppedPath(p, null));
    } catch (e) {
      entries.push({ srcAbs: p, relDest: path.basename(p), statError: e.message });
    }
  }
  const imported = [];
  const errors = [];
  for (const { srcAbs, relDest, statError } of entries) {
    if (statError) {
      errors.push({ path: srcAbs, error: `Couldn't read "${path.basename(srcAbs)}": ${statError}` });
      continue;
    }
    const result = importOneFile(folder, srcAbs, relDest, destDir);
    if (result.error) errors.push({ path: srcAbs, error: result.error });
    else imported.push(result.path);
  }
  return { imported, errors };
});

// Moves many files into `destDir` in one call — e.g. a "move every file with
// this tag" bulk action. Each file is attempted independently, so one name
// collision doesn't block the rest; per-file failures are reported back for
// the renderer to surface instead of aborting the whole batch.
// `moved` reports each file's before/after path (rather than just the after
// path) so the renderer's Undo stack can move every successfully-moved file
// back to exactly where it came from, without guessing at index alignment
// against `relPaths` once some entries have dropped out to `errors`.
ipcMain.handle("move-files-batch", async (event, folder, relPaths, destDir) => {
  const moved = [];
  const errors = [];
  for (const relPath of relPaths) {
    const result = moveOneFile(folder, relPath, destDir);
    if (result.error) errors.push({ path: relPath, error: result.error });
    else moved.push({ from: relPath, to: result.path });
  }
  return { moved, errors };
});

// Renames a file within its current folder to `newName`. Used both directly
// (autorename) and to undo an autorename (renaming back to the original name).
// Refuses to clobber an existing file at that name, same as moveOneFile.
function renameOneFile(folder, relPath, newName) {
  const dir = path.dirname(relPath);
  const destDirRel = dir === "." ? "" : dir;
  const newRelPath = destDirRel ? `${destDirRel}/${newName}` : newName;
  const srcFull = path.join(folder, relPath);
  const destFull = path.join(folder, newRelPath);
  if (srcFull === destFull) return { path: relPath };
  if (fs.existsSync(destFull)) {
    return { error: `"${newName}" already exists in that folder.` };
  }
  try {
    fs.renameSync(srcFull, destFull);
  } catch (e) {
    return { error: `Couldn't rename "${path.basename(relPath)}": ${e.message}` };
  }
  return { path: newRelPath };
}

ipcMain.handle("rename-file", async (event, folder, relPath, newName) => {
  return renameOneFile(folder, relPath, newName);
});

// Renames a file in place to a yyyyMMdd_HHmmss timestamp (preserving its
// extension) — lets a name collision at a move destination be resolved
// in-app instead of requiring a trip to file explorer to rename it by hand.
// Falls back to a numeric suffix in the unlikely case two files land on the
// same second.
function autorenameOneFile(folder, relPath) {
  const ext = path.extname(relPath);
  const dir = path.dirname(relPath);
  const destDirRel = dir === "." ? "" : dir;
  const destDirFull = path.join(folder, destDirRel);

  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

  let name = `${stamp}${ext}`;
  let n = 1;
  while (fs.existsSync(path.join(destDirFull, name))) {
    name = `${stamp}_${n}${ext}`;
    n++;
  }

  return renameOneFile(folder, relPath, name);
}

ipcMain.handle("autorename-file", async (event, folder, relPath) => {
  return autorenameOneFile(folder, relPath);
});

// Autorenames many files in one action — e.g. a multi-select move that hit
// collisions at the destination. All files share the same yyyyMMdd_HHmmss
// stamp (they're being renamed in the same instant), so each gets a " (n)"
// suffix — 1-indexed in selection order — to keep them from all colliding
// with each other. Each file is attempted independently, mirroring
// move-files-batch, so one locked/in-use file doesn't block the rest.
function autorenameFilesBatch(folder, relPaths) {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

  const moved = [];
  const errors = [];
  relPaths.forEach((relPath, i) => {
    const ext = path.extname(relPath);
    const dir = path.dirname(relPath);
    const destDirRel = dir === "." ? "" : dir;
    const destDirFull = path.join(folder, destDirRel);

    let name = `${stamp} (${i + 1})${ext}`;
    let n = 1;
    while (fs.existsSync(path.join(destDirFull, name))) {
      name = `${stamp} (${i + 1})_${n}${ext}`;
      n++;
    }

    const result = renameOneFile(folder, relPath, name);
    if (result.error) errors.push({ path: relPath, error: result.error });
    else moved.push({ from: relPath, to: result.path });
  });
  return { moved, errors };
}

ipcMain.handle("autorename-files-batch", async (event, folder, relPaths) => {
  return autorenameFilesBatch(folder, relPaths);
});

// Windows/Chromium quirk: after the DOM subtree holding a native <select> is torn
// down and rebuilt (as happens on every full re-render following a file move),
// Chromium can leave that select's popup-menu tracking orphaned, and clicking any
// <select> in the window stops opening the dropdown at all until the window loses
// and regains OS focus. Alt-tabbing away and back "fixes" it for exactly that
// reason. This replicates that fix in code so the user doesn't have to do it by
// hand. Guarded on isFocused() so it never steals focus from another app — it
// only runs right after a user-initiated action in this window, so it should
// already be focused; if it somehow isn't, skip rather than risk stealing focus.
ipcMain.handle("nudge-window-focus", async () => {
  if (!mainWindow || !mainWindow.isFocused()) return;
  mainWindow.blur();
  mainWindow.focus();
});

ipcMain.handle("list-files", async (event, folder) => {
  const found = walkFiles(folder);
  return Promise.all(
    found.map(async ({ relPath, dir }) => {
      const full = path.join(folder, relPath);
      const name = path.basename(relPath);
      const ext = path.extname(name).toLowerCase();
      const stat = fs.statSync(full);
      const meta = await readFileMeta(full, ext);
      return {
        path: relPath,
        name,
        dir,
        ext,
        url: pathToFileURL(full).href,
        size: stat.size,
        mtime: stat.mtimeMs,
        created: stat.birthtimeMs || stat.ctimeMs,
        tags: meta.tags,
        comments: meta.comments,
      };
    })
  );
});

// A metadata write (writeFileMeta below) ends with exiftool renaming a temp file
// over the original, which fails with "Error renaming temporary file to <path>"
// if something else — a preview pane, another app, or (most commonly) a cloud
// sync client like OneDrive/SharePoint/Google Drive briefly checksumming/
// uploading the file — has it locked at that exact instant. The lock is
// transient, so a couple of automatic retries with a short delay clears most
// occurrences before the user ever sees an error.
const META_WRITE_RETRIES = 2;
const META_WRITE_RETRY_DELAY_MS = 750;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

ipcMain.handle("update-file-meta", async (event, folder, relPath, patch) => {
  const full = path.join(folder, relPath);
  const ext = path.extname(relPath).toLowerCase();
  const current = await readFileMeta(full, ext);
  const merged = { ...current, ...patch };
  let lastErr;
  for (let attempt = 0; attempt <= META_WRITE_RETRIES; attempt++) {
    try {
      await writeFileMeta(full, ext, merged.tags || [], merged.comments || []);
      return merged;
    } catch (err) {
      lastErr = err;
      if (attempt < META_WRITE_RETRIES) await delay(META_WRITE_RETRY_DELAY_MS);
    }
  }
  throw lastErr;
});

// Rather than unlinking outright, moves the file into TRASH_DIR under a random
// name and hands the renderer that path back. This is what makes Undo possible
// for a delete: the bytes (and the tags/comments embedded in them) are still on
// disk, just not where the catalog can see them. They're only gone for good once
// the app restarts and TRASH_DIR gets purged (see app.whenReady above).
function trashOneFile(folder, relPath) {
  const full = path.join(folder, relPath);
  const ext = path.extname(relPath).toLowerCase();
  const trashPath = path.join(TRASH_DIR, `${crypto.randomUUID()}${ext}`);
  try {
    moveFileSafe(full, trashPath);
  } catch (e) {
    // Same reasoning as moveOneFile's catch: a transiently locked file becomes a
    // per-file failure instead of throwing, so it doesn't take a whole batch down.
    return { error: `Couldn't delete "${path.basename(relPath)}": ${e.message}` };
  }
  return { trashPath };
}

ipcMain.handle("delete-file", async (event, folder, relPath) => {
  return trashOneFile(folder, relPath);
});

// Deletes many files in one call — e.g. "delete every checked file" from the
// bulk-actions bar. Each file is trashed independently, so one locked/in-use
// file doesn't block the rest; per-file failures are reported back for the
// renderer to surface instead of aborting the whole batch.
ipcMain.handle("delete-files-batch", async (event, folder, relPaths) => {
  const deleted = [];
  const errors = [];
  for (const relPath of relPaths) {
    const result = trashOneFile(folder, relPath);
    if (result.error) errors.push({ path: relPath, error: result.error });
    else deleted.push({ path: relPath, trashPath: result.trashPath });
  }
  return { deleted, errors };
});

// Undoes a delete: moves a trashed file back to its original relative path.
// Refuses to clobber a file that has since reappeared at that path, same as a
// regular move.
ipcMain.handle("restore-file", async (event, trashPath, folder, relPath) => {
  const destFull = path.join(folder, relPath);
  if (fs.existsSync(destFull)) {
    return { error: `Can't undo — "${path.basename(relPath)}" already exists at that location.` };
  }
  try {
    fs.mkdirSync(path.dirname(destFull), { recursive: true });
    moveFileSafe(trashPath, destFull);
  } catch (e) {
    return { error: `Couldn't restore "${path.basename(relPath)}": ${e.message}` };
  }
  return { path: relPath };
});

ipcMain.handle("open-file", async (event, folder, relPath) => {
  // shell.openPath resolves to "" on success, or an error string on failure —
  // it never rejects, so the renderer can just check the returned string.
  const result = await shell.openPath(path.join(folder, relPath));
  return result || null;
});

// Predefined tags (name + keyboard shortcut + color) are catalog-specific
// content, so they live as a hidden JSON file inside the target folder itself
// rather than in the app's own userData directory — that way the vocabulary
// travels with the folder (a different machine, a reinstalled app, a synced
// drive all see the same tags). walkFiles/walkFolders already skip dotfiles,
// so this never shows up in the grid or the folder tree.
const TAG_CONFIG_FILENAME = ".catalog-tags.json";

function tagConfigPath(folder) {
  return path.join(folder, TAG_CONFIG_FILENAME);
}

// The leading dot only hides the file from walkFiles/walkFolders (and from
// Explorer on macOS/Linux); Windows has its own separate hidden-attribute
// bit that ignores filename entirely, so the file still shows up in Explorer
// there unless we set it explicitly. No-op, and never throws, elsewhere.
function hideFile(file) {
  if (process.platform !== "win32") return;
  try {
    execFileSync("attrib", ["+h", file]);
  } catch {}
}

// Windows won't let Node truncate-write a file that already has the hidden
// attribute set — fs.writeFileSync fails with EPERM — so a plain
// write-then-hideFile only works the first time. Every subsequent save has
// to clear the attribute first, write, then re-hide.
function unhideFile(file) {
  if (process.platform !== "win32") return;
  try {
    execFileSync("attrib", ["-h", file]);
  } catch {}
}

function writeTagsFile(file, tags) {
  unhideFile(file);
  fs.writeFileSync(file, JSON.stringify({ tags }, null, 2), "utf8");
  hideFile(file);
}

// Where predefined tags were stored by a previous version of the app: one file
// per folder, keyed by a hash of its path, inside the app's own userData
// directory. Kept only so an existing catalog migrates forward automatically
// the first time it's opened after this change — see get-tag-config below.
const OLD_TAG_CONFIG_DIR = path.join(app.getPath("userData"), "tag-configs");

function oldTagConfigPath(folder) {
  const hash = crypto.createHash("sha256").update(path.resolve(folder)).digest("hex");
  return path.join(OLD_TAG_CONFIG_DIR, `${hash}.json`);
}

function readTagsFile(file) {
  try {
    const raw = fs.readFileSync(file, "utf8");
    const parsed = JSON.parse(raw);
    if (Array.isArray(parsed.tags)) return parsed.tags;
  } catch {}
  return null;
}

ipcMain.handle("get-tag-config", async (event, folder) => {
  const current = readTagsFile(tagConfigPath(folder));
  if (current) {
    // Backfills the hidden attribute for files that already existed before
    // this was added (e.g. created by an older build of the app).
    hideFile(tagConfigPath(folder));
    return current;
  }
  // One-time migration for catalogs whose predefined tags were saved by an
  // older version of the app into its own userData directory instead of
  // alongside the folder.
  const old = readTagsFile(oldTagConfigPath(folder));
  if (old) {
    writeTagsFile(tagConfigPath(folder), old);
    return old;
  }
  return [];
});

ipcMain.handle("save-tag-config", async (event, folder, tags) => {
  writeTagsFile(tagConfigPath(folder), tags);
  return tags;
});
