import React, { useContext, useState } from "react";
import TopMarket from "../../top-market";
import image from "../../../assets/images/top-markets/energies.svg";
import { ShowRegistrationPopup } from "../../../helpers/constants";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import TradingTicker from "../../trading-ticker";
import TopMarketPromotion from "../../top-market-promotion";
import energies from "../../../assets/images/top-markets/images/energies.svg";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import { ENERGIES_TRADING_SECTION } from "../../../helpers/config";
import animation from "../../../assets/images/bg/promotions/indices/indices.json";
import MarketingCircle from "../../marketing-circle";
import TopMarketLayout from "../../top-market-layout";
import Faq from "../../faq";
import { FAQ_ENERGIES } from "../../../helpers/faq";
import TableComponent from "../../shared/table";
import {
  DATA_ENERGIES,
  GeneralTableColumns,
} from "../../../helpers/top-market-tables";
import { updateTableDataWithLiveColumn } from "../../../helpers/services/update-table-data-with-live-column";
import TradingContext from "../../../context/trading-context";
import { setLangParam } from "../../../helpers/services/language-service";

const EnergiesContent = () => {
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

  updateTableDataWithLiveColumn(DATA_ENERGIES, tradingSymbols);

  return (
    <>
      <TopMarket
        title={t("energies_top-market-title")}
        image={image}
        btn1Title={t("energies_top-market-btn1")}
        btnOnClick1={handleShowRegistrationPopup}
        btn2Title={t("energies_top-market-btn2")}
        btnOnClick2={handleShowRegistrationPopup}
        isChildrenHasSmallSize
      >
        <HighlightedLocalizationText
          localizationText="energies_top-market-promo-text"
          wordsToHighlight="energies-top-market-promo-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarket>
      <TradingTicker
        title={t("energies_trading-ticker-title")}
        pageSpecificSection={ENERGIES_TRADING_SECTION}
      />
      <TopMarketPromotion
        className="energies-promotion"
        image={energies}
        btnTitle={t("energies_top-market-promo-btn")}
        btnOnClick={handleShowRegistrationPopup}
      >
        <HighlightedLocalizationText
          localizationText="energies_top-market-promotion-promo-text"
          wordsToHighlight="energies-top-market-promotion-promo-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-red"
        />
      </TopMarketPromotion>
      <MarketingCircle
        animation={animation}
        btnOnClick={handleShowRegistrationPopup}
        isEnergies={true}
        upper={
          <HighlightedLocalizationText
            localizationText="energies_marketing-circle-upper"
            wordsToHighlight="energies_marketing-circle-upper-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        leftUpper={
          <HighlightedLocalizationText
            localizationText="energies_marketing-circle-left-upper"
            wordsToHighlight="energies_marketing-circle-left-upper-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        rightUpper={
          <HighlightedLocalizationText
            localizationText="energies_marketing-circle-right-upper"
            wordsToHighlight="energies_marketing-circle-right-upper-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        bottom={
          <HighlightedLocalizationText
            localizationText="energies_marketing-circle-bottom"
            wordsToHighlight="energies_marketing-circle-bottom-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        leftBottom={
          <HighlightedLocalizationText
            localizationText="energies_marketing-circle-left-bottom"
            wordsToHighlight="energies_marketing-circle-left-bottom-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        rightBottom={
          <HighlightedLocalizationText
            localizationText="energies_marketing-circle-right-bottom"
            wordsToHighlight="energies_marketing-circle-right-bottom-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
      />
      <TopMarketLayout
        title={t("energies_top-market-layout-title")}
        btnTitle={t("energies_top-market-layout-btn")}
        btnOnClick={handleShowRegistrationPopup}
      >
        <TableComponent
          data={DATA_ENERGIES}
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
      <Faq faq={FAQ_ENERGIES} />

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

export default EnergiesContent;
