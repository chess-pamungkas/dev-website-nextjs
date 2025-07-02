import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";
import { list as locales, defaultLangKey } from "../helpers/lang.config";

// Import all page components (static imports for main pages, dynamic for rarely visited)
import MainHomePage from "../components/pages-content/main-home-page";
import MainPromotionPage from "../components/pages-content/main-page-content/performance-content";
import ForexPage from "../components/pages-content/forex-content";
import LegalPage from "../components/pages-content/legal-content";
import CareerPage from "../components/pages-content/career-content";
import CryptoPage from "../components/pages-content/crypto-content";
import SharesPage from "../components/pages-content/shares-content";
import Mt4Page from "../components/pages-content/mt4-page-content";
import Mt5Page from "../components/pages-content/mt5-page-content";
import PartnersPage from "../components/pages-content/partners-page-content";
import VpsPage from "../components/pages-content/vps-page-content";
import AccountsTypePage from "../components/pages-content/accounts-type-page-content";
import SwapFreePage from "../components/pages-content/swap-free-page-content";
import EducationPage from "../components/pages-content/education-page-content";
import FundingPage from "../components/pages-content/funding-page-content";
import SpreadsAndFeesPage from "../components/pages-content/spreads-and-fees-page-content";
import TradingToolsPage from "../components/pages-content/trading-tools-page-content";
import TradingViewPage from "../components/pages-content/trading-view-page-content";
import PrivacyPolicyPage from "../components/pages-content/privacy-policy-page-content";
import ProfessionalQualificationPage from "../components/pages-content/professional-qualification-page-content";
import SearchPage from "../components/pages-content/search-page-content";
import IndicesPage from "../components/pages-content/indices-page-content";
import MetalsPage from "../components/pages-content/metals-page-content";
import EtfPage from "../components/pages-content/etf-page-content";
import EnergiesPage from "../components/pages-content/energies-page-content";
import CtraderPage from "../components/pages-content/ctrader-page-content";
import CopyTradingPage from "../components/pages-content/copy-trading-page-content";
import CookiePolicyPage from "../components/pages-content/cookie-policy-page-content";
import NotFoundPage from "../components/pages-content/not-found-page-content";
import PlatformsPage from "../components/pages-content/platforms-page-content";
import AllMarketsPage from "../components/pages-content/all-markets-page-content";

// Advanced: Dynamic/nested route support
const DYNAMIC_PAGE_MAP = {
  legal: LegalPage,
  "privacy-policy": PrivacyPolicyPage,
  "professional-qualification": ProfessionalQualificationPage,
  platforms: PlatformsPage,
};

// Map slugs to page components
const PAGE_MAP = {
  "": MainHomePage,
  company: MainPromotionPage,
  "contact-us": dynamic(() =>
    import("../components/pages-content/main-page-content/performance-content")
  ),
  faq: dynamic(() =>
    import("../components/pages-content/main-page-content/performance-content")
  ),
  career: CareerPage,
  forex: ForexPage,
  crypto: CryptoPage,
  shares: SharesPage,
  indices: IndicesPage,
  metals: MetalsPage,
  energies: EnergiesPage,
  etf: EtfPage,
  mt4: Mt4Page,
  mt5: Mt5Page,
  ctrader: CtraderPage,
  "trading-view": TradingViewPage,
  platforms: PlatformsPage,
  "accounts-type": AccountsTypePage,
  "spreads-and-fees": SpreadsAndFeesPage,
  "swap-free": SwapFreePage,
  vps: VpsPage,
  "copy-trading": CopyTradingPage,
  "trading-tools": TradingToolsPage,
  education: EducationPage,
  funding: FundingPage,
  partners: PartnersPage,
  legal: LegalPage,
  "privacy-policy": PrivacyPolicyPage,
  "cookie-policy": CookiePolicyPage,
  "professional-qualification": ProfessionalQualificationPage,
  search: SearchPage,
  "all-markets": AllMarketsPage,
};

export default function CatchAllPage({ slug, detectedLocale }) {
  const router = useRouter();

  // Extract locale from slug if present
  let actualSlug = slug || [];
  let locale = detectedLocale;

  // Check if first slug segment is a language code
  if (actualSlug.length > 0 && locales.includes(actualSlug[0])) {
    locale = actualSlug[0];
    actualSlug = actualSlug.slice(1);
  }

  // If slug is undefined or empty, treat as home page
  const isHome = actualSlug.length === 0;
  const path = isHome ? "" : actualSlug.join("/");
  const cleanPath = path.replace(/\/$/, "");

  let PageComponent = isHome ? MainHomePage : PAGE_MAP[cleanPath] || null;

  // Handle dynamic/nested routes like /legal/:slug, /privacy-policy/:slug, /platforms/:slug
  if (!PageComponent && actualSlug.length > 1) {
    const [parent, ...rest] = actualSlug;
    if (DYNAMIC_PAGE_MAP[parent]) {
      PageComponent = DYNAMIC_PAGE_MAP[parent];
    }
  }

  if (!PageComponent) {
    // Render a custom 404 page if available
    return (
      <div>
        <Head>
          <title>404 Not Found</title>
        </Head>
        <NotFoundPage />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{cleanPath ? `${cleanPath} | OQtima` : "OQtima"}</title>
        <meta
          name="description"
          content={`OQtima ${cleanPath || "Home"} page in ${locale}`}
        />
        <link
          rel="alternate"
          hrefLang={locale}
          href={`/${locale !== defaultLangKey ? locale + "/" : ""}${cleanPath}`}
        />
      </Head>
      <PageComponent slug={actualSlug} locale={locale} />
    </>
  );
}

export async function getStaticPaths() {
  const pages = [
    "",
    "company",
    "contact-us",
    "faq",
    "career",
    "forex",
    "crypto",
    "shares",
    "indices",
    "metals",
    "energies",
    "etf",
    "mt4",
    "mt5",
    "ctrader",
    "trading-view",
    "platforms",
    "accounts-type",
    "spreads-and-fees",
    "swap-free",
    "vps",
    "copy-trading",
    "trading-tools",
    "education",
    "funding",
    "partners",
    "legal",
    "privacy-policy",
    "cookie-policy",
    "professional-qualification",
    "search",
    "all-markets",
  ];
  const dynamicSlugs = [
    ["legal", "terms"],
    ["legal", "disclaimer"],
    ["privacy-policy", "gdpr"],
    ["privacy-policy", "cookies"],
    ["professional-qualification", "details"],
    ["platforms", "mt4"],
    ["platforms", "mt5"],
    ["platforms", "ctrader"],
    ["platforms", "trading-view"],
  ];
  const paths = [];

  // Generate paths for each locale with language prefix
  for (const locale of locales) {
    // Home page for each locale
    if (locale === defaultLangKey) {
      paths.push({ params: { slug: [] } });
    } else {
      paths.push({ params: { slug: [locale] } });
    }

    // Regular pages for each locale
    for (const page of pages) {
      if (page) {
        if (locale === defaultLangKey) {
          paths.push({ params: { slug: [page] } });
        } else {
          paths.push({ params: { slug: [locale, page] } });
        }
      }
    }

    // Dynamic pages for each locale
    for (const slugArr of dynamicSlugs) {
      if (locale === defaultLangKey) {
        paths.push({ params: { slug: slugArr } });
      } else {
        paths.push({ params: { slug: [locale, ...slugArr] } });
      }
    }
  }

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // params.slug is an array or undefined
  const slug = params.slug || [];

  // Detect locale from slug
  let detectedLocale = defaultLangKey;
  if (slug.length > 0 && locales.includes(slug[0])) {
    detectedLocale = slug[0];
  }

  return {
    props: {
      slug: params.slug || [],
      detectedLocale,
    },
  };
}
