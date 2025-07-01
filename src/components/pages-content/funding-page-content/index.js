import React, { useState } from "react";
import cn from "classnames";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import TableComponent from "../../shared/table";
import {
  getColumnDeposit,
  getColumnWithdrawal,
  getDataDeposit,
  getDataWithdrawal,
  WithdrawalDisclaimer,
  DepositDisclaimer,
} from "../../../helpers/withdrawal.config";
import TopMarketPromotion from "../../top-market-promotion";
import promotion from "../../../assets/images/withdrawal/promotion.svg";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import TopMarketLayout from "../../top-market-layout";
import Tabs from "../../shared/tabs";
import icon from "../../../assets/images/icon--white.svg";
import {
  ShowRegistrationPopup,
  PAYMENT_SYSTEMS_FSA,
} from "../../../helpers/constants";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";
import { setLangParam } from "../../../helpers/services/language-service";

const FundingPageContent = () => {
  const { t } = useTranslationWithVariables();
  const isRTL = useRtlDirection();
  const [isDepositTab, setIsDepositTab] = useState(true);
  const langParam = setLangParam(); // Get the language parameter
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const handleShowRegistrationPopup = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  const tabs = [
    {
      id: 1,
      title: t("withdrawal_tabs_title1"),
      onClick: () => setIsDepositTab(true),
      content: (
        <TableComponent
          data={getDataDeposit()}
          columns={getColumnDeposit()}
          className="withdrawal-table"
        />
      ),
    },
    {
      id: 2,
      title: t("withdrawal_tabs_title2"),
      onClick: () => setIsDepositTab(false),
      content: (
        <TableComponent
          data={getDataWithdrawal()}
          columns={getColumnWithdrawal()}
          className={cn("withdrawal-table", "withdrawal-table--wide")}
        />
      ),
    },
  ];

  return (
    <>
      <TopMarketPromotion
        className={cn("withdrawal-page-promotion", {
          "split-bg--rtl": isRTL,
          "withdrawal-page-promotion--rtl": isRTL,
        })}
        image={promotion}
        note={
          <HighlightedLocalizationText
            localizationText={t("withdrawal_top-market-promo-note-fsa")}
            wordsToHighlight={t("withdrawal_top-market-promo-note-accent-fsa")}
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-white"
          />
        }
      >
        <HighlightedLocalizationText
          localizationText="withdrawal_top-market-promo-text"
          wordsToHighlight="withdrawal_top-market-promo-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarketPromotion>
      <TopMarketPromotion
        className={cn("black-promotion", {
          "funding-black-promotion--rtl": isRTL,
        })}
      >
        <span className="display-block">
          <HighlightedLocalizationText
            localizationText="withdrawal_top-market-promo-text2-1"
            wordsToHighlight="withdrawal_top-market-promo-text-accent2-1"
            primaryClassName="highlighted-in-white"
            accentClassName="highlighted-in-red"
          />
        </span>
        <span className="display-block">
          <HighlightedLocalizationText
            localizationText="withdrawal_top-market-promo-text2-2-fsa"
            wordsToHighlight="withdrawal_top-market-promo-text-accent2-2"
            primaryClassName="highlighted-in-white"
            accentClassName="highlighted-in-red"
          />
        </span>
        <span className="display-block">
          <HighlightedLocalizationText
            localizationText="withdrawal_top-market-promo-text2-3-fsa"
            wordsToHighlight="withdrawal_top-market-promo-text-accent2-3"
            primaryClassName="highlighted-in-white"
            accentClassName="highlighted-in-red"
          />
        </span>
      </TopMarketPromotion>
      <TopMarketLayout className="top-market-layout--withdrawal">
        <Tabs tabList={tabs} images={PAYMENT_SYSTEMS_FSA} />
      </TopMarketLayout>
      <section className={cn("notes-block")}>
        {isDepositTab ? DepositDisclaimer() : WithdrawalDisclaimer()}
      </section>
      <TopMarketPromotion
        className={cn("bottom-promotion", {
          "bottom-promotion--rtl": isRTL,
        })}
        image={icon}
        btnClassName="button-link--red"
        btnTitle={t("withdrawal_top-market-promo-btn3")}
        btnOnClick={handleShowRegistrationPopup}
      >
        <HighlightedLocalizationText
          localizationText="withdrawal_top-market-promo-text3"
          wordsToHighlight="withdrawal_top-market-promo-text-accent3"
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

export default FundingPageContent;
