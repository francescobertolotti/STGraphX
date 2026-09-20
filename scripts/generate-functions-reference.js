/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
 * Copyright (c) 2026 Luca Mari
 * Modifications and additional features Copyright (c) 2026 Francesco Bertolotti.
 */

const fs = require("fs");
const path = require("path");
const vm = require("vm");

const root = path.resolve(__dirname, "..");
const args = process.argv.slice(2);
const langArgument = args.find((arg) => arg.startsWith("--lang="));
const lang = String(langArgument?.slice("--lang=".length) || "it").toLowerCase();
const outputArgumentIndex = args.indexOf("--output");
const outputPath = outputArgumentIndex >= 0 ? args[outputArgumentIndex + 1] : "";

if (!["it", "en"].includes(lang)) {
  throw new Error("--lang must be it or en");
}
if (outputArgumentIndex >= 0 && !outputPath) {
  throw new Error("--output requires a file path");
}

const context = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, "i18n-inline.js"), "utf8"), context, {
  filename: "i18n-inline.js",
});
vm.runInNewContext(fs.readFileSync(path.join(root, "graph-functions.js"), "utf8"), context, {
  filename: "graph-functions.js",
});

const messages = context.window.STGraphXI18nBundles?.[lang];
const docs = context.window.GraphFunctions?.expressionDocs;
if (!messages || !docs) {
  throw new Error("Unable to load expression documentation");
}

const locale = lang === "it" ? "it" : "en";
const groupOrder = ["variable", "function", "array", "probability", "math", "agent"];
const groupLabelKeys = {
  variable: "help.group.variables",
  function: "help.group.functions",
  array: "help.group.array",
  probability: "help.group.probability",
  math: "help.group.math",
  agent: "help.group.agent",
};
const copy = (key) => messages[key] || key;
const stripExampleCode = (text) => {
  const trimmed = String(text || "").trim();
  const terminatedCode = trimmed.match(/^`([\s\S]*)`\.$/);
  if (terminatedCode) return terminatedCode[1];
  const code = trimmed.match(/^`([\s\S]*)`$/);
  return code ? code[1] : trimmed.replace(/\.$/, "");
};
const splitDescription = (description) => {
  const match = String(description || "").match(/\s+(?:Esempio|Esempi|Example|Examples):\s*([\s\S]+)$/i);
  if (!match) {
    return { body: String(description || "").trim(), examples: [] };
  }
  return {
    body: String(description).slice(0, match.index).trim(),
    examples: match[1].split(/\s*;\s*/).filter(Boolean).map(stripExampleCode),
  };
};

const entries = [
  ...Object.entries(docs.variables || {}),
  ...Object.entries(docs.functions || {}),
].map(([name, entry]) => ({
  ...entry,
  name,
  group: entry.helpSection || entry.kind || "function",
  description: copy(entry.descriptionKey),
}));

const title = lang === "it"
  ? "DSGraph - Riferimento rapido alle funzioni"
  : "DSGraph - Quick Function Reference";
const generated = lang === "it" ? "Generato automaticamente" : "Generated automatically";
const lines = [
  `# ${title}`,
  "",
  `${generated} da \`i18n-inline.js\` e \`graph-functions.js\` (release ${context.window.STGraphXAppMeta?.releaseDate || "unknown"}).`,
  "",
  lang === "it"
    ? "Rigenerare con \`npm run docs:functions\`."
    : "Regenerate with \`npm run docs:functions\`.",
  "",
  "## Attribution",
  "",
  "DSGraph is a modified version of STGraphX, originally created by Luca Mari.",
  "",
  "Original work:",
  "Copyright (c) 2026 Luca Mari",
  "",
  "Modifications and additional features:",
  "Copyright (c) 2026 Francesco Bertolotti",
  "",
  "DSGraph is distributed under the Mozilla Public License, version 2.0.",
  "",
  "Luca Mari and the original STGraphX project are not necessarily responsible, maintainers, or endorsers of DSGraph.",
  "",
  copy("help.intro"),
];

for (const group of groupOrder) {
  const groupEntries = entries
    .filter((entry) => entry.group === group)
    .sort((left, right) => left.name.localeCompare(right.name, locale));
  if (!groupEntries.length) {
    continue;
  }
  lines.push("", `## ${copy(groupLabelKeys[group])}`);
  groupEntries.forEach((entry, index) => {
    const { body, examples } = splitDescription(entry.description);
    lines.push("", `### \`${entry.name}\``, "", `\`${entry.signature || entry.name}\``);
    if (body) {
      lines.push("", body);
    }
    if (examples.length) {
      lines.push("", `**${copy("expr.help.examples")}**`);
      examples.forEach((example) => lines.push(`- \`${example}\``));
    }
    if (index < groupEntries.length - 1) {
      lines.push("", "---");
    }
  });
}

const defaultOutput = lang === "it"
  ? "docs/RIFERIMENTO-RAPIDO-FUNZIONI.md"
  : "docs/QUICK-FUNCTION-REFERENCE.md";
const target = path.resolve(root, outputPath || defaultOutput);
fs.mkdirSync(path.dirname(target), { recursive: true });
fs.writeFileSync(target, `${lines.join("\n")}\n`);
console.log(path.relative(root, target));
