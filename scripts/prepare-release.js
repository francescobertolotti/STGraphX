/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright (c) 2026 Luca Mari
 * Modifications and additional features Copyright (c) 2026 Francesco Bertolotti.
 */

"use strict";

const crypto = require("crypto");
const fs = require("fs");
const path = require("path");
const { releaseArtifactPrefix } = require("./release-metadata.js");

const GENERIC_ARTIFACTS = [
  { versionedSuffix: ".AppImage", genericName: "DSGraph.AppImage" },
  { versionedSuffix: ".tar.gz", genericName: "DSGraph.tar.gz" },
  { versionedSuffix: ".dmg", genericName: "DSGraph.dmg" },
  { versionedSuffix: ".zip", genericName: "DSGraph.zip" },
  { versionedSuffix: "-setup.exe", genericName: "DSGraph-setup.exe" },
  { versionedSuffix: "-portable.exe", genericName: "DSGraph-portable.exe" },
];

function sha256(filePath) {
  return crypto.createHash("sha256").update(fs.readFileSync(filePath)).digest("hex");
}

function prepareReleaseArtifacts(distDirectory, artifactPrefix) {
  if (!fs.existsSync(distDirectory)) {
    throw new Error(`Distribution directory does not exist: ${distDirectory}`);
  }
  const available = new Set(fs.readdirSync(distDirectory, { withFileTypes: true })
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name));
  const artifacts = GENERIC_ARTIFACTS.flatMap(({ versionedSuffix, genericName }) => {
    const versionedName = `${artifactPrefix}${versionedSuffix}`;
    if (!available.has(versionedName)) return [];
    return [{ versionedName, genericName }];
  });
  if (!artifacts.length) {
    throw new Error(`No release artifacts named ${artifactPrefix}* were found in ${distDirectory}`);
  }

  const checksumNames = [];
  artifacts.forEach(({ versionedName, genericName }) => {
    const sourcePath = path.join(distDirectory, versionedName);
    const aliasPath = path.join(distDirectory, genericName);
    fs.copyFileSync(sourcePath, aliasPath);
    checksumNames.push(versionedName, genericName);
  });
  const checksums = [...new Set(checksumNames)].sort().map((fileName) => (
    `${sha256(path.join(distDirectory, fileName))}  ${fileName}`
  ));
  fs.writeFileSync(path.join(distDirectory, "SHA256SUMS.txt"), `${checksums.join("\n")}\n`, "utf8");
  return { artifacts, checksumFile: "SHA256SUMS.txt" };
}

function main() {
  const projectRoot = path.resolve(__dirname, "..");
  const distDirectory = path.join(projectRoot, "dist");
  const artifactPrefix = releaseArtifactPrefix(projectRoot);
  const result = prepareReleaseArtifacts(distDirectory, artifactPrefix);
  result.artifacts.forEach(({ versionedName, genericName }) => {
    console.log(`Created ${genericName} from ${versionedName}`);
  });
  console.log(`Created ${result.checksumFile}`);
}

if (require.main === module) {
  try {
    main();
  } catch (error) {
    console.error(error.message || error);
    process.exit(1);
  }
}

module.exports = {
  prepareReleaseArtifacts,
};
