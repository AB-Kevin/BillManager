"use strict";

// The build settings AB Apps, the app's own updater and the release workflow
// depend on. A change to any of these breaks installs or updates on people's
// computers, which no other test would notice.

const test = require("node:test");
const assert = require("node:assert/strict");
const fs = require("fs");
const path = require("path");

// AB Apps finds the installed app by the registry key made from its appId,
// so it can never change.
const APP_ID = "com.billmanager.filemanager";

const root = path.join(__dirname, "..");
const pkg = require("../package.json");
const workflow = fs.readFileSync(path.join(root, ".github", "workflows", "release.yml"), "utf8");

test("the appId is the one AB Apps knows the app by", () => {
  assert.equal(pkg.build.appId, APP_ID);
});

test("the installer is per-user and asks no questions, as AB Apps runs it", () => {
  assert.equal(pkg.build.nsis.oneClick, true);
  assert.equal(pkg.build.nsis.perMachine, false);
});

test("the installer's name is the one the release workflow uploads", () => {
  const prefix = /^([A-Za-z]+)-Setup-\$\{version\}\.\$\{ext\}$/.exec(pkg.build.nsis.artifactName)?.[1];
  assert.ok(prefix, `artifactName ${pkg.build.nsis.artifactName} isn't <Name>-Setup-\${version}.\${ext}`);
  assert.match(workflow, new RegExp(`dist/${prefix}-Setup-\\$\\{GITHUB_REF_NAME#v\\}\\.exe`));
});

test("the updater reads this repository's releases", () => {
  assert.deepEqual([pkg.build.publish.provider, pkg.build.publish.owner], ["github", "AB-Kevin"]);
  assert.ok(fs.existsSync(path.join(root, "dev-app-update.yml")));
  assert.match(fs.readFileSync(path.join(root, "dev-app-update.yml"), "utf8"), new RegExp(`repo: ${pkg.build.publish.repo}\\b`));
});

test("every file the app starts from is packaged", () => {
  for (const file of [pkg.main, "preload.js"]) {
    assert.ok(fs.existsSync(path.join(root, file)), `${file} is missing`);
    assert.ok(pkg.build.files.includes(file), `${file} isn't in build.files`);
  }
});

test("a release only goes out when the tests pass", () => {
  assert.match(workflow, /run: npm test/);
  assert.equal(pkg.scripts.preversion, "npm test");
});
