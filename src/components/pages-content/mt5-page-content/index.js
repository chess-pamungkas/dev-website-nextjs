import React, { useCallback, useRef, useState } from "react";
import cn from "classnames";
import TopMarketPromotion from "../../top-market-promotion";
import animation from "../../../assets/images/animations/aggregator_MT5.json";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import MtPromotion from "../../mt-promotion";
import {
  getMT5Advantages,
  getMT5DownloadLink,
  mt5DownloadTabs,
  getAnimationStyle,
} from "../../../helpers/platforms.config";
import { ShowRegistrationPopup } from "../../../helpers/constants";
import { useWindowSize } from "../../../helpers/hooks/use-window-size";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";
import { isIOS, isAndroid, isWindows, isMacOs } from "react-device-detect";
import { setLangParam } from "../../../helpers/services/language-service";

const Mt5PageContent = () => {
  const { t } = useTranslationWithVariables();
  const isRTL = useRtlDirection();
  const { isMobile, isTablet, isLG, isXL } = useWindowSize();
  const mt5Advantages = getMT5Advantages();
  const downloadRef = useRef(null);
  const langParam = setLangParam(); // Get the language parameter
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const handleShowRegistrationPopup = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  //No need at MT5 as theres no null value at download section.  Enable when MT5 is at .COM and empty values
  // const scrollToTarget = () => {
  //   downloadRef.current?.scrollIntoView({ behavior: "smooth" });
  // };

  const getMT5DownloadLinkByDevice = useCallback(getMT5DownloadLink, [
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
        className={cn("mt5-page-promotion", {
          "split-bg--rtl": isRTL,
          "mt-page-promotion--rtl": isRTL,
        })}
        image={animation}
        isLottieImage
        lottieStyle={getAnimationStyles()}
        btnClassName={cn({
          "button-link--ghost": isLG || isXL,
        })}
        btnTitle={t("mt5_top-market-promo-btn")}
        link={getMT5DownloadLinkByDevice()}
        isDocumentLink
        note={
          <HighlightedLocalizationText
            localizationText="mt5_top-market-promo-note"
            wordsToHighlight="mt5_top-market-promo-note-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-white"
          />
        }
      >
        <HighlightedLocalizationText
          localizationText="mt5_top-market-promo-text"
          wordsToHighlight="mt5_top-market-promo-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarketPromotion>
      <MtPromotion
        title={
          <HighlightedLocalizationText
            localizationText="mt5_top-market-promo-text2"
            wordsToHighlight="mt5_top-market-promo-text-accent2"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        advantagesTitle={t("mt5_market-items-list_title")}
        advantages={mt5Advantages}
        downloadTitle={t("mt5_download-title")}
        image="/images/mt4/MT4andMT5.png"
        tabs={mt5DownloadTabs()}
        ref={downloadRef}
      />
      {isXL && (
        <TopMarketPromotion
          className={cn("bottom-promotion", {
            "bottom-promotion--rtl": isRTL,
          })}
          image="/images/icon--white.svg"
          btnClassName="button-link--red"
          btnTitle={t("mt5_top-market-promo-btn3")}
          btnOnClick={handleShowRegistrationPopup}
        >
          <HighlightedLocalizationText
            localizationText="mt5_top-market-promo-text3"
            wordsToHighlight="mt5_top-market-promo-text-accent3"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-white"
          />
        </TopMarketPromotion>
      )}

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

export default Mt5PageContent;
