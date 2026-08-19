# BillManager — desktop file manager
Private - Anabaptist Brotherhood internal use only

A Windows desktop app (built with Electron) that browses a real folder on your
computer, previews PDFs/JPGs/PNGs, and lets you tag and comment on each
file. Tags and comments are written directly into each file's own native
metadata (PDF Info dictionary Keywords/Subject; JPG/PNG Keywords/Comment) via
[ExifTool](https://exiftool.org), so nothing extra is created in the folder
and the tags/comments travel with the file itself. A file can hold multiple
comments — they're stored together in the same metadata field, separated
internally so they round-trip cleanly.

## Prerequisites

- [Node.js](https://nodejs.org) (LTS version) installed on your Windows machine.
  This includes `npm`, which you'll use to install dependencies and build the app.

## 1. Run it in development mode

Open a terminal (Command Prompt or PowerShell) in this folder and run:

```
npm install
npm start
```

This installs Electron and launches the app in a window. Use "Choose folder"
to pick a directory containing PDFs, JPGs, or PNGs.

## 2. Build a standalone Windows app (.exe installer)

Once you're happy with it, build an installer:

```
npm run dist
```

This uses `electron-builder` to produce a Windows installer (NSIS `.exe`) in
the `dist/` folder. The first run needs an internet connection, since
electron-builder downloads a small packaging tool. Double-click the generated
installer to install BillManager like any other Windows app — it'll show up in
your Start Menu and can be uninstalled from Windows Settings normally.

## Notes

- Tags and comments are written into each file's native metadata, so they
  move, copy, and rename with the file automatically — even outside the app.
  Files already tagged elsewhere (Windows Explorer's "Tags" field, Adobe
  apps, etc.) will show those tags in BillManager too.
- Editing metadata rewrites the file in place. `-overwrite_original` is used
  so ExifTool doesn't leave a `_original` backup copy behind.
- The predefined-tag vocabulary (names, colors, keyboard shortcuts — managed
  via "Manage" in the sidebar) is stored in a hidden `.catalog-tags.json` file
  written into the chosen folder itself, so it travels with the folder rather
  than staying tied to one machine's install of the app. It's skipped by the
  file grid and folder tree like any other dotfile.
- Deleting a file (with a confirmation prompt first), moving a file, editing
  its tags/comments, or renaming/deleting a predefined tag in the tag manager
  can all be undone with the "Undo" button in the top bar (or Ctrl+Z), one step
  at a time. A deleted file is only gone for good once the app is closed and
  reopened — until then it's held out of sight so Undo can bring it back.
  Checkbox-select several files to move or delete them as one batch (and undo
  the whole batch as one step) from the bulk-actions bar above the grid.
- To give the installer a custom icon, add a `build/icon.ico` file and
  reference it as `"icon": "build/icon.ico"` under `"win"` in `package.json`.
- Only `.pdf`, `.jpg`, `.jpeg`, and `.png` files are shown.
- "All files" browses the chosen folder and every subfolder recursively. The
  sidebar lists the subfolder tree underneath it — click a subfolder to
  narrow the grid down to it (and its own subfolders); click "All files"
  again to clear the filter. Folders and files starting with a dot (e.g.
  `.git`) are skipped.
