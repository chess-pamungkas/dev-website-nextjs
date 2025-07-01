import React, { useEffect, useState, createContext } from "react";
import PropTypes from "prop-types";
import { isBrowser } from "../../helpers/services/is-browser";
import {
  getMarketingParamsFromUrl,
  getCampaignParamsAndSetToStorage,
} from "../../helpers/services/marketing-service";
import { getIBParamsAndSetToStorage } from "../../helpers/services/ib-service";

export const MarketingContext = createContext({});

export const MarketingProvider = ({ children }) => {
  const [params, setParams] = useState({});

  useEffect(() => {
    if (isBrowser()) {
      setParams(getMarketingParamsFromUrl());

      // handle IB registration params
      getIBParamsAndSetToStorage();

      // handle Campaign params
      getCampaignParamsAndSetToStorage();
    }
  }, []);

  return (
    <MarketingContext.Provider value={params}>
      {children}
    </MarketingContext.Provider>
  );
};

MarketingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
