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

    if (path === "/" || path === undefined) {
      return language.id === defaultLocale
        ? "/"
        : langConfig.URIPart || "/" + language.id;
    } else {
      return language.id === defaultLocale
        ? path
        : (langConfig.URIPart || "/" + language.id) + path;
    }
  };

  const handleLanguageChange = (e) => {
    e.preventDefault();
    const langConfig = LANG_SELECT_OPTIONS.find((l) => l.id === language.id);
    let path = getCurrentPath();

    // If home page, use '/' for default locale, '/[locale]' for others
    if (path === "/" || path === undefined) {
      path =
        language.id === defaultLocale
          ? "/"
          : langConfig.URIPart || "/" + language.id;
    } else {
      // For other pages, add locale prefix if not default
      path =
        language.id === defaultLocale
          ? path
          : (langConfig.URIPart || "/" + language.id) + path;
    }

    // Ensure path is a string and properly encoded
    if (typeof path !== "string") {
      console.error(
        "router.push called with non-string path:",
        path,
        typeof path
      );
      path = "/"; // Fallback to home page
    }

    path = encodeURI(path);
    router.push(path, path, { locale: language.id });
    languageSelectHandler(language);
    document.documentElement.setAttribute("lang", language.id);
  };

  return (
    <li
      className={cn("lang-options__item", {
        "lang-options__item--selected": selectedId === id,
      })}
    >
      <Link
        href={getLanguageHref(language)}
        locale={language.id}
        className="lang-options__select"
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
      </Link>
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
