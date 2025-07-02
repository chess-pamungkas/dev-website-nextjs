import React, { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import { getTradingSections } from "../../helpers/config";
import { io } from "socket.io-client";
import { sendLog } from "../../helpers/services/log-service";

const API_URL = process.env.NEXT_PUBLIC_OQTIMA_API_URL;
const TradingContext = createContext({});
const socket = io(`${API_URL}ws-stocks/`);

export const TradingProvider = ({ children }) => {
  const [selectedSection, setSelectedSection] = useState(
    getTradingSections()[0]
  );
  const [tradingSymbols, setTradingSymbols] = useState([]);
  const [needToLoadSymbols, setNeedToLoadSymbols] = useState(false);

  useEffect(() => {
    const fetchData = () => {
      try {
        if (API_URL) {
          socket.emit("stocks", selectedSection.id);
          socket.on("reply", (data) => {
            if (data) setTradingSymbols(data);
          });
        }
      } catch (error) {
        sendLog({ message: error.message, type: error.name });
      }
    };

    fetchData(); // Initial fetch

    let intervalId = undefined;
    if (needToLoadSymbols) {
      intervalId = setInterval(fetchData, 700);
    } else {
      clearInterval(intervalId);
    }

    return () => clearInterval(intervalId);
  }, [selectedSection, needToLoadSymbols]);

  return (
    <TradingContext.Provider
      value={{
        selectedSection,
        setSelectedSection,
        tradingSymbols,
        setTradingSymbols,
        needToLoadSymbols,
        setNeedToLoadSymbols,
      }}
    >
      {children}
    </TradingContext.Provider>
  );
};

TradingProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default TradingContext;
