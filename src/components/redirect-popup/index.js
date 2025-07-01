import React, { useContext } from "react";
import PropTypes from "prop-types";
import Popup from "../shared/popup";
import cn from "classnames";
import { postClientConsent } from "../../helpers/services/client-consent-service";
import { CONSENT_TYPES } from "../../helpers/consent-types.config";
import { useTranslationWithVariables } from "../../helpers/hooks/use-translation-with-vars";
import { setRedirectOrBannedPopupShown } from "../../helpers/services/set-redirect-or-banned-popup-shown";
import ClientResolverContext from "../../context/client-resolver-context";
import { redirectToOppositeEntity } from "../../helpers/services/redirect-to-opposite-entity";

const RedirectOrBannedPopup = ({
  isPopupOpen,
  handleClose,
  isBannedPopup,
  setIsRecommendedRedirectNotification,
}) => {
  const { t } = useTranslationWithVariables();
  const { clientConfig } = useContext(ClientResolverContext);

  // Add defensive check for clientConfig
  const countryName = clientConfig?.countryName || "Unknown";
  const ipAddress = clientConfig?.ipAddress || "127.0.0.1";

  const bannedPopupDescription = (country) => (
    <>
      <p className="popup__paragraph">
        {t("popup-banned-description-part1")}&nbsp;
        <span className="highlighted-in-red">{country}</span>
        {t("popup-banned-description-part2")}&nbsp;
        <span className="highlighted-in-red">{t("fsa-entity-name")}</span>&nbsp;
        {t("popup-banned-description-part3")}
      </p>
      <p className="popup__paragraph">{t("popup-banned-description-part4")}</p>
    </>
  );

  const softRedirectionDescription = (country) => (
    <>
      <p className="popup__paragraph">
        {t("popup-redirect-description-part1")}&nbsp;
        <span className="highlighted-in-red">{country}</span>
        {". "}
        {t("popup-redirect-description-part2")}&nbsp;
        <span className="highlighted-in-red">{t("fsa-entity-name")}</span>&nbsp;
        {t("popup-redirect-description-part3")}
      </p>
      <p className="popup__paragraph">
        {t("popup-redirect-description-part4")}&nbsp;
      </p>
    </>
  );

  const getButtons = () => {
    if (isBannedPopup) {
      return [
        {
          text: t("popup-banned-close-btn"),
          onClick: () => {
            setRedirectOrBannedPopupShown();
            handleClose(false);
            postClientConsent(ipAddress, CONSENT_TYPES["bannedClose"]);
          },
        },
        {
          text: t("popup-banned-continue-btn"),
          onClick: () => {
            setRedirectOrBannedPopupShown();
            handleClose(false);
            postClientConsent(ipAddress, CONSENT_TYPES["bannedContinue"]);
          },
        },
      ];
    } else {
      return [
        {
          text: t("popup-redirect-dont-confirm-btn"),
          onClick: () => {
            postClientConsent(ipAddress, CONSENT_TYPES["redirectDoNotConfirm"]);
            redirectToOppositeEntity();
          },
        },
        {
          text: t("popup-redirect-confirm-btn"),
          onClick: () => {
            setRedirectOrBannedPopupShown();
            postClientConsent(ipAddress, CONSENT_TYPES["redirectConfirm"]);
            setIsRecommendedRedirectNotification(false);
            handleClose(false);
          },
        },
      ];
    }
  };

  const buildButtons = (buttons) => {
    return (
      <div className="popup__buttons">
        {buttons.map((button, i) => (
          <div className="popup__button-wrapper" key={`redirectButton${i}`}>
            <button
              type="button"
              className="popup__button"
              onClick={button.onClick}
            >
              {button.text}
            </button>
          </div>
        ))}
      </div>
    );
  };

  return (
    <Popup
      isPopupOpen={isPopupOpen}
      className={cn("popup--redirect", {
        "popup--banned": isBannedPopup,
      })}
    >
      <div className="popup__title">{t("popup-title")}</div>
      <div className="popup__text">
        {isBannedPopup && bannedPopupDescription(countryName)}
        {!isBannedPopup && softRedirectionDescription(countryName)}
      </div>
      {buildButtons(getButtons())}
    </Popup>
  );
};

RedirectOrBannedPopup.propTypes = {
  isPopupOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  isBannedPopup: PropTypes.bool.isRequired,
  setIsRecommendedRedirectNotification: PropTypes.func.isRequired,
};

export default RedirectOrBannedPopup;
