const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Function to fix top-level parent selector issues
function fixTopLevelParentSelectors(content) {
  const lines = content.split("\n");
  const fixedLines = [];
  let i = 0;
  let inRule = false;
  let braceCount = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Check if we're entering a rule
    if (
      trimmedLine.match(/^[.#][a-zA-Z0-9_-]*\s*\{/) ||
      trimmedLine.match(/^&[.#][a-zA-Z0-9_-]*\s*\{/) ||
      trimmedLine.match(/^[a-zA-Z0-9_-]*\s*\{/)
    ) {
      inRule = true;
      braceCount = 1;
    }

    // Count braces to track nesting
    if (trimmedLine.includes("{")) {
      braceCount += (trimmedLine.match(/\{/g) || []).length;
    }
    if (trimmedLine.includes("}")) {
      braceCount -= (trimmedLine.match(/\}/g) || []).length;
      if (braceCount === 0) {
        inRule = false;
      }
    }

    // Check for top-level parent selectors (outside of any rule)
    if (!inRule && trimmedLine.match(/^&[.#]/)) {
      console.log(`   ⚠️  Found top-level parent selector: ${trimmedLine}`);
      // Skip this line as it's invalid
      i++;
      continue;
    }

    fixedLines.push(line);
    i++;
  }

  return fixedLines.join("\n");
}

// Function to process all SCSS files
function processScssFiles() {
  const scssFiles = glob.sync("src/**/*.scss");
  let totalFixed = 0;

  console.log(
    `Found ${scssFiles.length} SCSS files to check for top-level parent selectors...\n`
  );

  scssFiles.forEach((filePath) => {
    try {
      const content = fs.readFileSync(filePath, "utf8");
      const fixedContent = fixTopLevelParentSelectors(content);

      if (content !== fixedContent) {
        fs.writeFileSync(filePath, fixedContent, "utf8");
        console.log(`✅ Fixed: ${filePath}`);
        totalFixed++;
      } else {
        console.log(`✅ Clean: ${filePath}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  });

  console.log(`\n🎉 Completed! Fixed ${totalFixed} files.`);
  console.log(`\n📋 Fixed issue: Top-level parent selectors (Sass error)`);
}

// Run the script
processScssFiles();
