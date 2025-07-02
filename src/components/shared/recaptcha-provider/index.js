import React, { useEffect, useRef, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const ReCaptchaProvider = ({
  children,
  showBadge = false,
  language = "en",
}) => {
  const scriptLoadedRef = useRef(false);
  const cleanupRef = useRef(null);
  const languageRef = useRef(language);
  const [isScriptReady, setIsScriptReady] = useState(false);
  const [isCleaningUp, setIsCleaningUp] = useState(false);

  useEffect(() => {
    // Cleanup any existing reCAPTCHA instances before loading new one
    const cleanupReCaptcha = async () => {
      setIsCleaningUp(true);

      // Remove existing reCAPTCHA script
      const existingScript = document.getElementById("google-recaptcha-v3");
      if (existingScript) {
        document.body.removeChild(existingScript);
      }

      // Remove existing reCAPTCHA provider script
      const existingProviderScript = document.getElementById(
        "google-recaptcha-v3-provider"
      );
      if (existingProviderScript) {
        document.body.removeChild(existingProviderScript);
      }

      // Remove existing reCAPTCHA style
      const existingStyle = document.querySelector(
        "style[data-recaptcha-style]"
      );
      if (existingStyle) {
        document.head.removeChild(existingStyle);
      }

      // Reset reCAPTCHA global object
      if (window.grecaptcha) {
        delete window.grecaptcha;
      }

      // Remove any existing reCAPTCHA elements
      const recaptchaElements = document.querySelectorAll(".grecaptcha-badge");
      recaptchaElements.forEach((element) => {
        if (element.parentNode) {
          element.parentNode.removeChild(element);
        }
      });

      // Wait a bit to ensure cleanup is complete
      await new Promise((resolve) => setTimeout(resolve, 100));

      setIsCleaningUp(false);
      scriptLoadedRef.current = false;
    };

    // Store cleanup function for later use
    cleanupRef.current = cleanupReCaptcha;

    // Check if language has changed or if we need to load for the first time
    const shouldReload =
      !scriptLoadedRef.current || languageRef.current !== language;

    if (shouldReload && !isCleaningUp) {
      // Update language reference
      languageRef.current = language;

      // Load reCAPTCHA script with better performance settings
      const loadReCaptcha = async () => {
        // Cleanup first if needed
        if (scriptLoadedRef.current) {
          await cleanupReCaptcha();
        }

        // Check if script is already being loaded
        if (document.getElementById("google-recaptcha-v3")) {
          return;
        }

        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY}&hl=${language}`;
        script.async = true;
        script.defer = false;
        script.id = "google-recaptcha-v3";

        // Add performance attributes
        script.setAttribute("importance", "high");
        script.setAttribute("loading", "eager");

        // Load script immediately and wait for it to be ready
        script.onload = () => {
          scriptLoadedRef.current = true;
          // Wait a bit more to ensure grecaptcha is fully initialized
          setTimeout(() => {
            setIsScriptReady(true);
          }, 100);
        };

        script.onerror = (error) => {
          console.warn("[ReCaptcha] Script loading failed:", error);
          scriptLoadedRef.current = false;
          setIsScriptReady(false);
          // Retry after a delay
          setTimeout(() => {
            if (!scriptLoadedRef.current) {
              loadReCaptcha();
            }
          }, 2000);
        };

        // Load script immediately
        document.body.appendChild(script);

        // Update style to position badge at bottom left with better performance
        const style = document.createElement("style");
        style.setAttribute("data-recaptcha-style", "true");
        style.innerHTML = `
        .grecaptcha-badge { 
          visibility: ${showBadge ? "visible" : "hidden"} !important;
          left: 0 !important;
          right: auto !important;
          bottom: 0 !important;
          position: fixed !important;
          z-index: 999999 !important;
          width: 70px !important;
          transition: width 0.2s ease !important;
          overflow: hidden !important;
          transform: none !important;
          direction: ltr !important;
          will-change: width !important;
        }
        .grecaptcha-badge:hover {
          width: 256px !important;
        }
        .grecaptcha-badge .grecaptcha-logo {
          transform: none !important;
        }
        [dir="rtl"] .grecaptcha-badge {
          transform: none !important;
        }
        [dir="rtl"] .grecaptcha-badge .grecaptcha-logo {
          transform: none !important;
        }
      `;
        document.head.appendChild(style);
      };

      // Load reCAPTCHA immediately
      loadReCaptcha();
    }

    return () => {
      // Cleanup script when component unmounts
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [showBadge, language]);

  // Only render the provider when the script is ready and not cleaning up
  if (!isScriptReady || isCleaningUp) {
    return (
      <>
        {children}
        <div id="captcha-placeholder" />
      </>
    );
  }

  return (
    <>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY}
        scriptProps={{
          async: true,
          defer: false,
          appendTo: "body",
          id: "google-recaptcha-v3-provider",
          importance: "high",
        }}
        language={language}
        useEnterprise={false}
        container={{
          element: "captcha-placeholder",
          parameters: {
            badge: "bottomleft",
            size: "invisible",
            theme: "light",
          },
        }}
        onLoad={() => {
          console.log(
            "[ReCaptcha] Provider loaded successfully for language:",
            language
          );
        }}
        onError={(error) => {
          console.warn("[ReCaptcha] Error loading reCAPTCHA:", error);
        }}
      >
        {children}
      </GoogleReCaptchaProvider>
      <div id="captcha-placeholder" />
    </>
  );
};

export default ReCaptchaProvider;
