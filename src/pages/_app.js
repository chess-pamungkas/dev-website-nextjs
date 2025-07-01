import React, { useEffect, useState } from "react";
import "../assets/styles/index.scss";
import "../assets/styles/container.scss";
import "../assets/styles/flag-icons.scss";
import "../assets/styles/Bookmark.scss";
import { useRouter } from "next/router";
import i18n from "../lib/i18n";

// Import i18n and language utilities
import { initializeLanguage, useCurrentLanguage } from "../lib/i18n";

// Import contexts
import { LanguageProvider } from "../context/language-context";
import { CommonProvider } from "../context/common-context";
import { CookieProvider } from "../context/cookie-context";
import { TradingProvider } from "../context/trading-context";
import { SearchProvider } from "../context/search-context";
import { NotificationStripeProvider } from "../context/notification-stripe-context";
import { MarketingProvider } from "../context/marketing-context";

// Import components
import Header from "../components/header";
import Footer from "../components/footer";
import CookiesPopup from "../components/cookies-popup";
import Bookmark from "../components/floating-button/BookmarkButton";
import MainContainer from "../components/shared/main-container";
import ReCaptchaProvider from "../components/shared/recaptcha-provider";

function MyApp({ Component, pageProps }) {
  const currentLanguage = useCurrentLanguage();
  const [isClient, setIsClient] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [i18nReady, setI18nReady] = useState(false);
  const router = useRouter();

  // Set client flag after hydration
  useEffect(() => {
    setIsClient(true);
    setHydrated(true);
  }, []);

  // Initialize language system
  useEffect(() => {
    if (isClient) {
      try {
        initializeLanguage();
        setI18nReady(true);
        setIsLoaded(true);
      } catch (error) {
        console.warn("Error initializing language:", error);
        setI18nReady(true);
        setIsLoaded(true);
      }
    }
  }, [isClient]);

  // Update document language when locale changes
  useEffect(() => {
    if (isClient && currentLanguage && typeof document !== "undefined") {
      document.documentElement.setAttribute("lang", currentLanguage.id);
    }
  }, [currentLanguage, isClient]);

  // Synchronize i18next language with Next.js locale
  useEffect(() => {
    if (router.locale && i18n.language !== router.locale) {
      i18n.changeLanguage(router.locale);
    }
  }, [router.locale]);

  if (!hydrated || !i18nReady) return null;

  return (
    <ReCaptchaProvider>
      <LanguageProvider>
        <CommonProvider>
          <CookieProvider>
            <TradingProvider>
              <SearchProvider>
                <NotificationStripeProvider>
                  <MarketingProvider>
                    {isLoaded && (
                      <>
                        <Header />
                        <CookiesPopup />
                        <section className="scroll-container">
                          <MainContainer>
                            <Component {...pageProps} />
                          </MainContainer>
                          <Footer />
                        </section>
                      </>
                    )}
                    <Bookmark />
                  </MarketingProvider>
                </NotificationStripeProvider>
              </SearchProvider>
            </TradingProvider>
          </CookieProvider>
        </CommonProvider>
      </LanguageProvider>
    </ReCaptchaProvider>
  );
}

export default MyApp;
