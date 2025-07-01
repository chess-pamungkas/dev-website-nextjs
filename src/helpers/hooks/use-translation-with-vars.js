import { useTranslation } from "react-i18next";
import { useLocalizationVariables } from "../localization-variables";

export const useTranslationWithVariables = () => {
  const { t } = useTranslation();
  const globalVariables = useLocalizationVariables();

  const translateWithVariables = (key, variables) => {
    const mergedVariables = { ...globalVariables, ...variables };
    return t(key, mergedVariables);
  };

  return {
    t: translateWithVariables,
  };
};
