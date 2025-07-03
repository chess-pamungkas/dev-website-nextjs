import React, { useContext, useState } from "react";
import TopMarket from "../../top-market";
import indicesSvg from "../../../assets/images/top-markets/indices.svg";
import { ShowRegistrationPopup } from "../../../helpers/constants";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import TradingTicker from "../../trading-ticker";
import TopMarketPromotion from "../../top-market-promotion";
import indices from "../../../assets/images/top-markets/images/indices.svg";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import { INDICES_TRADING_SECTION } from "../../../helpers/config";
import animation from "../../../assets/images/bg/promotions/indices/indices.json";
import MarketingCircle from "../../marketing-circle";
import TopMarketLayout from "../../top-market-layout";
import Faq from "../../faq";
import { FAQ_INDICES } from "../../../helpers/faq";
import TableComponent from "../../shared/table";
import {
  DATA_INDICES,
  GeneralTableColumns,
} from "../../../helpers/top-market-tables";
import { updateTableDataWithLiveColumn } from "../../../helpers/services/update-table-data-with-live-column";
import TradingContext from "../../../context/trading-context";
import { setLangParam } from "../../../helpers/services/language-service";
import Seo from "../../shared/seo";

const IndicesContent = () => {
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

  updateTableDataWithLiveColumn(DATA_INDICES, tradingSymbols);

  return (
    <>
      <Seo
        title={t("page-indices-title")}
        description={t("page-indices-description")}
      />
      <TopMarket
        title={
          <HighlightedLocalizationText
            localizationText="indices_top-market-title"
            wordsToHighlight="indices-top-market-title-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-white"
          />
        }
        isChildrenHasSmallSize
        image={indicesSvg}
        btn1Title={t("indices_top-market-btn1")}
        btnOnClick1={handleShowRegistrationPopup}
        btn2Title={t("indices_top-market-btn2")}
        btnOnClick2={handleShowRegistrationPopup}
      >
        <HighlightedLocalizationText
          localizationText="indices_top-market-promo-text"
          wordsToHighlight="indices-top-market-promo-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarket>
      <TradingTicker
        title={t("indices_trading-ticker-title")}
        pageSpecificSection={INDICES_TRADING_SECTION}
      />
      <TopMarketPromotion
        className="indices-promotion"
        image={indices}
        btnTitle={t("indices_top-market-promo-btn")}
        btnOnClick={handleShowRegistrationPopup}
        note={t("indices_top-market-promotion-promo-note")}
      >
        <HighlightedLocalizationText
          localizationText="indices_top-market-promotion-promo-text"
          wordsToHighlight="indices-top-market-promotion-promo-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-red"
        />
      </TopMarketPromotion>
      <MarketingCircle
        animation={animation}
        btnOnClick={handleShowRegistrationPopup}
        isIndices={true}
        upper={
          <HighlightedLocalizationText
            localizationText="indices_marketing-circle-upper"
            wordsToHighlight="indices_marketing-circle-upper-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        leftUpper={
          <HighlightedLocalizationText
            localizationText="indices_marketing-circle-left-upper"
            wordsToHighlight="indices_marketing-circle-left-upper-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        rightUpper={
          <HighlightedLocalizationText
            localizationText="indices_marketing-circle-right-upper"
            wordsToHighlight="indices_marketing-circle-right-upper-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        bottom={
          <HighlightedLocalizationText
            localizationText="indices_marketing-circle-bottom"
            wordsToHighlight="indices_marketing-circle-bottom-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        leftBottom={
          <HighlightedLocalizationText
            localizationText="indices_marketing-circle-left-bottom"
            wordsToHighlight="indices_marketing-circle-left-bottom-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        rightBottom={
          <HighlightedLocalizationText
            localizationText="indices_marketing-circle-right-bottom"
            wordsToHighlight="indices_marketing-circle-right-bottom-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
      />
      <TopMarketLayout
        title={t("indices_top-market-layout-title")}
        btnTitle={t("indices_top-market-layout-btn")}
        btnOnClick={handleShowRegistrationPopup}
      >
        <TableComponent
          data={DATA_INDICES}
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
      <Faq faq={FAQ_INDICES} />

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

export default IndicesContent;
