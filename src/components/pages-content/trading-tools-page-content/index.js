import React, { useState } from "react";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";
import TopMarket from "../../top-market";
import cn from "classnames";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import promotion from "../../../assets/images/trading-tools/promotion.svg";
import AlphaGeneration from "../../trading-tools/components/alpha-generation";
import icon from "../../../assets/images/icon--white.svg";
import { ShowRegistrationPopup } from "../../../helpers/constants";
import TopMarketPromotion from "../../top-market-promotion";
import FeaturedIdeas from "../../trading-tools/components/featured-ideas";
import MarketBuzz from "../../trading-tools/components/market-buzz";
import TradingCalendar from "../../trading-tools/components/trading-calendar";
import { setLangParam } from "../../../helpers/services/language-service";

const TradingToolsPageContent = () => {
  const { t } = useTranslationWithVariables();
  const isRTL = useRtlDirection();
  const langParam = setLangParam(); // Get the language parameter
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const handleShowRegistrationPopup = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  return (
    <>
      <TopMarket
        className={cn("top-market--trading-tools", {
          "top-market--trading-tools--rtl": isRTL,
        })}
        image={promotion}
        title={
          <HighlightedLocalizationText
            localizationText="trading-tools_top-market-promo-title"
            wordsToHighlight="trading-tools_top-market-promo-title-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-white"
          />
        }
        btn1Title={t("trading-tools_top-market-btn1-title")}
        link1="#tradingCalendar"
        isAnchorLink1
        btn2Title={t("trading-tools_top-market-btn2-title")}
        link2="#featuredIdeas"
        isAnchorLink2
        btn3Title={t("trading-tools_top-market-btn3-title")}
        link3="#marketBuzz"
        isAnchorLink3
        btn4Title={t("trading-tools_top-market-btn4-title")}
        link4="#alphaGeneration"
        isAnchorLink4
      >
        <HighlightedLocalizationText
          localizationText="trading-tools_top-market-promo-text"
          wordsToHighlight="trading-tools_top-market-promo-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarket>
      <TradingCalendar />
      <FeaturedIdeas />
      <MarketBuzz />
      <AlphaGeneration />
      <TopMarketPromotion
        className={cn("bottom-promotion", {
          "bottom-promotion--rtl": isRTL,
        })}
        image={icon}
        btnClassName="button-link--red"
        btnTitle={t("trading-tools_top-market-promo-btn3")}
        btnOnClick={handleShowRegistrationPopup}
      >
        <HighlightedLocalizationText
          localizationText="trading-tools_top-market-promo-text3"
          wordsToHighlight="trading-tools_top-market-promo-text-accent3"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarketPromotion>

      {/* Render the popup */}
      {isPopupOpen && (
        <ShowRegistrationPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          langParam={langParam} // Pass langParam if needed
        />
      )}
    </>
  );
};

export default TradingToolsPageContent;
