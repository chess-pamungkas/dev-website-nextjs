const fs = require("fs");
const path = require("path");
const glob = require("glob");

// Function to fix only the specific deprecated Sass functions mentioned in warnings
function fixSassDeprecations(content) {
  let fixedContent = content;

  // Only fix the specific functions mentioned in the deprecation warnings
  // Replace deprecated map-get with map.get (this is the main one causing warnings)
  fixedContent = fixedContent.replace(/map-get\(/g, "map.get(");

  // Replace other common Sass function deprecations that might appear
  fixedContent = fixedContent.replace(/str-length\(/g, "string.length(");
  fixedContent = fixedContent.replace(/str-insert\(/g, "string.insert(");
  fixedContent = fixedContent.replace(/str-index\(/g, "string.index(");
  fixedContent = fixedContent.replace(/str-slice\(/g, "string.slice(");
  fixedContent = fixedContent.replace(
    /to-upper-case\(/g,
    "string.to-upper-case("
  );
  fixedContent = fixedContent.replace(
    /to-lower-case\(/g,
    "string.to-lower-case("
  );

  // Math functions
  fixedContent = fixedContent.replace(/random\(/g, "math.random(");
  fixedContent = fixedContent.replace(/round\(/g, "math.round(");
  fixedContent = fixedContent.replace(/ceil\(/g, "math.ceil(");
  fixedContent = fixedContent.replace(/floor\(/g, "math.floor(");
  fixedContent = fixedContent.replace(/abs\(/g, "math.abs(");
  fixedContent = fixedContent.replace(/min\(/g, "math.min(");
  fixedContent = fixedContent.replace(/max\(/g, "math.max(");
  fixedContent = fixedContent.replace(/percentage\(/g, "math.percentage(");
  fixedContent = fixedContent.replace(/unit\(/g, "math.unit(");
  fixedContent = fixedContent.replace(/unitless\(/g, "math.unitless(");
  fixedContent = fixedContent.replace(/comparable\(/g, "math.comparable(");

  // Color functions
  fixedContent = fixedContent.replace(/hue\(/g, "color.hue(");
  fixedContent = fixedContent.replace(/saturation\(/g, "color.saturation(");
  fixedContent = fixedContent.replace(/lightness\(/g, "color.lightness(");
  fixedContent = fixedContent.replace(/adjust-hue\(/g, "color.adjust-hue(");
  fixedContent = fixedContent.replace(/lighten\(/g, "color.lighten(");
  fixedContent = fixedContent.replace(/darken\(/g, "color.darken(");
  fixedContent = fixedContent.replace(/saturate\(/g, "color.saturate(");
  fixedContent = fixedContent.replace(/desaturate\(/g, "color.desaturate(");
  fixedContent = fixedContent.replace(/grayscale\(/g, "color.grayscale(");
  fixedContent = fixedContent.replace(/complement\(/g, "color.complement(");
  fixedContent = fixedContent.replace(/invert\(/g, "color.invert(");
  fixedContent = fixedContent.replace(/mix\(/g, "color.mix(");
  fixedContent = fixedContent.replace(/fade-in\(/g, "color.fade-in(");
  fixedContent = fixedContent.replace(/fade-out\(/g, "color.fade-out(");
  fixedContent = fixedContent.replace(/adjust-color\(/g, "color.adjust(");
  fixedContent = fixedContent.replace(/scale-color\(/g, "color.scale(");
  fixedContent = fixedContent.replace(/change-color\(/g, "color.change(");
  fixedContent = fixedContent.replace(/ie-hex-str\(/g, "color.ie-hex-str(");
  fixedContent = fixedContent.replace(/red\(/g, "color.red(");
  fixedContent = fixedContent.replace(/green\(/g, "color.green(");
  fixedContent = fixedContent.replace(/blue\(/g, "color.blue(");
  fixedContent = fixedContent.replace(/alpha\(/g, "color.alpha(");
  fixedContent = fixedContent.replace(/opacity\(/g, "color.opacity(");

  // List functions
  fixedContent = fixedContent.replace(/list-separator\(/g, "list.separator(");
  fixedContent = fixedContent.replace(/list-length\(/g, "list.length(");
  fixedContent = fixedContent.replace(/list-nth\(/g, "list.nth(");
  fixedContent = fixedContent.replace(/list-set-nth\(/g, "list.set-nth(");
  fixedContent = fixedContent.replace(/list-join\(/g, "list.join(");
  fixedContent = fixedContent.replace(/list-append\(/g, "list.append(");
  fixedContent = fixedContent.replace(/list-zip\(/g, "list.zip(");
  fixedContent = fixedContent.replace(/list-index\(/g, "list.index(");
  fixedContent = fixedContent.replace(/is-bracketed\(/g, "list.is-bracketed(");

  // Map functions (these are the most important ones)
  fixedContent = fixedContent.replace(/map-keys\(/g, "map.keys(");
  fixedContent = fixedContent.replace(/map-values\(/g, "map.values(");
  fixedContent = fixedContent.replace(/map-merge\(/g, "map.merge(");
  fixedContent = fixedContent.replace(/map-remove\(/g, "map.remove(");
  fixedContent = fixedContent.replace(/map-has-key\(/g, "map.has-key(");
  fixedContent = fixedContent.replace(/map-set\(/g, "map.set(");

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
      const fixedContent = fixSassDeprecations(content);

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
}

// Run the script
processScssFiles();
