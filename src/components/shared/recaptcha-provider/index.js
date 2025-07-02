import React, { useEffect, useRef, useState } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const ReCaptchaProvider = ({ children, showBadge = false }) => {
  const scriptLoadedRef = useRef(false);
  const cleanupRef = useRef(null);
  const [isScriptReady, setIsScriptReady] = useState(false);

  useEffect(() => {
    // Cleanup any existing reCAPTCHA instances before loading new one
    const cleanupReCaptcha = () => {
      // Remove existing reCAPTCHA script
      const existingScript = document.getElementById("google-recaptcha-v3");
      if (existingScript) {
        document.body.removeChild(existingScript);
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
    };

    // Store cleanup function for later use
    cleanupRef.current = cleanupReCaptcha;

    // Only load reCAPTCHA if not already loaded
    if (
      scriptLoadedRef.current ||
      document.getElementById("google-recaptcha-v3")
    ) {
      return;
    }

    // Load reCAPTCHA script immediately to ensure it's available
    const loadReCaptcha = () => {
      // Cleanup first
      cleanupReCaptcha();

      // Load reCAPTCHA script with better performance settings
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = false; // Changed to false to ensure immediate loading
      script.id = "google-recaptcha-v3";

      // Add performance attributes
      script.setAttribute("importance", "high"); // Changed to high priority
      script.setAttribute("loading", "eager"); // Changed to eager loading
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
          transition: width 0.2s ease !important; /* Reduced from 0.3s */
        overflow: hidden !important;
        transform: none !important;
        direction: ltr !important;
          will-change: width !important; /* Optimize for animation */
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

    return () => {
      // Cleanup script when component unmounts
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [showBadge]);

  // Only render the provider when the script is ready
  if (!isScriptReady) {
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
        language="en"
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
          console.log("[ReCaptcha] Provider loaded successfully");
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
