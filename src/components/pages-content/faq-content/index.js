import React from "react";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import Seo from "../../shared/seo";
import HelpCenter from "../../help-center";

const FaqContent = () => {
  const { t } = useTranslationWithVariables();

  return (
    <>
      <Seo title={t("page-faq-title")} />
      <HelpCenter />
    </>
  );
};

export default FaqContent;
