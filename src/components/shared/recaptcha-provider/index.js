import React, { useEffect } from "react";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { useRouter } from "next/router";

const ReCaptchaProvider = ({ children }) => {
  const router = useRouter();
  // Normalize asPath to match /contact-us with or without trailing slash or query params
  const isContactUs =
    router.asPath.split("?")[0].replace(/\/+$/, "") === "/contact-us";
  const showBadge = isContactUs;
  const siteKey = process.env.NEXT_PUBLIC_GOOGLE_CAPTCHA_SITE_KEY;

  useEffect(() => {
    console.log(
      "[ReCaptchaProvider] router.pathname:",
      router.pathname,
      "router.asPath:",
      router.asPath,
      "router.route:",
      router.route,
      "isContactUs:",
      isContactUs
    );
    // Update style to position badge at bottom left
    const style = document.createElement("style");
    style.innerHTML = `
      .grecaptcha-badge { 
        visibility: ${showBadge ? "visible" : "hidden"} !important;
        left: 0 !important;
        right: auto !important;
        bottom: 0 !important;
        position: fixed !important;
        z-index: 999999 !important;
        width: 70px !important;
        transition: width 0.3s ease !important;
        overflow: hidden !important;
        transform: none !important;
        direction: ltr !important;
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

    return () => {
      document.head.removeChild(style);
    };
  }, [showBadge, router.asPath, isContactUs]);

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={siteKey}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: "body",
        nonce: undefined,
        id: "google-recaptcha-v3",
      }}
      language="en"
      useEnterprise={false}
    >
      {children}
      <div id="captcha-placeholder" />
    </GoogleReCaptchaProvider>
  );
};

export default ReCaptchaProvider;
