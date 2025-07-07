const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Function to fix all Sass deprecation warnings accurately
function fixSassWarnings(content) {
  let fixedContent = content;
  let changes = [];

  // 1. Fix deprecated global functions
  const functionReplacements = {
    // Map functions
    "map-get(": "map.get(",
    "map-keys(": "map.keys(",
    "map-values(": "map.values(",
    "map-merge(": "map.merge(",
    "map-remove(": "map.remove(",
    "map-has-key(": "map.has-key(",
    "map-set(": "map.set(",
    "map-deep-merge(": "map.deep-merge(",
    "map-deep-remove(": "map.deep-remove(",
    "map-deep-get(": "map.deep-get(",
    "map-deep-set(": "map.deep-set(",
    "map-deep-has-key(": "map.deep-has-key(",

    // String functions
    "str-length(": "string.length(",
    "str-insert(": "string.insert(",
    "str-index(": "string.index(",
    "str-slice(": "string.slice(",
    "to-upper-case(": "string.to-upper-case(",
    "to-lower-case(": "string.to-lower-case(",

    // Math functions
    "random(": "math.random(",
    "round(": "math.round(",
    "ceil(": "math.ceil(",
    "floor(": "math.floor(",
    "abs(": "math.abs(",
    "min(": "math.min(",
    "max(": "math.max(",
    "percentage(": "math.percentage(",
    "unit(": "math.unit(",
    "unitless(": "math.unitless(",
    "comparable(": "math.comparable(",

    // Color functions
    "hue(": "color.hue(",
    "saturation(": "color.saturation(",
    "lightness(": "color.lightness(",
    "adjust-hue(": "color.adjust-hue(",
    "lighten(": "color.lighten(",
    "darken(": "color.darken(",
    "saturate(": "color.saturate(",
    "desaturate(": "color.desaturate(",
    "grayscale(": "color.grayscale(",
    "complement(": "color.complement(",
    "invert(": "color.invert(",
    "mix(": "color.mix(",
    "fade-in(": "color.fade-in(",
    "fade-out(": "color.fade-out(",
    "adjust-color(": "color.adjust(",
    "scale-color(": "color.scale(",
    "change-color(": "color.change(",
    "ie-hex-str(": "color.ie-hex-str(",
    "red(": "color.red(",
    "green(": "color.green(",
    "blue(": "color.blue(",
    "alpha(": "color.alpha(",
    "opacity(": "color.opacity(",

    // List functions
    "list-separator(": "list.separator(",
    "list-length(": "list.length(",
    "list-nth(": "list.nth(",
    "list-set-nth(": "list.set-nth(",
    "list-join(": "list.join(",
    "list-append(": "list.append(",
    "list-zip(": "list.zip(",
    "list-index(": "list.index(",
    "is-bracketed(": "list.is-bracketed(",
  };

  // Apply function replacements and track changes
  Object.entries(functionReplacements).forEach(([oldFunc, newFunc]) => {
    const regex = new RegExp(
      oldFunc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "g"
    );
    const matches = fixedContent.match(regex);
    if (matches) {
      fixedContent = fixedContent.replace(regex, newFunc);
      changes.push(
        `Replaced ${matches.length} instances of ${oldFunc} with ${newFunc}`
      );
    }
  });

  // 2. Add missing @use statements for built-in modules
  const usedModules = [];
  if (fixedContent.includes("map.")) usedModules.push("sass:map");
  if (fixedContent.includes("math.")) usedModules.push("sass:math");
  if (fixedContent.includes("color.")) usedModules.push("sass:color");
  if (fixedContent.includes("string.")) usedModules.push("sass:string");
  if (fixedContent.includes("list.")) usedModules.push("sass:list");

  const existingUses =
    fixedContent.match(/@use\s+['"]sass:[^'"]+['"];?/g) || [];
  const missingModules = usedModules.filter(
    (module) => !existingUses.some((use) => use.includes(module))
  );

  if (missingModules.length > 0) {
    const lines = fixedContent.split("\n");
    let insertIndex = 0;
    while (
      insertIndex < lines.length &&
      lines[insertIndex].trim().startsWith("@use ")
    ) {
      insertIndex++;
    }

    const newUses = missingModules.map((module) => `@use "${module}";`);
    lines.splice(insertIndex, 0, ...newUses);
    fixedContent = lines.join("\n");
    changes.push(`Added missing @use statements: ${missingModules.join(", ")}`);
  }

  // 3. Fix declarations after nested rules (accurate detection)
  const lines = fixedContent.split("\n");
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

      // Process the rule block to fix declarations after nested rules
      const processedRuleLines = processRuleBlockAccurately(ruleLines);
      if (processedRuleLines !== ruleLines) {
        changes.push(`Fixed declarations after nested rules in rule block`);
      }
      fixedLines.push(...processedRuleLines);
      i = j + 1;
    } else {
      // Regular line, just add it
      fixedLines.push(line);
      i++;
    }
  }

  return { content: fixedLines.join("\n"), changes };
}

// Function to accurately process a rule block and move declarations before nested rules
function processRuleBlockAccurately(ruleLines) {
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
      // This is a declaration or other content
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

// Function to process all SCSS files
function processScssFiles() {
  const scssFiles = glob.sync("src/**/*.scss");
  let totalFixed = 0;
  let totalChanges = 0;

  console.log(`Found ${scssFiles.length} SCSS files to process...\n`);

  scssFiles.forEach((filePath) => {
    try {
      const content = fs.readFileSync(filePath, "utf8");
      const result = fixSassWarnings(content);

      if (result.changes.length > 0) {
        if (content !== result.content) {
          fs.writeFileSync(filePath, result.content, "utf8");
          console.log(`✅ Fixed: ${filePath}`);
          totalFixed++;
        } else {
          console.log(`⚠️  Issues found (no fixes needed): ${filePath}`);
        }

        result.changes.forEach((change) => {
          console.log(`   • ${change}`);
          totalChanges++;
        });
      } else {
        console.log(`✅ Clean: ${filePath}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  });

  console.log(`\n🎉 Summary:`);
  console.log(`   • Files processed: ${scssFiles.length}`);
  console.log(`   • Files fixed: ${totalFixed}`);
  console.log(`   • Total changes made: ${totalChanges}`);

  if (totalChanges === 0) {
    console.log(
      `\n✨ All SCSS files are clean! No deprecation warnings found.`
    );
  } else {
    console.log(`\n📋 Issues fixed:`);
    console.log(
      `   • Replaced deprecated global functions with namespaced versions`
    );
    console.log(`   • Added missing @use statements for built-in Sass modules`);
    console.log(`   • Fixed declarations after nested rules`);
  }
}

// Run the script
processScssFiles();
