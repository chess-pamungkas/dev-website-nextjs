import React from "react";
import TopMarketPromotion from "../../top-market-promotion";
import TopMarket from "../../top-market";
import cn from "classnames";
import image from "../../../assets/images/about-pages/legal-promo.svg";
import fsaPromo from "../../../assets/images/about-pages/fsa-promo.svg";
import cysecPromo from "../../../assets/images/about-pages/cysec-promo.svg";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";
import LegalRegulators from "../../legal/components/legal-regulators";
import { LEGAL_REGULATORS } from "../../../helpers/legal.config";
import Documents from "../../documents";
import { getLegalDocs } from "../../../helpers/documents";

const LegalContentGlobal = () => {
  const { t } = useTranslationWithVariables();
  const isRTL = useRtlDirection();

  return (
    <>
      <TopMarket
        className={cn("legal-page-promotion-global", {
          "legal-page-promotion-global--rtl": isRTL,
        })}
        title={
          <HighlightedLocalizationText
            localizationText="legal_top-market-promo-title-fsa"
            wordsToHighlight="legal_top-market-promo-title-accent-fsa"
            primaryClassName="highlighted-in-white"
            accentClassName="highlighted-in-black"
          />
        }
        image={image}
        btn1Title={t("legal_top-market-promo-btn-fsa")}
        link1="#legalDocuments"
        isAnchorLink1
      >
        <HighlightedLocalizationText
          localizationText="legal_top-market-promo-text-fsa"
          wordsToHighlight="legal_top-market-promo-text-accent-fsa"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarket>
      <LegalRegulators regulators={LEGAL_REGULATORS} />
      <TopMarketPromotion
        className={cn("legal-page-regulator-detail", {
          "legal-page-regulator-detail--rtl": isRTL,
        })}
        image={cysecPromo}
        id="cysecRegulatorDetails"
        note={
          <>
            <span>{t("legal_top-market-cysec-promo-text1-fsa")}</span>
            <br />
            <span>{t("legal_top-market-cysec-promo-text2-fsa")}</span>
            <br />
            <br />
            <span>{t("legal_top-market-cysec-promo-text3-fsa")}</span>
            <br />
            <br />
            <div className="legal-page-regulator-detail__note">
              {t("legal_top-market-cysec-promo-note-fsa")}
            </div>
          </>
        }
      >
        <HighlightedLocalizationText
          localizationText={"legal_top-market-cysec-promo-title-fsa"}
          wordsToHighlight={"legal_top-market-cysec-promo-title-accent-fsa"}
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-red"
        />
      </TopMarketPromotion>
      <TopMarketPromotion
        className={cn(
          "legal-page-regulator-detail legal-page-regulator-detail--reversed",
          {
            "legal-page-regulator-detail--rtl": isRTL,
          }
        )}
        image={fsaPromo}
        id="fsaRegulatorDetails"
        note={
          <>
            <span>{t("legal_top-market-fsa-promo-text1-fsa")}</span>
            <br />
            <br />
            <span>{t("legal_top-market-fsa-promo-text2-fsa")}</span>
          </>
        }
      >
        <HighlightedLocalizationText
          localizationText={"legal_top-market-fsa-promo-title-fsa"}
          wordsToHighlight={"legal_top-market-fsa-promo-title-accent-fsa"}
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-red"
        />
      </TopMarketPromotion>
      <Documents
        title={t("legal_documents-title-fsa")}
        text={
          <>
            <span className="bold">
              <HighlightedLocalizationText
                localizationText={`legal_documents-text-bold-fsa`}
                wordsToHighlight={`legal_documents-text-bold-accent-fsa`}
                primaryClassName="highlighted-in-black"
                accentClassName="highlighted-in-red"
              />
            </span>
            <span>{t("legal_documents-text-fsa")}</span>
          </>
        }
        documents={getLegalDocs()}
      />
    </>
  );
};

export default LegalContentGlobal;
