const fs = require("fs");
const path = require("path");

// Function to migrate a single SCSS file
function migrateScssFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, "utf8");
    let newContent = content;

    // Replace @import statements with @use
    // Pattern: @import "filename"; -> @use "filename" as *;
    newContent = newContent.replace(/@import\s+"([^"]+)";/g, '@use "$1" as *;');

    // Also handle @import without quotes
    newContent = newContent.replace(/@import\s+([^;]+);/g, '@use "$1" as *;');

    // Write the updated content back to the file
    if (newContent !== content) {
      fs.writeFileSync(filePath, newContent, "utf8");
      console.log(`✅ Migrated: ${filePath}`);
      return true;
    } else {
      console.log(`⏭️  No changes needed: ${filePath}`);
      return false;
    }
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

// Function to recursively find all SCSS files
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

console.log(`🔍 Found ${scssFiles.length} SCSS files to migrate...\n`);

let migratedCount = 0;
for (const file of scssFiles) {
  if (migrateScssFile(file)) {
    migratedCount++;
  }
}

console.log(
  `\n🎉 Migration complete! Migrated ${migratedCount} out of ${scssFiles.length} files.`
);
