import React, { useContext, useState, useEffect } from "react";
import TopMarket from "../../top-market";
const image = "/images/top-markets/commodities.svg";
import { ShowRegistrationPopup } from "../../../helpers/constants";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import TradingTicker from "../../trading-ticker";
import TopMarketPromotion from "../../top-market-promotion";
const commodities = "/images/top-markets/images/commodities.svg";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import { METALS_TRADING_SECTION } from "../../../helpers/config";
const animation = "/images/bg/promotions/metals/metals.json";
import MarketingCircle from "../../marketing-circle";
import TopMarketLayout from "../../top-market-layout";
import Faq from "../../faq";
import { FAQ_METALS } from "../../../helpers/faq";
import TableComponent from "../../shared/table";
import {
  DATA_METALS,
  GeneralTableColumns,
} from "../../../helpers/top-market-tables";
import { updateTableDataWithLiveColumn } from "../../../helpers/services/update-table-data-with-live-column";
import TradingContext from "../../../context/trading-context";
import { setLangParam } from "../../../helpers/services/language-service";
import Seo from "../../shared/seo";

const MetalsContent = () => {
  const { t } = useTranslationWithVariables();
  const { tradingSymbols } = useContext(TradingContext);
  const langParam = setLangParam(); // Get the language parameter
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility
  const [tableData, setTableData] = useState([]);

  const handleShowRegistrationPopup = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  useEffect(() => {
    // Make a copy to avoid mutating the original data
    const updatedData = DATA_METALS.map((row) => ({ ...row }));
    updateTableDataWithLiveColumn(updatedData, tradingSymbols);
    setTableData(updatedData);
  }, [tradingSymbols]);

  return (
    <>
      <Seo
        title={t("page-metals-title")}
        description={t("page-metals-description")}
      />
      <TopMarket
        title={t("metals_top-market-title")}
        image={image}
        btn1Title={t("metals_top-market-btn1")}
        btnOnClick1={handleShowRegistrationPopup}
        btn2Title={t("metals_top-market-btn2")}
        btnOnClick2={handleShowRegistrationPopup}
      >
        <HighlightedLocalizationText
          localizationText="metals_top-market-promo-text"
          wordsToHighlight="metals-top-market-promo-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarket>
      <TradingTicker
        title={t("metals_trading-ticker-title")}
        pageSpecificSection={METALS_TRADING_SECTION}
      />
      <TopMarketPromotion
        className="commodities-promotion"
        image={commodities}
        btnTitle={t("metals_top-market-promo-btn")}
        btnOnClick={handleShowRegistrationPopup}
        note={t("metals_top-market-promotion-promo-note")}
      >
        <HighlightedLocalizationText
          localizationText="metals_top-market-promotion-promo-text"
          wordsToHighlight="metals-top-market-promotion-promo-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-red"
        />
      </TopMarketPromotion>
      <MarketingCircle
        animationPath={animation}
        btnOnClick={handleShowRegistrationPopup}
        isCrypto={false}
        isEtf={false}
        isIndices={false}
        isForex={false}
        isEnergies={false}
        upper={
          <HighlightedLocalizationText
            localizationText="metals_marketing-circle-upper"
            wordsToHighlight="metals_marketing-circle-upper-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        leftUpper={
          <HighlightedLocalizationText
            localizationText="metals_marketing-circle-left-upper"
            wordsToHighlight="metals_marketing-circle-left-upper-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        rightUpper={
          <HighlightedLocalizationText
            localizationText="metals_marketing-circle-right-upper"
            wordsToHighlight="metals-marketing-circle-right-upper-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        bottom={
          <HighlightedLocalizationText
            localizationText="metals_marketing-circle-bottom"
            wordsToHighlight="metals_marketing-circle-bottom-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        leftBottom={
          <HighlightedLocalizationText
            localizationText="metals_marketing-circle-left-bottom"
            wordsToHighlight="metals_marketing-circle-left-bottom-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        rightBottom={
          <HighlightedLocalizationText
            localizationText="metals_marketing-circle-right-bottom"
            wordsToHighlight="metals_marketing-circle-right-bottom-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
      />
      <TopMarketLayout
        title={t("metals_top-market-layout-title")}
        btnTitle={t("metals_top-market-layout-btn")}
        btnOnClick={handleShowRegistrationPopup}
      >
        <TableComponent
          data={tableData}
          columns={GeneralTableColumns()}
          isWrapperPadding
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
      </TopMarketLayout>
      <Faq faq={FAQ_METALS} />

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

export default MetalsContent;
