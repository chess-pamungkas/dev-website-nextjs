import React, { useEffect, useRef } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

const ReCaptchaProvider = ({ children, showBadge = false }) => {
  const scriptLoadedRef = useRef(false);
  const cleanupRef = useRef(null);

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

    // Defer reCAPTCHA loading to reduce initial load time
    const loadReCaptcha = () => {
      // Cleanup first
      cleanupReCaptcha();

      // Load reCAPTCHA script with better performance settings
      const script = document.createElement("script");
      script.src = `https://www.google.com/recaptcha/api.js?render=${process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY}`;
      script.async = true;
      script.defer = true;
      script.id = "google-recaptcha-v3";

      // Add performance attributes
      script.setAttribute("importance", "low");
      script.setAttribute("loading", "lazy");

      // Add CSP nonce if available
      const nonce = document
        .querySelector('meta[name="csp-nonce"]')
        ?.getAttribute("content");
      if (nonce) {
        script.setAttribute("nonce", nonce);
      }

      // Use requestIdleCallback to defer loading if possible
      const loadScript = () => {
        document.body.appendChild(script);
        scriptLoadedRef.current = true;
      };

      if ("requestIdleCallback" in window) {
        requestIdleCallback(loadScript, { timeout: 2000 });
      } else {
        // Use requestAnimationFrame for better performance
        requestAnimationFrame(loadScript);
      }

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

    // Defer reCAPTCHA loading to after initial render
    if ("requestIdleCallback" in window) {
      requestIdleCallback(loadReCaptcha, { timeout: 800 });
    } else {
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(loadReCaptcha);
    }

    return () => {
      // Cleanup script when component unmounts
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [showBadge]);

  return (
    <>
      <GoogleReCaptchaProvider
        reCaptchaKey={process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY}
        scriptProps={{
          async: true,
          defer: true,
          appendTo: "body",
          nonce: undefined,
          id: "google-recaptcha-v3-provider",
          importance: "low",
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
          // Remove console.log to reduce performance impact
          // console.log("ReCaptcha Provider loaded");
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
