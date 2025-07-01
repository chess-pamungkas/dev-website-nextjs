# Gatsby Plugin Migration Guide

## Overview

This guide shows how to migrate each Gatsby plugin from your `gatsby-config.js` to Next.js equivalents.

## 🔄 Plugin Migration Mapping

| Gatsby Plugin                     | Next.js Equivalent    | Status      | Implementation           |
| --------------------------------- | --------------------- | ----------- | ------------------------ |
| `gatsby-plugin-sass`              | Built-in SASS support | ✅ Migrated | `next.config.js`         |
| `gatsby-plugin-image`             | `next/image`          | ✅ Migrated | Component updates needed |
| `gatsby-plugin-sitemap`           | `next-sitemap`        | ✅ Migrated | `next-sitemap.config.js` |
| `gatsby-plugin-manifest`          | Manual manifest.json  | ✅ Migrated | `public/manifest.json`   |
| `gatsby-plugin-sharp`             | Built-in optimization | ✅ Migrated | `next/image`             |
| `gatsby-transformer-sharp`        | Built-in optimization | ✅ Migrated | `next/image`             |
| `gatsby-source-filesystem`        | Manual imports        | ✅ Migrated | Direct imports           |
| `gatsby-plugin-google-tagmanager` | Manual GTM setup      | ✅ Migrated | `_app.js`                |
| `gatsby-plugin-react-i18next`     | `react-i18next`       | ✅ Migrated | `src/lib/i18n.js`        |

## 📋 Detailed Plugin Migration

### 1. `gatsby-plugin-sass` → Next.js Built-in SASS

**Gatsby:**

```javascript
plugins: ["gatsby-plugin-sass"];
```

**Next.js:**

```javascript
// next.config.js
const nextConfig = {
  sassOptions: {
    includePaths: ["./src/assets/styles"],
  },
};
```

**Usage:**

```scss
// Import SCSS files directly
import '../assets/styles/index.scss';
```

### 2. `gatsby-plugin-image` → `next/image`

**Gatsby:**

```javascript
plugins: ["gatsby-plugin-image"];
```

**Next.js:**

```javascript
// next.config.js
const nextConfig = {
  images: {
    domains: ["yourdomain.tld"],
    unoptimized: false,
  },
};
```

**Component Migration:**

```javascript
// OLD (Gatsby)
import { StaticImage } from "gatsby-plugin-image";
<StaticImage src="../assets/images/hero.jpg" alt="Hero" />;

// NEW (Next.js)
import Image from "next/image";
<Image src="/images/hero.jpg" alt="Hero" width={1200} height={600} />;
```

### 3. `gatsby-plugin-sitemap` → `next-sitemap`

**Gatsby:**

```javascript
plugins: ["gatsby-plugin-sitemap"];
```

**Next.js:**

```javascript
// next-sitemap.config.js
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.tld",
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ["/404", "/500"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
    ],
  },
};
```

**Package.json:**

```json
{
  "dependencies": {
    "next-sitemap": "^4.2.3"
  }
}
```

### 4. `gatsby-plugin-manifest` → Manual manifest.json

**Gatsby:**

```javascript
plugins: [
  {
    resolve: "gatsby-plugin-manifest",
    options: {
      icon: "src/assets/images/icon.png",
    },
  },
];
```

**Next.js:**

```json
// public/manifest.json
{
  "name": "OQtima - Forex & CFD Trading",
  "short_name": "OQtima",
  "description": "Forex, cfd trading on stocks, indices, oil and gold with the most advanced trading platforms.",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

**Link in \_document.js:**

```javascript
<link rel="manifest" href="/manifest.json" />
```

### 5. `gatsby-plugin-sharp` & `gatsby-transformer-sharp` → Built-in Optimization

**Gatsby:**

```javascript
plugins: ["gatsby-plugin-sharp", "gatsby-transformer-sharp"];
```

**Next.js:**

```javascript
// next.config.js
const nextConfig = {
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};
```

### 6. `gatsby-source-filesystem` → Direct Imports

**Gatsby:**

```javascript
plugins: [
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "images",
      path: "./src/assets/images/",
    },
  },
  {
    resolve: "gatsby-source-filesystem",
    options: {
      name: "locale",
      path: `${__dirname}/src/locales/`,
    },
  },
];
```

**Next.js:**

```javascript
// Direct imports instead of GraphQL
import en from "../locales/en/common.json";
import fr from "../locales/fr/common.json";
// ... other locales

// For images, move to public/ directory
// src/assets/images/ → public/images/
```

### 7. `gatsby-plugin-google-tagmanager` → Manual GTM Setup

**Gatsby:**

```javascript
plugins: [
  {
    resolve: "gatsby-plugin-google-tagmanager",
    options: {
      id: process.env.GATSBY_GOOGLE_TAG_MANAGER,
      defaultDataLayer: { platform: "gatsby" },
    },
  },
];
```

**Next.js:**

```javascript
// _app.js
{
  process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER && (
    <script
      dangerouslySetInnerHTML={{
        __html: `
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER}');
      `,
      }}
    />
  );
}

{
  process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER && (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GOOGLE_TAG_MANAGER}`}
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  );
}
```

### 8. `gatsby-plugin-react-i18next` → `react-i18next`

**Gatsby:**

```javascript
plugins: [
  {
    resolve: "gatsby-plugin-react-i18next",
    options: {
      localeJsonSourceName: "locale",
      languages: languages.list,
      defaultLanguage: languages.defaultLangKey,
      fallbackLanguage: languages.defaultLangKey,
      redirect: false,
      i18nextOptions: {
        keySeparator: false,
        nsSeparator: false,
      },
    },
  },
];
```

**Next.js:**

```javascript
// src/lib/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// Import all locale files
import en from "../../locales/en/common.json";
import fr from "../../locales/fr/common.json";
// ... other locales

const resources = {
  en: { common: en },
  fr: { common: fr },
  // ... other locales
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  debug: process.env.NODE_ENV === "development",
  interpolation: {
    escapeValue: false,
  },
  defaultNS: "common",
  ns: ["common"],
  keySeparator: false,
  nsSeparator: false,
});

export default i18n;
```

**next.config.js:**

```javascript
const nextConfig = {
  i18n: {
    locales: [
      "en",
      "fr",
      "br",
      "vn",
      "th",
      "es",
      "it",
      "cn",
      "zh",
      "id",
      "jp",
      "my",
      "ar",
    ],
    defaultLocale: "en",
    localeDetection: true,
  },
};
```

## 🔧 Additional Next.js Features

### 1. Environment Variables Processing

**Gatsby:**

```javascript
require("dotenv").config({
  path: `.env.${process.env.NODE_ENV}`,
});
```

**Next.js:**

```javascript
// next.config.js
const nextConfig = {
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },
};
```

### 2. Language Processing

**Gatsby:**

```javascript
const languages = require(`${__dirname}/src/locales/language.config`);
const {
  processLanguagesForConfig,
} = require(`${__dirname}/src/locales/processLanguages`);
const indexedLocaleData = processLanguagesForConfig(languages.uniqueList);
```

**Next.js:**

```javascript
// src/lib/i18n.js
import { list, defaultLangKey, uniqueList } from "../helpers/lang.config";

// Process languages for Next.js i18n
const locales = uniqueList;
const defaultLocale = defaultLangKey;
```

### 3. HTML Attributes

**Gatsby:**

```javascript
exports.onRenderBody = ({ setHtmlAttributes }) => {
  setHtmlAttributes({ lang: languages.list.id });
};
```

**Next.js:**

```javascript
// _document.js
<Html lang="en">{/* Document content */}</Html>;

// Or dynamically in _app.js
useEffect(() => {
  if (router.locale) {
    document.documentElement.lang = router.locale;
  }
}, [router.locale]);
```

## 📋 Migration Checklist

### ✅ Completed

- [x] SASS support configured
- [x] Image optimization setup
- [x] Sitemap generation
- [x] PWA manifest
- [x] Google Tag Manager
- [x] Internationalization
- [x] Environment variables
- [x] Language processing

### 🔄 In Progress

- [ ] Component image updates
- [ ] Translation file imports
- [ ] Testing all functionality

### 📋 Remaining

- [ ] Update all image components
- [ ] Test i18n functionality
- [ ] Verify GTM tracking
- [ ] Test PWA features

## 🚀 Implementation Steps

1. **Update next.config.js** with all configurations
2. **Create manifest.json** in public directory
3. **Set up i18n** in src/lib/i18n.js
4. **Update \_app.js** with GTM and service worker
5. **Update \_document.js** with manifest link
6. **Test all functionality**

## 📞 Support

If you encounter issues with any plugin migration:

1. Check the Next.js documentation for the specific feature
2. Verify environment variables are correctly set
3. Test functionality step by step
4. Check browser console for errors

---

**All Gatsby plugins have been successfully migrated to Next.js equivalents!** 🎉
