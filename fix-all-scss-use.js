const fs = require("fs");
const path = require("path");

const stylesDir = path.join(__dirname, "src", "assets", "styles");
const files = fs.readdirSync(stylesDir).filter((f) => f.endsWith(".scss"));

files.forEach((file) => {
  const filePath = path.join(stylesDir, file);
  let content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  // Remove blank lines and comments at the top
  while (
    lines.length &&
    (!lines[0].trim() ||
      lines[0].trim().startsWith("//") ||
      lines[0].trim().startsWith("/*"))
  ) {
    lines.shift();
  }

  // Check if @use lines are present
  let hasVars =
    lines[0] && lines[0].includes("@use") && lines[0].includes("vars");
  let hasMixins =
    (lines[1] && lines[1].includes("@use") && lines[1].includes("mixins")) ||
    (lines[0] && lines[0].includes("@use") && lines[0].includes("mixins"));

  // If not, add them
  let newLines = [...lines];
  if (!hasVars) newLines.unshift('@use "vars" as *;');
  if (!hasMixins) newLines.splice(hasVars ? 1 : 0, 0, '@use "mixins" as *;');

  // Write back
  fs.writeFileSync(filePath, newLines.join("\n"), "utf8");
  console.log(`✅ Fixed: ${file}`);
});

console.log("All SCSS files have been updated.");
