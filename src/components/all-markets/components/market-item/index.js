import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import ButtonLink from "../../../shared/button-link";
import MarketItemAdvantageList from "../market-item-advantage-list";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";

const MarketItem = ({
  className,
  icon,
  title,
  text,
  isGrayBackground,
  link,
  advantages,
}) => {
  const { t } = useTranslationWithVariables();
  return (
    <div
      className={cn("market-item", className, {
        "market-item--gray": isGrayBackground,
      })}
    >
      <div className="market-item__description">
        <img
          src={typeof icon === "string" ? icon : icon?.src}
          alt=""
          className="market-item__icon"
        />
        <h3 className="market-item__title">{t(title)}</h3>
        <div className="market-item__text">
          {text.map((item, number) => (
            <span key={`${t(title)}-${number}`}>{t(item)}</span>
          ))}
        </div>
        <ButtonLink link={link} className={"market-item__btn"}>
          {t("all-markets_market-items-list-learn-more-btn")}
        </ButtonLink>
      </div>
      <div className="market-item__advantages">
        <MarketItemAdvantageList advantages={advantages} />
      </div>
    </div>
  );
};

MarketItem.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
  isGrayBackground: PropTypes.bool,
  link: PropTypes.string.isRequired,
  advantages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MarketItem;
