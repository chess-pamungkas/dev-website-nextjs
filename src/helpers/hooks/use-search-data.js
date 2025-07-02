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

      const transformedQuery = query.toLowerCase();
      const exactMatches = [];
      const partialMatches = [];
      const seen = new Set();

      currentLocaleIndexedData.forEach((piece) => {
        const { key, value } = piece;
        const content = replaceLocaleVariables(value, localizationVariables);
        if (!key || !content) return;
        const transformedContent = content.toLowerCase();

        // Exclude accent strings from the results (e.g. strings like '12,13,22,25,23')
        if (/^[0-9,]+$/.test(content)) return;

        // Prioritize exact matches
        if (transformedContent === transformedQuery && !seen.has(content)) {
          exactMatches.push({ key, content, fullMatch: content });
          seen.add(content);
        } else if (
          transformedContent.includes(transformedQuery) &&
          !seen.has(content)
        ) {
          // Partial matches
          // Highlighting logic (unchanged)
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

          partialMatches.push({ key, content, fullMatch });
          seen.add(content);
        }
      });

      // Return exact matches first, then partial matches
      return [...exactMatches, ...partialMatches];
    },
    [currentLocaleIndexedData, currentPageUrl, localizationVariables]
  );

  return {
    getSearchResults,
  };
};
