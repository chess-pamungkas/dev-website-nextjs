const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "src",
  "assets",
  "styles",
  "Bookmark.scss"
);

// Read the original content
const originalContent = fs.readFileSync(filePath, "utf8");

// Extract the content after the @use statements
const lines = originalContent.split("\n");
const useStatements = [];
const otherContent = [];

let foundNonUse = false;
for (const line of lines) {
  if (!foundNonUse && line.trim().startsWith("@use")) {
    useStatements.push(line.trim());
  } else {
    foundNonUse = true;
    otherContent.push(line);
  }
}

// Create new content with @use statements at the very beginning, no blank lines
const newContent = useStatements.join("\n") + "\n" + otherContent.join("\n");

// Write with explicit UTF-8 encoding, no BOM
fs.writeFileSync(filePath, newContent, { encoding: "utf8", flag: "w" });

console.log("✅ Bookmark.scss has been completely recreated");
console.log("First few lines:");
console.log(newContent.split("\n").slice(0, 5).join("\n"));

// Verify the file starts correctly
const verifyContent = fs.readFileSync(filePath, "utf8");
const firstLine = verifyContent.split("\n")[0];
console.log("\nVerification:");
console.log("First line:", JSON.stringify(firstLine));
console.log("Starts with @use:", firstLine.trim().startsWith("@use"));
