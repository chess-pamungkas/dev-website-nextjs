import React, { createContext, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { INITIAL_SEARCH_STATE } from "../../helpers/constants";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchState, setSearchState] = useState(INITIAL_SEARCH_STATE);

  // Memoize the setSearchState function to prevent unnecessary re-renders
  const memoizedSetSearchState = useCallback((newState) => {
    setSearchState(newState);
  }, []);

  // Memoize the context value to prevent unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      searchState,
      setSearchState: memoizedSetSearchState,
    }),
    [searchState, memoizedSetSearchState]
  );

  return (
    <SearchContext.Provider value={contextValue}>
      {children}
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default SearchContext;
