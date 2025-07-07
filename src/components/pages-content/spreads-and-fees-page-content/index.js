import React, { useEffect, useContext, useState } from "react";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import cn from "classnames";
import TopMarket from "../../top-market";
const promotion = "/images/spreads-and-fees/promotion.svg";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import TopMarketLayout from "../../top-market-layout";
import Tabs from "../../shared/tabs";
import TableComponent from "../../shared/table";
import {
  ColumnsSpreadTable2,
  DATA_SPREADS_TABLE_COMMODITIES,
  DataSpreadTable2,
  DATA_SPREADS_TABLE_CRYPTO,
  DATA_SPREADS_TABLE_FOREX,
  DATA_SPREADS_TABLE_INDICES,
} from "../../../helpers/spreads-and-fees.config";
import TopMarketPromotion from "../../top-market-promotion";
const icon = "/images/icon--white.svg";
import { ShowRegistrationPopup } from "../../../helpers/constants";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";
import { updateTableDataWithLiveColumn } from "../../../helpers/services/update-table-data-with-live-column";
import {
  FOREX_TRADING_SECTION,
  INDICES_TRADING_SECTION,
  METALS_TRADING_SECTION,
  CRYPTO_TRADING_SECTION,
} from "../../../helpers/config";
import TradingContext from "../../../context/trading-context";
import { GeneralTableColumns } from "../../../helpers/top-market-tables";
import { setLangParam } from "../../../helpers/services/language-service";
import Seo from "../../shared/seo";

const SpreadsAndFeesPageContent = () => {
  const { t } = useTranslationWithVariables();
  const isRTL = useRtlDirection();
  const { tradingSymbols, setSelectedSection, setNeedToLoadSymbols } =
    useContext(TradingContext);

  const langParam = setLangParam(); // Get the language parameter
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [tableDataForex, setTableDataForex] = useState([]);
  const [tableDataIndices, setTableDataIndices] = useState([]);
  const [tableDataCommodities, setTableDataCommodities] = useState([]);
  const [tableDataCrypto, setTableDataCrypto] = useState([]);

  const handleShowRegistrationPopup = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  useEffect(() => {
    const updatedForex = DATA_SPREADS_TABLE_FOREX.map((row) => ({ ...row }));
    const updatedIndices = DATA_SPREADS_TABLE_INDICES.map((row) => ({
      ...row,
    }));
    const updatedCommodities = DATA_SPREADS_TABLE_COMMODITIES.map((row) => ({
      ...row,
    }));
    const updatedCrypto = DATA_SPREADS_TABLE_CRYPTO.map((row) => ({ ...row }));
    updateTableDataWithLiveColumn(updatedForex, tradingSymbols);
    updateTableDataWithLiveColumn(updatedIndices, tradingSymbols);
    updateTableDataWithLiveColumn(updatedCommodities, tradingSymbols);
    updateTableDataWithLiveColumn(updatedCrypto, tradingSymbols);
    setTableDataForex(updatedForex);
    setTableDataIndices(updatedIndices);
    setTableDataCommodities(updatedCommodities);
    setTableDataCrypto(updatedCrypto);
  }, [tradingSymbols]);

  useEffect(() => {
    setSelectedSection(FOREX_TRADING_SECTION);
    setNeedToLoadSymbols(true);

    return () => setNeedToLoadSymbols(false);
  }, []);

  const tabs = [
    {
      id: 1,
      title: t("spreads_tabs_title1"),
      onClick: () => setSelectedSection(FOREX_TRADING_SECTION),
      content: (
        <TableComponent
          isWrapperPadding
          data={tableDataForex}
          columns={GeneralTableColumns()}
          tableClassName={isRTL ? "spreads-table--rtl" : ""}
          tip={
            <span>
              <span className="bold">*MIN</span>&nbsp;-&nbsp;{t("table-tip1")}
              &nbsp;
              <span className="bold">AVG</span>&nbsp;-&nbsp;{t("table-tip2")}
              &nbsp;
            </span>
          }
          isSearch
        />
      ),
    },
    {
      id: 2,
      title: t("spreads_tabs_title2"),
      onClick: () => setSelectedSection(INDICES_TRADING_SECTION),
      content: (
        <TableComponent
          isWrapperPadding
          data={tableDataIndices}
          columns={GeneralTableColumns()}
          tableClassName={isRTL ? "spreads-table--rtl" : ""}
          tip={
            <span>
              <span className="bold">*MIN</span>&nbsp;-&nbsp;{t("table-tip1")}
              &nbsp;
              <span className="bold">AVG</span>&nbsp;-&nbsp;{t("table-tip2")}
              &nbsp;
            </span>
          }
          isSearch
        />
      ),
    },
    {
      id: 3,
      title: t("spreads_tabs_title3"),
      onClick: () => setSelectedSection(METALS_TRADING_SECTION),
      content: (
        <TableComponent
          isWrapperPadding
          data={tableDataCommodities}
          columns={GeneralTableColumns()}
          tableClassName={isRTL ? "spreads-table--rtl" : ""}
          tip={
            <span>
              <span className="bold">*MIN</span>&nbsp;-&nbsp;{t("table-tip1")}
              &nbsp;
              <span className="bold">AVG</span>&nbsp;-&nbsp;{t("table-tip2")}
              &nbsp;
            </span>
          }
          isSearch
        />
      ),
    },
    {
      id: 4,
      title: t("spreads_tabs_title4-fsa"),
      onClick: () => setSelectedSection(CRYPTO_TRADING_SECTION),
      content: (
        <TableComponent
          isWrapperPadding
          data={tableDataCrypto}
          columns={GeneralTableColumns()}
          tableClassName={isRTL ? "spreads-table--rtl" : ""}
          tip={
            <span>
              <span className="bold">*MIN</span>&nbsp;-&nbsp;{t("table-tip1")}
              &nbsp;
              <span className="bold">AVG</span>&nbsp;-&nbsp;{t("table-tip2")}
              &nbsp;
            </span>
          }
          isSearch
        />
      ),
    },
  ];

  return (
    <>
      <Seo
        title={t("page-spreads-title")}
        description={t("page-spreads-description")}
      />
      <TopMarket
        className={cn("top-market--spreads-page")}
        image={promotion}
        title={
          <HighlightedLocalizationText
            localizationText="spreads_top-market-promo-text"
            wordsToHighlight="spreads_top-market-promo-text-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-white"
          />
        }
      >
        <HighlightedLocalizationText
          localizationText="spreads_top-market-promo-note"
          wordsToHighlight="spreads_top-market-promo-note-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarket>

      <TopMarketLayout
        className="top-market-layout--spreads"
        title={t("spreads_first-table-title")}
      >
        <Tabs tabList={tabs} isMobileDropdown />
      </TopMarketLayout>

      <TopMarketLayout
        className="top-market-layout--spreads top-market-layout--spreads-second"
        headerTemplate={
          <div className={cn("top-market-layout__header")}>
            <h2 className={cn("top-market-layout__title")}>
              {t("spreads_second-table-title")}
            </h2>
            <p className={cn("top-market-layout__subtitle")}>
              {t("spreads_second-table-subtitle")}
            </p>
          </div>
        }
      >
        <TableComponent
          data={DataSpreadTable2()}
          columns={ColumnsSpreadTable2()}
          className={cn("spreads--common-table", "spreads--second-table")}
        />
      </TopMarketLayout>

      <section className={cn("swap-rate", { "swap-rate--rtl": isRTL })}>
        <div className="swap-rate__wrapper">
          <h2 className="swap-rate__title">{t("spreads_faq-title")}</h2>
          <div className="swap-rate__subtitle">
            <span className="swap-rate__subtitle-text">
              {t("spreads_faq-subtitle1")}
            </span>
            <span className="swap-rate__subtitle-text">
              {t("spreads_faq-subtitle2")}
            </span>
            <span className="swap-rate__subtitle-text swap-rate__subtitle-text--bold">
              {t("spreads_faq-subtitle3")}
            </span>
          </div>
        </div>
      </section>

      <TopMarketPromotion
        className={cn("bottom-promotion", {
          "bottom-promotion--rtl": isRTL,
        })}
        image={icon}
        btnClassName="button-link--red"
        btnTitle={t("spreads_top-market-promo-btn3")}
        btnOnClick={handleShowRegistrationPopup}
      >
        <HighlightedLocalizationText
          localizationText="spreads_top-market-promo-text3"
          wordsToHighlight="spreads_top-market-promo-text-accent3"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarketPromotion>

      {/* Render the popup */}
      {isPopupOpen && (
        <ShowRegistrationPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          langParam={langParam} // Pass langParam if needed
        />
      )}
    </>
  );
};

export default SpreadsAndFeesPageContent;
