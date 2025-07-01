import React, { useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import {
  DIR_LTR,
  DIR_RTL,
  ShowRegistrationPopup,
} from "../../../../helpers/constants";
import MarketBuzzInfo from "../market-buzz-info";
import { MARKET_BUZZ_BLOCKS } from "../../../../helpers/trading-tools.config";
import MarketBuzzBlock from "../market-buzz-block";
import { stringTransformToKebabCase } from "../../../../helpers/services/string-service";
import ButtonPopup from "../../../shared/button-popup";
import { setLangParam } from "../../../../helpers/services/language-service";

const MarketBuzz = ({ className }) => {
  const isRTL = useRtlDirection();
  const { t } = useTranslationWithVariables();
  const langParam = setLangParam();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleShowRegistrationPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <section
      id="marketBuzz"
      className={cn("market-buzz", className, {
        "market-buzz--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="market-buzz__wrapper">
        <div className="market-buzz__title-wrapper">
          <h2 className="market-buzz__title">
            {t("trading-tools_market-buzz_title")}
          </h2>
          <p className="market-buzz__subtitle">
            {t("trading-tools_market-buzz_subtitle")}
          </p>
          <p className="market-buzz__description">
            {t("trading-tools_market-buzz_description")}
          </p>
        </div>
        <MarketBuzzInfo />
        {MARKET_BUZZ_BLOCKS.map((item) => (
          <MarketBuzzBlock
            key={stringTransformToKebabCase(item.title)}
            title={item.title}
            description={item.description}
            img={item.image}
          />
        ))}

        <ButtonPopup
          onClick={handleShowRegistrationPopup}
          className="button-link button-link--red trading-tools-btn"
        >
          {t("trading-tools_top-market-promo-btn3")}
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
    </section>
  );
};

MarketBuzz.propTypes = {
  className: PropTypes.string,
};

export default MarketBuzz;
