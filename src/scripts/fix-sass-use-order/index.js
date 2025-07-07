const fs = require("fs");
const path = require("path");

// Ensure @use statements are at the very top with no extra newlines
function fixUseOrder(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");

    // Remove BOM and any invisible characters
    let cleanContent = content.replace(/^\uFEFF/, "").replace(/^\u200B/g, "");

    // Split into lines and filter out empty lines at the top
    let lines = cleanContent.split(/\r?\n/);

    // Remove all empty lines at the beginning
    while (lines.length > 0 && lines[0].trim() === "") {
      lines.shift();
    }

    // Collect all @use lines and other lines
    const useLines = [];
    const otherLines = [];

    for (const line of lines) {
      if (/^\s*@use\b/.test(line)) {
        useLines.push(line);
      } else {
        otherLines.push(line);
      }
    }

    if (useLines.length === 0) {
      return false;
    }

    // Create content starting exactly with @use statements
    // Don't add extra newline after @use statements
    let newContent;
    if (otherLines.length > 0) {
      newContent = useLines.join("\n") + "\n" + otherLines.join("\n");
    } else {
      newContent = useLines.join("\n");
    }

    // Write the file with explicit UTF-8 encoding and no BOM
    fs.writeFileSync(filePath, newContent, { encoding: "utf8", flag: "w" });
    console.log(`✅ Fixed: ${filePath}`);
    return true;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function findScssFiles(dir) {
  const files = [];
  function traverse(currentDir) {
    const items = fs.readdirSync(currentDir);
    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith(".scss")) {
        files.push(fullPath);
      }
    }
  }
  traverse(dir);
  return files;
}

// Main execution
const stylesDir = path.join(__dirname, "..", "..", "assets", "styles");
const scssFiles = findScssFiles(stylesDir);

console.log(`🔍 Found ${scssFiles.length} SCSS files to fix...\n`);
let fixedCount = 0;
for (const file of scssFiles) {
  if (fixUseOrder(file)) {
    fixedCount++;
  }
}
console.log(
  `\n🎉 Fix complete! Fixed ${fixedCount} out of ${scssFiles.length} files.`
);
