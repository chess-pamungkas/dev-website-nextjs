const path = require("path");

// Import language configuration
const { list, defaultLangKey } = require("./src/helpers/lang.config");

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // Enhanced image optimization (replaces gatsby-plugin-sharp & gatsby-transformer-sharp)
  images: {
    unoptimized: false,
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
  },

  // SASS support (replaces gatsby-plugin-sass)
  sassOptions: {
    includePaths: [path.join(__dirname, "src/assets/styles")],
    // Removed prependData to avoid conflicts with @use statements
  },

  // Environment variables
  env: {
    NEXT_PUBLIC_ENTITY: process.env.NEXT_PUBLIC_ENTITY || "FSA",
    NEXT_PUBLIC_OPTIMIZE_DEV:
      process.env.NODE_ENV === "development" ? "true" : "false",
    NEXT_PUBLIC_DISABLE_REACT_SPRING:
      process.env.DISABLE_REACT_SPRING === "true" ? "true" : "false",
    NEXT_PUBLIC_DISABLE_PERF_MONITORING:
      process.env.DISABLE_PERF_MONITORING === "true" ? "true" : "false",
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
            value: "SAMEORIGIN",
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
          {
            key: "Content-Security-Policy",
            value:
              process.env.NODE_ENV === "development"
                ? "default-src * 'unsafe-inline' 'unsafe-eval' data: blob:;"
                : [
                    "default-src 'self'",
                    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com https://webchat.conv.rs https://metatraderweb.app",
                    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
                    "font-src 'self' https://fonts.gstatic.com",
                    "img-src 'self' data: https:",
                    "connect-src 'self' https://www.google.com https://webchat.conv.rs https://dev-back.oqt-ima.com wss://dev-back.oqt-ima.com https://back.oqt-ima.com https://back.oqtima.com https://portal.oqtima.com https://docs.oqtima.com https://oqtima.news https://app.convrs.io",
                    "frame-src 'self' https://www.google.com https://webchat.conv.rs https://webtrader.oqtima.com https://app.oqtima.com https://download.mql5.com https://play.google.com https://apps.apple.com https://getctrader.com https://getctradermac.com https://appgallery.huawei.com",
                    "frame-ancestors 'self' https://www.google.com https://www.gstatic.com",
                    "worker-src 'self' https://www.google.com https://webchat.conv.rs blob: https://metatraderweb.app",
                    "child-src 'self' https://www.google.com https://webchat.conv.rs https://metatraderweb.app https://webtrader.oqtima.com https://app.oqtima.com",
                  ].join("; "),
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

    // Handle language-specific routes - simplified to avoid conflicts
    list.forEach((locale) => {
      if (locale !== defaultLangKey) {
        rewrites.push({
          source: `/${locale}`,
          destination: `/${locale}`,
        });
      }
    });

    return rewrites;
  },

  // Compiler options
  compiler: {
    // Removed compiler.removeConsole to allow console logs in production
  },

  // Development-specific optimizations
  ...(process.env.NODE_ENV === "development" && {
    // Reduce bundle analysis overhead in development
    webpack: (config, { isServer, dev }) => {
      if (dev && !isServer) {
        // Reduce bundle analysis
        config.optimization = {
          ...config.optimization,
          splitChunks: {
            chunks: "all",
            cacheGroups: {
              default: false,
              vendors: false,
              // Only split vendor chunks in development
              vendor: {
                name: "vendor",
                chunks: "all",
                test: /node_modules/,
                priority: 20,
              },
            },
          },
        };

        // Optimize HMR for better performance
        config.plugins = config.plugins.map((plugin) => {
          if (plugin.constructor.name === "HotModuleReplacementPlugin") {
            // Reduce HMR overhead
            plugin.options = {
              ...plugin.options,
              multiStep: false,
              fullBuildTimeout: 2000,
              requestTimeout: 1000,
            };
          }
          return plugin;
        });
      }
      return config;
    },

    // Optimize development server
    devIndicators: {
      position: "bottom-right",
    },
  }),

  trailingSlash: true,
};

module.exports = nextConfig;
