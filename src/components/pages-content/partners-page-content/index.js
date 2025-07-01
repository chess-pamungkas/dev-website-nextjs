import React, { useState } from "react";
import TopMarketPromotion from "../../top-market-promotion";
import promotion from "../../../assets/images/partners/promotion.svg";
import cn from "classnames";
import { ShowRegistrationPopup } from "../../../helpers/constants";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import IncomeSlider from "../../partners/components/income-slider";
import PartnersAdvantages from "../../partners/components/advantages";
import { PARTNERS_ADVANTAGES } from "../../../helpers/partners.config";
import HowToStart from "../../partners/components/how-to-start";
import icon from "../../../assets/images/icon--white.svg";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";
import { setLangParam } from "../../../helpers/services/language-service";

const PartnersPageContent = () => {
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
        className={cn("partners-page-promotion", {
          "partners-page-promotion--rtl": isRTL,
        })}
        image={promotion}
        btnClassName={cn("button-link--ghost")}
        btnTitle={t(`partners_top-market-promo-btn-fsa`)}
        btnOnClick={handleShowRegistrationPopup}
      >
        <HighlightedLocalizationText
          localizationText={`partners_top-market-promo-text-fsa`}
          wordsToHighlight={`partners_top-market-promo-text-accent-fsa`}
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarketPromotion>
      <IncomeSlider />
      <PartnersAdvantages
        title={
          <HighlightedLocalizationText
            localizationText={`partners_advantages-title-fsa`}
            wordsToHighlight={`partners_advantages-title-accent-fsa`}
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        advantages={PARTNERS_ADVANTAGES}
      />
      <HowToStart />
      <TopMarketPromotion
        className={cn("partners-page-bottom-promotion", {
          "partners-page-bottom-promotion--rtl": isRTL,
        })}
        image={icon}
      >
        <HighlightedLocalizationText
          localizationText={`partners_top-market-bot-promo-text-fsa`}
          wordsToHighlight={`partners_top-market-bot-promo-text-accent-fsa`}
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

export default PartnersPageContent;
