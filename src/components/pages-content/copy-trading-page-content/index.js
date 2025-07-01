import React, { useState } from "react";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import TopMarketPromotion from "../../top-market-promotion";
import cn from "classnames";
import promotion from "../../../assets/images/copy-trading/promotion.svg";
import promotion2 from "../../../assets/images/copy-trading/why.svg";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";
import MarketItemAdvantageList from "../../all-markets/components/market-item-advantage-list";
import {
  ADVANTAGES_FOR_INVESTORS,
  ADVANTAGES_FOR_PROVIDERS,
} from "../../../helpers/copy-trading.config";
import { FAQ_COPY_TRADING } from "../../../helpers/faq";
import Faq from "../../faq";
import { ShowRegistrationPopup } from "../../../helpers/constants";
import { setLangParam } from "../../../helpers/services/language-service";

const CopyTradingPageContent = () => {
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
      <TopMarketPromotion
        className={cn("copy-trading-page-promotion", {
          "split-bg--rtl": isRTL,
          "copy-trading-page-promotion--rtl": isRTL,
        })}
        image={promotion}
        btnClassName="button-link--ghost"
        btnTitle={t("copy-trading_top-market-promo-btn")}
        btnOnClick={handleShowRegistrationPopup}
        note={
          <>
            <span className="display-block">
              <HighlightedLocalizationText
                localizationText="copy-trading_top-market-promo-note1"
                wordsToHighlight="copy-trading_top-market-promo-note-accent1"
                primaryClassName="highlighted-in-black"
                accentClassName="highlighted-in-white"
              />
            </span>
            <span className="display-block">
              <HighlightedLocalizationText
                localizationText="copy-trading_top-market-promo-note2"
                wordsToHighlight="copy-trading_top-market-promo-note-accent2"
                primaryClassName="highlighted-in-black"
                accentClassName="highlighted-in-white"
              />
            </span>
            <span className="display-block">
              <HighlightedLocalizationText
                localizationText="copy-trading_top-market-promo-note3"
                wordsToHighlight="copy-trading_top-market-promo-note-accent3"
                primaryClassName="highlighted-in-black"
                accentClassName="highlighted-in-white"
              />
            </span>
          </>
        }
      >
        <HighlightedLocalizationText
          localizationText="copy-trading_top-market-promo-text"
          wordsToHighlight="copy-trading_top-market-promo-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarketPromotion>
      <TopMarketPromotion
        className={cn("copy-trading-page-promotion2", {
          "copy-trading-page-promotion2--rtl": isRTL,
        })}
        image={promotion2}
        note={
          <>
            <span className="display-block">
              <HighlightedLocalizationText
                localizationText="copy-trading_top-market-promo2-note1"
                wordsToHighlight="copy-trading_top-market-promo2-note-accent1"
                primaryClassName="highlighted-in-black"
                accentClassName="highlighted-in-red"
              />
            </span>
            <span className="display-block">
              <HighlightedLocalizationText
                localizationText="copy-trading_top-market-promo2-note2"
                wordsToHighlight="copy-trading_top-market-promo2-note-accent2"
                primaryClassName="highlighted-in-black"
                accentClassName="highlighted-in-red"
              />
            </span>
            <span className="display-block">
              <HighlightedLocalizationText
                localizationText="copy-trading_top-market-promo2-note3"
                wordsToHighlight="copy-trading_top-market-promo2-note-accent3"
                primaryClassName="highlighted-in-black"
                accentClassName="highlighted-in-red"
              />
            </span>
            <span className="display-block">
              <HighlightedLocalizationText
                localizationText="copy-trading_top-market-promo2-note4"
                wordsToHighlight="copy-trading_top-market-promo2-note-accent4"
                primaryClassName="highlighted-in-black"
                accentClassName="highlighted-in-red"
              />
            </span>
          </>
        }
      >
        <HighlightedLocalizationText
          localizationText="copy-trading_top-market-promo2-text"
          wordsToHighlight="copy-trading_top-market-promo2-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-red"
        />
      </TopMarketPromotion>
      <TopMarketPromotion
        className={cn("black-promotion", "copy-trading-black-promotion", {
          "copy-trading-black-promotion--rtl": isRTL,
        })}
        content={
          <div className="copy-trading-advantage-content">
            <MarketItemAdvantageList
              title={t("copy-trading_advantages1_title")}
              advantages={ADVANTAGES_FOR_INVESTORS}
              className="copy-trading-market-item-advantages"
              btnTitle={t("copy-trading_advantages1_btn")}
              btnOnClick={handleShowRegistrationPopup}
            />
            <MarketItemAdvantageList
              title={t("copy-trading_advantages2_title")}
              advantages={ADVANTAGES_FOR_PROVIDERS}
              className="copy-trading-market-item-advantages"
              btnTitle={t("copy-trading_advantages2_btn")}
              btnOnClick={handleShowRegistrationPopup}
            />
          </div>
        }
      >
        <HighlightedLocalizationText
          localizationText="copy-trading_top-market-promo3-text"
          wordsToHighlight="copy-trading_top-market-promo3-text-accent"
          primaryClassName="highlighted-in-white"
          accentClassName="highlighted-in-red"
        />
      </TopMarketPromotion>
      <Faq faq={FAQ_COPY_TRADING} className="copy-trading-faq" />

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

export default CopyTradingPageContent;
