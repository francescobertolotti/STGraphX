/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright (c) 2026 Luca Mari
 * Modifications and additional features Copyright (c) 2026 Francesco Bertolotti.
 */

"use strict";

const packageJson = require("./package.json");
const { releaseBuildTag } = require("./scripts/release-metadata.js");

const releaseTag = releaseBuildTag();
const extension = "${ext}";
const artifactName = `DSGraph${releaseTag}.${extension}`;

module.exports = {
  ...packageJson.build,
  artifactName,
  // Both Windows targets are .exe files, so they need distinct names.
  nsis: {
    artifactName: `DSGraph${releaseTag}-setup.${extension}`,
  },
  portable: {
    artifactName: `DSGraph${releaseTag}-portable.${extension}`,
  },
};
