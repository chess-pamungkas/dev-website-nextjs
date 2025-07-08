import React, { useCallback, useRef, useState } from "react";
import cn from "classnames";
import TopMarketPromotion from "../../top-market-promotion";
import animation from "../../../../public/images/animations/aggregator_MT4.json";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import MtPromotion from "../../mt-promotion";
import {
  getMT4Advantages,
  mt4DownloadTabs,
  getMT4DownloadLink,
  getAnimationStyle,
} from "../../../helpers/platforms.config";
import { ShowRegistrationPopup } from "../../../helpers/constants";
import { useWindowSize } from "../../../helpers/hooks/use-window-size";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";
import { isIOS, isAndroid, isWindows, isMacOs } from "react-device-detect";
import { setLangParam } from "../../../helpers/services/language-service";
import Seo from "../../shared/seo";

const Mt4PageContent = () => {
  const { t } = useTranslationWithVariables();
  const { isMobile, isTablet, isLG, isXL } = useWindowSize();
  const isRTL = useRtlDirection();
  const mt4Advantages = getMT4Advantages();
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

  const getMT4DownloadLinkByDevice = useCallback(getMT4DownloadLink, [
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
      <Seo
        title={t("page-mt4-title")}
        description={t("page-mt4-description")}
      />
      <TopMarketPromotion
        className={cn("mt4-page-promotion", {
          "split-bg--rtl": isRTL,
          "mt-page-promotion--rtl": isRTL,
        })}
        image={animation}
        isLottieImage
        lottieStyle={getAnimationStyles()}
        btnClassName={cn({
          "button-link--ghost": isLG || isXL,
        })}
        btnTitle={t("mt4_top-market-promo-btn")}
        btnOnClick={scrollToTarget}
        link={getMT4DownloadLinkByDevice()}
        isDocumentLink
        note={
          <HighlightedLocalizationText
            localizationText="mt4_top-market-promo-note"
            wordsToHighlight="mt4_top-market-promo-note-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-white"
          />
        }
      >
        <HighlightedLocalizationText
          localizationText="mt4_top-market-promo-text"
          wordsToHighlight="mt4_top-market-promo-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarketPromotion>

      <MtPromotion
        title={
          <HighlightedLocalizationText
            localizationText="mt4_top-market-promo-text2"
            wordsToHighlight="mt4_top-market-promo-text-accent2"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        advantagesTitle={t("mt4_market-items-list_title")}
        advantages={mt4Advantages}
        downloadTitle={t("mt4_download-title")}
        image="/images/mt4/MT4andMT5.png"
        tabs={mt4DownloadTabs()}
        ref={downloadRef}
      />
      {isXL && (
        <TopMarketPromotion
          className={cn("bottom-promotion", {
            "bottom-promotion--rtl": isRTL,
          })}
          image="/images/icon--white.svg"
          btnClassName="button-link--red"
          btnTitle={t("mt4_top-market-promo-btn3")}
          btnOnClick={handleShowRegistrationPopup}
        >
          <HighlightedLocalizationText
            localizationText="mt4_top-market-promo-text3"
            wordsToHighlight="mt4_top-market-promo-text-accent3"
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

export default Mt4PageContent;
