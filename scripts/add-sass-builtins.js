const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Map of built-in Sass namespaces to their @use paths
const BUILTINS = {
  map: "sass:map",
  math: "sass:math",
  color: "sass:color",
  string: "sass:string",
  list: "sass:list",
};

// For each file, add @use for each built-in namespace used
function addSassBuiltins(filePath) {
  let content = fs.readFileSync(filePath, "utf8");
  let lines = content.split(/\r?\n/);
  let added = false;

  // Find which built-in namespaces are used
  const needed = Object.keys(BUILTINS).filter((ns) => {
    const regex = new RegExp(ns + "\\.", "g");
    return regex.test(content);
  });

  if (needed.length === 0) return false;

  // Check which are already present
  const already = lines.filter((line) => line.startsWith('@use "sass:'));
  const missing = needed.filter(
    (ns) => !already.some((line) => line.includes(BUILTINS[ns]))
  );

  if (missing.length === 0) return false;

  // Insert missing @use statements after any existing @use statements at the top
  let insertAt = 0;
  while (insertAt < lines.length && lines[insertAt].startsWith("@use ")) {
    insertAt++;
  }
  const useLines = missing.map((ns) => `@use "${BUILTINS[ns]}";`);
  lines.splice(insertAt, 0, ...useLines);
  added = true;

  if (added) {
    fs.writeFileSync(filePath, lines.join("\n"), "utf8");
    console.log(`✅ Added built-in @use to: ${filePath}`);
    return true;
  }
  return false;
}

function processAllScss() {
  const files = glob.sync("src/**/*.scss");
  let count = 0;
  files.forEach((file) => {
    if (addSassBuiltins(file)) count++;
  });
  console.log(`\n🎉 Completed! Updated ${count} files.`);
}

processAllScss();
