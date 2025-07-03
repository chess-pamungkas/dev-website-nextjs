import React, { useState } from "react";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import TopMarket from "../../top-market";
import { ShowRegistrationPopup } from "../../../helpers/constants";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import VPSTopPromotion from "../../vps/components/vps-top-promotion";
import VPSCenterPromotion from "../../vps/components/vps-center-promotion";
import VPSBottomPromotion from "../../vps/components/bottom-promotion";
import VPSAdvantages from "../../vps/components/vps-advantages";
import { VPS_ADVANTAGES } from "../../../helpers/vps.config";
import { setLangParam } from "../../../helpers/services/language-service";

const VPSContent = () => {
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
            localizationText="vps_top-market-title"
            wordsToHighlight="vps_top-market-title-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-white"
          />
        }
        image="/images/vps/top-promo.svg"
        btn1Title={t("vps_top-market-btn")}
        btnOnClick1={handleShowRegistrationPopup}
      >
        <HighlightedLocalizationText
          localizationText="vps_top-market-promo-text"
          wordsToHighlight="vps_top-market-promo-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarket>
      <VPSTopPromotion />
      <VPSCenterPromotion />
      <VPSAdvantages advantages={VPS_ADVANTAGES} />
      <VPSBottomPromotion />

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

export default VPSContent;
