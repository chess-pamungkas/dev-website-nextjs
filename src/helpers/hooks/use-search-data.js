import { useCallback, useContext } from "react";
import { useRouter } from "next/router";
import LanguageContext from "../../context/language-context";
import { replaceLocaleVariables } from "../services/replace-locale-variables";
import { useLocalizationVariables } from "../localization-variables";
import searchIndex from "../../data/search-index.json";

export const useSearchData = () => {
  const router = useRouter();
  const { selectedLanguage } = useContext(LanguageContext); // current selected language
  const currentPageUrl = router.asPath;
  const localizationVariables = useLocalizationVariables();

  // Load the static search index for the current language
  const currentLocaleIndexedData =
    searchIndex[selectedLanguage?.id || "en"] || [];

  const getSearchResults = useCallback(
    (query) => {
      if (!query) return [];
      if (!currentLocaleIndexedData || !currentLocaleIndexedData.length)
        return [];

      const results = currentLocaleIndexedData.reduce((acc, piece) => {
        //TODO Refactor and test
        var [url, content] = piece.split("_");
        content = replaceLocaleVariables(content, localizationVariables);
        if (!url || !content) return acc;

        const transformedContent = content.toLowerCase();
        const transformedQuery = query.toLowerCase();
        const isContentRelevant =
          url !== currentPageUrl &&
          transformedContent.includes(transformedQuery);
        if (isContentRelevant) {
          /**
           * Latest Chrome versions support auto scroll to highlighted text
           * if a special url parameter "#:~:text=" is provided.
           * To make it work it's required to get full matched phrase.
           * Will be ignored on not-supported platforms.
           *
           * Nevertheless, this parameter is not accessible
           * via "window.location" method, and this project parses url
           * on every navigate action on localization demands.
           * This makes engagement of this feature useless at this point.
           *
           * The code below detecting "fullMatch" property is left
           * as a hint in terms of further development.
           */

          // TODO: replace with reliable regExp if possible
          let fullMatch = transformedQuery;
          const lastMatchedIndex =
            transformedContent.indexOf(transformedQuery) +
            transformedQuery.length;
          for (
            let i = lastMatchedIndex;
            transformedContent[i] && transformedContent[i] !== " ";
            i++
          ) {
            fullMatch += transformedContent[i];
          }

          const startingMatchedIndex = transformedContent.indexOf(fullMatch);
          for (
            let i = startingMatchedIndex;
            transformedContent[i - 1] && transformedContent[i - 1] !== " ";
            i--
          ) {
            fullMatch = transformedContent[i - 1] + fullMatch;
          }

          // exclude accent strings from the results (e.g. strings like '12,13,22,25,23')
          if (!/^[0-9,]+$/.test(content)) {
            acc.push({ url, content, fullMatch });
          }
        }

        return acc;
      }, []);

      return results;
    },
    [currentLocaleIndexedData, currentPageUrl, localizationVariables]
  );

  return {
    getSearchResults,
  };
};
