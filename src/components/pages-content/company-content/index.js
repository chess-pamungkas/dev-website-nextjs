import React from "react";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import Seo from "../../shared/seo";
import VideoBanner from "../../video-banner";
import SplitTextPromotion from "../../split-text-promotion";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import CompanyAdvantages from "../../company-advantages";

const CompanyContent = () => {
  const { t } = useTranslationWithVariables();

  return (
    <>
      <Seo
        title={t("page-company-title")}
        description={t("page-company-description")}
      />
      <VideoBanner
        title={t("company_banner-with-title-title")}
        subtitle={t("company_banner-with-title-subtitle")}
        video="/video/about.mp4"
      />
      <SplitTextPromotion
        title={t("company_split-text-promotion-title")}
        subtitle={t("company_split-text-promotion-subtitle")}
      >
        <HighlightedLocalizationText
          localizationText="company_split-text-promotion-text1"
          wordsToHighlight="company-split-text-promotion-text1-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-red"
        />
        {/* <br />
        <br />
        <HighlightedLocalizationText
          localizationText="company_split-text-promotion-text2"
          wordsToHighlight="company-split-text-promotion-text2-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-red"
        /> */}
      </SplitTextPromotion>
      <CompanyAdvantages />
    </>
  );
};

export default CompanyContent;
