/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright (c) 2026 Luca Mari
 * Modifications and additional features Copyright (c) 2026 Francesco Bertolotti.
 */

"use strict";

const fs = require("fs");
const path = require("path");

function releaseBuildTag(projectRoot = path.resolve(__dirname, "..")) {
  const metaFile = path.join(projectRoot, "i18n-inline.js");
  const source = fs.readFileSync(metaFile, "utf8");
  const match = source.match(/releaseDate\s*:\s*["']([^"']+)["']/u);
  if (!match) {
    throw new Error("STGraphXAppMeta.releaseDate is missing from i18n-inline.js");
  }
  const parts = match[1].trim().match(/^(\d{4})[.-](\d{2})[.-](\d{2})$/u);
  if (!parts) {
    throw new Error("STGraphXAppMeta.releaseDate must use YYYY.MM.DD or YYYY-MM-DD");
  }
  const [, year, month, day] = parts;
  const date = new Date(Date.UTC(Number(year), Number(month) - 1, Number(day)));
  if (
    date.getUTCFullYear() !== Number(year)
    || date.getUTCMonth() !== Number(month) - 1
    || date.getUTCDate() !== Number(day)
  ) {
    throw new Error("STGraphXAppMeta.releaseDate is not a valid calendar date");
  }
  return `${year.slice(2)}${month}${day}`;
}

function releaseArtifactPrefix(projectRoot) {
  return `DSGraph${releaseBuildTag(projectRoot)}`;
}

module.exports = {
  releaseBuildTag,
  releaseArtifactPrefix,
};
