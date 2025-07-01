const exampleLocales = require("../../locales/es/index.json");
const enLocales = require("../../locales/en/index.json");
const translations = require("./fr.json");
//TODO Check for the errors and let
let fs = require("fs");

let resultLocales = {};
let missing = {};

// Can be used to generate JSON with new translations.
// We just scan the existing locale (eg ES) and JSON with new translations.
// If some value in an existing locale is marked as (TRANSLATION REQUIRED!), then we add the EN value with this mark to the result, otherwise we just add the new value.
// It also generates a file with missing keys if they exist.
// Relevant only for translations, that was made using old EN keys.
Object.keys(exampleLocales).forEach((key) => {
  if (exampleLocales[key].endsWith("(TRANSLATION REQUIRED!)")) {
    resultLocales[key] = exampleLocales[key];
  } else {
    if (!translations[key]) {
      missing[key] = enLocales[key];
    }
    resultLocales[key] = translations[key];
  }
});

fs.writeFile(
  "src/scripts/apply-translation/res-fr.json",
  JSON.stringify(resultLocales, null, "\t"),
  (e) => {
    console.log(e);
  }
);

fs.writeFile(
  "src/scripts/apply-translation/missing-fr.json",
  JSON.stringify(missing, null, "\t"),
  (e) => {
    console.log(e);
  }
);
