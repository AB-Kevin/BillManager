const { contextBridge, ipcRenderer, webUtils } = require("electron");

contextBridge.exposeInMainWorld("api", {
  selectFolder: () => ipcRenderer.invoke("select-folder"),
  listFiles: (folder) => ipcRenderer.invoke("list-files", folder),
  // A dropped browser File object carries no filesystem path of its own
  // (Electron removed the old File.path shortcut) — webUtils.getPathForFile
  // is the sanctioned replacement, only callable from the preload/main side.
  getPathForFile: (file) => webUtils.getPathForFile(file),
  importFiles: (folder, absPaths, destDir) => ipcRenderer.invoke("import-files", folder, absPaths, destDir),
  updateFileMeta: (folder, filename, patch) =>
    ipcRenderer.invoke("update-file-meta", folder, filename, patch),
  deleteFile: (folder, filename) => ipcRenderer.invoke("delete-file", folder, filename),
  deleteFiles: (folder, relPaths) => ipcRenderer.invoke("delete-files-batch", folder, relPaths),
  restoreFile: (trashPath, folder, filename) => ipcRenderer.invoke("restore-file", trashPath, folder, filename),
  listFolders: (folder) => ipcRenderer.invoke("list-folders", folder),
  moveFile: (folder, filename, destDir) => ipcRenderer.invoke("move-file", folder, filename, destDir),
  moveFiles: (folder, relPaths, destDir) => ipcRenderer.invoke("move-files-batch", folder, relPaths, destDir),
  renameFile: (folder, filename, newName) => ipcRenderer.invoke("rename-file", folder, filename, newName),
  autorenameFile: (folder, filename) => ipcRenderer.invoke("autorename-file", folder, filename),
  autorenameFiles: (folder, relPaths) => ipcRenderer.invoke("autorename-files-batch", folder, relPaths),
  nudgeWindowFocus: () => ipcRenderer.invoke("nudge-window-focus"),
  openFile: (folder, filename) => ipcRenderer.invoke("open-file", folder, filename),
  getTagConfig: (folder) => ipcRenderer.invoke("get-tag-config", folder),
  saveTagConfig: (folder, tags) => ipcRenderer.invoke("save-tag-config", folder, tags),
  getLastFolder: () => ipcRenderer.invoke("get-last-folder"),
  setLastFolder: (folder) => ipcRenderer.invoke("set-last-folder", folder),
  getCommenterName: () => ipcRenderer.invoke("get-commenter-name"),
  setCommenterName: (name) => ipcRenderer.invoke("set-commenter-name", name),
  getTheme: () => ipcRenderer.invoke("get-theme"),
  setTheme: (theme) => ipcRenderer.invoke("set-theme", theme),
  getAppVersion: () => ipcRenderer.invoke("get-app-version"),
  checkForUpdates: () => ipcRenderer.invoke("check-for-updates"),
  downloadUpdate: () => ipcRenderer.invoke("download-update"),
  quitAndInstall: () => ipcRenderer.invoke("quit-and-install"),
  openReleasesPage: () => ipcRenderer.invoke("open-releases-page"),
  onUpdateStatus: (callback) => {
    const listener = (event, status) => callback(status);
    ipcRenderer.on("update-status", listener);
    return () => ipcRenderer.removeListener("update-status", listener);
  },
  openRepo: () => ipcRenderer.invoke("open-repo-page"),
  rollbackToPreviousVersion: () => ipcRenderer.invoke("rollback-to-previous-version"),
  onRollbackStatus: (callback) => {
    const listener = (event, status) => callback(status);
    ipcRenderer.on("rollback-status", listener);
    return () => ipcRenderer.removeListener("rollback-status", listener);
  },
  windowMinimize: () => ipcRenderer.invoke("window-minimize"),
  windowMaximizeToggle: () => ipcRenderer.invoke("window-maximize-toggle"),
  windowClose: () => ipcRenderer.invoke("window-close"),
  windowIsMaximized: () => ipcRenderer.invoke("window-is-maximized"),
  onWindowState: (callback) => {
    const listener = (event, state) => callback(state);
    ipcRenderer.on("window-state", listener);
    return () => ipcRenderer.removeListener("window-state", listener);
  },
});
