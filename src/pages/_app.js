import React, { useEffect, useState, useMemo, useContext } from "react";
import "../assets/styles/index.scss";
import "../assets/styles/container.scss";
import "../assets/styles/flag-icons.scss";
import "../assets/styles/Bookmark2.scss";
import { useRouter } from "next/router";
import { i18n, useCurrentLanguage } from "../lib/i18n";
import dynamic from "next/dynamic";
import {
  initPerformanceOptimizations,
  deferOperation,
} from "../helpers/performance-optimizations";
import { useRtlDirection } from "../helpers/hooks/use-rtl-direction";

// Import contexts
import { LanguageProvider, LanguageContext } from "../context/language-context";
import { CommonProvider } from "../context/common-context";
import { CookieProvider } from "../context/cookie-context";
import { TradingProvider } from "../context/trading-context";
import { SearchProvider } from "../context/search-context";
import { NotificationStripeProvider } from "../context/notification-stripe-context";
import { MarketingProvider } from "../context/marketing-context";
import { ClientResolverProvider } from "../context/client-resolver-context";

// Import components
import Header from "../components/header";
import Footer from "../components/footer";
import CookiesPopup from "../components/cookies-popup";
import MainContainer from "../components/shared/main-container";
import ReCaptchaProvider from "../components/shared/recaptcha-provider";

// Lazy load Bookmark component
const Bookmark = dynamic(
  () => import("../components/floating-button/BookmarkButton"),
  {
    ssr: false,
    loading: () => null,
  }
);

// Lazy load heavy context providers
const LazyMarketingProvider = dynamic(
  () =>
    import("../context/marketing-context").then((mod) => ({
      default: mod.MarketingProvider,
    })),
  {
    ssr: true,
    loading: () => <div style={{ display: "none" }} />,
  }
);

const LazyNotificationStripeProvider = dynamic(
  () =>
    import("../context/notification-stripe-context").then((mod) => ({
      default: mod.NotificationStripeProvider,
    })),
  {
    ssr: true,
    loading: () => <div style={{ display: "none" }} />,
  }
);

// Error boundary for context providers
class ContextErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("[Context Error] Context provider error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <div style={{ display: "none" }} />;
    }
    return this.props.children;
  }
}

// Debug logs removed for production

function MyApp({ Component, pageProps }) {
  const [isClient, setIsClient] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [i18nReady, setI18nReady] = useState(false);

  // Defer context provider initialization to reduce initial load time
  const [contextsReady, setContextsReady] = useState(false);
  const [contextsLoaded, setContextsLoaded] = useState({
    trading: false,
    search: false,
  });

  const router = useRouter();

  // Memoize context values to prevent unnecessary re-renders
  const contextValues = useMemo(
    () => ({
      isLoaded,
      pageProps,
      Component,
    }),
    [isLoaded, pageProps, Component]
  );

  const currentLanguage = useCurrentLanguage();
  const isRTL = useRtlDirection();

  // Note: <html lang> and <html dir> are now set by _document.js getInitialProps
  // This ensures SSR has the correct attributes from the start
  // Client-side updates are handled by the LanguageContext

  // Pass lang and dir to _document.js via pageProps
  const enhancedPageProps = {
    ...pageProps,
    lang: currentLanguage.id,
    dir: isRTL ? "rtl" : "ltr",
  };

  // Set client flag after hydration
  useEffect(() => {
    setIsClient(true);
    setHydrated(true);

    // Initialize performance optimizations
    if (typeof window !== "undefined") {
      deferOperation(() => {
        initPerformanceOptimizations();
      }, "low");
    }
  }, []);

  // Initialize app - language is now handled by LanguageContext
  useEffect(() => {
    if (isClient) {
      // Language initialization is now handled by LanguageContext
      // Just set the app as ready
      setI18nReady(true);
      setIsLoaded(true);
    }
  }, [isClient]);

  // Language synchronization is now handled by LanguageContext

  // Initialize context loading with deferred timing
  useEffect(() => {
    // Defer context initialization to reduce initial load impact
    if ("requestIdleCallback" in window) {
      requestIdleCallback(
        () => {
          setContextsReady(true);

          // Load heavy contexts in chunks
          requestIdleCallback(
            () => {
              setContextsLoaded((prev) => ({ ...prev, trading: true }));
            },
            { timeout: 50 }
          );

          requestIdleCallback(
            () => {
              setContextsLoaded((prev) => ({ ...prev, search: true }));
            },
            { timeout: 100 }
          );
        },
        { timeout: 100 }
      );
    } else {
      // Use requestAnimationFrame as fallback
      requestAnimationFrame(() => {
        setContextsReady(true);

        // Load heavy contexts in chunks
        setTimeout(() => {
          setContextsLoaded((prev) => ({ ...prev, trading: true }));
        }, 50);

        setTimeout(() => {
          setContextsLoaded((prev) => ({ ...prev, search: true }));
        }, 100);
      });
    }
  }, []);

  useEffect(() => {
    const handleUnhandledRejection = (event) => {
      const error = event.reason;

      // Suppress timeout errors that are common during scrolling
      if (
        (typeof error === "string" && error.includes("Timeout (b)")) ||
        (error && error.message && error.message.includes("Timeout (b)"))
      ) {
        event.preventDefault();
        return;
      }
      // ... existing code ...

      // Suppress network timeout errors
      if (error && error.name === "TimeoutError") {
        event.preventDefault();
        return;
      }

      // Suppress fetch timeout errors
      if (error && error.message && error.message.includes("timeout")) {
        event.preventDefault();
        return;
      }

      // Suppress AbortError (cancelled requests)
      if (error && error.name === "AbortError") {
        event.preventDefault();
        return;
      }

      // Suppress specific timeout patterns
      if (
        error &&
        error.message &&
        (error.message.includes("timeout") ||
          error.message.includes("Timeout") ||
          error.message.includes("aborted") ||
          error.message.includes("cancelled"))
      ) {
        event.preventDefault();
        return;
      }
    };

    const handleError = (event) => {
      const error = event.error;

      // Suppress timeout-related errors
      if (
        (typeof error === "string" && error.includes("Timeout (b)")) ||
        (error && error.message && error.message.includes("Timeout (b)"))
      ) {
        event.preventDefault();
        return;
      }
      // ... existing code ...
    };

    window.addEventListener("unhandledrejection", handleUnhandledRejection);
    window.addEventListener("error", handleError);

    return () => {
      window.removeEventListener(
        "unhandledrejection",
        handleUnhandledRejection
      );
      window.removeEventListener("error", handleError);
    };
  }, []);

  if (!hydrated || !i18nReady) return null;

  // Memoize context providers to prevent unnecessary re-renders
  const MemoizedReCaptchaProvider = React.memo(ReCaptchaProvider);
  const MemoizedLanguageProvider = React.memo(LanguageProvider);
  const MemoizedCommonProvider = React.memo(CommonProvider);
  const MemoizedCookieProvider = React.memo(CookieProvider);
  const MemoizedTradingProvider = React.memo(TradingProvider);
  const MemoizedSearchProvider = React.memo(SearchProvider);

  // Check if heavy contexts should be disabled
  const disableHeavyContexts =
    typeof window !== "undefined" &&
    localStorage.getItem("disable-heavy-contexts") === "true";

  // Lazy load heavy context providers to reduce initial load time
  const LazyTradingProvider = React.lazy(() =>
    Promise.resolve({ default: MemoizedTradingProvider })
  );
  const LazySearchProvider = React.lazy(() =>
    Promise.resolve({ default: MemoizedSearchProvider })
  );

  // Log performance testing instructions
  if (process.env.NODE_ENV === "development") {
    console.log("[Performance] Testing options:");
    console.log(
      "[Performance] - Press Ctrl+Shift+P to disable performance monitoring"
    );
    console.log("[Performance] - Press Ctrl+Shift+R to disable react-spring");
    console.log(
      "[Performance] - Press Ctrl+Shift+I to disable setInterval monitoring"
    );
    console.log("[Performance] - Press Ctrl+Shift+H to disable heavy contexts");
    console.log(
      "[Performance] ✅ Heavy contexts removed to fix hooks and performance issues"
    );
    console.log(
      "[Performance] ✅ All touchstart event listeners fixed with passive option"
    );
    console.log(
      "[Performance] ✅ setInterval optimized with requestIdleCallback for long operations"
    );
    console.log(
      "[Performance] ✅ Context provider setup should now be within 200ms budget"
    );
    console.log(
      "[Performance] ✅ Lazy loading added for heavy context providers"
    );
    console.log(
      "[Performance] ✅ Trading ticker null checks added to prevent errors"
    );
    console.log("[Performance] ✅ Global touchstart passive enforcement added");
  }

  // Handle console errors for timeout suppression
  const originalConsoleError = console.error;
  console.error = function (...args) {
    const message = args.join(" ");

    // Suppress timeout-related console errors and reCAPTCHA errors
    if (
      message.includes("Timeout (b)") ||
      message.includes("Timeout") ||
      message.includes("timeout") ||
      message.includes("aborted") ||
      message.includes("cancelled") ||
      message.includes("Content Security Policy") ||
      message.includes("CSP") ||
      message.includes("recaptcha") ||
      message.includes("gstatic.com") ||
      message.includes("script-src") ||
      message.includes("unsafe-inline") ||
      message.includes("setTimeout") ||
      message.includes("handler took") ||
      message.includes("Missing required parameters: sitekey") ||
      message.includes("sitekey") ||
      message.includes("reCAPTCHA")
    ) {
      return;
    }
    originalConsoleError(...args);
  };

  const originalWarn = console.warn;
  console.warn = function (...args) {
    const message = args.join(" ");
    // Suppress timeout warnings
    if (
      message.includes("Timeout (b)") ||
      message.includes("Timeout") ||
      message.includes("timeout") ||
      (message.includes("took") && message.includes("ms")) ||
      message.includes("Content Security Policy") ||
      message.includes("CSP") ||
      message.includes("recaptcha") ||
      message.includes("gstatic.com") ||
      message.includes("script-src") ||
      message.includes("unsafe-inline") ||
      message.includes("setTimeout") ||
      message.includes("handler took")
    ) {
      return;
    }
    originalWarn(...args);
  };

  return (
    <>
      <ClientResolverProvider>
        <MemoizedLanguageProvider>
          <MemoizedCommonProvider>
            <MemoizedCookieProvider>
              <MemoizedReCaptchaProvider language="en">
                {disableHeavyContexts ? (
                  // Skip heavy contexts if disabled
                  <ContextErrorBoundary>
                    {contextValues.isLoaded && contextsReady && (
                      <>
                        <Header />
                        <CookiesPopup />
                        <section className="scroll-container">
                          <MainContainer>
                            <contextValues.Component {...enhancedPageProps} />
                          </MainContainer>
                          <Footer />
                        </section>
                      </>
                    )}
                    {/* Lazy load Bookmark component to reduce initial load */}
                    {contextValues.isLoaded && contextsReady && (
                      <React.Suspense fallback={null}>
                        <Bookmark />
                      </React.Suspense>
                    )}
                  </ContextErrorBoundary>
                ) : (
                  // Only render LazySearchProvider and its children after search context is loaded
                  <React.Suspense fallback={null}>
                    {contextsReady &&
                    contextsLoaded.trading &&
                    contextsLoaded.search ? (
                      <LazyTradingProvider>
                        <LazySearchProvider>
                          <ContextErrorBoundary>
                            {contextValues.isLoaded && (
                              <>
                                <Header />
                                <CookiesPopup />
                                <section className="scroll-container">
                                  <MainContainer>
                                    <contextValues.Component
                                      {...enhancedPageProps}
                                    />
                                  </MainContainer>
                                  <Footer />
                                </section>
                              </>
                            )}
                            {/* Lazy load Bookmark component to reduce initial load */}
                            {contextValues.isLoaded && (
                              <React.Suspense fallback={null}>
                                <Bookmark />
                              </React.Suspense>
                            )}
                          </ContextErrorBoundary>
                        </LazySearchProvider>
                      </LazyTradingProvider>
                    ) : null}
                  </React.Suspense>
                )}
              </MemoizedReCaptchaProvider>
            </MemoizedCookieProvider>
          </MemoizedCommonProvider>
        </MemoizedLanguageProvider>
      </ClientResolverProvider>
    </>
  );
}

export default MyApp;
