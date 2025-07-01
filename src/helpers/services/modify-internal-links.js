import { useContext } from "react";
import { isLandingPage, topLevelDomain } from "../entity-resolver";
import LanguageContext from "../../context/language-context";

export const modifyInternalLinkForLP = (link) => {
  if (String(link).startsWith("http") || !isLandingPage) {
    return link;
  } else if (isLandingPage) {
    const { selectedLanguage } = useContext(LanguageContext);
    const OQTIMA_DOMAIN = `https://oqtima.${topLevelDomain}`;
    const langURIPart = selectedLanguage.isDefault
      ? ""
      : `/${selectedLanguage.id}`;

    return `${OQTIMA_DOMAIN}${langURIPart}${link}`;
  }
};
