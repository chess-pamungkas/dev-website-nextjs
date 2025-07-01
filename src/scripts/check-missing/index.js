// Don't forget to change the imports before using
const enLocales = require("../../locales/en/index.json");
const translations = require("../../locales/vn/index.json");
let fs = require("fs");

let missing = {};

Object.keys(enLocales).forEach((key) => {
  if (
    !translations[key] &&
    !key.endsWith("-accent") &&
    enLocales[key] !== "" &&
    !enLocales[key].startsWith("Lorem ipsum")
  ) {
    missing[key] = enLocales[key];
  }
});

Object.keys(translations).forEach((key) => {
  if (!translations[key]) {
    missing[key] = enLocales[key];
  }
  if (
    translations[key].endsWith("(TRANSLATION REQUIRED!)") ||
    translations[key].endsWith("(TR!)") ||
    translations[key].endsWith("(TR)")
  ) {
    missing[key] = translations[key];
  }
});

fs.writeFile(
  "src/scripts/check-missing/missing.json",
  JSON.stringify(missing, null, "\t"),
  (e) => {
    console.log(e);
  }
);
