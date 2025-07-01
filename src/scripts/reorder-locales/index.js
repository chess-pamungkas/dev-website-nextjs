let sourceLocales = require("../../locales/en/index.json");
let targetLocales = require("../../locales/br/index.json");
let fs = require("fs");

let reorderedLocales = {};

Object.keys(sourceLocales).forEach((key) => {
  reorderedLocales[key] = targetLocales[key] || sourceLocales[key] + "(TR!)";
});

fs.writeFile(
  "src/scripts/reorder-locales/result.json",
  JSON.stringify(reorderedLocales, null, "\t"),
  (e) => {
    console.log(e);
  }
);
