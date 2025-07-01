import Head from "next/head";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

const Seo = ({
  title,
  description,
  image,
  url,
  type = "website",
  noindex = false,
  canonical,
  ...props
}) => {
  const { t } = useTranslation();
  const router = useRouter();

  // Get current locale
  const locale = router.locale || "en";

  // Build canonical URL
  const canonicalUrl =
    canonical ||
    `${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.tld"}${
      router.asPath
    }`;

  // Default meta tags
  const defaultTitle = t("page-main-title") || "Your Website";
  const defaultDescription =
    t("page-main-description") || "Your website description";
  const defaultImage = `${
    process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.tld"
  }/og-image.jpg`;

  const seoTitle = title || defaultTitle;
  const seoDescription = description || defaultDescription;
  const seoImage = image || defaultImage;
  const seoUrl = url || canonicalUrl;

  return (
    <Head>
      {/* Basic meta tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta
        name="robots"
        content={noindex ? "noindex,nofollow" : "index,follow"}
      />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />

      {/* Open Graph */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:image" content={seoImage} />
      <meta property="og:url" content={seoUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Your Website" />
      <meta property="og:locale" content={locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />
      <meta name="twitter:image" content={seoImage} />

      {/* Language alternates */}
      <link
        rel="alternate"
        hrefLang="en"
        href={`${process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.tld"}${
          router.asPath
        }`}
      />
      <link
        rel="alternate"
        hrefLang="fr"
        href={`${
          process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.tld"
        }/fr${router.asPath}`}
      />
      <link
        rel="alternate"
        hrefLang="br"
        href={`${
          process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.tld"
        }/br${router.asPath}`}
      />
      <link
        rel="alternate"
        hrefLang="vn"
        href={`${
          process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.tld"
        }/vn${router.asPath}`}
      />
      <link
        rel="alternate"
        hrefLang="th"
        href={`${
          process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.tld"
        }/th${router.asPath}`}
      />
      <link
        rel="alternate"
        hrefLang="es"
        href={`${
          process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.tld"
        }/es${router.asPath}`}
      />
      <link
        rel="alternate"
        hrefLang="it"
        href={`${
          process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.tld"
        }/it${router.asPath}`}
      />
      <link
        rel="alternate"
        hrefLang="cn"
        href={`${
          process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.tld"
        }/cn${router.asPath}`}
      />
      <link
        rel="alternate"
        hrefLang="zh"
        href={`${
          process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.tld"
        }/zh${router.asPath}`}
      />
      <link
        rel="alternate"
        hrefLang="id"
        href={`${
          process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.tld"
        }/id${router.asPath}`}
      />
      <link
        rel="alternate"
        hrefLang="jp"
        href={`${
          process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.tld"
        }/jp${router.asPath}`}
      />
      <link
        rel="alternate"
        hrefLang="my"
        href={`${
          process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.tld"
        }/my${router.asPath}`}
      />
      <link
        rel="alternate"
        hrefLang="ar"
        href={`${
          process.env.NEXT_PUBLIC_SITE_URL || "https://yourdomain.tld"
        }/ar${router.asPath}`}
      />

      {/* Additional meta tags */}
      {Object.entries(props).map(([key, value]) => (
        <meta key={key} name={key} content={value} />
      ))}
    </Head>
  );
};

export default Seo;
