import { LAST_LANGUAGE_KEY } from "../gdpr-cookie.config";
import {
  LANG_SELECT_OPTIONS,
  PORTAL_LANGUAGES_MAP,
} from "../lang-options.config";
import { isBrowser } from "./is-browser";
import Cookies from "universal-cookie";

const cookies = new Cookies();

export const defaultLang = LANG_SELECT_OPTIONS.find(
  ({ isDefault }) => isDefault
);

const findLangById = (languageId) => {
  console.log(`[Language Service] findLangById called with: ${languageId}`);
  const found = LANG_SELECT_OPTIONS.find((item) => item.id === languageId);
  console.log(`[Language Service] Found language:`, found);
  const result = found || defaultLang;
  console.log(`[Language Service] Returning:`, result);
  return result;
};

const getLangFromUrl = () => {
  // used to find the /{ln}/ part and extract the language
  if (isBrowser()) {
    const { pathname } = window.location;

    // Handle root path
    if (pathname === "/") {
      return null;
    }

    // Match language code at the beginning of the path
    const matches = pathname.match(/^\/([a-z]{2})(\/|$)/);
    if (matches) {
      const langCode = matches[1];
      return langCode;
    }
  }
  return null;
};

const getLangFromBrowser = () => {
  if (isBrowser()) {
    // Get browser language
    const browserLang = navigator.language || navigator.userLanguage;
    console.log(`[Language Service] Browser language: ${browserLang}`);

    // Map browser language to our supported languages
    const langMap = {
      id: "id", // Indonesian
      "id-ID": "id",
      en: "en", // English
      "en-US": "en",
      "en-GB": "en",
      fr: "fr", // French
      "fr-FR": "fr",
      pt: "br", // Portuguese (Brazil)
      "pt-BR": "br",
      vi: "vn", // Vietnamese
      "vi-VN": "vn",
      th: "th", // Thai
      "th-TH": "th",
      es: "es", // Spanish
      "es-ES": "es",
      it: "it", // Italian
      "it-IT": "it",
      zh: "cn", // Chinese (Simplified)
      "zh-CN": "cn",
      "zh-TW": "zh", // Chinese (Traditional)
      ja: "jp", // Japanese
      "ja-JP": "jp",
      ms: "my", // Malay
      "ms-MY": "my",
      ar: "ar", // Arabic
      "ar-SA": "ar",
    };

    // Try to match the full language code first, then the base language
    const matchedLang =
      langMap[browserLang] || langMap[browserLang.split("-")[0]];
    console.log(
      `[Language Service] Mapped browser language: ${browserLang} -> ${matchedLang}`
    );
    return matchedLang;
  }
  return null;
};

const langFromCookie = cookies.get(LAST_LANGUAGE_KEY);

export const changeI18nLanguage = (selectedLang) => {
  // used to update the actual path with the selected language (e.g. from /forex to /fr/forex)
  if (isBrowser()) {
    const { pathname, search } = window.location;

    // Don't navigate if we're already on the correct path
    if (pathname.startsWith(`/${selectedLang.id}/`)) {
      return;
    }

    // Don't navigate if the current path already contains the language code
    if (pathname.includes(`/${selectedLang.id}`)) {
      return;
    }

    // IMPORTANT: Don't change URL for popup-registration page
    // This prevents duplication of language paths in the URL
    if (pathname.includes("popup-registration")) {
      return; // Don't navigate for popup-registration page
    }

    // Remove existing language prefix if present
    let cleanPath = pathname.replace(/^\/[a-z]{2}\//, "/");

    // Ensure clean path starts with /
    if (!cleanPath.startsWith("/")) {
      cleanPath = "/" + cleanPath;
    }

    // Remove trailing slash if it's not the root path
    if (cleanPath !== "/" && cleanPath.endsWith("/")) {
      cleanPath = cleanPath.slice(0, -1);
    }

    // Construct new path with language prefix
    const navigatePath = selectedLang.URIPart + cleanPath;

    // Only navigate if the path is actually different
    const newPath = `${navigatePath}${search}`;
    if (window.location.href !== newPath) {
      console.log(
        `[Language Service] Navigating from ${window.location.href} to ${newPath}`
      );

      // Use history.pushState to avoid full page reload
      // This prevents infinite loops while still updating the URL
      window.history.pushState(null, "", newPath);

      // Trigger a custom event to notify that the URL has changed
      window.dispatchEvent(new PopStateEvent("popstate"));
    }
  }
};

export const detectInitialLanguage = (recommendedLanguage) => {
  // Language resolution order: language from URL -> language from cookie -> browser language -> recommended language (from backend config) -> default (en)
  const urlLang = getLangFromUrl();
  const cookieLang = langFromCookie;
  const browserLang = getLangFromBrowser();

  console.log(
    `[Language Service] Detection: URL=${urlLang}, Cookie=${cookieLang}, Browser=${browserLang}, Recommended=${recommendedLanguage}`
  );

  // Determine which language to use based on priority
  // Give API recommendation higher priority than browser language
  const finalLangId =
    urlLang || cookieLang || recommendedLanguage || browserLang;
  console.log(`[Language Service] Final language ID: ${finalLangId}`);

  const detectedLang = findLangById(finalLangId);

  console.log(`[Language Service] Final detected language:`, detectedLang);
  return detectedLang;
};

export const setLangParam = (selectedLanguage) => {
  // Safety check: if selectedLanguage is undefined, use default language
  if (!selectedLanguage || !selectedLanguage.id) {
    const defaultLang = LANG_SELECT_OPTIONS.find(({ isDefault }) => isDefault);
    selectedLanguage = defaultLang;
  }

  const languageCode = PORTAL_LANGUAGES_MAP[selectedLanguage.id];

  // New version: Uses 'language' as the query parameter name
  return `?language=${languageCode}`;
};
