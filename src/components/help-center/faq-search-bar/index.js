import React, { useCallback, useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import {
  FAQ_ALL,
  FAQ_BEGINNERS,
  FAQ_QUICK_ANSWER,
  getFAQMarket,
} from "../../../helpers/faq";
import { debounce } from "lodash";

// Deep copy function for arrays/objects
function deepCopy(obj) {
  if (Array.isArray(obj)) {
    return obj.map(deepCopy);
  } else if (obj && typeof obj === "object") {
    return Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k, deepCopy(v)])
    );
  }
  return obj;
}

const FaqSearchBar = ({ className, setSearchResults, setNoSearchResult }) => {
  const COUNT_OF_SEARCH_CHARS = 1;

  const { t } = useTranslationWithVariables();
  const [searchTerm, setSearchTerm] = useState("");

  const faqMarket = getFAQMarket();

  const searchContent = [
    ...FAQ_QUICK_ANSWER,
    ...FAQ_ALL,
    ...faqMarket,
    ...FAQ_BEGINNERS,
  ];

  const handleSearchValue = (value) => {
    if (value.length >= COUNT_OF_SEARCH_CHARS) {
      const _value = value.toLowerCase();
      const contentDeepCopy = deepCopy(searchContent);
      const results = contentDeepCopy.filter((topic) => {
        // check if maps with faq content contain the search query
        let includeTopic = false;
        const content = [];
        for (const item of topic.content) {
          if (
            t(item.question).toLowerCase().includes(_value) ||
            item.answer.some((el) => t(el).toLowerCase().includes(_value))
          ) {
            includeTopic = true;
            content.push(item);
          }
        }
        topic.content = content;
        return includeTopic;
      });
      if (results.length === 0) {
        setNoSearchResult(true);
      }
      setSearchResults(results);
    } else if (value.length === 0) {
      setNoSearchResult(false);
      setSearchResults([]);
    }
  };

  // eslint-disable-next-line
  const debouncedHandleSearchValue = useCallback(
    debounce(handleSearchValue, 500, {}),
    []
  );

  const handleSearchInputChange = (e) => {
    setNoSearchResult(false);
    setSearchTerm(e.target.value);
    debouncedHandleSearchValue(e.target.value);
  };

  return (
    <div className={cn("faq-search-bar", className)}>
      <p className="faq-search-bar__title">{t("faq_quick-searchbar-title")}</p>
      <input
        className={cn("faq-search-bar__input")}
        placeholder={t("faq_quick-searchbar-placeholder")}
        value={searchTerm}
        onChange={handleSearchInputChange}
      />
    </div>
  );
};

FaqSearchBar.propTypes = {
  className: PropTypes.string,
  setSearchResults: PropTypes.func.isRequired,
  setNoSearchResult: PropTypes.func.isRequired,
};

export default FaqSearchBar;
