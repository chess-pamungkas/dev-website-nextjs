import { LANG_SELECT_OPTIONS } from "../lang-options.config";
import { isBrowser } from "./is-browser";

const LANG_CODE_CHARS_COUNT = 2;

export const detectBrowserLanguage = () => {
  const language =
    (isBrowser() &&
      window.navigator.languages &&
      window.navigator.languages[0]) ||
    (isBrowser() && window.navigator.language) ||
    LANG_SELECT_OPTIONS[0].id;
  return language.substring(0, LANG_CODE_CHARS_COUNT);
};
