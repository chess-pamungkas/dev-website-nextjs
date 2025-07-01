import { REDIRECT_OR_BANNED_POPUP_SHOWN_KEY } from "../gdpr-cookie.config";
import { isBrowser } from "./is-browser";

export const setRedirectOrBannedPopupShown = () => {
  if (isBrowser()) {
    window.sessionStorage.setItem(REDIRECT_OR_BANNED_POPUP_SHOWN_KEY, true);
  }
};
