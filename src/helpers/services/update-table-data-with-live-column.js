import React from "react";
import TableLiveColumn from "../../components/trading-ticker/components/table-live-column";

export const updateTableDataWithLiveColumn = (
  tableData,
  tradingSymbols,
  onShowRegistrationPopup
) => {
  tableData.map((tableRow) => {
    tableRow["col6"] = (
      <TableLiveColumn
        symbol={tableRow.col1}
        tradingSymbols={tradingSymbols}
        onShowRegistrationPopup={onShowRegistrationPopup}
      />
    );
  });
};
