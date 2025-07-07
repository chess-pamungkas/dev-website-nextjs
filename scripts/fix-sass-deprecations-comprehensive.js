const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Function to fix all Sass deprecation warnings
function fixSassDeprecations(content) {
  let fixedContent = content;

  // 1. Fix deprecated global functions by replacing with namespaced versions
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

  // Apply all function replacements
  Object.entries(functionReplacements).forEach(([oldFunc, newFunc]) => {
    const regex = new RegExp(
      oldFunc.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "g"
    );
    fixedContent = fixedContent.replace(regex, newFunc);
  });

  // 2. Fix declarations after nested rules
  // This regex finds nested rules followed by declarations and moves declarations before nested rules
  const lines = fixedContent.split("\n");
  const fixedLines = [];
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];
    const trimmedLine = line.trim();

    // Check if this line starts a nested rule
    if (
      trimmedLine.match(/^[.#][a-zA-Z0-9_-]*\s*\{/) ||
      trimmedLine.match(/^&[.#][a-zA-Z0-9_-]*\s*\{/) ||
      trimmedLine.match(/^[a-zA-Z0-9_-]*\s*\{/)
    ) {
      // Collect all nested rules
      const nestedRules = [];
      let braceCount = 0;
      let j = i;

      while (j < lines.length) {
        const currentLine = lines[j];
        const currentTrimmed = currentLine.trim();

        if (currentTrimmed.includes("{")) {
          braceCount += (currentTrimmed.match(/\{/g) || []).length;
        }
        if (currentTrimmed.includes("}")) {
          braceCount -= (currentTrimmed.match(/\}/g) || []).length;
        }

        nestedRules.push(currentLine);

        if (braceCount === 0) {
          break;
        }
        j++;
      }

      // Check if there are declarations after the nested rules
      let declarations = [];
      let k = j + 1;

      while (k < lines.length) {
        const nextLine = lines[k];
        const nextTrimmed = nextLine.trim();

        // Stop if we hit another rule or closing brace
        if (
          nextTrimmed.match(/^[.#][a-zA-Z0-9_-]*\s*\{/) ||
          nextTrimmed.match(/^&[.#][a-zA-Z0-9_-]*\s*\{/) ||
          nextTrimmed.match(/^[a-zA-Z0-9_-]*\s*\{/) ||
          nextTrimmed === "}" ||
          nextTrimmed === ""
        ) {
          break;
        }

        // If it looks like a declaration (contains : but not @)
        if (
          nextTrimmed.includes(":") &&
          !nextTrimmed.includes("@") &&
          !nextTrimmed.includes("{")
        ) {
          declarations.push(nextLine);
          k++;
        } else {
          break;
        }
      }

      // If we found declarations after nested rules, move them before
      if (declarations.length > 0) {
        // Add the opening line
        fixedLines.push(line);

        // Add declarations first
        declarations.forEach((decl) => fixedLines.push(decl));

        // Add nested rules
        nestedRules.slice(1).forEach((rule) => fixedLines.push(rule));

        // Skip the lines we've already processed
        i = k;
      } else {
        // No declarations to move, just add the nested rules as-is
        nestedRules.forEach((rule) => fixedLines.push(rule));
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

// Function to add missing @use statements for built-in modules
function addMissingBuiltinImports(content) {
  const lines = content.split("\n");
  const existingUses = lines.filter((line) =>
    line.trim().startsWith('@use "sass:')
  );

  // Check which built-in modules are used
  const usedModules = [];
  if (content.includes("map.")) usedModules.push("sass:map");
  if (content.includes("math.")) usedModules.push("sass:math");
  if (content.includes("color.")) usedModules.push("sass:color");
  if (content.includes("string.")) usedModules.push("sass:string");
  if (content.includes("list.")) usedModules.push("sass:list");

  // Find missing modules
  const missingModules = usedModules.filter(
    (module) => !existingUses.some((use) => use.includes(module))
  );

  if (missingModules.length === 0) {
    return content;
  }

  // Find where to insert the @use statements
  let insertIndex = 0;
  while (
    insertIndex < lines.length &&
    lines[insertIndex].trim().startsWith("@use ")
  ) {
    insertIndex++;
  }

  // Insert missing @use statements
  const newUses = missingModules.map((module) => `@use "${module}";`);
  lines.splice(insertIndex, 0, ...newUses);

  return lines.join("\n");
}

// Function to process all SCSS files
function processScssFiles() {
  const scssFiles = glob.sync("src/**/*.scss");
  let totalFixed = 0;

  console.log(`Found ${scssFiles.length} SCSS files to process...`);

  scssFiles.forEach((filePath) => {
    try {
      const content = fs.readFileSync(filePath, "utf8");

      // Apply all fixes
      let fixedContent = fixSassDeprecations(content);
      fixedContent = addMissingBuiltinImports(fixedContent);

      if (content !== fixedContent) {
        fs.writeFileSync(filePath, fixedContent, "utf8");
        console.log(`✅ Fixed: ${filePath}`);
        totalFixed++;
      } else {
        console.log(`⏭️  No changes needed: ${filePath}`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${filePath}:`, error.message);
    }
  });

  console.log(`\n🎉 Completed! Fixed ${totalFixed} files.`);
  console.log(`\n📋 Fixed issues:`);
  console.log(
    `   • Replaced deprecated global functions with namespaced versions`
  );
  console.log(`   • Moved declarations before nested rules`);
  console.log(`   • Added missing @use statements for built-in Sass modules`);
}

// Run the script
processScssFiles();
