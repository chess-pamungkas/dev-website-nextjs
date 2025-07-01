import { useContext } from "react";
import { setLangParam } from "../services/language-service";
import LanguageContext from "../../context/language-context";

export const useLanguageParam = () => {
  const { selectedLanguage } = useContext(LanguageContext);
  return setLangParam(selectedLanguage?.id);
};
