# Gatsby to Next.js Migration Guide

## Overview

This guide provides a step-by-step approach to safely migrate your Gatsby website to Next.js while maintaining all functionality, SEO, and internationalization features.

## Prerequisites

- Node.js 18+ installed
- Access to your current Gatsby codebase
- Understanding of React and JavaScript

## Phase 1: Project Setup ✅

### 1.1 Next.js Project Structure

The basic Next.js structure has been created with:

- `package.json` with all necessary dependencies
- `next.config.js` with i18n and optimization settings
- Core Next.js files (`_app.js`, `_document.js`, `index.js`)

### 1.2 Key Differences from Gatsby

| Feature | Gatsby                                   | Next.js                   |
| ------- | ---------------------------------------- | ------------------------- |
| Routing | File-based in `src/pages`                | File-based in `src/pages` |
| GraphQL | Built-in with `gatsby-source-filesystem` | Manual data fetching      |
| Images  | `gatsby-plugin-image`                    | `next/image`              |
| SEO     | `react-helmet`                           | `next/head`               |
| i18n    | `gatsby-plugin-react-i18next`            | `next-i18next`            |

## Phase 2: Asset Migration

### 2.1 Copy Static Assets

```bash
# Copy images and fonts
cp -r ../src/assets/images public/
cp -r ../src/assets/fonts public/
cp -r ../static/* public/

# Copy styles
cp -r ../src/assets/styles src/assets/
```

### 2.2 Copy Components

```bash
# Copy all components (excluding Gatsby-specific ones)
cp -r ../src/components/* src/components/
```

### 2.3 Copy Locales

```bash
# Copy translation files
cp -r ../src/locales/* src/locales/
```

## Phase 3: Component Migration

### 3.1 Remove Gatsby Dependencies

Replace these Gatsby-specific imports:

```javascript
// OLD (Gatsby)
import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import { Helmet } from "react-helmet";

// NEW (Next.js)
import Image from "next/image";
import Head from "next/head";
```

### 3.2 Update Image Components

```javascript
// OLD (Gatsby)
<StaticImage src="../assets/images/hero.jpg" alt="Hero" />

// NEW (Next.js)
<Image src="/images/hero.jpg" alt="Hero" width={1200} height={600} />
```

### 3.3 Update SEO Components

```javascript
// OLD (Gatsby)
<Helmet>
  <title>{title}</title>
  <meta name="description" content={description} />
</Helmet>

// NEW (Next.js)
<Head>
  <title>{title}</title>
  <meta name="description" content={description} />
</Head>
```

## Phase 4: Page Migration

### 4.1 Convert Page Components

For each page in `src/pages/`:

1. Remove GraphQL queries
2. Replace Gatsby imports with Next.js equivalents
3. Update image and SEO components
4. Test functionality

### 4.2 Example: Homepage Migration

```javascript
// OLD (Gatsby)
import { graphql } from "gatsby";
import { useTranslation } from "gatsby-plugin-react-i18next";

export const query = graphql`
  query ($language: String!) {
    locales: allLocale(filter: { language: { eq: $language } }) {
      edges {
        node {
          ns
          data
          language
        }
      }
    }
  }
`;

// NEW (Next.js)
import { useTranslation } from "react-i18next";
// No GraphQL query needed - data is loaded via i18n
```

## Phase 5: Data Fetching Migration

### 5.1 Replace GraphQL with API Calls

Since Gatsby uses GraphQL for data, you'll need to:

- Create API routes in `src/pages/api/`
- Use `getStaticProps` or `getServerSideProps` for data fetching
- Implement client-side data fetching with React Query

### 5.2 Example API Route

```javascript
// src/pages/api/translations.js
export default function handler(req, res) {
  const { locale } = req.query;
  const translations = require(`../../locales/${locale}/common.json`);
  res.status(200).json(translations);
}
```

## Phase 6: Internationalization

### 6.1 Next.js i18n Configuration

The `next.config.js` already includes i18n setup:

```javascript
i18n: {
  locales: ['en', 'fr', 'br', 'vn', 'th', 'es', 'it', 'cn', 'zh', 'id', 'jp', 'my', 'ar'],
  defaultLocale: 'en',
  localeDetection: true,
}
```

### 6.2 Translation Usage

```javascript
import { useTranslation } from "react-i18next";

const MyComponent = () => {
  const { t } = useTranslation();
  return <h1>{t("welcome")}</h1>;
};
```

## Phase 7: Testing and Optimization

### 7.1 Testing Checklist

- [ ] All pages render correctly
- [ ] Internationalization works
- [ ] Images load properly
- [ ] SEO meta tags are present
- [ ] Performance is acceptable
- [ ] Mobile responsiveness maintained

### 7.2 Performance Optimization

- Use `next/image` for automatic optimization
- Implement proper caching strategies
- Use `getStaticProps` for static pages
- Implement code splitting with dynamic imports

## Phase 8: Deployment

### 8.1 Build and Export

```bash
npm run build
npm run export  # If static export is needed
```

### 8.2 Environment Variables

Create `.env.local`:

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.tld
NEXT_PUBLIC_GOOGLE_TAG_MANAGER=GTM-XXXXXXX
```

## Common Issues and Solutions

### Issue 1: Image Paths

**Problem**: Images don't load after migration
**Solution**: Move images to `public/` directory and update paths

### Issue 2: Styling Issues

**Problem**: SCSS imports fail
**Solution**: Ensure `sass` is installed and configured in `next.config.js`

### Issue 3: Translation Keys Missing

**Problem**: Some translations don't work
**Solution**: Check that all locale files are properly copied and formatted

### Issue 4: Performance Degradation

**Problem**: Page load times increase
**Solution**: Implement proper image optimization and code splitting

## Migration Scripts

### Automated Migration Script

```bash
#!/bin/bash
# migration-script.sh

echo "Starting Gatsby to Next.js migration..."

# Copy assets
cp -r ../src/assets/images public/
cp -r ../src/assets/fonts public/
cp -r ../static/* public/

# Copy components (excluding Gatsby-specific)
find ../src/components -type f -name "*.js" -exec cp {} src/components/ \;

# Copy locales
cp -r ../src/locales/* src/locales/

# Copy helpers
cp -r ../src/helpers/* src/helpers/

echo "Migration completed!"
```

## Post-Migration Checklist

- [ ] All pages functional
- [ ] SEO meta tags working
- [ ] Images optimized and loading
- [ ] Internationalization complete
- [ ] Performance metrics acceptable
- [ ] Mobile responsiveness verified
- [ ] Analytics tracking working
- [ ] Error pages configured
- [ ] Sitemap generated
- [ ] Robots.txt updated

## Support and Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js i18n Guide](https://nextjs.org/docs/advanced-features/i18n-routing)
- [Migration Examples](https://github.com/vercel/next.js/tree/canary/examples)

## Timeline Estimate

- **Phase 1-2**: 1-2 days (Setup and asset copying)
- **Phase 3-4**: 3-5 days (Component and page migration)
- **Phase 5-6**: 2-3 days (Data fetching and i18n)
- **Phase 7-8**: 1-2 days (Testing and deployment)

**Total Estimated Time**: 7-12 days depending on complexity
