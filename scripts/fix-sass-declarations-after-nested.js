const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Function to fix declarations after nested rules
function fixDeclarationsAfterNested(content) {
  const lines = content.split("\n");
  const fixedLines = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Check if this line starts a CSS rule (selector with opening brace)
    if (
      trimmedLine.match(/^[.#][a-zA-Z0-9_-]*\s*\{/) ||
      trimmedLine.match(/^&[.#][a-zA-Z0-9_-]*\s*\{/) ||
      trimmedLine.match(/^[a-zA-Z0-9_-]*\s*\{/) ||
      trimmedLine.match(/^@media/) ||
      trimmedLine.match(/^@include/) ||
      trimmedLine.match(/^@mixin/)
    ) {
      // Find the end of this rule block
      let braceCount = 0;
      let ruleLines = [];
      let j = i;

      while (j < lines.length) {
        const currentLine = lines[j];
        const currentTrimmed = currentLine.trim();

        // Count braces
        if (currentTrimmed.includes("{")) {
          braceCount += (currentTrimmed.match(/\{/g) || []).length;
        }
        if (currentTrimmed.includes("}")) {
          braceCount -= (currentTrimmed.match(/\}/g) || []).length;
        }

        ruleLines.push(currentLine);

        if (braceCount === 0) {
          break;
        }
        j++;
      }

      // Now look for declarations after the rule block
      let declarations = [];
      let k = j + 1;

      while (k < lines.length) {
        const nextLine = lines[k];
        const nextTrimmed = nextLine.trim();

        // Stop if we hit another rule, closing brace, or empty line
        if (
          nextTrimmed === "" ||
          nextTrimmed === "}" ||
          nextTrimmed.match(/^[.#][a-zA-Z0-9_-]*\s*\{/) ||
          nextTrimmed.match(/^&[.#][a-zA-Z0-9_-]*\s*\{/) ||
          nextTrimmed.match(/^[a-zA-Z0-9_-]*\s*\{/) ||
          nextTrimmed.match(/^@media/) ||
          nextTrimmed.match(/^@include/) ||
          nextTrimmed.match(/^@mixin/)
        ) {
          break;
        }

        // If it looks like a CSS declaration (contains : but not @ or {)
        if (
          nextTrimmed.includes(":") &&
          !nextTrimmed.includes("@") &&
          !nextTrimmed.includes("{") &&
          !nextTrimmed.includes("//")
        ) {
          declarations.push(nextLine);
          k++;
        } else {
          break;
        }
      }

      // If we found declarations after the rule, we need to move them inside
      if (declarations.length > 0) {
        // Find the opening brace of the rule
        let openingBraceIndex = -1;
        for (let l = 0; l < ruleLines.length; l++) {
          if (ruleLines[l].includes("{")) {
            openingBraceIndex = l;
            break;
          }
        }

        if (openingBraceIndex !== -1) {
          // Insert declarations after the opening brace
          const beforeBrace = ruleLines.slice(0, openingBraceIndex + 1);
          const afterBrace = ruleLines.slice(openingBraceIndex + 1);

          // Add proper indentation to declarations
          const indentedDeclarations = declarations.map((decl) => {
            const indent = decl.match(/^\s*/)[0];
            return indent + "  " + decl.trim();
          });

          fixedLines.push(...beforeBrace);
          fixedLines.push(...indentedDeclarations);
          fixedLines.push(...afterBrace);
        } else {
          // Fallback: just add the rule lines as-is
          fixedLines.push(...ruleLines);
        }

        // Skip the lines we've already processed
        i = k;
      } else {
        // No declarations to move, just add the rule lines as-is
        fixedLines.push(...ruleLines);
        i = j + 1;
      }
    } else {
      // Regular line, just add it
      fixedLines.push(line);
      i++;
    }
  }

  return fixedLines.join("\n");
}

// Function to process all SCSS files
function processScssFiles() {
  const scssFiles = glob.sync("src/**/*.scss");
  let totalFixed = 0;

  console.log(`Found ${scssFiles.length} SCSS files to process...`);

  scssFiles.forEach((filePath) => {
    try {
      const content = fs.readFileSync(filePath, "utf8");
      const fixedContent = fixDeclarationsAfterNested(content);

      if (content !== fixedContent) {
        fs.writeFileSync(filePath, fixedContent, "utf8");
        console.log(`✅ Fixed declarations after nested rules: ${filePath}`);
        totalFixed++;
      } else {
        console.log(
          `⏭️  No declarations after nested rules found: ${filePath}`
        );
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  });

  console.log(`\n🎉 Completed! Fixed ${totalFixed} files.`);
  console.log(
    `\n📋 Fixed issue: Declarations after nested rules (Sass deprecation warning)`
  );
}

// Run the script
processScssFiles();
