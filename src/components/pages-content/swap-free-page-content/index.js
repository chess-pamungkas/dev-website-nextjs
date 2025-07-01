import React, { useState } from "react";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import TopMarket from "../../top-market";
import topPromo from "../../../assets/images/swap-free/top-promo.png";
import { ShowRegistrationPopup } from "../../../helpers/constants";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import SwapFreeTopPromotion from "../../swap-free/components/swap-free-top-promotion";
import SwapFreeCenterPromotion from "../../swap-free/components/swap-free-center-promotion";
import SwapFreeAdvantages from "../../swap-free/components/swap-free-advantages";
import { SWAP_FREE_ADVANTAGES } from "../../../helpers/swap-free.config";
import SwapFreeBottomPromotion from "../../swap-free/components/bottom-promotion";
import { setLangParam } from "../../../helpers/services/language-service";

const SwapFreeContent = () => {
  const { t } = useTranslationWithVariables();
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
        title={
          <HighlightedLocalizationText
            localizationText="swap-free_top-market-title"
            wordsToHighlight="swap-free_top-market-title-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-white"
          />
        }
        image={topPromo}
        btn1Title={t("swap-free_top-market-btn")}
        btnOnClick1={handleShowRegistrationPopup}
      >
        <HighlightedLocalizationText
          localizationText="swap-free_top-market-promo-text"
          wordsToHighlight="swap-free_top-market-promo-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarket>
      <SwapFreeTopPromotion />
      <SwapFreeCenterPromotion />
      <SwapFreeAdvantages advantages={SWAP_FREE_ADVANTAGES} />
      <SwapFreeBottomPromotion />

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

export default SwapFreeContent;
