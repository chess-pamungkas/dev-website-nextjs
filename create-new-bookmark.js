const fs = require("fs");
const path = require("path");

const filePath = path.join(
  __dirname,
  "src",
  "assets",
  "styles",
  "Bookmark2.scss"
);

// Create completely new content from scratch
const newContent = `@use "vars" as *;
@use "mixins" as *;

.bookmark {
  position: fixed;
  right: -5px;
  bottom: 250px;
  z-index: 8;
  padding: 10px;

  transition:
    background-color 0.3s,
    width 0.3s;

  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  .button-link {
    cursor: pointer;
    border: none;
    outline: none;
    background: transparent;
    padding: 0;
    text-decoration: none;
    color: map-get($colors, "white");
    background: map-get($colors, "red");
    display: block;
    text-align: center;
    text-transform: uppercase;
    font-weight: 900;
    font-size: 12px;
    border-radius: 31px;

    line-height: 31px;
    width: 190px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    transition: all ease-in 0.4s;
    min-width: -webkit-fit-content;
    min-width: -moz-fit-content;
    min-width: fit-content;
    padding-left: 20px;
    padding-right: 20px;
  }
  &-button-link {
    color: map-get($colors, "white");

    &.button-link--disabled {
      // ... styles for the disabled state of this specific button link ...
    }
  }

  &.closed {
    background-color: rgba(204, 204, 204, 0.4);
    border-radius: 31%;
    width: 0px;
    height: 30px;

    &.text {
      pointer-events: none;
      opacity: 1;
    }
  }

  .text {
    pointer-events: none;
    width: 16px;
    height: 16px;
    justify-content: center;
    align-items: center;
    color: map.get($colors, "red");
  }
  .shaking {
    animation: shake 0.5s ease-in-out infinite;
  }

  @keyframes shake {
    0%,
    100% {
      transform: translateX(0);
    }
    25%,
    75% {
      transform: translateX(-2px);
    }
    50% {
      transform: translateX(2px);
    }
  }
  &.expanded {
    color: map-get($colors, "white");
    width: 120px;
    border-radius: 20px;
  }

  &.hidden {
    display: none;
  }

  @media (min-width: 769px) {
    display: none;
  }
  @keyframes blink {
    0% {
      opacity: 0.2;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0.2;
    }
  }

  .blinking {
    animation: blink 1s infinite;
  }
}`;

// Delete the old file and create a new one
if (fs.existsSync(filePath)) {
  fs.unlinkSync(filePath);
}

// Write the new file
fs.writeFileSync(filePath, newContent, "utf8");

console.log("✅ Created completely new Bookmark2.scss file");
console.log("First few lines:");
console.log(newContent.split("\n").slice(0, 5).join("\n"));

// Verify
const verifyContent = fs.readFileSync(filePath, "utf8");
const firstLine = verifyContent.split("\n")[0];
console.log("\nVerification:");
console.log("First line:", JSON.stringify(firstLine));
console.log("Starts with @use:", firstLine.trim().startsWith("@use"));
