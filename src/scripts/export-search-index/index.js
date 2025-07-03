const fs = require("fs-extra");
const path = require("path");

// Search Index Export Script for Next.js Migration
// This script generates a search index from the website content

// Configuration
const LOCALES_DIR = "./src/locales";
const OUTPUT_FILE = "./src/data/search-index.json";

// Supported languages (based on the locales directory)
const SUPPORTED_LANGUAGES = [
  "en",
  "es",
  "it",
  "cn",
  "zh",
  "fr",
  "vn",
  "th",
  "id",
  "jp",
  "br",
  "my",
  "ar",
];

// Search index structure
const searchIndex = {};

// Helper function to extract translation keys from code
function extractTranslationKeys(content) {
  const translationMatches = content.match(/t\(['"`]([^'"`]+)['"`]\)/g);
  if (!translationMatches) return [];
  return translationMatches
    .map((match) => match.replace(/t\(['"`]/, "").replace(/['"`]\)/, ""))
    .filter((key) => key.length > 0);
}

// Helper function to process a file and extract translation keys
async function processFile(filePath, language = "en") {
  try {
    const content = await fs.readFile(filePath, "utf8");
    const translationKeys = extractTranslationKeys(content);
    translationKeys.forEach((key) => {
      if (!searchIndex[language]) {
        searchIndex[language] = [];
      }
      // Store as key only, value will be added from locale
      searchIndex[language].push(key);
    });
    return { translationKeys };
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error.message);
    return { translationKeys: [] };
  }
}

// Helper function to find all JavaScript files
async function findJsFiles(dir) {
  const files = [];
  try {
    const items = await fs.readdir(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stat = await fs.stat(fullPath);
      if (stat.isDirectory()) {
        files.push(...(await findJsFiles(fullPath)));
      } else if (item.endsWith(".js") || item.endsWith(".jsx")) {
        files.push(fullPath);
      }
    }
  } catch (error) {
    // Directory doesn't exist or can't be read
  }
  return files;
}

// Helper function to load locale files
async function loadLocaleFiles() {
  const locales = {};
  for (const lang of SUPPORTED_LANGUAGES) {
    try {
      const localePath = path.join(LOCALES_DIR, lang, "common.json");
      if (await fs.pathExists(localePath)) {
        const localeData = await fs.readJson(localePath);
        locales[lang] = localeData;
      }
    } catch (error) {
      // Ignore missing locale
    }
  }
  return locales;
}

// Main export function
async function exportSearchIndex() {
  console.log("🚀 Starting Search Index Export...\n");
  try {
    // Initialize search index
    SUPPORTED_LANGUAGES.forEach((lang) => {
      searchIndex[lang] = [];
    });
    // Load locale files
    const locales = await loadLocaleFiles();
    // For each language, output entries in the format Gatsby expects
    Object.keys(locales).forEach((lang) => {
      const localeData = locales[lang] || {};
      const entries = Object.entries(localeData)
        .filter(
          ([key, value]) => typeof value === "string" && key.includes("_")
        )
        .map(([key, value]) => {
          const page = key.split("_")[0];
          return `${page === "index" ? "/" : "/" + page + "/"}_${value}`;
        });
      searchIndex[lang] = Array.from(new Set(entries));
      console.log(
        `[${lang}] Added ${searchIndex[lang].length} entries from locale`
      );
    });
    // Write the search index to file
    await fs.writeJson(OUTPUT_FILE, searchIndex, { spaces: 2 });
    console.log(`✅ Search index written to ${OUTPUT_FILE}\n`);
  } catch (error) {
    console.error("❌ Search Index Export failed:", error);
    process.exit(1);
  }
}

// Run the export
exportSearchIndex();
