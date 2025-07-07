const fs = require("fs");
const path = require("path");

// Function to fix declarations after nested rules within the same parent
function fixNestedDeclarations(content) {
  const lines = content.split("\n");
  const fixedLines = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Check if this line starts a CSS rule
    if (
      trimmedLine.match(/^[.#][a-zA-Z0-9_-]*\s*\{/) ||
      trimmedLine.match(/^&[.#][a-zA-Z0-9_-]*\s*\{/) ||
      trimmedLine.match(/^[a-zA-Z0-9_-]*\s*\{/)
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

      // Now process the rule block to move declarations before nested rules
      const processedRuleLines = processRuleBlock(ruleLines);
      fixedLines.push(...processedRuleLines);
      i = j + 1;
    } else {
      // Regular line, just add it
      fixedLines.push(line);
      i++;
    }
  }

  return fixedLines.join("\n");
}

// Function to process a rule block and move declarations before nested rules
function processRuleBlock(ruleLines) {
  if (ruleLines.length <= 2) return ruleLines; // Just opening and closing braces

  const openingLine = ruleLines[0];
  const closingLine = ruleLines[ruleLines.length - 1];
  const contentLines = ruleLines.slice(1, -1);

  const declarations = [];
  const nestedRules = [];
  let currentNestedRule = [];
  let inNestedRule = false;
  let braceCount = 0;

  for (let i = 0; i < contentLines.length; i++) {
    const line = contentLines[i];
    const trimmedLine = line.trim();

    // Check if this starts a nested rule
    if (
      trimmedLine.match(/^[.#][a-zA-Z0-9_-]*\s*\{/) ||
      trimmedLine.match(/^&[.#][a-zA-Z0-9_-]*\s*\{/) ||
      trimmedLine.match(/^[a-zA-Z0-9_-]*\s*\{/) ||
      trimmedLine.match(/^@media/) ||
      trimmedLine.match(/^@keyframes/)
    ) {
      // If we were collecting a nested rule, save it
      if (inNestedRule && currentNestedRule.length > 0) {
        nestedRules.push(currentNestedRule);
        currentNestedRule = [];
      }

      inNestedRule = true;
      currentNestedRule = [line];

      if (trimmedLine.includes("{")) {
        braceCount = 1;
      }
    } else if (inNestedRule) {
      currentNestedRule.push(line);

      if (trimmedLine.includes("{")) {
        braceCount++;
      }
      if (trimmedLine.includes("}")) {
        braceCount--;
        if (braceCount === 0) {
          nestedRules.push(currentNestedRule);
          currentNestedRule = [];
          inNestedRule = false;
        }
      }
    } else {
      // This is a declaration
      if (
        trimmedLine.includes(":") &&
        !trimmedLine.includes("@") &&
        !trimmedLine.includes("{")
      ) {
        declarations.push(line);
      } else if (trimmedLine !== "") {
        // Other content (comments, etc.)
        declarations.push(line);
      }
    }
  }

  // Add any remaining nested rule
  if (inNestedRule && currentNestedRule.length > 0) {
    nestedRules.push(currentNestedRule);
  }

  // Reconstruct the rule block with declarations first, then nested rules
  const result = [openingLine];

  // Add declarations first
  declarations.forEach((decl) => result.push(decl));

  // Add nested rules
  nestedRules.forEach((nestedRule) => {
    nestedRule.forEach((nestedLine) => result.push(nestedLine));
  });

  result.push(closingLine);

  return result;
}

// Function to process specific files that have issues
function processSpecificFiles() {
  const filesToFix = [
    "src/assets/styles/Bookmark2.scss",
    "src/assets/styles/popup-registration.scss",
    "src/assets/styles/professional-qualification.scss",
    "src/assets/styles/rtl.scss",
    "src/assets/styles/top-market.scss",
    "src/assets/styles/trading-ticker.scss",
    "src/assets/styles/trading-tools.scss",
    "src/assets/styles/withdrawal.scss",
  ];

  let totalFixed = 0;

  console.log(
    `Processing ${filesToFix.length} files with declarations after nested rules...\n`
  );

  filesToFix.forEach((filePath) => {
    try {
      if (fs.existsSync(filePath)) {
        const content = fs.readFileSync(filePath, "utf8");
        const fixedContent = fixNestedDeclarations(content);

        if (content !== fixedContent) {
          fs.writeFileSync(filePath, fixedContent, "utf8");
          console.log(`✅ Fixed: ${filePath}`);
          totalFixed++;
        } else {
          console.log(`⏭️  No changes needed: ${filePath}`);
        }
      } else {
        console.log(`❌ File not found: ${filePath}`);
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
processSpecificFiles();
