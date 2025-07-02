import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { useRouter } from "next/router";
import Cookies from "universal-cookie";

// Import language configuration using CommonJS
const {
  list,
  defaultLangKey,
  uniqueList,
  LANG_CONFIG,
  CYSEC_LANG_CONFIG,
} = require("../helpers/lang.config");

// Import all locale files
import en from "../locales/en/common.json";
import fr from "../locales/fr/common.json";
import br from "../locales/br/common.json";
import vn from "../locales/vn/common.json";
import th from "../locales/th/common.json";
import es from "../locales/es/common.json";
import it from "../locales/it/common.json";
import cn from "../locales/cn/common.json";
import zh from "../locales/zh/common.json";
import id from "../locales/id/common.json";
import jp from "../locales/jp/common.json";
import my from "../locales/my/common.json";
import ar from "../locales/ar/common.json";

const resources = {
  en: { common: en },
  fr: { common: fr },
  br: { common: br },
  vn: { common: vn },
  th: { common: th },
  es: { common: es },
  it: { common: it },
  cn: { common: cn },
  zh: { common: zh },
  id: { common: id },
  jp: { common: jp },
  my: { common: my },
  ar: { common: ar },
};

// Initialize i18n only if it hasn't been initialized yet
if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources,
    lng: defaultLangKey,
    fallbackLng: defaultLangKey,
    debug: false,

    interpolation: {
      escapeValue: false, // React already escapes values
    },

    // Namespace configuration
    defaultNS: "common",
    ns: ["common"],

    // Key separator configuration (matching your Gatsby setup)
    keySeparator: false,
    nsSeparator: false,

    // React i18next options
    react: {
      useSuspense: false, // This is important for SSR
    },
  });
}

// Cookie utilities
const cookies = new Cookies();
const LAST_LANGUAGE_KEY = "lastLanguage";

// Language configuration utilities
const getCurrentEntity = () => {
  return process.env.NEXT_PUBLIC_ENTITY || "FSA";
};

const getLanguageConfig = () => {
  const entity = getCurrentEntity();
  return entity === "FSA" ? LANG_CONFIG : CYSEC_LANG_CONFIG;
};

// Find language by ID
export const findLangById = (langId) => {
  const config = getLanguageConfig();
  return (
    config.find((lang) => lang.id === langId) ||
    config.find((lang) => lang.isDefault)
  );
};

// Get language from URL
export const getLangFromUrl = (pathname) => {
  if (typeof window !== "undefined") {
    const path = pathname || window.location.pathname;
    const matches = path.match(/\/[a-z]{2}\//);
    if (matches) {
      const langCode = matches[0].slice(1, 3);
      return langCode;
    }
  }
  return null;
};

// Detect initial language
export const detectInitialLanguage = (recommendedLanguage) => {
  const urlLang = getLangFromUrl();
  const cookieLang = cookies.get(LAST_LANGUAGE_KEY);
  const detectedLang =
    urlLang || cookieLang || recommendedLanguage || defaultLangKey;

  return findLangById(detectedLang);
};

// Hook to get current locale from URL or cookie
export const useLocale = () => {
  const router = useRouter();

  // Get language from URL first
  const urlLang = getLangFromUrl(router.asPath);
  if (urlLang) {
    return urlLang;
  }

  // Fallback to cookie or default
  const cookieLang = cookies.get(LAST_LANGUAGE_KEY);
  return cookieLang || defaultLangKey;
};

// Hook to get current language object
export const useCurrentLanguage = () => {
  const locale = useLocale();
  return findLangById(locale);
};

// Hook for language switching with URL path handling
export const useLanguageSwitch = () => {
  const router = useRouter();

  return (newLanguage) => {
    console.log(`[useLanguageSwitch] Called with language: ${newLanguage.id}`);
    const { pathname, search } = router;
    console.log(`[useLanguageSwitch] Current pathname: ${pathname}`);

    // Don't change URL for popup-registration page
    if (pathname.includes("popup-registration")) {
      console.log(`[useLanguageSwitch] Skipping popup-registration page`);
      return;
    }

    // Update cookie
    cookies.set(LAST_LANGUAGE_KEY, newLanguage.id, { path: "/" });

    // Update document language attribute
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", newLanguage.id);
    }

    // IMPORTANT: Change i18n language immediately
    if (i18n && i18n.language !== newLanguage.id) {
      console.log(
        `[i18n] Changing language from ${i18n.language} to ${newLanguage.id}`
      );
      i18n.changeLanguage(newLanguage.id);
      console.log(`[i18n] Language changed successfully to: ${i18n.language}`);
    } else {
      console.log(`[i18n] Language already set to: ${newLanguage.id}`);
    }
  };
};

// Hook to change locale with proper URL handling
export const useChangeLocale = () => {
  const router = useRouter();

  return (newLocale) => {
    const { pathname, asPath, query } = router;

    // Update cookie
    cookies.set(LAST_LANGUAGE_KEY, newLocale, { path: "/" });

    // Update document language attribute
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", newLocale);
    }

    // IMPORTANT: Change i18n language immediately
    if (i18n && i18n.language !== newLocale) {
      console.log(
        `[i18n] Changing language from ${i18n.language} to ${newLocale}`
      );
      i18n.changeLanguage(newLocale);
    }

    // Navigate to new locale
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };
};

// Hook to get language parameter for API calls
export const useLanguageParam = () => {
  const currentLang = useCurrentLanguage();

  // Map language codes for API compatibility
  const PORTAL_LANGUAGES_MAP = {
    en: "en",
    fr: "fr",
    br: "pt",
    vn: "vi",
    th: "th",
    es: "es",
    it: "it",
    cn: "zh",
    zh: "zh-TW",
    id: "id",
    jp: "ja",
    my: "ms",
    ar: "ar",
  };

  const languageCode = PORTAL_LANGUAGES_MAP[currentLang.id] || currentLang.id;
  return `?language=${languageCode}`;
};

// Initialize language on app start
export const initializeLanguage = () => {
  if (typeof window !== "undefined") {
    const currentLang = detectInitialLanguage();
    const currentPath = window.location.pathname;

    // Set document language
    document.documentElement.setAttribute("lang", currentLang.id);

    // Set i18n language
    i18n.changeLanguage(currentLang.id);

    // Handle URL if it doesn't match the detected language
    const urlLang = getLangFromUrl(currentPath);
    if (!urlLang && currentLang.id !== defaultLangKey) {
      const newPath = `${currentLang.URIPart}${currentPath}`;
      window.history.replaceState(null, "", newPath);
    }
  }
};

// Export language configuration
export { list, defaultLangKey, uniqueList, LANG_CONFIG, CYSEC_LANG_CONFIG };
export default i18n;
