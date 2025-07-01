import { useState, useContext, useEffect } from "react";
import ClientResolverContext from "../../context/client-resolver-context";
import { isBrowser } from "../services/is-browser";
import { REDIRECT_OR_BANNED_POPUP_SHOWN_KEY } from "../gdpr-cookie.config";

export const useEntityNotifications = (handlePopupOpen) => {
  const { clientConfig } = useContext(ClientResolverContext);

  const [isRiskWarningNotification, setIsRiskWarningNotification] =
    useState(false);
  const [
    isRecommendedRedirectNotification,
    setIsRecommendedRedirectNotification,
  ] = useState(false);
  const [isBannedPopup, setIsBannedPopup] = useState(false);

  useEffect(() => {
    // Set risk warning notification to false as default (FSA context)
    setIsRiskWarningNotification(false);

    if (
      clientConfig &&
      Object.keys(clientConfig).length &&
      clientConfig.recommendedRedirect &&
      isBrowser() &&
      typeof window !== "undefined" &&
      !window.sessionStorage.getItem(REDIRECT_OR_BANNED_POPUP_SHOWN_KEY)
    ) {
      setIsRecommendedRedirectNotification(true);
    }

    if (
      clientConfig &&
      Object.keys(clientConfig).length &&
      (clientConfig.banned || clientConfig.forceRedirectPopup) &&
      isBrowser() &&
      typeof window !== "undefined" &&
      !window.sessionStorage.getItem(REDIRECT_OR_BANNED_POPUP_SHOWN_KEY)
    ) {
      if (handlePopupOpen) {
        handlePopupOpen();
      }
      setIsBannedPopup(
        clientConfig.banned &&
          !clientConfig.recommendedRedirect &&
          !clientConfig.forceRedirectPopup
      );
    }
  }, [clientConfig, handlePopupOpen]);

  return {
    isRiskWarningNotification,
    isRecommendedRedirectNotification,
    setIsRecommendedRedirectNotification,
    isBannedPopup,
  };
};
