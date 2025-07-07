const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "src",
  "assets",
  "styles",
  "Bookmark.scss"
);

// Read the file as a buffer to see all bytes
const buffer = fs.readFileSync(filePath);
console.log(
  "Original file first 20 bytes as hex:",
  buffer.slice(0, 20).toString("hex")
);

// Convert to string and trim any whitespace
let content = buffer.toString("utf8");

// Remove any BOM or invisible characters at the beginning
content = content.replace(/^\uFEFF/, ""); // Remove BOM
content = content.replace(/^[\u200B-\u200D\uFEFF]/, ""); // Remove zero-width characters

// Ensure the file starts with @use
if (!content.trim().startsWith("@use")) {
  console.log("ERROR: File does not start with @use after cleaning");
  process.exit(1);
}

// Write the cleaned content back
fs.writeFileSync(filePath, content, "utf8");

console.log("✅ Bookmark.scss has been fixed");
console.log(
  "New file first 20 bytes as hex:",
  fs.readFileSync(filePath).slice(0, 20).toString("hex")
);
