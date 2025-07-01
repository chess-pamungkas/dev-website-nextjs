let locales = require("../../locales/en/index.json");
let fs = require("fs");

let fsaLocales = {};
let OnlyFsaLocales = {};
let cysecLocales = {};
let onlyCysecLocales = {};
let otherEntitiesLocales = {};

// Find only FSA specific keys and all keys related to FSA
Object.keys(locales).forEach((key) => {
  if (key.endsWith("-fsa")) {
    OnlyFsaLocales[key] = locales[key];
    fsaLocales[key] = locales[key];
  } else if (!key.endsWith("-cysec") && !key.endsWith("--global-only")) {
    fsaLocales[key] = locales[key];
  }
});

// Find only CYSEC specific keys and all keys related to CYSEC
Object.keys(locales).forEach((key) => {
  if (key.endsWith("-cysec")) {
    onlyCysecLocales[key] = locales[key];
    cysecLocales[key] = locales[key];
  } else if (!key.endsWith("-fsa") && !key.endsWith("--global-only")) {
    cysecLocales[key] = locales[key];
  }
});

Object.keys(locales).forEach((key) => {
  if (key.endsWith("--global-only")) {
    otherEntitiesLocales[key] = locales[key];
  }
  // add more logic if needed
});

fs.writeFile(
  "src/scripts/split-locales/splitted-locales/fsa-locales.json",
  JSON.stringify(fsaLocales, null, "\t"),
  (e) => {
    console.log(e);
  }
);
fs.writeFile(
  "src/scripts/split-locales/splitted-locales/cysec-locales.json",
  JSON.stringify(cysecLocales, null, "\t"),
  (e) => {
    console.log(e);
  }
);
fs.writeFile(
  "src/scripts/split-locales/splitted-locales/only-fsa-locales.json",
  JSON.stringify(OnlyFsaLocales, null, "\t"),
  (e) => {
    console.log(e);
  }
);
fs.writeFile(
  "src/scripts/split-locales/splitted-locales/only-cysec-locales.json",
  JSON.stringify(onlyCysecLocales, null, "\t"),
  (e) => {
    console.log(e);
  }
);
fs.writeFile(
  "src/scripts/split-locales/splitted-locales/other-entities-locales.json",
  JSON.stringify(otherEntitiesLocales, null, "\t"),
  (e) => {
    console.log(e);
  }
);
