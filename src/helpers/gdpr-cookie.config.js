export const NECESSARY_COOKIE_KEY = "necessary";
export const PERFORMANCE_COOKIE_KEY = "performance";
export const SEGMENTATION_COOKIE_KEY = "segmentation";

export const NECESSARY_COOKIE = {
  title: "cookie-necessary",
  categoryKey: NECESSARY_COOKIE_KEY,
  initialValue: true,
  canBeChanged: false,
};

export const PERFORMANCE_COOKIE = {
  title: "cookie-performance",
  categoryKey: PERFORMANCE_COOKIE_KEY,
  initialValue: true,
  canBeChanged: true,
};

export const SEGMENTATION_COOKIE = {
  title: "cookie-segmentation",
  categoryKey: SEGMENTATION_COOKIE_KEY,
  initialValue: true,
  canBeChanged: true,
};

export const GDPR_COOKIE_CATEGORIES = [
  NECESSARY_COOKIE,
  PERFORMANCE_COOKIE,
  SEGMENTATION_COOKIE,
];

export const DEFAULT_COOKIE_CONSENT = {
  [NECESSARY_COOKIE_KEY]: true,
  [PERFORMANCE_COOKIE_KEY]: true,
  [SEGMENTATION_COOKIE_KEY]: true,
};

export const COOKIE_CONSENT_KEY = "cookieConsent";
export const IS_SHOW_COOKIE_POPUP_KEY = "isShowCookiePopup";
export const LAST_LANGUAGE_KEY = "lastLanguage";

export const GLOBAL_COOKIE_PATH = "/";
export const DEFAULT_COOKIE_AGE = 60 * 60 * 24 * 30 * 12 * 2;

export const REDIRECT_OR_BANNED_POPUP_SHOWN_KEY = "redirectOrBannedPopupShown";
