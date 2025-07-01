import React, { useCallback, useState } from "react";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import TopMarketPromotion from "../../top-market-promotion";
import cn from "classnames";
import animation from "../../../assets/images/animations/aggregator_Trading.json";
import { TRADING_VIEW_DOC } from "../../../helpers/documents";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import MtPromotion from "../../mt-promotion";
import {
  TRADING_VIEW_ADVANTAGES,
  TRADING_VIEW_DOWNLOAD_LINKS,
} from "../../../helpers/platforms.config";
import image from "../../../assets/images/mt4/trading-view.png";
import icon from "../../../assets/images/icon--white.svg";
import { ShowRegistrationPopup } from "../../../helpers/constants";
import { useWindowSize } from "../../../helpers/hooks/use-window-size";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";
import InternalLink from "../../shared/internal-link";
import { setLangParam } from "../../../helpers/services/language-service";

const TradingViewPageContent = () => {
  const { t } = useTranslationWithVariables();
  const { isMobile, isTablet, isLG, isXL } = useWindowSize();
  const isRTL = useRtlDirection();
  const langParam = setLangParam(); // Get the language parameter
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const handleShowRegistrationPopup = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  const getAnimationStyles = useCallback(() => {
    switch (true) {
      case isXL:
        return { height: 700 };
      case isLG:
        return { height: 444 };
      case isTablet:
        return { height: 540 };
      case isMobile:
        return { height: 358 };
      default:
        return { height: 358 };
    }
  }, [isMobile, isTablet, isLG, isXL]);

  const tabs = [
    {
      id: 1,
      title: t("mt-promotion-tabs-mobile"),
      content: (
        <>
          <InternalLink to={TRADING_VIEW_DOWNLOAD_LINKS.android}>
            {t("trading-view_mt-promotion-download-android")}
          </InternalLink>
          <InternalLink to={TRADING_VIEW_DOWNLOAD_LINKS.ios}>
            {t("trading-view_mt-promotion-download-ios")}
          </InternalLink>
        </>
      ),
    },
    {
      id: 2,
      title: t("mt-promotion-tabs-desktop"),
      content: (
        <>
          <InternalLink to={TRADING_VIEW_DOWNLOAD_LINKS.mac}>
            {t("trading-view_mt-promotion-download-mac")}
          </InternalLink>
          <InternalLink to={TRADING_VIEW_DOWNLOAD_LINKS.windows}>
            {t("trading-view_mt-promotion-download-windows")}
          </InternalLink>
          <InternalLink to={TRADING_VIEW_DOWNLOAD_LINKS.webtrader}>
            {t("trading-view_mt-promotion-download-webtrader")}
          </InternalLink>
        </>
      ),
    },
  ];

  return (
    <>
      <TopMarketPromotion
        className={cn("ctrader-page-promotion", "trading-view-page-promotion", {
          "split-bg--rtl": isRTL,
          "trading-view-page-promotion--rtl": isRTL,
        })}
        image={animation}
        isLottieImage
        lottieStyle={getAnimationStyles()}
        btnClassName="button-link--ghost"
        btnTitle={t("trading-view_top-market-promo-btn")}
        link={TRADING_VIEW_DOC}
        isDocumentLink
        note={
          <HighlightedLocalizationText
            localizationText="trading-view_top-market-promo-note"
            wordsToHighlight="trading-view_top-market-promo-note-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-white"
          />
        }
      >
        <HighlightedLocalizationText
          localizationText="trading-view_top-market-promo-text"
          wordsToHighlight="trading-view_top-market-promo-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarketPromotion>

      <MtPromotion
        title={
          <HighlightedLocalizationText
            localizationText="trading-view_top-market-promo-text2"
            wordsToHighlight="trading-view_top-market-promo-text-accent2"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        advantagesTitle={t("trading-view_market-items-list_title")}
        advantages={TRADING_VIEW_ADVANTAGES}
        downloadTitle={t("trading-view_download-title")}
        image={image}
        tabs={tabs}
        className="mt-promotion--ctrader"
      />

      <TopMarketPromotion
        className={cn("bottom-promotion", {
          "bottom-promotion--rtl": isRTL,
        })}
        image={icon}
        btnClassName="button-link--red"
        btnTitle={t("trading-view_top-market-promo-btn3")}
        btnOnClick={handleShowRegistrationPopup}
      >
        <HighlightedLocalizationText
          localizationText="trading-view_top-market-promo-text3"
          wordsToHighlight="trading-view_top-market-promo-text-accent3"
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

export default TradingViewPageContent;
