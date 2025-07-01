import React, { useCallback, useRef, useState } from "react";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import TopMarketPromotion from "../../top-market-promotion";
import animation from "../../../assets/images/animations/aggregator_cTrader.json";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import MtPromotion from "../../mt-promotion";
import {
  CTRADER_ADVANTAGES,
  getCTraderDownloadLink,
  cTraderDownloadTabs,
  getAnimationStyle,
} from "../../../helpers/platforms.config";
import image from "../../../assets/images/mt4/cTrader.png";
import icon from "../../../assets/images/icon--white.svg";
import { ShowRegistrationPopup } from "../../../helpers/constants";
import { useWindowSize } from "../../../helpers/hooks/use-window-size";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";
import cn from "classnames";
import { isIOS, isAndroid, isWindows, isMacOs } from "react-device-detect";
import { setLangParam } from "../../../helpers/services/language-service";

const CtraderPageContent = () => {
  const { t } = useTranslationWithVariables();
  const { isMobile, isTablet, isLG, isXL } = useWindowSize();
  const isRTL = useRtlDirection();
  const downloadRef = useRef(null);
  const langParam = setLangParam(); // Get the language parameter
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const handleShowRegistrationPopup = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  const scrollToTarget = () => {
    downloadRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const getCTraderDownloadLinkByDevice = useCallback(getCTraderDownloadLink, [
    isIOS,
    isAndroid,
    isWindows,
    isMacOs,
  ]);

  const getAnimationStyles = useCallback(getAnimationStyle, [
    isMobile,
    isTablet,
    isLG,
    isXL,
  ]);

  return (
    <>
      <TopMarketPromotion
        className={cn("ctrader-page-promotion", {
          "split-bg--rtl": isRTL,
          "ctrader-page-promotion--rtl": isRTL,
        })}
        image={animation}
        isLottieImage
        lottieStyle={getAnimationStyles()}
        btnClassName="button-link--ghost"
        btnTitle={t("ctrader_top-market-promo-btn")}
        btnOnClick={scrollToTarget}
        link={getCTraderDownloadLinkByDevice()}
        isDocumentLink
        note={
          <HighlightedLocalizationText
            localizationText="ctrader_top-market-promo-note"
            wordsToHighlight="ctrader_top-market-promo-note-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-white"
          />
        }
      >
        <HighlightedLocalizationText
          localizationText="ctrader_top-market-promo-text"
          wordsToHighlight="ctrader_top-market-promo-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarketPromotion>

      <MtPromotion
        title={
          <HighlightedLocalizationText
            localizationText="ctrader_top-market-promo-text2"
            wordsToHighlight="ctrader_top-market-promo-text-accent2"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        advantagesTitle={t("ctrader_market-items-list_title")}
        advantages={CTRADER_ADVANTAGES}
        downloadTitle={t("ctrader_download-title")}
        image={image}
        tabs={cTraderDownloadTabs()}
        ref={downloadRef}
        className="mt-promotion--ctrader"
      />
      <TopMarketPromotion
        className={cn("bottom-promotion", {
          "bottom-promotion--rtl": isRTL,
        })}
        image={icon}
        btnClassName="button-link--red"
        btnTitle={t("ctrader_top-market-promo-btn3")}
        btnOnClick={handleShowRegistrationPopup}
      >
        <HighlightedLocalizationText
          localizationText="ctrader_top-market-promo-text3"
          wordsToHighlight="ctrader_top-market-promo-text-accent3"
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

export default CtraderPageContent;
