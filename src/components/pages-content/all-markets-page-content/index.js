import React from "react";
import PropTypes from "prop-types";
import AllMarkets from "../../all-markets";
import MarketItemsList from "../../all-markets/components/market-items-list";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";
import { DIR_LTR, DIR_RTL } from "../../../helpers/constants";
import Seo from "../../shared/seo";

const AllMarketsPage = ({ className }) => {
  const { t } = useTranslationWithVariables();
  const isRTL = useRtlDirection();

  return (
    <>
      <Seo
        title={t("page-allmarkets-title")}
        description={t("page-allmarkets-description")}
      />
      <div className={className} dir={isRTL ? DIR_RTL : DIR_LTR}>
        <AllMarkets />
        <MarketItemsList />
      </div>
    </>
  );
};

AllMarketsPage.propTypes = {
  className: PropTypes.string,
};

export default AllMarketsPage;
