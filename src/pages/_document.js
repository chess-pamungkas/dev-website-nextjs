import { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

export default function Document(props) {
  // Accept lang and dir as props, fallback to 'en' and 'ltr'
  const lang = props.__NEXT_DATA__?.props?.pageProps?.lang || "en";
  const dir = props.__NEXT_DATA__?.props?.pageProps?.dir || "ltr";

  return (
    <Html dir={dir} lang={lang}>
      <Head>
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Montserrat font for popup-registration */}
        {/* REMOVED: Google Fonts Montserrat import to use local font only */}
        {/* <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700;900&display=swap"
          rel="stylesheet"
        /> */}

        {/* Meta tags */}
        <meta name="application-name" content="Your Website" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Your Website" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="theme-color" content="#000000" />

        {/* Manifest */}
        <link rel="manifest" href="/manifest.json" />

        {/* Favicon for modern browsers */}
        <link
          rel="icon"
          type="image/png"
          sizes="192x192"
          href="/favicon-192x192.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="512x512"
          href="/favicon-512x512.png"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* Livechat script injected like Gatsby */}
        <Script
          id="convrs-webchat"
          src={
            process.env.NEXT_PUBLIC_CONVRS_LIVECHAT ||
            "https://app.convrs.io/webchat/bootstrap.js?c=oqtima"
          }
          strategy="afterInteractive"
        />
        {/* MetaTrader WebTerminal script */}
        <Script
          id="metatrader-webterminal"
          src="https://metatraderweb.app/trade/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </Html>
  );
}

// Add getInitialProps to ensure SSR has correct lang and dir
Document.getInitialProps = async (ctx) => {
  const initialProps = await ctx.defaultGetInitialProps(ctx);

  // Determine language and direction from the request
  let lang = "en";
  let dir = "ltr";

  // Check language from pathname
  if (ctx.pathname) {
    if (ctx.pathname.startsWith("/ar")) {
      lang = "ar";
      dir = "rtl";
    } else if (ctx.pathname.startsWith("/fr")) {
      lang = "fr";
      dir = "ltr";
    } else if (ctx.pathname.startsWith("/br")) {
      lang = "br";
      dir = "ltr";
    } else if (ctx.pathname.startsWith("/vn")) {
      lang = "vn";
      dir = "ltr";
    } else if (ctx.pathname.startsWith("/th")) {
      lang = "th";
      dir = "ltr";
    } else if (ctx.pathname.startsWith("/es")) {
      lang = "es";
      dir = "ltr";
    } else if (ctx.pathname.startsWith("/it")) {
      lang = "it";
      dir = "ltr";
    } else if (ctx.pathname.startsWith("/cn")) {
      lang = "cn";
      dir = "ltr";
    } else if (ctx.pathname.startsWith("/zh")) {
      lang = "zh";
      dir = "ltr";
    } else if (ctx.pathname.startsWith("/id")) {
      lang = "id";
      dir = "ltr";
    } else if (ctx.pathname.startsWith("/jp")) {
      lang = "jp";
      dir = "ltr";
    } else if (ctx.pathname.startsWith("/my")) {
      lang = "my";
      dir = "ltr";
    }
    // Default is English (en) with LTR
  }

  return {
    ...initialProps,
    pageProps: {
      ...initialProps.pageProps,
      lang,
      dir,
    },
  };
};
