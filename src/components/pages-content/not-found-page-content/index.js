import * as React from "react";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
const image = "/images/system-info/404.svg";
import SystemInfoComponent from "../../shared/system-info";

const NotFoundContent = () => {
  const { t } = useTranslationWithVariables();

  return (
    <>
      <SystemInfoComponent
        image={image}
        title={t("system-page-404-title")}
        subTitle={t("system-page-404-subtitle")}
        goBackBtnTitle={t("system-page-go-back-btn")}
      />
    </>
  );
};

export default NotFoundContent;
