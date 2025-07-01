import React, { useContext, useState } from "react";
import TopMarket from "../../top-market";
import image from "../../../assets/images/top-markets/forex.svg";
import { ShowRegistrationPopup } from "../../../helpers/constants";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import TradingTicker from "../../trading-ticker";
import TopMarketPromotion from "../../top-market-promotion";
import forex from "../../../assets/images/top-markets/images/forex.svg";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import { FOREX_TRADING_SECTION } from "../../../helpers/config";
import animation from "../../../assets/images/bg/promotions/forex/forex.json";
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

const ForexContent = () => {
  const { t } = useTranslationWithVariables();
  const { tradingSymbols } = useContext(TradingContext);
  const langParam = setLangParam(); // Get the language parameter
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const handleShowRegistrationPopup = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  updateTableDataWithLiveColumn(DATA_FOREX_MINOR, tradingSymbols);
  updateTableDataWithLiveColumn(DATA_FOREX_MAJOR, tradingSymbols);
  // updateTableDataWithLiveColumn(DATA_FOREX_EXOTIC, tradingSymbols);

  const tabs = [
    {
      id: 1,
      title: "Major",
      content: (
        <TableComponent
          data={DATA_FOREX_MAJOR}
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
          data={DATA_FOREX_MINOR}
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
        animation={animation}
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
