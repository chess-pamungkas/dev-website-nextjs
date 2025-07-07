import { useState, useContext, useEffect } from "react";
import LanguageContext from "../../context/language-context";

// Import language configuration using CommonJS
const { ARABIC_LANG_ID } = require("../lang.config");

export const useRtlDirection = () => {
  const { selectedLanguage } = useContext(LanguageContext);
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    if (selectedLanguage && selectedLanguage.id) {
      setIsRTL(selectedLanguage.id === ARABIC_LANG_ID);
    } else {
      setIsRTL(false);
    }
  }, [selectedLanguage]);

  return isRTL;
};
