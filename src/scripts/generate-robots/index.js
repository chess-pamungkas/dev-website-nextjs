const { readdirSync, appendFile, lstatSync } = require("fs");
const path = require("path");
//TODO check the errors
// Use this script if you want to exclude some languages from search engines indexing
disallowedLanguages = [
  "ar",
  "my",
  "", // Should be used instead of English, cause it's default one without language code
  "id",
  "zh",
  "cn",
  "it",
  "es",
  "th",
  "vn",
  "br",
  "fr",
];

const pagesDir = process.cwd() + "\\src\\pages";
const outputFile = "src/scripts/generate-robots/robots.txt";

const generate = (source) => {
  const results = readdirSync(source);
  results.forEach((result) => {
    if (lstatSync(path.join(source, result)).isFile()) {
      const page = path
        .join(source, result)
        .replace(`${pagesDir}`, "")
        .replace(/\\/g, "/")
        .replace(".js", "");
      console.log(`Writing page: ${page}`);
      disallowedLanguages.forEach((language) =>
        appendFile(outputFile, `Disallow: ${language}${page}\n`, (e) => {
          console.log(e);
        })
      );
    } else if (lstatSync(path.join(source, result)).isDirectory()) {
      generate(path.join(source, result));
    }
  });
};

console.log(`Generating robots.txt file.....\n`);

generate(pagesDir);

console.log(`\nFinished, robots.txt generated`);
