import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import Link from "next/link";
import { useRouter } from "next/router";
import {
  LANG_SELECT_OPTIONS,
  SHOULD_BE_SMALLER_LANGUAGES,
} from "../../../../helpers/lang-options.config";
import { useTranslation } from "react-i18next";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import { useLanguageSwitch, useCurrentLanguage } from "../../../../lib/i18n";

// Force defaultLangKey for debug and clarity
const defaultLangKey = "en";

const LangSelectItem = ({
  language: { id, icon: Icon, name } = {},
  language,
  selectedLanguage: { id: selectedId } = {},
  languageSelectHandler,
}) => {
  const router = useRouter();
  const { locale, defaultLocale, query } = router;

  const getCurrentPath = () => {
    // Use router.query.slug to determine the current path
    let slug = query.slug;

    // Handle undefined or empty slug
    if (!slug || (Array.isArray(slug) && slug.length === 0)) {
      return "/";
    }

    // Handle array slug
    if (Array.isArray(slug)) {
      return "/" + slug.join("/");
    }

    // Handle string slug
    if (typeof slug === "string") {
      return "/" + slug;
    }

    // Fallback for unexpected types
    console.warn("Unexpected slug type:", typeof slug, slug);
    return "/";
  };

  const getLanguageHref = (language) => {
    const langConfig = LANG_SELECT_OPTIONS.find((l) => l.id === language.id);
    let path = getCurrentPath();

    // Remove any existing language prefix (2-letter code at start of path)
    path = path.replace(/^\/[a-z]{2}(?=\/|$)/, "");

    // Handle home page
    if (path === "/" || path === "" || path === undefined) {
      return language.id === defaultLocale
        ? "/"
        : langConfig.URIPart || "/" + language.id;
    } else {
      // For other pages, add locale prefix if not default
      return language.id === defaultLocale
        ? path
        : (langConfig.URIPart || "/" + language.id) + path;
    }
  };

  const handleLanguageChange = (e) => {
    e.preventDefault();
    languageSelectHandler(language);

    let path = router.asPath;

    // Always remove any existing language prefix (including /en, /es, /jp, etc.)
    path = path.replace(/^\/[a-z]{2}(?=\/|$)/, "");

    // If path is empty or just slash, treat as home
    if (path === "" || path === "/" || path === undefined) {
      path = "/";
    }

    if (language.id === defaultLangKey) {
      // For EN, always go to root and force reload
      window.location.assign("/");
    } else {
      // For other languages, add prefix unless path is just /
      if (path === "/") {
        path = `/${language.id}`;
      } else {
        path = `/${language.id}${path}`;
      }
      // Remove double slashes
      path = path.replace(/\/\//g, "/");
      router.replace(path);
    }
  };

  return (
    <li
      className={cn("lang-options__item", {
        "lang-options__item--selected": selectedId === id,
      })}
    >
      <a
        href={getLanguageHref(language)}
        className="lang-options__select"
        onClick={handleLanguageChange}
      >
        {Icon && <Icon className="lang-options__flag" />}
        <span
          className={
            SHOULD_BE_SMALLER_LANGUAGES.includes(name)
              ? "lang-options__name--small"
              : "lang-options__name"
          }
        >
          {name}
        </span>
      </a>
    </li>
  );
};

LangSelectItem.propTypes = {
  language: PropTypes.shape({
    id: PropTypes.string,
    icon: PropTypes.elementType,
    name: PropTypes.string,
  }),
  selectedLanguage: PropTypes.shape({
    id: PropTypes.string,
  }),
  languageSelectHandler: PropTypes.func,
};

const LangOptions = () => {
  const { t } = useTranslation();
  const { t: tWithVars } = useTranslationWithVariables();
  const currentLanguage = useCurrentLanguage();
  const switchLanguage = useLanguageSwitch();

  const handleLanguageSelect = (language) => {
    switchLanguage(language);
  };

  return (
    <div className="lang-options">
      <h2 className="lang-options__title">{t("lang-select-popup-title")}</h2>
      <ul className="lang-options__list">
        {LANG_SELECT_OPTIONS.map((language) => (
          <LangSelectItem
            key={language.id}
            language={language}
            selectedLanguage={currentLanguage}
            languageSelectHandler={handleLanguageSelect}
          />
        ))}
      </ul>
    </div>
  );
};

export default LangOptions;
