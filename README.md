# BillManager — desktop file manager
Private - Anabaptist Brotherhood internal use only

A Windows and Mac desktop app (built with Electron) that browses a real folder on your
computer, previews PDFs/JPGs/PNGs, and lets you tag and comment on each
file. Tags and comments are written directly into each file's own native
metadata (PDF Info dictionary Keywords/Subject; JPG/PNG Keywords/Comment) via
[ExifTool](https://exiftool.org), so nothing extra is created in the folder
and the tags/comments travel with the file itself. A file can hold multiple
comments — they're stored together in the same metadata field, separated
internally so they round-trip cleanly.

## Prerequisites

- [Node.js](https://nodejs.org) (LTS version). This includes `npm`, which
  you'll use to install dependencies and build the app.

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

## 3. Build a standalone Mac app (.dmg/.zip)

Mac installers must be built on a Mac (electron-builder can't cross-build them
from Windows). On a Mac, run:

```
npm run dist:mac
```

This produces a `.dmg` and `.zip` in the `dist/` folder. The build isn't
signed with a paid Apple Developer ID, so on first launch macOS Gatekeeper
will warn that the app is from an unidentified developer. To open it anyway:

- Right-click (or Control-click) the app → **Open** → confirm in the dialog
  that appears, **or**
- **System Settings → Privacy & Security** → scroll down → **Open Anyway**.

This is only needed once per machine, on the very first launch.

## Releasing (both platforms, from either OS)

Releases are automated via [.github/workflows/release.yml](.github/workflows/release.yml).
Bump `"version"` in `package.json`, commit, then push a matching tag:

```
git tag v1.2.2
git push origin v1.2.2
```

GitHub Actions then builds the Windows `.exe` (on a Windows runner) and the
Mac `.dmg`/`.zip` (on a macOS runner) and publishes both to the GitHub Release
for that tag — no local Mac needed. `electron-updater` picks the right asset
per platform automatically, so this can be run entirely from Windows.

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
- Installer icons live in `build/icon.ico` (Windows) and `build/icon.icns`
  (Mac), referenced under `"win"`/`"mac"` in `package.json`. To regenerate the
  `.icns` from a source image on a Mac: create an `icon.iconset` folder with
  the required PNG sizes, then run `iconutil -c icns icon.iconset`.
- Only `.pdf`, `.jpg`, `.jpeg`, and `.png` files are shown.
- "All files" browses the chosen folder and every subfolder recursively. The
  sidebar lists the subfolder tree underneath it — click a subfolder to
  narrow the grid down to it (and its own subfolders); click "All files"
  again to clear the filter. Folders and files starting with a dot (e.g.
  `.git`) are skipped.
