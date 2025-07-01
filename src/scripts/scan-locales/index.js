const { readdirSync, readFileSync, lstatSync } = require("fs");
const path = require("path");
const locales = require("../../locales/en/index.json");

const checkIsKeyUsed = (source, key, usageObj) => {
  const results = readdirSync(source);
  results.forEach(function (result) {
    if (lstatSync(path.join(source, result)).isFile()) {
      if (readFileSync(path.join(source, result)).includes(key)) {
        usageObj.count += 1;
      }
    } else if (
      lstatSync(path.join(source, result)).isDirectory() &&
      result !== "locales" &&
      result !== "scripts"
    ) {
      checkIsKeyUsed(path.join(source, result), key, usageObj);
    }
  });
};

const root = process.cwd() + "\\src";
let total = 0;

console.log(`Scanning the EN locale file.....\n`);

Object.keys(locales).forEach((key) => {
  if (!key.endsWith("-fsa") && !key.endsWith("-cysec")) {
    let usageObj = {
      count: 0,
    };

    checkIsKeyUsed(root, key, usageObj);

    if (usageObj.count === 0) {
      console.log(`"${key}" - no usage found, can be removed`);
      total += 1;
    }
  }
});

console.log(`\nScan completed. Total unused keys found: ${total}`);
