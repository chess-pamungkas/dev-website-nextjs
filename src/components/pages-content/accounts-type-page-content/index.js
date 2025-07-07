import React, { useState } from "react";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import TopMarketPromotion from "../../top-market-promotion";
const promotion = "/images/accounts-type/promotion.svg";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import AccountsType from "../../accounts-type";
const middlePromotion = "/images/accounts-type/middle-promotion.svg";
import { ShowRegistrationPopup } from "../../../helpers/constants";
const icon = "/images/icon--white.svg";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";
import cn from "classnames";
import { setLangParam } from "../../../helpers/services/language-service";
import Seo from "../../shared/seo";

const AccountsTypePageContent = () => {
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
      <Seo
        title={t("page-accounts-type-title")}
        description={t("page-accounts-type-description")}
      />
      <TopMarketPromotion
        className={cn("accounts-type-page-promotion", {
          "accounts-type-page-promotion--rtl": isRTL,
        })}
        image={promotion}
      >
        <HighlightedLocalizationText
          localizationText="accounts-type_top-market-promo-text"
          wordsToHighlight="accounts-type_top-market-promo-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarketPromotion>
      <AccountsType />
      <TopMarketPromotion
        className="accounts-type-page-mid-promotion"
        image={middlePromotion}
        btnClassName="button-link--ghost"
        btnTitle={t("accounts-type_top-market-mid-promo-btn")}
        btnOnClick={handleShowRegistrationPopup}
      />
      <TopMarketPromotion
        className={cn("bottom-promotion", {
          "bottom-promotion--rtl": isRTL,
        })}
        image={icon}
        btnClassName="button-link--ghost"
        btnTitle={t("accounts-type_top-market-bot-promo-btn")}
        btnOnClick={handleShowRegistrationPopup}
      >
        <HighlightedLocalizationText
          localizationText="accounts-type_top-market-bot-promo-text"
          wordsToHighlight="accounts-type_top-market-bot-promo-text-accent"
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

export default AccountsTypePageContent;
