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
    backgroundColor: "#12161d",
    autoHideMenuBar: true,
    icon: path.join(__dirname, "build", "icon.ico"),
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  mainWindow.loadFile(path.join(__dirname, "renderer", "index.html"));
}

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
const RELEASES_URL = "https://github.com/AB-Kevin/BillManager/releases/latest";

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

ipcMain.handle("update-file-meta", async (event, folder, relPath, patch) => {
  const full = path.join(folder, relPath);
  const ext = path.extname(relPath).toLowerCase();
  const current = await readFileMeta(full, ext);
  const merged = { ...current, ...patch };
  await writeFileMeta(full, ext, merged.tags || [], merged.comments || []);
  return merged;
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
