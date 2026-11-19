const { contextBridge, ipcRenderer } = require("electron");

// The Bill Aging window's bridge (see the Bill Aging section of main.js).
// Every call that changes something hands back a fresh scan.
contextBridge.exposeInMainWorld("aging", {
  getFolder: () => ipcRenderer.invoke("aging-get-folder"),
  onFolder: (callback) => {
    const listener = (event, folder) => callback(folder);
    ipcRenderer.on("aging-folder", listener);
    return () => ipcRenderer.removeListener("aging-folder", listener);
  },
  scan: (folder) => ipcRenderer.invoke("aging-scan", folder),
  saveSettings: (folder, patch) => ipcRenderer.invoke("aging-save-settings", folder, patch),
  setOverride: (folder, override) => ipcRenderer.invoke("aging-set-override", folder, override),
  openFile: (folder, relPath) => ipcRenderer.invoke("open-file", folder, relPath),
  showInFolder: (folder, relPath) => ipcRenderer.invoke("aging-show-in-folder", folder, relPath),
  reveal: (folder, relPath) => ipcRenderer.invoke("aging-reveal", folder, relPath),
  saveCsv: (defaultName, text) => ipcRenderer.invoke("aging-save-csv", defaultName, text),
});
