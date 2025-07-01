import { useRouter } from "next/router";
import { isBrowser } from "./is-browser";
import { CAMPAIGN_PARAMS } from "./marketing-service";

export const IB_PARAMS = {
  r_code: "r_code", // New parameter
};

const getParamsFromUrl = () => {
  return new URLSearchParams(window.location.search);
};

export const getIBParamsAndSetToStorage = (router) => {
  if (isBrowser()) {
    const urlParams = getParamsFromUrl();
    const r_code = urlParams.get(IB_PARAMS.r_code);

    // Only handle if the URL starts with ?r_code= and we haven't processed it yet
    if (
      window.location.search.startsWith(`?${IB_PARAMS.r_code}=`) &&
      !sessionStorage.getItem("ib_processed")
    ) {
      if (r_code) {
        localStorage.setItem(IB_PARAMS.r_code, r_code);
        localStorage.removeItem(CAMPAIGN_PARAMS.campaign_code);
      }

      // Mark as processed to prevent infinite redirects
      sessionStorage.setItem("ib_processed", "true");

      // Remove param from URL without causing infinite redirects
      if (router && typeof router.replace === "function") {
        router.replace(window.location.pathname, undefined, { shallow: true });
      } else {
        // Use replaceState to avoid page reload and infinite redirects
        window.history.replaceState({}, "", window.location.pathname);
      }
    }
  }
};

export const setIBparamsToLink = () => {
  if (isBrowser()) {
    const r_code = localStorage.getItem(IB_PARAMS.r_code);

    // Check conditions and construct the query string accordingly
    if (r_code) {
      return `?${IB_PARAMS.r_code}=${r_code}`; // Only r_code
    }
  }

  return "";
};
