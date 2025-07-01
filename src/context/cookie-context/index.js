import React, { createContext, useContext, useEffect, useState } from "react";
import Cookies from "universal-cookie";
import PropTypes from "prop-types";
import entities from "../../enums/entities";
import { CONSENT_TYPES } from "../../helpers/consent-types.config";
import {
  DEFAULT_COOKIE_CONSENT,
  COOKIE_CONSENT_KEY,
  IS_SHOW_COOKIE_POPUP_KEY,
  GLOBAL_COOKIE_PATH,
  DEFAULT_COOKIE_AGE,
} from "../../helpers/gdpr-cookie.config";
import { useModal } from "../../helpers/hooks/use-modal";
import { postClientConsent } from "../../helpers/services/client-consent-service";
import ClientResolverContext from "../client-resolver-context";
import { currentEntity } from "../../helpers/entity-resolver";

const CookieContext = createContext({});

export const CookieProvider = ({ children }) => {
  const cookies = new Cookies();

  const showCookiePopup = cookies.get(IS_SHOW_COOKIE_POPUP_KEY) === undefined;

  const {
    isShow: isShowCookiePopup,
    handleOpen: handleOpenCookiePopup,
    handleClose: handleCloseCookiePopup,
  } = useModal(showCookiePopup, false);

  const {
    isShow: isShowGDPRPopup,
    handleOpen: handleOpenGDPRPopup,
    handleClose: handleCloseGDPRPopup,
  } = useModal();

  const [cookieConsent, setCookieConsent] = useState(
    cookies.get(COOKIE_CONSENT_KEY) || {}
  );
  const { clientConfig } = useContext(ClientResolverContext);

  const getCookie = (cookieKey) => {
    return cookies.get(cookieKey);
  };

  const setCookie = (cookieKey, cookieValue, cookieType) => {
    if (cookieConsent[cookieType]) {
      cookies.set(cookieKey, cookieValue, {
        path: GLOBAL_COOKIE_PATH,
        maxAge: DEFAULT_COOKIE_AGE,
      });
    }
  };

  const acceptCookies = (acceptedCookies) => {
    cookies.set(COOKIE_CONSENT_KEY, acceptedCookies, {
      path: GLOBAL_COOKIE_PATH,
      maxAge: DEFAULT_COOKIE_AGE,
    });
    setCookieConsent(acceptedCookies);
    cookies.set(IS_SHOW_COOKIE_POPUP_KEY, false, {
      path: GLOBAL_COOKIE_PATH,
      maxAge: DEFAULT_COOKIE_AGE,
    });
    const consent = `${CONSENT_TYPES["cookie"]} ${Object.keys(acceptedCookies)
      .filter((item) => acceptedCookies[item])
      .join(", ")}`;
    if (clientConfig?.ipAddress) {
      postClientConsent(clientConfig.ipAddress, consent);
    }
  };

  const acceptAllCookies = () => {
    acceptCookies(DEFAULT_COOKIE_CONSENT);
  };

  useEffect(() => {
    handleCloseCookiePopup();
    if (
      clientConfig?.memberOfEU !== undefined &&
      currentEntity === entities.FSA &&
      cookies.get(COOKIE_CONSENT_KEY) === undefined
    ) {
      if (clientConfig.memberOfEU) {
        handleOpenCookiePopup();
      } else {
        acceptAllCookies();
      }
    }
  }, [clientConfig, currentEntity]);

  return (
    <CookieContext.Provider
      value={{
        cookies,
        getCookie,
        setCookie,
        isShowGDPRPopup,
        handleCloseGDPRPopup,
        handleOpenGDPRPopup,
        isShowCookiePopup,
        handleOpenCookiePopup,
        handleCloseCookiePopup,
        cookieConsent,
        acceptCookies,
        acceptAllCookies,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

CookieProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default CookieContext;
