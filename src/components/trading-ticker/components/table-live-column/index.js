import React, { useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import ButtonPopup from "../../../shared/button-popup";
import { ShowRegistrationPopup } from "../../../../helpers/constants";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import { setLangParam } from "../../../../helpers/services/language-service";

const NO_VALUE = "N/A";

function parseSymbols(symbol, tradingSymbols) {
  const symbolData =
    tradingSymbols.find((item) => item.symbol === symbol) || {};

  return {
    bid: symbolData.bid || NO_VALUE,
    ask: symbolData.ask || NO_VALUE,
    direction: symbolData.direction || NO_VALUE,
  };
}

const TableLiveColumn = ({ symbol, tradingSymbols }) => {
  const { t } = useTranslationWithVariables();
  const { bid, ask, direction } = parseSymbols(symbol, tradingSymbols);
  const langParam = setLangParam(); // Get the language parameter
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const handleShowRegistrationPopup = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  return (
    <div className="table__info-column">
      <div className="table__params">
        <div className="table__param">
          <span className="table__param-name">
            {t("index_trading-ticker-bid")}
          </span>
          <span className="table__param-value--up">{bid}</span>
        </div>
        <div className="table__param">
          <span className="table__param-name">
            {t("index_trading-ticker-ask")}
          </span>
          <span className={`table__param-value--${direction}`}>{ask}</span>
        </div>
      </div>
      <div className="table__btn-wrapper">
        <ButtonPopup
          className={cn("table__btn", "table__btn--green")}
          onClick={handleShowRegistrationPopup}
        >
          {t("index_trading-ticker-buy")}
        </ButtonPopup>
        <ButtonPopup
          className={cn("table__btn", "table__btn--red")}
          onClick={handleShowRegistrationPopup}
        >
          {t("index_trading-ticker-sell")}
        </ButtonPopup>
      </div>

      {/* Render the popup */}
      {isPopupOpen && (
        <ShowRegistrationPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          langParam={langParam} // Pass langParam if needed
        />
      )}
    </div>
  );
};

TableLiveColumn.propTypes = {
  symbol: PropTypes.string.isRequired,
  tradingSymbols: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      bid: PropTypes.number,
      ask: PropTypes.number,
      direction: PropTypes.string,
    })
  ).isRequired,
};
export default TableLiveColumn;
