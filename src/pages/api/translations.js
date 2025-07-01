// API route to handle translations
export default function handler(req, res) {
  const { locale } = req.query;

  if (!locale) {
    return res.status(400).json({ error: "Locale parameter is required" });
  }

  try {
    // Import the translation file for the requested locale
    const translations = require(`../../locales/${locale}/common.json`);
    res.status(200).json(translations);
  } catch (error) {
    console.error(`Error loading translations for locale ${locale}:`, error);
    res
      .status(404)
      .json({ error: `Translations not found for locale: ${locale}` });
  }
}
