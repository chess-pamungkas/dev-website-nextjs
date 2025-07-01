import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
} from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { LANG_SELECT_OPTIONS } from "../../helpers/lang-options.config";

const LanguageContext = createContext({});

export const LanguageProvider = ({ children }) => {
  const router = useRouter();
  // Find the language object matching the current locale
  const getLanguageByLocale = (locale) =>
    LANG_SELECT_OPTIONS.find((l) => l.id === locale) || LANG_SELECT_OPTIONS[0];

  const [selectedLanguage, setSelectedLanguageState] = useState(
    getLanguageByLocale(router.locale)
  );

  // Update selectedLanguage when router.locale changes
  useEffect(() => {
    setSelectedLanguageState(getLanguageByLocale(router.locale));
  }, [router.locale]);

  // When setSelectedLanguage is called, switch Next.js locale
  const setSelectedLanguage = (langObj) => {
    if (!langObj || !langObj.id) return;
    if (langObj.id === router.locale) return;
    // Use router.push to change locale, keep current path
    router.push(router.asPath, router.asPath, { locale: langObj.id });
  };

  // Handle RTL
  useEffect(() => {
    const rtlLanguages = ["ar"];
    const isRTL = rtlLanguages.includes(selectedLanguage.id);
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
    if (isRTL) {
      document.documentElement.classList.add("rtl");
    } else {
      document.documentElement.classList.remove("rtl");
    }
  }, [selectedLanguage]);

  useEffect(() => {
    if (selectedLanguage.id === "jp") {
      document.body.classList.add("jp-font");
    } else {
      document.body.classList.remove("jp-font");
    }
  }, [selectedLanguage]);

  return (
    <LanguageContext.Provider
      value={{
        selectedLanguage,
        setSelectedLanguage,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

LanguageProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default LanguageContext;
