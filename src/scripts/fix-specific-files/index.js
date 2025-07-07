const fs = require("fs");
const path = require("path");

// Fix specific problematic files
const problematicFiles = [
  "src/assets/styles/Bookmark.scss",
  "src/assets/styles/container.scss",
  "src/assets/styles/flag-icons.scss",
  "src/assets/styles/index.scss",
];

function fixSpecificFile(filePath) {
  try {
    console.log(`🔧 Fixing: ${filePath}`);

    const content = fs.readFileSync(filePath, "utf8");

    // Remove BOM and any invisible characters
    let cleanContent = content.replace(/^\uFEFF/, "").replace(/^\u200B/g, "");

    // Split into lines
    let lines = cleanContent.split(/\r?\n/);

    // Remove all empty lines at the beginning
    while (lines.length > 0 && lines[0].trim() === "") {
      lines.shift();
    }

    // Collect @use lines and other lines
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
      console.log(`⚠️  No @use statements found in ${filePath}`);
      return false;
    }

    // Create new content - ensure it starts exactly with @use
    let newContent;
    if (otherLines.length > 0) {
      // Add exactly one newline between @use and other content
      newContent = useLines.join("\n") + "\n" + otherLines.join("\n");
    } else {
      newContent = useLines.join("\n");
    }

    // Write file
    fs.writeFileSync(filePath, newContent, { encoding: "utf8", flag: "w" });

    // Verify the fix
    const verifyContent = fs.readFileSync(filePath, "utf8");
    const verifyLines = verifyContent.split(/\r?\n/);

    if (verifyLines[0].trim().startsWith("@use")) {
      console.log(`✅ Successfully fixed: ${filePath}`);
      console.log(`   First line: "${verifyLines[0]}"`);
      return true;
    } else {
      console.log(`❌ Failed to fix: ${filePath}`);
      console.log(`   First line: "${verifyLines[0]}"`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Main execution
console.log("🔧 Fixing specific problematic SCSS files...\n");

let fixedCount = 0;
for (const file of problematicFiles) {
  if (fixSpecificFile(file)) {
    fixedCount++;
  }
  console.log(""); // Add spacing between files
}

console.log(
  `🎉 Fixed ${fixedCount} out of ${problematicFiles.length} problematic files.`
);
