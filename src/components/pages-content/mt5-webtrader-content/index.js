import React, { useContext, useEffect } from "react";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import Seo from "../../shared/seo";
import WebTraderLink from "../../mt5-webtrader";
import CommonContext from "../../../context/common-context";

const Mt5WebTraderContent = () => {
  const { setIsSearchBarAttached } = useContext(CommonContext);
  const { t } = useTranslationWithVariables();

  useEffect(() => {
    setIsSearchBarAttached(false);

    return () => setIsSearchBarAttached(true);
  }, [setIsSearchBarAttached]);

  return (
    <>
      <Seo fsaTitle={t("MT5 Web Trade")} cysecTitle={"MT5 Web Trader"} />
      <WebTraderLink />
    </>
  );
};

export default Mt5WebTraderContent;
