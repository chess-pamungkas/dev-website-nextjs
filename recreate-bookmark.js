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
    useStatements.push(line);
  } else {
    foundNonUse = true;
    otherContent.push(line);
  }
}

// Create new content with @use statements at the very beginning
const newContent = useStatements.join("\n") + "\n" + otherContent.join("\n");

// Write the new content
fs.writeFileSync(filePath, newContent, "utf8");

console.log("✅ Bookmark.scss has been recreated");
console.log("First few lines:");
console.log(newContent.split("\n").slice(0, 5).join("\n"));
