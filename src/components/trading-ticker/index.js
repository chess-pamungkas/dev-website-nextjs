import React, { useState, useEffect } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import TradingSymbols from "./components/trading-symbols";
import { getTradingSections } from "../../helpers/config";
import TradingSections from "./components/trading-sections";
import { filterSymbols } from "../../helpers/services/filter-symbols";
// import TradingContext from "../../context/trading-context";

const TradingTicker = ({
  className,
  title,
  pageSpecificSection,
  isInfiniteAutoScroll,
}) => {
  const tradingSection = getTradingSections();

  // Use React state for selectedSection
  const [selectedSection, setSelectedSection] = useState(tradingSection[0]);
  const tradingSymbols = [];

  // Sync with pageSpecificSection if provided
  useEffect(() => {
    setSelectedSection(pageSpecificSection || tradingSection[0]);
  }, [pageSpecificSection, tradingSection]);

  return (
    <section className={cn("trading-ticker-wrapper", className)}>
      <TradingSections
        tradingSection={tradingSection}
        title={title}
        selectedSection={selectedSection}
        setSelectedSection={setSelectedSection}
      />
      <TradingSymbols
        symbols={filterSymbols(tradingSymbols, selectedSection.id)}
        isInfiniteAutoScroll={isInfiniteAutoScroll}
      />
    </section>
  );
};

TradingTicker.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  pageSpecificSection: PropTypes.object,
  isInfiniteAutoScroll: PropTypes.bool,
};

export default TradingTicker;
