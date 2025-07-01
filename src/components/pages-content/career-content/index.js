import React, { useState } from "react";
import TopMarketPromotion from "../../top-market-promotion";
import cn from "classnames";
import image from "../../../assets/images/about-pages/career.svg";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";
import { LogoTextMain } from "../../shared/icons";
import CareerPros from "../../career-pros";
import icon from "../../../assets/images/icon--white.svg";
import { ShowRegistrationPopup } from "../../../helpers/constants";
import CareerBenefits from "../../career-benefits";
import JobOpenings from "../../job-openings";
import { setLangParam } from "../../../helpers/services/language-service";

const CareerContent = () => {
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
        className={cn("career-page-promotion", {
          "career-page-promotion--rtl": isRTL,
        })}
        image={image}
        note={<LogoTextMain className="career-page-promotion__logo" />}
        btnTitle={t(`career_top-market-promo-btn`)}
        btnClassName="button-link--black"
        // TODO replace with the real link
        link={"/"}
        btnTitle2={t(`career_top-market-promo-btn2`)}
        // TODO replace with the real link
        link2={"/"}
        isButtonAndLink
      >
        <HighlightedLocalizationText
          localizationText="career_top-market-promo-text"
          wordsToHighlight="career_top-market-promo-text-accent"
          primaryClassName="highlighted-in-white"
          accentClassName="highlighted-in-black"
        />
      </TopMarketPromotion>
      <CareerPros />
      <CareerBenefits />
      <JobOpenings />
      <TopMarketPromotion
        className={cn("bottom-promotion", {
          "bottom-promotion--rtl": isRTL,
        })}
        image={icon}
        btnClassName="button-link--ghost"
        btnTitle={t("career_top-market-bot-promo-btn")}
        btnOnClick={handleShowRegistrationPopup}
      >
        <HighlightedLocalizationText
          localizationText="career_top-market-bot-promo-text"
          wordsToHighlight="career_top-market-bot-promo-text-accent"
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

export default CareerContent;
