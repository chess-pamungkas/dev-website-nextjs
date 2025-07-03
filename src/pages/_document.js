import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
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
        <script
          defer
          id="convrs-webchat"
          src={
            process.env.NEXT_PUBLIC_CONVRS_LIVECHAT ||
            "https://app.convrs.io/webchat/bootstrap.js?c=oqtima"
          }
        />
        {/* MetaTrader WebTerminal script */}
        <script
          type="text/javascript"
          src="https://metatraderweb.app/trade/widget.js"
        />
      </body>
    </Html>
  );
}
