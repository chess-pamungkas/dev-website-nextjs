import { getServerSideSitemap } from "next-sitemap";

export const getServerSideProps = async (ctx) => {
  // Get the base URL from environment or default
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.tld";

  // Define your site's pages
  const pages = [
    "",
    "/about",
    "/contact",
    "/forex",
    "/crypto",
    "/shares",
    "/indices",
    "/metals",
    "/energies",
    "/etf",
    "/mt4",
    "/mt5",
    "/platforms",
    "/education",
    "/partners",
    "/vps",
    "/trading-tools",
    "/copy-trading",
    "/swap-free",
    "/spreads-and-fees",
    "/professional-qualification",
    "/career",
    "/legal",
    "/privacy-policy",
    "/cookie-policy",
  ];

  // Create sitemap entries
  const fields = pages.map((page) => ({
    loc: `${baseUrl}${page}`,
    lastmod: new Date().toISOString(),
    changefreq: "daily",
    priority: page === "" ? 1.0 : 0.8,
  }));

  return getServerSideSitemap(ctx, fields);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
