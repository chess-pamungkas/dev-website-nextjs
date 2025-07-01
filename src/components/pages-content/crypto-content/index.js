import React, { useContext, useState } from "react";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import TopMarket from "../../top-market";
import image from "../../../assets/images/top-markets/cripto.svg";
import { ShowRegistrationPopup } from "../../../helpers/constants";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import TradingTicker from "../../trading-ticker";
import TopMarketPromotion from "../../top-market-promotion";
import animation from "../../../assets/images/bg/promotions/crypto/crypto.json";
import TopMarketLayout from "../../top-market-layout";
import crypto from "../../../assets/images/top-markets/images/crypto.svg";
import {
  DATA_CRYPTO,
  GeneralTableColumns,
} from "../../../helpers/top-market-tables";
import TableComponent from "../../shared/table";
import { FAQ_CRYPTO } from "../../../helpers/faq";
import Faq from "../../faq";
import { CRYPTO_TRADING_SECTION } from "../../../helpers/config";
import MarketingCircle from "../../marketing-circle";
import { updateTableDataWithLiveColumn } from "../../../helpers/services/update-table-data-with-live-column";
import TradingContext from "../../../context/trading-context";
import { setLangParam } from "../../../helpers/services/language-service";

const CryptoContent = () => {
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

  updateTableDataWithLiveColumn(DATA_CRYPTO, tradingSymbols);

  return (
    <>
      <TopMarket
        title={t(`crypto_top-market-title-fsa`)}
        image={image}
        btn1Title={t(`crypto_top-market-btn1-fsa`)}
        btnOnClick1={handleShowRegistrationPopup}
        btn2Title={t(`crypto_top-market-btn2-fsa`)}
        btnClassName2={"button-link--lowercase"}
        btnOnClick2={handleShowRegistrationPopup}
      >
        <HighlightedLocalizationText
          localizationText={`crypto_top-market-promo-text-fsa`}
          wordsToHighlight={`crypto-top-market-promo-text-accent-fsa`}
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarket>
      <TradingTicker
        title={t(`crypto_trading-ticker-title-fsa`)}
        pageSpecificSection={CRYPTO_TRADING_SECTION}
      />
      <TopMarketPromotion
        className="crypto-promotion"
        image={crypto}
        btnTitle={t(`crypto_top-market-promo-btn-fsa`)}
        btnClassName={"button-link--lowercase"}
        btnOnClick={handleShowRegistrationPopup}
      >
        <HighlightedLocalizationText
          localizationText={`crypto_top-market-promotion-promo-text-fsa`}
          wordsToHighlight={`crypto-top-market-promotion-promo-text-accent-fsa`}
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-red"
        />
      </TopMarketPromotion>
      <MarketingCircle
        animation={animation}
        btnOnClick={handleShowRegistrationPopup}
        isCrypto={true}
        upper={
          <HighlightedLocalizationText
            localizationText={`crypto_marketing-circle-upper-fsa`}
            wordsToHighlight={`crypto_marketing-circle-upper-accent-fsa`}
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        leftUpper={
          <HighlightedLocalizationText
            localizationText={`crypto_marketing-circle-left-upper-fsa`}
            wordsToHighlight={`crypto_marketing-circle-left-upper-accent-fsa`}
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        rightUpper={
          <HighlightedLocalizationText
            localizationText={`crypto_marketing-circle-right-upper-fsa`}
            wordsToHighlight={`crypto_marketing-circle-right-upper-accent-fsa`}
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        bottom={
          <HighlightedLocalizationText
            localizationText={`crypto_marketing-circle-bottom-fsa`}
            wordsToHighlight={`crypto_marketing-circle-bottom-accent-fsa`}
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        leftBottom={
          <HighlightedLocalizationText
            localizationText={`crypto_marketing-circle-left-bottom-fsa`}
            wordsToHighlight={`crypto_marketing-circle-left-bottom-accent-fsa`}
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
        rightBottom={
          <HighlightedLocalizationText
            localizationText={`crypto_marketing-circle-right-bottom-fsa`}
            wordsToHighlight={`crypto_marketing-circle-right-bottom-accent-fsa`}
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
      />
      <TopMarketLayout
        title={t(`crypto_top-market-layout-title-fsa`)}
        btnTitle={t(`crypto_top-market-layout-btn-fsa`)}
        btnOnClick={handleShowRegistrationPopup}
      >
        <TableComponent
          data={DATA_CRYPTO}
          columns={GeneralTableColumns()}
          isWrapperPadding
          tip={
            <span>
              <span className="bold">*MIN</span>&nbsp;-&nbsp;
              {t("table-tip1")}
              &nbsp;
              <span className="bold">AVG</span>&nbsp;-&nbsp;
              {t("table-tip2")}
              &nbsp;
            </span>
          }
          isSearch
        />
      </TopMarketLayout>
      <Faq faq={FAQ_CRYPTO} />

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

export default CryptoContent;
