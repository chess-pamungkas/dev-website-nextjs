import React, { useContext, useState, useEffect } from "react";
import TopMarket from "../../top-market";
const image = "/images/top-markets/forex.svg";
import { ShowRegistrationPopup } from "../../../helpers/constants";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import TradingTicker from "../../trading-ticker";
import TopMarketPromotion from "../../top-market-promotion";
const forex = "/images/top-markets/images/forex.svg";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import { FOREX_TRADING_SECTION } from "../../../helpers/config";
const animation = "/images/bg/promotions/forex/forex.json";
import MarketingCircle from "../../marketing-circle";
import TopMarketLayout from "../../top-market-layout";
import Faq from "../../faq";
import { FAQ_FOREX } from "../../../helpers/faq";
import TableComponent from "../../shared/table";
import {
  DATA_FOREX_MINOR,
  DATA_FOREX_MAJOR,
  GeneralTableColumns,
} from "../../../helpers/top-market-tables";
import { updateTableDataWithLiveColumn } from "../../../helpers/services/update-table-data-with-live-column";
import Tabs from "../../shared/tabs";
import TradingContext from "../../../context/trading-context";
import { setLangParam } from "../../../helpers/services/language-service";
import Seo from "../../shared/seo";

const ForexContent = () => {
  const { t } = useTranslationWithVariables();
  const { tradingSymbols } = useContext(TradingContext);
  const langParam = setLangParam(); // Get the language parameter
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [tableDataMajor, setTableDataMajor] = useState([]);
  const [tableDataMinor, setTableDataMinor] = useState([]);

  const handleShowRegistrationPopup = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  useEffect(() => {
    const updatedMajor = DATA_FOREX_MAJOR.map((row) => ({ ...row }));
    const updatedMinor = DATA_FOREX_MINOR.map((row) => ({ ...row }));
    updateTableDataWithLiveColumn(updatedMajor, tradingSymbols);
    updateTableDataWithLiveColumn(updatedMinor, tradingSymbols);
    setTableDataMajor(updatedMajor);
    setTableDataMinor(updatedMinor);
  }, [tradingSymbols]);

  const tabs = [
    {
      id: 1,
      title: "Major",
      content: (
        <TableComponent
          data={tableDataMajor}
          columns={GeneralTableColumns()}
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
      title: "Minor",
      content: (
        <TableComponent
          data={tableDataMinor}
          columns={GeneralTableColumns()}
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
    // {
    //   id: 3,
    //   title: "Exotic",
    //   content: (
    //     <TableComponent
    //       data={DATA_FOREX}
    //       columns={COLUMNS_FOREX}
    //       tip={
    //         <span>
    //           <span className="bold">*MIN</span>&nbsp;-&nbsp;{t("table-tip1")}
    //           &nbsp;
    //           <span className="bold">AVG</span>&nbsp;-&nbsp;{t("table-tip2")}
    //           &nbsp;
    //         </span>
    //       }
    //       isSearch
    //     />
    //   ),
    // },
  ];

  return (
    <>
      <Seo
        title={t("page-forex-title")}
        description={t("page-forex-description")}
      />
      <TopMarket
        title={t("forex_top-market-title")}
        image={image}
        btn1Title={t("forex_top-market-btn1")}
        btnOnClick1={handleShowRegistrationPopup}
        btn2Title={t("forex_top-market-btn2")}
        btnOnClick2={handleShowRegistrationPopup}
      >
        <HighlightedLocalizationText
          localizationText="forex_top-market-promo-text"
          wordsToHighlight="forex-top-market-promo-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarket>
      <TradingTicker
        title={t("forex_trading-ticker-title")}
        pageSpecificSection={FOREX_TRADING_SECTION}
      />
      <TopMarketPromotion
        className="forex-promotion"
        image={forex}
        btnTitle={t("forex_top-market-promo-btn")}
        btnOnClick={handleShowRegistrationPopup}
      >
        <HighlightedLocalizationText
          localizationText={`forex_top-market-promotion-promo-text-fsa`}
          wordsToHighlight={`forex-top-market-promotion-promo-text-accent-fsa`}
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-red"
        />
      </TopMarketPromotion>
      <MarketingCircle
        animationPath={animation}
        btnOnClick={handleShowRegistrationPopup}
        isForex={true}
        upper={
          <HighlightedLocalizationText
            localizationText="forex_marketing-circle-upper"
            wordsToHighlight="forex_marketing-circle-upper-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        leftUpper={
          <HighlightedLocalizationText
            localizationText="forex_marketing-circle-left-upper"
            wordsToHighlight="forex_marketing-circle-left-upper-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        rightUpper={
          <HighlightedLocalizationText
            localizationText="forex_marketing-circle-right-upper"
            wordsToHighlight="forex_marketing-circle-right-upper-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        bottom={
          <HighlightedLocalizationText
            localizationText="forex_marketing-circle-bottom"
            wordsToHighlight="forex_marketing-circle-bottom-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        leftBottom={
          <HighlightedLocalizationText
            localizationText="forex_marketing-circle-left-bottom"
            wordsToHighlight="forex_marketing-circle-left-bottom-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        rightBottom={
          <HighlightedLocalizationText
            localizationText="forex_marketing-circle-right-bottom"
            wordsToHighlight="forex_marketing-circle-right-bottom-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
      />
      <TopMarketLayout
        title={t("forex_top-market-layout-title")}
        btnTitle={t("forex_top-market-layout-btn")}
        btnOnClick={handleShowRegistrationPopup}
      >
        <Tabs tabList={tabs} />
      </TopMarketLayout>
      <Faq faq={FAQ_FOREX} />

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

export default ForexContent;
