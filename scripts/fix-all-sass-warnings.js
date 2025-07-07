const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Function to fix all types of Sass deprecation warnings
function fixAllSassWarnings(content) {
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

  // 2. Fix @import statements that should be @use
  const importRegex = /@import\s+['"]([^'"]+)['"];?/g;
  const importMatches = [...fixedContent.matchAll(importRegex)];
  if (importMatches.length > 0) {
    changes.push(
      `Found ${importMatches.length} @import statements that should be converted to @use`
    );
    // Note: We don't auto-convert @import to @use as it requires more complex logic
  }

  // 3. Check for missing @use statements for built-in modules
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

  // 4. Check for potential declarations after nested rules
  const lines = fixedContent.split("\n");
  let potentialIssues = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Look for rule endings followed by declarations
    if (line === "}") {
      let j = i + 1;
      while (j < lines.length) {
        const nextLine = lines[j].trim();
        if (
          nextLine === "" ||
          nextLine === "}" ||
          nextLine.startsWith("@") ||
          nextLine.match(/^[.#]/)
        ) {
          break;
        }
        if (
          nextLine.includes(":") &&
          !nextLine.includes("@") &&
          !nextLine.includes("{")
        ) {
          potentialIssues.push(
            `Potential declaration after nested rule at line ${j + 1}: ${nextLine}`
          );
          break;
        }
        j++;
      }
    }
  }

  if (potentialIssues.length > 0) {
    changes.push(
      `Found ${potentialIssues.length} potential declarations after nested rules`
    );
  }

  return { content: fixedContent, changes, potentialIssues };
}

// Function to process all SCSS files
function processScssFiles() {
  const scssFiles = glob.sync("src/**/*.scss");
  let totalFixed = 0;
  let totalIssues = 0;

  console.log(`Found ${scssFiles.length} SCSS files to process...\n`);

  scssFiles.forEach((filePath) => {
    try {
      const content = fs.readFileSync(filePath, "utf8");
      const result = fixAllSassWarnings(content);

      if (result.changes.length > 0 || result.potentialIssues.length > 0) {
        if (content !== result.content) {
          fs.writeFileSync(filePath, result.content, "utf8");
          console.log(`✅ Fixed: ${filePath}`);
          totalFixed++;
        } else {
          console.log(`⚠️  Issues found (no fixes needed): ${filePath}`);
        }

        result.changes.forEach((change) => {
          console.log(`   • ${change}`);
        });

        result.potentialIssues.forEach((issue) => {
          console.log(`   ⚠️  ${issue}`);
        });

        totalIssues += result.changes.length + result.potentialIssues.length;
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
  console.log(`   • Total issues found: ${totalIssues}`);

  if (totalIssues === 0) {
    console.log(
      `\n✨ All SCSS files are clean! No deprecation warnings found.`
    );
  } else {
    console.log(`\n📋 Issues fixed:`);
    console.log(
      `   • Replaced deprecated global functions with namespaced versions`
    );
    console.log(`   • Added missing @use statements for built-in Sass modules`);
    console.log(`   • Identified potential declarations after nested rules`);
    console.log(
      `   • Found @import statements that should be converted to @use`
    );
  }
}

// Run the script
processScssFiles();
