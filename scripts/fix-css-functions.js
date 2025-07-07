const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Function to revert incorrectly updated CSS functions
function fixCssFunctions(content) {
  let fixedContent = content;

  // Revert CSS functions that should not be prefixed with color.
  // These are standard CSS functions, not Sass functions
  fixedContent = fixedContent.replace(/color\.rgba\(/g, "rgba(");
  fixedContent = fixedContent.replace(/color\.rgb\(/g, "rgb(");
  fixedContent = fixedContent.replace(/color\.hsl\(/g, "hsl(");
  fixedContent = fixedContent.replace(/color\.hsla\(/g, "hsla(");

  return fixedContent;
}

// Function to process all SCSS files
function processScssFiles() {
  const scssFiles = glob.sync("src/**/*.scss");
  let totalFixed = 0;

  console.log(`Found ${scssFiles.length} SCSS files to process...`);

  scssFiles.forEach((filePath) => {
    try {
      const content = fs.readFileSync(filePath, "utf8");
      const fixedContent = fixCssFunctions(content);

      if (content !== fixedContent) {
        fs.writeFileSync(filePath, fixedContent, "utf8");
        console.log(`✅ Fixed CSS functions: ${filePath}`);
        totalFixed++;
      } else {
        console.log(`⏭️  No CSS function changes needed: ${filePath}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  });

  console.log(`\n🎉 Completed! Fixed ${totalFixed} files.`);
}

// Run the script
processScssFiles();
