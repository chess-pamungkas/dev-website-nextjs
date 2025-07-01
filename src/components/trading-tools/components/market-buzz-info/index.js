import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import image from "../../../../assets/images/trading-tools/market-buzz.png";
import { MARKET_BUZZ_INFO } from "../../../../helpers/trading-tools.config";
import { stringTransformToKebabCase } from "../../../../helpers/services/string-service";

const MarketBuzzInfo = ({ className }) => {
  const { t } = useTranslationWithVariables();

  return (
    <div className={cn("mb-info", className)}>
      <img
        src={image}
        className="mb-info__img"
        alt={t("trading-tools_market-buzz_title")}
      />
      <div className="mb-info__wrapper">
        {MARKET_BUZZ_INFO.map((item) => (
          <div
            className="mb-info__block"
            key={stringTransformToKebabCase(t(item.description))}
          >
            <p className="mb-info__title">{t(item.title)}</p>
            <p className="mb-info__description">{t(item.description)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

MarketBuzzInfo.propTypes = {
  className: PropTypes.string,
};
export default MarketBuzzInfo;
