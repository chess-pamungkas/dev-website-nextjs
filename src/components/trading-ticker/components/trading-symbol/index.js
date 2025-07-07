import React, { useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import { useLanguageParam } from "../../../../helpers/hooks/use-language-param";
const upArrow = "/images/trading-ticker/up-arrow.svg";
const downArrow = "/images/trading-ticker/down-arrow.svg";
import ButtonPopup from "../../../shared/button-popup";
import { ShowRegistrationPopup } from "../../../../helpers/constants";

const TradingSymbol = ({ className, symbol, direction, bid, ask, spread }) => {
  const isRTL = useRtlDirection();
  const { t } = useTranslationWithVariables();
  const langParam = useLanguageParam(); // Get the language parameter
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const handleShowRegistrationPopup = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  return (
    <div
      className={cn("trading-symbol", className, {
        "trading-symbol--rtl": isRTL,
      })}
    >
      <div className="trading-symbol__block">
        <div className="trading-symbol__title-wrapper">
          <p className="trading-symbol__title">{symbol}</p>
          <img
            src={
              direction === "up"
                ? typeof upArrow === "string"
                  ? upArrow
                  : upArrow.src
                : typeof downArrow === "string"
                ? downArrow
                : downArrow.src
            }
            className="trading-symbol__arrow"
          />
        </div>
        <div className="trading-symbol__data">
          <div className="trading-symbol__option">
            <div className="trading-symbol__option-title">
              {t("index_trading-ticker-bid")}
            </div>
            <div className="trading-symbol__option-value trading-symbol__option-value--up">
              {bid}
            </div>
          </div>

          <div className="trading-symbol__option">
            <div className="trading-symbol__option-title">
              {t("index_trading-ticker-ask")}
            </div>
            <div
              className={cn("trading-symbol__option-value", {
                "trading-symbol__option-value--up": direction === "up",
                "trading-symbol__option-value--down": direction === "down",
              })}
            >
              {ask}
            </div>
          </div>

          <div className="trading-symbol__option">
            <div className="trading-symbol__option-title">
              {t("index_trading-ticker-spread")}
            </div>
            <div className="trading-symbol__option-value">{spread}</div>
          </div>
        </div>
      </div>
      <div className="trading-symbol__actions">
        <ButtonPopup
          className="trading-symbol__buy button-link--without-bg-trading"
          onClick={handleShowRegistrationPopup}
        >
          {t("index_trading-ticker-buy")}
        </ButtonPopup>
        <ButtonPopup
          className="trading-symbol__sell button-link--without-bg-trading"
          onClick={handleShowRegistrationPopup}
        >
          {t("index_trading-ticker-sell")}
        </ButtonPopup>
      </div>

      {/* Render the popup */}
      {isPopupOpen && (
        <ShowRegistrationPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          langParam={langParam} // Pass langParam if needed
        />
      )}
    </div>
  );
};

TradingSymbol.propTypes = {
  className: PropTypes.string,
  symbol: PropTypes.string.isRequired,
  direction: PropTypes.oneOf(["up", "down"]).isRequired,
  bid: PropTypes.string.isRequired,
  ask: PropTypes.string.isRequired,
  spread: PropTypes.string.isRequired,
};

export default TradingSymbol;
