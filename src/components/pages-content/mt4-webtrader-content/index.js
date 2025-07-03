import React, { useContext, useEffect } from "react";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import Seo from "../../shared/seo";
import Mt4WebTraderLink from "../../mt4-webtrader";
import CommonContext from "../../../context/common-context";

const Mt4WebTraderContent = () => {
  const { setIsSearchBarAttached } = useContext(CommonContext);
  const { t } = useTranslationWithVariables();

  useEffect(() => {
    setIsSearchBarAttached(false);

    return () => setIsSearchBarAttached(true);
  }, [setIsSearchBarAttached]);

  return (
    <>
      <Seo
        fsaTitle={"MT4 Web Trader"}
        fsaDescription={t("page-mt4-description")}
      />
      <Mt4WebTraderLink />
    </>
  );
};

export default Mt4WebTraderContent;
