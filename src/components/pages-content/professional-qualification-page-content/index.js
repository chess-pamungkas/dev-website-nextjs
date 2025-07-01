import React, { useState } from "react";
import TopMarket from "../../top-market";
import promotion from "../../../assets/images/professional-qualification/promotion.svg";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import SplitTextPromotion from "../../split-text-promotion";
import { ShowRegistrationPopup } from "../../../helpers/constants";
import TopMarketPromotion from "../../top-market-promotion";
import cn from "classnames";
import icon from "../../../assets/images/icon--white.svg";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";
import AdvantageList from "../../professional-qualification/advantage-list";
import ButtonPopup from "../../shared/button-popup";
import EligibilityList from "../../professional-qualification/eligibility-list";
import { setLangParam } from "../../../helpers/services/language-service";

const ProfessionalQualificationPageContent = () => {
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
        className="top-market--professional-qualification"
        image={promotion}
        btn1Title={t(`professional-qualification_top-market-btn-fsa`)}
        link1="#eligibilityCriteria"
        isAnchorLink1
        title={
          <HighlightedLocalizationText
            localizationText={`professional-qualification_top-market-text-fsa`}
            wordsToHighlight={`professional-qualification_top-market-text-accent-fsa`}
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-white"
          />
        }
      >
        <HighlightedLocalizationText
          localizationText={`professional-qualification_top-market-note-fsa`}
          wordsToHighlight={`professional-qualification_top-market-note-accent-fsa`}
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarket>
      <AdvantageList
        title={
          <HighlightedLocalizationText
            localizationText={`professional-qualification_performance-title-fsa`}
            wordsToHighlight={`professional-qualification_performance-title-accent-fsa`}
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        text={t(`professional-qualification_performance-text-fsa`)}
      />
      <SplitTextPromotion
        id="eligibilityCriteria"
        title={t(`professional-qualification_text-banner-title-fsa`)}
        subtitle={t(`professional-qualification_text-banner-note-fsa`)}
        className="split-text-promotion--professional-qualification"
        button={
          <ButtonPopup
            onClick={handleShowRegistrationPopup}
            className="button-link--red split-text-promotion__btn"
          >
            {t(`professional-qualification_text-banner-btn-fsa`)}
          </ButtonPopup>
        }
        buttonNote={
          <HighlightedLocalizationText
            localizationText={`professional-qualification_text-banner-btn-note-fsa`}
            wordsToHighlight={`professional-qualification_text-banner-btn-note-accent-fsa`}
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
      >
        <EligibilityList />
      </SplitTextPromotion>
      <TopMarketPromotion
        className={cn("bottom-promotion", {
          "bottom-promotion--rtl": isRTL,
        })}
        image={icon}
        btnClassName="button-link--red"
        btnTitle={t(`professional-qualification_top-market-promo-btn3-fsa`)}
        btnOnClick={handleShowRegistrationPopup}
      >
        <HighlightedLocalizationText
          localizationText={`professional-qualification_top-market-promo-text3-fsa`}
          wordsToHighlight={`professional-qualification_top-market-promo-text-accent3-fsa`}
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

export default ProfessionalQualificationPageContent;
