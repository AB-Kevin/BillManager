const { app, BrowserWindow, ipcMain, dialog, shell, nativeTheme } = require("electron");
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const os = require("os");
const { pathToFileURL } = require("url");
const { execFileSync } = require("child_process");
const { exiftool } = require("exiftool-vendored");
const { autoUpdater } = require("electron-updater");
const { PDFDocument, degrees } = require("pdf-lib");

const ACCEPTED_EXT = [".pdf", ".jpg", ".jpeg", ".png"];

let mainWindow;

// Matches styles.css's --surface-page for each theme -- the BrowserWindow's
// own backgroundColor, painted before any HTML/CSS loads, so a dark-theme user
// gets that color from the very first frame instead of a flash of white while
// renderer.js's init() reads settings and calls applyTheme().
const THEME_BACKGROUNDS = { light: "#FFFFFF", dark: "#1E1C1D" };
const THEMES = ["system", "light", "dark"];

// The Options dialog's Appearance choice. Midnight was retired in favour of
// the newer AB Apps' Dark, so a saved "midnight" carries on as "dark".
// readSettings() is defined further down this file but usable here
// regardless -- function declarations hoist.
function themePreference(pref) {
  if (pref === "midnight") return "dark";
  return THEMES.includes(pref) ? pref : "system";
}

// Windows' own title bar follows nativeTheme.themeSource, as does the
// renderer's prefers-color-scheme; "system" follows Windows' light/dark
// setting, live.
function applyNativeTheme(pref) {
  nativeTheme.themeSource = themePreference(pref);
}

function themeBackground() {
  return nativeTheme.shouldUseDarkColors ? THEME_BACKGROUNDS.dark : THEME_BACKGROUNDS.light;
}

function createWindow() {
  applyNativeTheme(readSettings().theme);
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 820,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: themeBackground(),
    autoHideMenuBar: true,
    icon: path.join(__dirname, "build", "icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "renderer", "index.html"));

  // Coming back to the window is the most likely moment someone just signed
  // in/out of AB Apps -- see refreshAbAppsName.
  mainWindow.on("focus", () => refreshAbAppsName());
}

nativeTheme.on("updated", () => {
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.setBackgroundColor(themeBackground());
});

// Deleted files land here instead of being unlinked outright, so the renderer's
// Undo stack can restore one. The stack only lives in memory, so anything still
// sitting here is unreachable the moment the app restarts — safe to purge for
// good on every launch, before any new deletes have a chance to land in it.
const TRASH_DIR = path.join(app.getPath("userData"), "trash");

app.whenReady().then(() => {
  // The installer's build.appId, so taskbar pinning and grouping match the shortcuts.
  app.setAppUserModelId("com.billmanager.filemanager");
  try {
    fs.rmSync(TRASH_DIR, { recursive: true, force: true });
  } catch {}
  fs.mkdirSync(TRASH_DIR, { recursive: true });
  createWindow();
  // Works even while the file doesn't exist yet (stat just reports zeros),
  // so it also catches a sign-in after launch.
  fs.watchFile(AB_APPS_IDENTITY_FILE, { interval: 2000 }, () => refreshAbAppsName());
  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});

app.on("will-quit", () => {
  fs.unwatchFile(AB_APPS_IDENTITY_FILE);
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
const REPO_OWNER = "AB-Kevin";
const REPO_NAME = "BillManager";
const REPO_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;
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

// Throws if the file can't be read; readFileMeta below is the forgiving
// version, and readFileMetaCached needs to tell a failed read from a file
// that really has no tags so it never remembers the failure.
async function readFileMetaFromDisk(full, ext) {
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
}

async function readFileMeta(full, ext) {
  try {
    return await readFileMetaFromDisk(full, ext);
  } catch {
    return { tags: [], comments: [] };
  }
}

// Every file's tags and comments, remembered between refreshes so a refresh
// only runs exiftool on files that are new or have changed — re-reading a
// whole OneDrive folder after every rename could take half a minute. Keyed by
// absolute path, and an entry only counts while the file's size and modified
// time still match what they were when it was read. Every tag/comment write
// (this app's, or a coworker's synced in) changes the modified time, since
// writeFileMeta doesn't pass exiftool's -P. Kept in memory only, so restarting
// the app starts it over; list-files drops entries for files no longer in the
// open folder, and the Refresh button skips it entirely (see list-files).
let metaCache = new Map();

async function readFileMetaCached(full, ext, stat) {
  const hit = metaCache.get(full);
  if (hit && hit.size === stat.size && hit.mtimeMs === stat.mtimeMs) return hit.meta;
  try {
    const meta = await readFileMetaFromDisk(full, ext);
    metaCache.set(full, { size: stat.size, mtimeMs: stat.mtimeMs, meta });
    return meta;
  } catch {
    metaCache.delete(full);
    return { tags: [], comments: [] };
  }
}

// A rename or move keeps the file's bytes, size and modified time, so its
// entry just follows it to the new path.
function moveCachedMeta(srcFull, destFull) {
  const hit = metaCache.get(srcFull);
  metaCache.delete(srcFull);
  if (hit) metaCache.set(destFull, hit);
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

// Small per-device settings that aren't tied to any one catalog folder — the
// name signed onto new comments (see commentAttributionLine in the renderer)
// and the chosen theme (light/dark/midnight — see applyTheme). Kept in its
// own file rather than folded into LAST_FOLDER_FILE above since that one is
// conceptually unrelated.
const SETTINGS_FILE = path.join(app.getPath("userData"), "settings.json");

function readSettings() {
  try {
    return JSON.parse(fs.readFileSync(SETTINGS_FILE, "utf8"));
  } catch {
    return {};
  }
}

function writeSettings(patch) {
  const settings = { ...readSettings(), ...patch };
  fs.mkdirSync(path.dirname(SETTINGS_FILE), { recursive: true });
  fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings), "utf8");
  return true;
}

ipcMain.handle("get-commenter-name", () => readSettings().commenterName || null);

ipcMain.handle("set-commenter-name", (event, name) => writeSettings({ commenterName: name }));

// --- AB Apps identity --------------------------------------------------------
// AB Apps is the in-house launcher that signs a person in once for every
// AB app. While someone is signed in there, it keeps this file in the
// Windows account's AppData (deleted again on sign-out):
//   { "version": 1, "personId": "…", "name": "Mary Manager", "class": "manager", … }
// Only `name` matters here. When the file is valid (parses, version 1, a
// non-empty name of at most 80 chars once trimmed), that name signs new
// comments instead of settings.json's per-device commenterName, and the
// renderer shows it read-only in Options. Anything else — missing file,
// read error, or a half-written file that fails to parse — counts as "not
// signed in" and falls back to commenterName exactly as before. The AB Apps
// name is never written into settings.json, so the device's own name is
// still there if the person signs out.
const AB_APPS_IDENTITY_FILE = path.join(app.getPath("appData"), "AB Apps", "identity.json");

function readAbAppsName() {
  try {
    const identity = JSON.parse(fs.readFileSync(AB_APPS_IDENTITY_FILE, "utf8"));
    if (identity?.version !== 1 || typeof identity.name !== "string") return null;
    const name = identity.name.trim();
    return name && name.length <= 80 ? name : null;
  } catch {
    return null;
  }
}

// Last name handed to the renderer, so sign-in/sign-out/rename in AB Apps is
// only pushed ("ab-apps-name") when it actually changed. Re-checked on window
// focus and by a cheap 2s fs.watchFile poll (see app.whenReady), so none of
// those need a restart to show up.
let abAppsName = null;

function refreshAbAppsName() {
  const next = readAbAppsName();
  if (next === abAppsName) return;
  abAppsName = next;
  if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send("ab-apps-name", next);
}

ipcMain.handle("get-ab-apps-name", () => (abAppsName = readAbAppsName()));

ipcMain.handle("get-theme", () => themePreference(readSettings().theme));

ipcMain.handle("set-theme", (event, theme) => {
  const next = writeSettings({ theme: themePreference(theme) });
  applyNativeTheme(theme);
  return next;
});

// Per-device destination for the Autoexport button (see autoexportOneFile
// below) — an absolute folder outside the catalog, chosen once via the native
// folder picker the first time Autoexport is used and remembered from then
// on. Also changeable any time from the Options dialog. Falls back to the
// old "autosaveFolder" settings key so upgrading doesn't silently forget a
// folder someone already picked before the feature was renamed.
ipcMain.handle("get-autoexport-folder", () => {
  const settings = readSettings();
  return settings.autoexportFolder || settings.autosaveFolder || null;
});

ipcMain.handle("set-autoexport-folder", (event, folder) => writeSettings({ autoexportFolder: folder }));

// Per-file rotation, for review mode's "fix a sideways/upside-down scan"
// button (see the renderer's rotateFile). This is a view-only fix — there's
// no safe, dependency-free way to physically re-encode a rotated JPG/PNG or
// rewrite a PDF page's /Rotate entry, and this app would rather never risk
// corrupting a bill's actual bytes than "really" fix the file — so it's kept
// as a small side table instead of embedded metadata like tags/comments
// (see readFileMeta/writeFileMeta above). Keyed by absolute path since it's
// not part of the catalog folder at all; moving or renaming a file loses its
// rotation as a result, since nothing ties the old and new absolute paths
// together — an accepted, minor limitation of a purely cosmetic fix.
const ROTATIONS_FILE = path.join(app.getPath("userData"), "rotations.json");

function readRotations() {
  try {
    return JSON.parse(fs.readFileSync(ROTATIONS_FILE, "utf8"));
  } catch {
    return {};
  }
}

function writeRotation(full, degrees) {
  const rotations = readRotations();
  const normalized = ((degrees % 360) + 360) % 360;
  if (normalized === 0) delete rotations[full];
  else rotations[full] = normalized;
  fs.mkdirSync(path.dirname(ROTATIONS_FILE), { recursive: true });
  fs.writeFileSync(ROTATIONS_FILE, JSON.stringify(rotations), "utf8");
}

ipcMain.handle("set-rotation", async (event, folder, relPath, degrees) => {
  writeRotation(path.join(folder, relPath), degrees);
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
    moveCachedMeta(srcFull, destFull);
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
    moveCachedMeta(srcFull, destFull);
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
  return withFileEntry(folder, autorenameOneFile(folder, relPath));
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
  const result = autorenameFilesBatch(folder, relPaths);
  const rotations = readRotations();
  await Promise.all(result.moved.map(async (m) => (m.file = await fileEntryOrNull(folder, m.to, rotations))));
  return result;
});

// Maps the EXIF Orientation tag (1-8) to the clockwise degrees a viewer must
// rotate the raw, as-stored pixel data by to display it upright — the exact
// same "clockwise degrees to rotate for display" meaning as a PDF page's own
// /Rotate entry (see PDFPage.setRotation below), so the values carry over
// directly. A phone photo shot in portrait is very often stored "sideways"
// at the sensor level (Orientation 6 or 8) with this tag recording the fix;
// values 2/4/5/7 additionally mirror the image, which a plain page rotation
// can't express — real cameras essentially never produce those, so they're
// handled here as their rotation component only, dropping the mirror.
const EXIF_ORIENTATION_TO_ROTATION = { 1: 0, 2: 0, 3: 180, 4: 180, 5: 270, 6: 90, 7: 90, 8: 270 };

// JPEG's raw pixel data (what pdf-lib's embedJpg reads) is oriented however
// the camera sensor captured it — completely ignoring the EXIF Orientation
// tag that photo viewers (including this app's own <img>-based previews,
// which Chromium auto-rotates per EXIF by default) use to display it upright.
// Without correcting for that, an autoexported portrait photo stored sideways
// at the sensor level would land in the PDF still sideways. PNG carries no
// such tag in practice, so this is JPEG-only.
async function readJpegRotation(srcFull) {
  try {
    const tags = await exiftool.read(srcFull);
    return EXIF_ORIENTATION_TO_ROTATION[tags.Orientation] || 0;
  } catch {
    return 0; // no/unreadable EXIF — assume the pixel data is already upright
  }
}

// Autoexport always hands back a PDF, regardless of what kind of file went
// in: a source PDF is copied through untouched, but a JPG/PNG is wrapped
// into a fresh single-page PDF — one page, sized to the image itself, with
// the image drawn to fill it — via pdf-lib, which needs no native build step
// (matters for electron-builder). A JPEG's EXIF orientation (see
// readJpegRotation above) is carried over as the page's own rotation, so it
// still displays upright; beyond that, no rotation/rescaling: this is a
// format conversion, not an edit.
async function writeAutoexportCopy(srcFull, destFull, ext) {
  if (ext === ".pdf") {
    fs.copyFileSync(srcFull, destFull);
    return;
  }
  const bytes = fs.readFileSync(srcFull);
  const pdfDoc = await PDFDocument.create();
  const image = ext === ".png" ? await pdfDoc.embedPng(bytes) : await pdfDoc.embedJpg(bytes);
  const page = pdfDoc.addPage([image.width, image.height]);
  page.drawImage(image, { x: 0, y: 0, width: image.width, height: image.height });
  if (ext !== ".png") {
    const rotation = await readJpegRotation(srcFull);
    if (rotation) page.setRotation(degrees(rotation));
  }
  fs.writeFileSync(destFull, await pdfDoc.save());
}

// Autoexport renames the original to match its exported copy, so a candidate
// stem has to be free in both places: as a .pdf in destFolder, and under the
// original's own extension in its catalog folder.
function autoexportStemIsFree(destFolder, srcDirFull, stem, srcExt) {
  return !fs.existsSync(path.join(destFolder, `${stem}.pdf`)) && !fs.existsSync(path.join(srcDirFull, `${stem}${srcExt}`));
}

// Renames the original to the exported copy's name (keeping the original's
// own extension, so a JPG/PNG stays a valid image), so the catalog file and
// its export can be matched up at a glance. If the rename fails (e.g. the
// file is locked), the copy is deleted again rather than leaving an export
// whose name no longer matches anything in the catalog.
function renameAfterAutoexport(folder, relPath, stem, destFull) {
  const result = renameOneFile(folder, relPath, `${stem}${path.extname(relPath)}`);
  if (result.error) {
    try {
      fs.unlinkSync(destFull);
    } catch {}
  }
  return result;
}

// The Autoexport button writes a PDF copy under a fresh yyyyMMdd_HHmmss
// timestamp name — same naming scheme as autorenameOneFile — into
// `destFolder`, the per-device autoexport folder (see
// get/set-autoexport-folder above), then renames the original in the catalog
// to that same name (see renameAfterAutoexport above). The copy is always
// named with a .pdf extension — see writeAutoexportCopy above for how a
// non-PDF source gets there. Collisions are checked against both folders
// (see autoexportStemIsFree above). Returns destFull — the copy's new
// absolute path — and the original's new relative path, so the renderer can
// undo by deleting the copy and renaming the original back (see
// undo-autoexport below).
async function autoexportOneFile(folder, relPath, destFolder) {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

  const srcFull = path.join(folder, relPath);
  const srcDirFull = path.dirname(srcFull);
  const srcExt = path.extname(relPath);
  let stem = stamp;
  let n = 1;
  while (!autoexportStemIsFree(destFolder, srcDirFull, stem, srcExt)) {
    stem = `${stamp}_${n}`;
    n++;
  }

  const name = `${stem}.pdf`;
  const destFull = path.join(destFolder, name);
  try {
    fs.mkdirSync(destFolder, { recursive: true });
    await writeAutoexportCopy(srcFull, destFull, srcExt.toLowerCase());
    // A plain copy carries over the source's own last-modified time (same as
    // an Explorer copy-paste), which would leave the copy showing the
    // original bill's old date despite its new timestamped filename. Stamp
    // it to the moment of the autoexport instead, so the two agree.
    fs.utimesSync(destFull, now, now);
  } catch (e) {
    return { error: `Couldn't autoexport "${path.basename(relPath)}": ${e.message}` };
  }
  const renamed = renameAfterAutoexport(folder, relPath, stem, destFull);
  if (renamed.error) return { error: renamed.error };
  return { destFull, name, path: renamed.path };
}

ipcMain.handle("autoexport-file", async (event, folder, relPath, destFolder) => {
  return withFileEntry(folder, await autoexportOneFile(folder, relPath, destFolder));
});

// Autoexports many files in one action, mirroring autorenameFilesBatch: all
// copies share the same stamp, so each gets a " (n)" suffix (1-indexed in
// selection order) to keep them from colliding with each other at the
// destination, and each original is renamed to match its copy, same as
// autoexportOneFile. Each file is attempted independently (sequentially, since
// image-to-PDF conversion is async), so one locked/in-use/corrupt file
// doesn't block the rest.
async function autoexportFilesBatch(folder, relPaths, destFolder) {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  const stamp = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}_${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;

  const saved = [];
  const errors = [];
  try {
    fs.mkdirSync(destFolder, { recursive: true });
  } catch (e) {
    return { saved, errors: relPaths.map((p) => ({ path: p, error: `Couldn't reach the autoexport folder: ${e.message}` })) };
  }
  for (let i = 0; i < relPaths.length; i++) {
    const relPath = relPaths[i];
    const srcFull = path.join(folder, relPath);
    const srcDirFull = path.dirname(srcFull);
    const srcExt = path.extname(relPath);
    let stem = `${stamp} (${i + 1})`;
    let n = 1;
    while (!autoexportStemIsFree(destFolder, srcDirFull, stem, srcExt)) {
      stem = `${stamp} (${i + 1})_${n}`;
      n++;
    }

    const name = `${stem}.pdf`;
    const destFull = path.join(destFolder, name);
    try {
      await writeAutoexportCopy(srcFull, destFull, srcExt.toLowerCase());
      // See the matching comment in autoexportOneFile above.
      fs.utimesSync(destFull, now, now);
    } catch (e) {
      errors.push({ path: relPath, error: `Couldn't autoexport "${path.basename(relPath)}": ${e.message}` });
      continue;
    }
    const renamed = renameAfterAutoexport(folder, relPath, stem, destFull);
    if (renamed.error) errors.push({ path: relPath, error: renamed.error });
    else saved.push({ source: relPath, destFull, name, path: renamed.path });
  }
  return { saved, errors };
}

ipcMain.handle("autoexport-files-batch", async (event, folder, relPaths, destFolder) => {
  const result = await autoexportFilesBatch(folder, relPaths, destFolder);
  const rotations = readRotations();
  await Promise.all(result.saved.map(async (s) => (s.file = await fileEntryOrNull(folder, s.path, rotations))));
  return result;
});

// Deletes an Autoexport's copy — half of undoing one; the renderer renames
// the original back to its old name separately via rename-file.
ipcMain.handle("undo-autoexport", async (event, destFull) => {
  try {
    fs.unlinkSync(destFull);
  } catch (e) {
    return { error: `Couldn't undo autoexport: ${e.message}` };
  }
  return true;
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

// One file's entry in the catalog list, as the renderer keeps it in state.files.
async function buildFileEntry(folder, relPath, rotations = readRotations()) {
  const full = path.join(folder, relPath);
  const name = path.basename(relPath);
  const ext = path.extname(name).toLowerCase();
  const slash = relPath.lastIndexOf("/");
  const stat = fs.statSync(full);
  const meta = await readFileMetaCached(full, ext, stat);
  return {
    path: relPath,
    name,
    dir: slash === -1 ? "" : relPath.slice(0, slash),
    ext,
    url: pathToFileURL(full).href,
    size: stat.size,
    mtime: stat.mtimeMs,
    created: stat.birthtimeMs || stat.ctimeMs,
    tags: meta.tags,
    comments: meta.comments,
    rotation: rotations[full] || 0,
  };
}

// `fresh` (the Refresh button) re-reads every file's tags and comments
// instead of trusting metaCache.
ipcMain.handle("list-files", async (event, folder, fresh) => {
  const found = walkFiles(folder);
  const live = new Set(found.map(({ relPath }) => path.join(folder, relPath)));
  if (fresh) metaCache = new Map();
  for (const full of metaCache.keys()) {
    if (!live.has(full)) metaCache.delete(full);
  }
  const rotations = readRotations();
  return Promise.all(found.map(({ relPath }) => buildFileEntry(folder, relPath, rotations)));
});

// Autorename and Autoexport hand back each renamed file's new entry, so the
// renderer can swap it in place rather than re-listing the whole folder. The
// rename itself already succeeded by this point, so a file that can't be
// stat'ed right after (a sync client holding it) gets a null entry instead
// of failing the call — the renderer re-lists the folder for that case.
async function fileEntryOrNull(folder, relPath, rotations) {
  try {
    return await buildFileEntry(folder, relPath, rotations);
  } catch {
    return null;
  }
}

async function withFileEntry(folder, result) {
  if (result.error) return result;
  return { ...result, file: await fileEntryOrNull(folder, result.path) };
}

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
      metaCache.delete(full);
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

// A small JSON file on the shared OneDrive folder can be briefly locked by
// the sync client (or by another computer's app mid-write) -- same
// transient lock update-file-meta retries around (see META_WRITE_RETRIES).
// These writes are tiny and synchronous, so the short wait between tries
// just blocks in place.
const JSON_WRITE_RETRIES = 3;
const JSON_WRITE_RETRY_DELAY_MS = 300;

function writeJsonRetrying(file, data, { hidden = false } = {}) {
  const text = JSON.stringify(data, null, 2);
  for (let attempt = 0; ; attempt++) {
    try {
      if (hidden) unhideFile(file);
      fs.writeFileSync(file, text, "utf8");
      if (hidden) hideFile(file);
      return;
    } catch (e) {
      if (attempt >= JSON_WRITE_RETRIES || !["EBUSY", "EPERM", "EACCES"].includes(e.code)) throw e;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, JSON_WRITE_RETRY_DELAY_MS);
    }
  }
}

function writeTagsFile(file, tags) {
  writeJsonRetrying(file, { tags }, { hidden: true });
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

// Returns null if the file is missing, and throws if it's there but can't be
// read (still locked after the same retries as a save, or damaged) -- treating
// that as missing would let the next save wipe it.
function readJsonRetrying(file) {
  let raw;
  for (let attempt = 0; ; attempt++) {
    try {
      raw = fs.readFileSync(file, "utf8");
      break;
    } catch (e) {
      if (e.code === "ENOENT") return null;
      if (attempt >= JSON_WRITE_RETRIES || !["EBUSY", "EPERM", "EACCES"].includes(e.code)) throw e;
      Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, JSON_WRITE_RETRY_DELAY_MS);
    }
  }
  return JSON.parse(raw);
}

// Null if the file is missing or holds no tag list; throws as readJsonRetrying does.
function readTagsFile(file) {
  const parsed = readJsonRetrying(file);
  return Array.isArray(parsed?.tags) ? parsed.tags : null;
}

// Folders whose tag list was there but couldn't be read when they were opened.
// The window shows no tags for them, so saving its list would replace the real
// one; saves are refused until the folder is opened again and reads cleanly.
const unreadableTagConfigs = new Set();

ipcMain.handle("get-tag-config", async (event, folder) => {
  unreadableTagConfigs.delete(folder);
  let current;
  try {
    current = readTagsFile(tagConfigPath(folder));
  } catch {
    unreadableTagConfigs.add(folder);
    return [];
  }
  if (current) {
    // Backfills the hidden attribute for files that already existed before
    // this was added (e.g. created by an older build of the app).
    hideFile(tagConfigPath(folder));
    return current;
  }
  // One-time migration for catalogs whose predefined tags were saved by an
  // older version of the app into its own userData directory instead of
  // alongside the folder.
  let old = null;
  try {
    old = readTagsFile(oldTagConfigPath(folder));
  } catch {}
  if (old) {
    writeTagsFile(tagConfigPath(folder), old);
    return old;
  }
  return [];
});

ipcMain.handle("save-tag-config", async (event, folder, tags) => {
  if (unreadableTagConfigs.has(folder)) {
    throw new Error(
      "The folder's tag list couldn't be read when it was opened (OneDrive may have been syncing it), so it wasn't saved over. Open the folder again and retry. If it still can't be read, restore .catalog-tags.json from OneDrive's version history."
    );
  }
  writeTagsFile(tagConfigPath(folder), tags);
  return tags;
});

// --- Long-term archive -------------------------------------------------------
// Finished bills are moved into an archive folder inside the catalog and stay
// there, so every new computer pointed at the shared OneDrive catalog has to
// download more of them before the app is usable. Archiving moves the bills
// in that folder that haven't been modified in offloadDays out to a long-term
// archive folder outside the catalog. Anyone can run it from Options, and it
// can be scheduled for a time once a week, which whichever computer has
// BillManager open then carries out.
//
// "Modified" is the file's own last-modified time: the last tag or comment
// saved on it, since moving a file into the archive folder doesn't change it.
//
// The settings belong to the catalog, like its predefined tags, so they're
// kept in a hidden file in the catalog folder where every computer sees them:
//   { archiveFolder, offloadFolder, offloadDays, schedule, lastRun }
// archiveFolder is relative to the catalog folder. So is offloadFolder when
// it's on the same drive -- the catalog sits under each person's own user
// folder, so an absolute path there would only work on the computer that
// chose it -- and it's absolute otherwise (another drive, a network share).
// schedule is { day: 0-6 (Sunday first), time: "HH:MM", since }, `since`
// being when it was set. lastRun is { startedAt, finishedAt, by, computer,
// moved, failed, firstError }, finishedAt missing while it's still running.
const ARCHIVE_CONFIG_FILENAME = ".catalog-archive.json";
const DAY_MS = 24 * 60 * 60 * 1000;
const DEFAULT_OFFLOAD_DAYS = 90;
const MAX_OFFLOAD_DAYS = 3650;
// A run that started this long ago and never recorded finishing is taken to
// have been cut off (the app closed mid-run) rather than still going.
const ARCHIVE_RUN_STALE_MS = 3 * 60 * 60 * 1000;
// See runScheduledArchive.
const SCHEDULED_ARCHIVE_SPREAD_MS = 5 * 60 * 1000;

function archiveConfigPath(folder) {
  return path.join(folder, ARCHIVE_CONFIG_FILENAME);
}

function validOffloadDays(days) {
  return Number.isInteger(days) && days >= 1 && days <= MAX_OFFLOAD_DAYS;
}

function validSchedule(schedule) {
  return (
    !!schedule &&
    Number.isInteger(schedule.day) &&
    schedule.day >= 0 &&
    schedule.day <= 6 &&
    /^([01]\d|2[0-3]):[0-5]\d$/.test(schedule.time)
  );
}

// Throws as readJsonRetrying does when the file's there but unreadable, so
// nothing saves over settings it couldn't see.
function readArchiveConfig(folder) {
  const raw = readJsonRetrying(archiveConfigPath(folder)) || {};
  return {
    archiveFolder: typeof raw.archiveFolder === "string" && raw.archiveFolder ? raw.archiveFolder : null,
    offloadFolder: typeof raw.offloadFolder === "string" && raw.offloadFolder ? raw.offloadFolder : null,
    offloadDays: validOffloadDays(raw.offloadDays) ? raw.offloadDays : DEFAULT_OFFLOAD_DAYS,
    schedule: validSchedule(raw.schedule) ? raw.schedule : null,
    lastRun: raw.lastRun && typeof raw.lastRun.startedAt === "number" ? raw.lastRun : null,
  };
}

// Re-reads just before writing, so a change synced in from another computer
// since this one last read the file isn't saved over.
function updateArchiveConfig(folder, patch) {
  const next = { ...readArchiveConfig(folder), ...patch };
  writeJsonRetrying(archiveConfigPath(folder), next, { hidden: true });
  return next;
}

// path.win32.relative compares case-insensitively, as Windows paths are, and
// returns `to` itself when it's on another drive.
function isSameOrInside(child, parent) {
  const rel = path.relative(path.resolve(parent), path.resolve(child));
  return rel === "" || (!rel.startsWith("..") && !path.isAbsolute(rel));
}

function storedFolderPath(folder, full) {
  const rel = path.relative(folder, full);
  return path.isAbsolute(rel) ? full : rel;
}

function resolvedFolderPath(folder, stored) {
  return stored ? path.resolve(folder, stored) : null;
}

function isDirectory(full) {
  try {
    return fs.statSync(full).isDirectory();
  } catch {
    return false;
  }
}

// The archive folder must be strictly inside the catalog -- the catalog
// folder itself would archive every bill in it -- and the long-term archive
// outside it, or its bills would still be synced to everyone.
function archiveSettingsError(folder, { archiveFull, offloadFull, offloadDays, schedule }) {
  if (!validOffloadDays(offloadDays)) return `The number of days has to be a whole number from 1 to ${MAX_OFFLOAD_DAYS}.`;
  if (schedule && !validSchedule(schedule)) return "Choose a day and a time for archiving to run.";
  if (archiveFull && (!isSameOrInside(archiveFull, folder) || isSameOrInside(folder, archiveFull))) {
    return `The archive folder has to be a folder inside the catalog folder (${folder}).`;
  }
  if (offloadFull && (isSameOrInside(offloadFull, folder) || isSameOrInside(folder, offloadFull))) {
    return "The long-term archive has to be outside the catalog folder, or its bills would still be synced to every computer.";
  }
  return null;
}

function archiveRunner() {
  return { by: readAbAppsName() || readSettings().commenterName || os.hostname(), computer: os.hostname() };
}

function runningElsewhere(lastRun, now) {
  return !!lastRun && !lastRun.finishedAt && lastRun.computer !== os.hostname() && now - lastRun.startedAt < ARCHIVE_RUN_STALE_MS;
}

function formatClock(ms) {
  return new Date(ms).toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
}

// Everything a run needs settled before it moves anything: both folders
// there, nobody else's run in progress, and which bills are due. The
// long-term archive is never created here -- on a computer that can't reach
// it, a new empty folder in its place would keep the bills on just that one.
function archivePlan(folder) {
  const config = readArchiveConfig(folder);
  const archiveFull = resolvedFolderPath(folder, config.archiveFolder);
  const offloadFull = resolvedFolderPath(folder, config.offloadFolder);
  if (!archiveFull || !offloadFull) return { error: "Choose the archive folder and the long-term archive folder first." };
  if (!isDirectory(archiveFull)) return { error: `The archive folder (${archiveFull}) isn't there.` };
  if (!isDirectory(offloadFull)) return { error: `The long-term archive folder (${offloadFull}) can't be reached from this computer.` };
  const now = Date.now();
  if (runningElsewhere(config.lastRun, now)) {
    return { error: `${config.lastRun.by} started archiving at ${formatClock(config.lastRun.startedAt)}. Try again once that's finished.` };
  }
  const due = walkFiles(archiveFull)
    .map(({ relPath }) => relPath)
    .filter((relPath) => {
      try {
        return now - fs.statSync(path.join(archiveFull, relPath)).mtimeMs >= config.offloadDays * DAY_MS;
      } catch {
        return false;
      }
    });
  return { archiveFull, offloadFull, due };
}

async function removeQuietly(file) {
  try {
    await fs.promises.unlink(file);
  } catch {}
}

// Copies rather than renames: the catalog's files may only be OneDrive
// placeholders on this computer, and reading one is what makes OneDrive
// download it first. The copy keeps the bill's modified time and its place in
// any subfolder of the archive folder, with " (n)" added if that name's
// taken by a different file. The original is only removed once the copy is in
// place at full size; if that fails (the file's locked), the copy is removed
// instead and the bill is tried again next run, so it never ends up in both.
// Two computers archiving at once (a scheduled run, or someone pressing the
// button) can both reach the same bill: one finding its original already
// gone, or its exact copy already there, just finishes the job.
async function offloadOneFile(archiveFull, offloadFull, relPath) {
  const srcFull = path.join(archiveFull, relPath);
  let src;
  try {
    src = fs.statSync(srcFull);
  } catch (e) {
    if (e.code === "ENOENT") return { gone: true };
    throw e;
  }
  const ext = path.extname(relPath);
  const stem = relPath.slice(0, relPath.length - ext.length);
  let destFull = path.join(offloadFull, relPath);
  let alreadyCopied = false;
  for (let n = 1; fs.existsSync(destFull); n++) {
    const dest = fs.statSync(destFull);
    // Within 2s: some drives and shares round modified times that far.
    if (dest.size === src.size && Math.abs(dest.mtimeMs - src.mtimeMs) < 2000) {
      alreadyCopied = true;
      break;
    }
    destFull = path.join(offloadFull, `${stem} (${n})${ext}`);
  }
  if (!alreadyCopied) {
    try {
      await fs.promises.mkdir(path.dirname(destFull), { recursive: true });
      await fs.promises.copyFile(srcFull, destFull, fs.constants.COPYFILE_EXCL);
    } catch (e) {
      if (e.code !== "EEXIST") await removeQuietly(destFull);
      return { error: `Couldn't copy "${relPath}" to the long-term archive: ${e.message}` };
    }
  }
  try {
    if ((await fs.promises.stat(destFull)).size !== src.size) throw new Error("the copy came out incomplete");
    await fs.promises.unlink(srcFull);
  } catch (e) {
    if (e.code === "ENOENT" && !fs.existsSync(srcFull)) return { destFull };
    if (!alreadyCopied && fs.existsSync(srcFull)) await removeQuietly(destFull);
    return { error: `Couldn't move "${relPath}" out of the archive folder: ${e.message}` };
  }
  return { destFull };
}

// Records the run as started before moving anything, so other computers see
// it (once OneDrive syncs the file) and leave it be, then records how it
// went. Async throughout -- a big first run can mean downloading and copying
// a large backlog, which mustn't freeze the window.
async function archiveBills(folder) {
  const plan = archivePlan(folder);
  if (plan.error) return plan;
  const runner = archiveRunner();
  const startedAt = Date.now();
  updateArchiveConfig(folder, { lastRun: { startedAt, ...runner } });
  let moved = 0;
  const errors = [];
  for (const relPath of plan.due) {
    let result;
    try {
      result = await offloadOneFile(plan.archiveFull, plan.offloadFull, relPath);
    } catch (e) {
      result = { error: `Couldn't move "${relPath}": ${e.message}` };
    }
    if (result.error) {
      errors.push({ path: relPath, error: result.error });
      continue;
    }
    // Moved or deleted since the plan was made -- by someone else, or a
    // computer archiving at the same time -- so there's nothing left to do.
    if (result.gone) continue;
    moved++;
    metaCache.delete(path.join(plan.archiveFull, relPath));
  }
  const lastRun = { startedAt, finishedAt: Date.now(), ...runner, moved, failed: errors.length, firstError: errors[0]?.error || null };
  updateArchiveConfig(folder, { lastRun });
  return { moved, errors, lastRun };
}

// Only one run at a time on this computer; asking again while one's going
// (the button, the schedule) gets that one. Every finished run is pushed to
// the renderer ("archive-ran"), which re-lists the folder if bills left it.
let archiveRun = null;

function runArchive(folder) {
  if (archiveRun) return archiveRun;
  archiveRun = archiveBills(folder)
    .catch((e) => ({ error: `Archiving stopped partway: ${e.message}` }))
    .then((result) => {
      if (mainWindow && !mainWindow.isDestroyed()) mainWindow.webContents.send("archive-ran", { folder, ...result });
      return result;
    })
    .finally(() => {
      archiveRun = null;
    });
  return archiveRun;
}

// The most recent time the weekly schedule came round, at or before `now`,
// in this computer's local time.
function lastScheduledTime(schedule, now) {
  const [hours, minutes] = schedule.time.split(":").map(Number);
  const at = new Date(now);
  at.setHours(hours, minutes, 0, 0);
  at.setDate(at.getDate() - ((at.getDay() - schedule.day + 7) % 7));
  if (at.getTime() > now) at.setDate(at.getDate() - 7);
  return at.getTime();
}

// The scheduled time the catalog is waiting to be archived for, or null.
// One that passed with no computer open is caught up on the next time any
// computer has it open. A schedule set after this week's time waits for next
// week's rather than running straight away.
function missedScheduledTime(config, now) {
  if (!config.schedule) return null;
  const at = lastScheduledTime(config.schedule, now);
  if (at <= (config.schedule.since || 0) || at <= (config.lastRun?.startedAt || 0)) return null;
  return at;
}

// The scheduled time this computer last tried, so one that failed here (e.g.
// it can't reach the long-term archive) isn't retried every minute. Another
// computer may still manage it; this one tries again next week or next launch.
let scheduledArchiveTried = null;

// Called by the renderer every minute. Every computer with BillManager open
// at the scheduled time gets here at once, so each waits a random few minutes
// and checks again: by then the first one's start has usually reached the
// rest through OneDrive, and they leave it to that one.
async function runScheduledArchive(folder) {
  let config;
  try {
    config = readArchiveConfig(folder);
  } catch {
    return null;
  }
  const at = missedScheduledTime(config, Date.now());
  const key = `${folder}|${at}`;
  if (!at || archiveRun || scheduledArchiveTried === key) return null;
  scheduledArchiveTried = key;
  await delay(Math.random() * SCHEDULED_ARCHIVE_SPREAD_MS);
  try {
    config = readArchiveConfig(folder);
  } catch {
    return null;
  }
  if (missedScheduledTime(config, Date.now()) !== at || runningElsewhere(config.lastRun, Date.now())) return null;
  return runArchive(folder);
}

// What the Options dialog shows, with both folders as absolute paths.
function archiveState(folder) {
  const config = readArchiveConfig(folder);
  return {
    archiveFolder: resolvedFolderPath(folder, config.archiveFolder),
    offloadFolder: resolvedFolderPath(folder, config.offloadFolder),
    offloadDays: config.offloadDays,
    schedule: config.schedule,
    lastRun: config.lastRun,
    running: !!archiveRun,
  };
}

ipcMain.handle("get-archive-settings", (event, folder) => {
  try {
    return archiveState(folder);
  } catch (e) {
    return { error: `Couldn't read the archive settings (OneDrive may be syncing them): ${e.message}` };
  }
});

// `patch` holds whichever of archiveFolder/offloadFolder (absolute, or null
// to clear), offloadDays and schedule (or null for no schedule) changed.
ipcMain.handle("set-archive-settings", (event, folder, patch) => {
  try {
    const config = readArchiveConfig(folder);
    const next = {
      archiveFull: "archiveFolder" in patch ? patch.archiveFolder : resolvedFolderPath(folder, config.archiveFolder),
      offloadFull: "offloadFolder" in patch ? patch.offloadFolder : resolvedFolderPath(folder, config.offloadFolder),
      offloadDays: "offloadDays" in patch ? patch.offloadDays : config.offloadDays,
      schedule: "schedule" in patch ? patch.schedule : config.schedule,
    };
    const error = archiveSettingsError(folder, next);
    if (error) return { error };
    updateArchiveConfig(folder, {
      archiveFolder: next.archiveFull && storedFolderPath(folder, next.archiveFull),
      offloadFolder: next.offloadFull && storedFolderPath(folder, next.offloadFull),
      offloadDays: next.offloadDays,
      schedule: "schedule" in patch && patch.schedule ? { day: patch.schedule.day, time: patch.schedule.time, since: Date.now() } : next.schedule,
    });
    return archiveState(folder);
  } catch (e) {
    return { error: `Couldn't save the archive settings: ${e.message}` };
  }
});

// How many bills a run would move right now, for the button's confirmation.
ipcMain.handle("count-archive-due", (event, folder) => {
  try {
    const plan = archivePlan(folder);
    return plan.error ? plan : { due: plan.due.length };
  } catch (e) {
    return { error: e.message };
  }
});

ipcMain.handle("run-archive", (event, folder) => runArchive(folder));

ipcMain.handle("run-scheduled-archive", (event, folder) => runScheduledArchive(folder));
