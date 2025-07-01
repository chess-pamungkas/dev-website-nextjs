import React, { createContext, useMemo } from "react";
import PropTypes from "prop-types";
import { getTradingSections } from "../../helpers/config";

const TradingContext = createContext({});

export const TradingProvider = ({ children }) => {
  // Static values - no state, no changes
  const contextValue = useMemo(
    () => ({
      selectedSection: getTradingSections()[0],
      setSelectedSection: () => {}, // No-op
      tradingSymbols: [],
      setTradingSymbols: () => {}, // No-op
      needToLoadSymbols: false,
      setNeedToLoadSymbols: () => {}, // No-op
    }),
    []
  ); // Empty dependency array - never changes

  return (
    <TradingContext.Provider value={contextValue}>
      {children}
    </TradingContext.Provider>
  );
};

TradingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default TradingContext;
