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
import CalendarInfoBlock from "./components/info-block";
import HighlightedLocalizationText from "../../../shared/highlighted-localization-text";
import FeatureItem from "./components/feature-item";
import { TRADING_CALENDAR_FEATURES } from "../../../../helpers/trading-tools.config";
import { stringTransformToKebabCase } from "../../../../helpers/services/string-service";
import ButtonPopup from "../../../shared/button-popup";
import { setLangParam } from "../../../../helpers/services/language-service";

const TradingCalendar = ({ className }) => {
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
      id="tradingCalendar"
      className={cn("trading-calendar", className, {
        "trading-calendar--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="trading-calendar__wrapper">
        <div className="trading-calendar__title-wrapper">
          <h2 className="trading-calendar__title">
            {t("trading-tools_trading-calendar_title")}
          </h2>
          <p className="trading-calendar__subtitle">
            {t("trading-tools_trading-calendar_subtitle")}
          </p>
          <p className="trading-calendar__description">
            {t("trading-tools_trading-calendar_description")}
          </p>
        </div>
        <CalendarInfoBlock
          title={
            <HighlightedLocalizationText
              localizationText="trading-tools_calendar-info-block_title"
              wordsToHighlight="trading-tools_calendar-info-block_title-accent"
              primaryClassName="highlighted-in-black"
              accentClassName="highlighted-in-red"
            />
          }
          description={
            <HighlightedLocalizationText
              localizationText="trading-tools_calendar-info-block_description"
              wordsToHighlight="trading-tools_calendar-info-block_description-accent"
              primaryClassName="highlighted-in-black"
              accentClassName="highlighted-in-red"
            />
          }
          img="/images/trading-tools/calendar.png"
        />

        <div className="trading-calendar__features-block">
          {TRADING_CALENDAR_FEATURES.map((item) => (
            <FeatureItem
              key={stringTransformToKebabCase(item.title)}
              title={item.title}
              description={item.description}
              img={item.img}
            />
          ))}
        </div>

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

TradingCalendar.propTypes = {
  className: PropTypes.string,
};
export default TradingCalendar;
