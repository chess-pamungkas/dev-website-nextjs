import React, { createContext, useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { INITIAL_SEARCH_STATE } from "../../helpers/constants";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchState, setSearchState] = useState(INITIAL_SEARCH_STATE);

  return (
    <SearchContext.Provider
      value={{
        searchState,
        setSearchState,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

SearchProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default SearchContext;
