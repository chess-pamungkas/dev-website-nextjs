const fs = require("fs");
const path = require("path");

const stylesDir = path.join(__dirname, "src", "assets", "styles");
const files = fs.readdirSync(stylesDir).filter((f) => f.endsWith(".scss"));

console.log("Checking SCSS files for @use placement...\n");

files.forEach((file) => {
  const filePath = path.join(stylesDir, file);
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  // Find the first non-empty line
  const firstNonEmptyLineIndex = lines.findIndex((line) => line.trim());
  const firstNonEmptyLine = lines[firstNonEmptyLineIndex];

  if (firstNonEmptyLine && firstNonEmptyLine.trim().startsWith("@use")) {
    console.log(`✅ ${file}: @use on line ${firstNonEmptyLineIndex + 1}`);
  } else {
    console.log(`❌ ${file}: ISSUE - first @use not found or not at top`);
    console.log(`   First non-empty line: "${firstNonEmptyLine}"`);
  }
});
