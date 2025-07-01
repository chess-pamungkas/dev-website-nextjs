import React, { useContext, useEffect, useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import CookieContext from "../../context/cookie-context";
import { useTranslationWithVariables } from "../../helpers/hooks/use-translation-with-vars";
import { isBrowser } from "../../helpers/services/is-browser";
import CommonContext from "../../context/common-context";

const CookiesPopup = ({ className }) => {
  const { t } = useTranslationWithVariables();
  const {
    handleOpenGDPRPopup,
    acceptAllCookies,
    isShowCookiePopup,
    handleCloseCookiePopup,
  } = useContext(CookieContext);
  const { sectionOptions } = useContext(CommonContext);
  const isRiskWarningNotification = sectionOptions?.isRiskWarningNotification;

  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (isBrowser()) {
      setIsReady(true);
    }
  }, []);

  const acceptAll = () => {
    acceptAllCookies();
    handleCloseCookiePopup();
  };

  const learnMore = () => {
    handleCloseCookiePopup();
    handleOpenGDPRPopup();
  };

  return (
    <div
      className={cn(
        "cookies-popup",
        { "cookies-popup--active": isShowCookiePopup && isReady },
        { "cookies-popup--higher-if-collapsed": isRiskWarningNotification },
        className
      )}
    >
      <div className="cookies-popup__header" />
      <div className="cookies-popup__body">
        <span>{t("cookie-popup-body")}</span>
      </div>
      <div className="cookies-popup__buttons">
        <button
          type="button"
          className="cookies-popup__more-btn"
          onClick={learnMore}
        >
          {t("cookie-popup-bnt-learn-more")}
        </button>
        <button
          type="button"
          className="cookies-popup__accept-btn"
          onClick={acceptAll}
        >
          {t("cookie-popup-bnt-accept-all")}
        </button>
      </div>
    </div>
  );
};

CookiesPopup.propTypes = {
  className: PropTypes.string,
};

export default CookiesPopup;
