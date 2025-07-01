const fs = require("fs-extra");
const path = require("path");

// Import language configuration
const {
  list,
  defaultLangKey,
  uniqueList,
} = require("./src/helpers/lang.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable internationalization with URL-based routing
  i18n: {
    locales: list,
    defaultLocale: defaultLangKey,
    localeDetection: false,
  },

  // Enable static exports if needed
  trailingSlash: true,

  // Enhanced image optimization (replaces gatsby-plugin-sharp & gatsby-transformer-sharp)
  images: {
    domains: ["yourdomain.tld"],
    unoptimized: false,
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // SASS support (replaces gatsby-plugin-sass)
  sassOptions: {
    includePaths: [path.join(__dirname, "src/assets/styles")],
    prependData: `@import "vars.scss"; @import "mixins.scss";`,
  },

  // Environment variables
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
    NEXT_PUBLIC_ENTITY: process.env.NEXT_PUBLIC_ENTITY || "FSA",
  },

  // Webpack configuration for legacy dependencies
  webpack: (config, { isServer }) => {
    // Handle legacy modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };

    // Optimize bundle size
    if (!isServer) {
      config.resolve.fallback.fs = false;
    }

    return config;
  },

  // Headers for security and performance
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
      {
        source: "/images/(.*)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects for language routing and old Gatsby routes
  async redirects() {
    const redirects = [];

    // Language-specific redirects for entity-based routing
    const entity = process.env.NEXT_PUBLIC_ENTITY || "FSA";

    if (entity === "FSA") {
      // FSA entity redirects
      redirects.push(
        {
          source: "/",
          destination: "/en",
          locale: false,
          permanent: false,
        },
        {
          source: "/fr",
          destination: "/fr",
          locale: false,
          permanent: false,
        },
        {
          source: "/br",
          destination: "/br",
          locale: false,
          permanent: false,
        }
        // Add more language redirects as needed
      );
    } else {
      // CYSEC entity redirects
      redirects.push(
        {
          source: "/",
          destination: "/en",
          locale: false,
          permanent: false,
        }
        // Add CYSEC-specific redirects
      );
    }

    // Legacy Gatsby redirects
    redirects.push({
      source: "/gatsby/:path*",
      destination: "/:path*",
      permanent: true,
    });

    return redirects;
  },

  // Rewrites for language-based routing
  async rewrites() {
    const rewrites = [];

    // Handle language-specific routes
    list.forEach((locale) => {
      if (locale !== defaultLangKey) {
        rewrites.push({
          source: `/${locale}/:path*`,
          destination: `/${locale}/:path*`,
        });
      }
    });

    return rewrites;
  },

  // Experimental features for better performance (disabled problematic ones)
  experimental: {
    // optimizeCss: true, // Disabled to avoid critters module error
    scrollRestoration: true,
  },

  // Compiler options
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
};

// Copy registration script after build (from gatsby-node.js)
const copyRegistrationScript = async () => {
  const scriptsDir = path.join(process.cwd(), "src", "scripts");
  const publicScriptsDir = path.join(process.cwd(), "public", "scripts");

  try {
    // Ensure the scripts directory exists in public
    await fs.ensureDir(publicScriptsDir);

    // Copy the registration script to the public folder
    await fs.copy(
      path.join(scriptsDir, "registration-popup-script", "index.js"),
      path.join(publicScriptsDir, "registration-popup-script.js")
    );
    // Registration script copied successfully
  } catch (err) {
    // Error copying registration script
  }
};

// Execute the copy function if this is the main module
if (require.main === module) {
  copyRegistrationScript();
}

module.exports = nextConfig;
