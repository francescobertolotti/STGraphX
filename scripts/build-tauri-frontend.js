/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright (c) 2026 Luca Mari
 * Modifications and additional features Copyright (c) 2026 Francesco Bertolotti.
 */

const fs = require("fs/promises");
const path = require("path");

const root = path.resolve(__dirname, "..");
const output = path.join(root, "dist", "tauri");
const files = [
  "index.html",
  "styles.css",
  "app.js",
  "widgets.js",
  "semantic.js",
  "graph-functions.js",
  "i18n-inline.js",
  "local-functions-core.js",
  "help-content.js",
  "model-analysis-core.js",
  "model-analysis-ui.js",
  "functional-loop-core.js",
  "functional-loop-ui.js",
  "watch-debugger-core.js",
  "watch-debugger-ui.js",
  "runtime-shared.js",
  "runtime-core.js",
  "runtime-loader.js",
  "runtime-session.js",
  "runtime-controller.js",
  "icon.svg",
  "icon.png",
  "icon.ico",
];
const directories = ["examples", "help", "platform"];

async function copyFile(relativePath) {
  const source = path.join(root, relativePath);
  const target = path.join(output, relativePath);
  await fs.mkdir(path.dirname(target), { recursive: true });
  await fs.copyFile(source, target);
}

async function main() {
  await fs.rm(output, { recursive: true, force: true });
  await fs.mkdir(output, { recursive: true });
  await Promise.all(files.map(copyFile));
  await Promise.all(directories.map((directory) => fs.cp(path.join(root, directory), path.join(output, directory), { recursive: true })));
  process.stdout.write(`Prepared Tauri frontend: ${path.relative(root, output)}\n`);
}

main().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
