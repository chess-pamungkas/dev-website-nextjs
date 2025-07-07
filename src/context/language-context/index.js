import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useRef,
} from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import CookieContext from "../cookie-context";
import {
  LAST_LANGUAGE_KEY,
  PERFORMANCE_COOKIE_KEY,
} from "../../helpers/gdpr-cookie.config";
import { detectInitialLanguage } from "../../helpers/services/language-service";
import ClientResolverContext from "../client-resolver-context";
import i18n from "../../lib/i18n";

const LanguageContext = createContext({});

export const LanguageProvider = ({ children }) => {
  const cookieContext = useContext(CookieContext);
  const { clientConfig } = useContext(ClientResolverContext);
  const router = useRouter();

  // Handle case when CookieContext is not available
  const setCookie = cookieContext?.setCookie || (() => {});
  const isInitialized = useRef(false);
  const previousLanguage = useRef(null);
  const hasNavigated = useRef(false);

  const initialLang = useMemo(() => {
    const detected = detectInitialLanguage(
      clientConfig?.recommendedLanguage || null
    );
    console.log(`[Language Context] Initial language detected:`, detected);
    console.log(`[Language Context] Language ID:`, detected?.id);
    console.log(
      `[Language Context] Client config recommended language:`,
      clientConfig?.recommendedLanguage
    );
    return detected;
  }, [clientConfig?.recommendedLanguage]);

  const [selectedLanguage, setSelectedLanguage] = useState(initialLang);

  // Update selectedLanguage when initialLang changes (including when API response comes back)
  useEffect(() => {
    if (initialLang && initialLang.id !== selectedLanguage?.id) {
      console.log(
        `[Language Context] Updating language from ${selectedLanguage?.id} to ${initialLang.id}`
      );
      setSelectedLanguage(initialLang);
      if (!isInitialized.current) {
        isInitialized.current = true;
        console.log(
          `[Language Context] Language initialized: ${initialLang.id}`
        );
      }
    } else if (initialLang && !isInitialized.current) {
      // Initialize even if language hasn't changed
      isInitialized.current = true;
      console.log(
        `[Language Context] Language initialized (no change): ${initialLang.id}`
      );
    }
  }, [initialLang, selectedLanguage?.id]);

  // Handle language changes and navigation
  useEffect(() => {
    console.log(
      `[Language Context] Navigation effect triggered: selectedLanguage=${selectedLanguage?.id}, isInitialized=${isInitialized.current}`
    );

    if (
      !isInitialized.current ||
      !selectedLanguage ||
      typeof window === "undefined"
    ) {
      console.log(
        `[Language Context] Navigation effect early return: isInitialized=${
          isInitialized.current
        }, selectedLanguage=${!!selectedLanguage}, window=${
          typeof window !== "undefined"
        }`
      );
      return;
    }

    // Prevent infinite loop by checking if language actually changed
    if (previousLanguage.current?.id === selectedLanguage.id) return;

    // Only proceed if we have a valid language
    if (!selectedLanguage.id) return;

    previousLanguage.current = selectedLanguage;

    // Only navigate from root path to language path (no trailing slash logic)
    const currentPath = router.asPath;
    const needsNavigation = currentPath === "/" && selectedLanguage.id !== "en";

    if (needsNavigation && !hasNavigated.current) {
      console.log(`[Language Context] Navigation condition met!`);
      hasNavigated.current = true;
      const targetPath = `/${selectedLanguage.id}/`;
      console.log(`[Language Context] Navigating to: ${targetPath}`);
      router.replace(targetPath, undefined, { shallow: true });
    } else {
      console.log(
        `[Language Context] Navigation skipped: path=${currentPath}, language=${selectedLanguage.id}, hasNavigated=${hasNavigated.current}`
      );
    }

    // Sync i18n language
    if (i18n && i18n.language !== selectedLanguage.id) {
      i18n.changeLanguage(selectedLanguage.id);
    }

    // Handle RTL
    const rtlLanguages = ["ar"];
    const isRTL = rtlLanguages.includes(selectedLanguage.id);

    // Set RTL direction
    // document.documentElement.classList.add("rtl");
    // document.documentElement.classList.remove("rtl");
  }, [selectedLanguage]);

  // Handle cookie updates
  useEffect(() => {
    if (
      isInitialized.current &&
      selectedLanguage &&
      typeof window !== "undefined"
    ) {
      setCookie(LAST_LANGUAGE_KEY, selectedLanguage.id, PERFORMANCE_COOKIE_KEY);
    }
  }, [setCookie, selectedLanguage]);

  // Handle Japanese font
  useEffect(() => {
    if (
      typeof document !== "undefined" &&
      selectedLanguage &&
      typeof window !== "undefined"
    ) {
      if (selectedLanguage.id === "jp") {
        // document.body.classList.add("jp-font");
      } else {
        // document.body.classList.remove("jp-font");
      }
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
