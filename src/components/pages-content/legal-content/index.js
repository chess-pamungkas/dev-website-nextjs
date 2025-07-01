import React from "react";
import TopMarketPromotion from "../../top-market-promotion";
import cn from "classnames";
import image from "../../../assets/images/about-pages/legal-banner.svg";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import Documents from "../../documents";
import { getLegalDocs } from "../../../helpers/documents";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";

const LegalContent = () => {
  const { t } = useTranslationWithVariables();
  const isRTL = useRtlDirection();

  return (
    <>
      <TopMarketPromotion
        className={cn("legal-page-promotion", {
          "legal-page-promotion--rtl": isRTL,
        })}
        image={image}
        btnTitle={t("legal_top-market-promo-btn-fsa")}
        link="#legalDocuments"
        isAnchorLink
      >
        <HighlightedLocalizationText
          localizationText={"legal_top-market-promo-text-fsa"}
          wordsToHighlight={"legal_top-market-promo-text-accent-fsa"}
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarketPromotion>
      <TopMarketPromotion
        className={cn("legal-page-esma", {
          "legal-page-esma--rtl": isRTL,
        })}
        btnTitle={t("legal_top-market-promo-btn2-fsa")}
        note={t("legal_top-market-promo-note-fsa")}
        link="#legalDocuments"
        isAnchorLink
      >
        <HighlightedLocalizationText
          localizationText={"legal_top-market-promo-text2-fsa"}
          wordsToHighlight={"legal_top-market-promo-text-accent2-fsa"}
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-red"
        />
      </TopMarketPromotion>
      <Documents
        title={t("legal_documents-title-fsa")}
        text={
          <>
            <span className="subtitle">
              {t("legal_documents-text-bold-fsa")}
            </span>
            <span>{t("legal_documents-text-fsa")}</span>
          </>
        }
        documents={getLegalDocs()}
      />
    </>
  );
};

export default LegalContent;
