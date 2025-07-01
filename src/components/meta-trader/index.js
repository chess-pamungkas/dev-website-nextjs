import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import ButtonLink from "../shared/button-link";
import { useTranslationWithVariables } from "../../helpers/hooks/use-translation-with-vars";
import { ADDITIONAL_PLATFORMS, MOBILE_PLATFORMS } from "../../helpers/config";
import MarketItemAdvantageList from "../all-markets/components/market-item-advantage-list";
import { useWindowSize } from "../../helpers/hooks/use-window-size";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";
import { DIR_LTR, DIR_RTL } from "../../helpers/constants";

const MetaTrader = ({
  classname,
  title,
  text,
  icon,
  learMoreLink,
  learMoreLinkTitle,
  downloadLinkTitle,
  advantages,
  isGrayBackground,
  downloadLink,
}) => {
  const { t } = useTranslationWithVariables();
  const { isMobile, isTablet, isLG, isXL } = useWindowSize();
  const isRTL = useRtlDirection();

  const AdvantagesTemplate = (
    <div className={cn("meta-trader__advantages")}>
      {!isLG && (
        <div className={cn("meta-trader__trader-icon")}>
          <img
            className="meta-trader__tool-icon-img"
            src={typeof icon === "string" ? icon : icon?.src}
            alt={t(title)}
          />
        </div>
      )}

      <MarketItemAdvantageList
        className={cn("meta-trader__advantages-list")}
        advantages={advantages}
      />
    </div>
  );

  const TRADER_TOOLS = [
    MOBILE_PLATFORMS.ios,
    MOBILE_PLATFORMS.android,
    ADDITIONAL_PLATFORMS.windows,
  ];

  const TraderToolIcon = ({ item }) => {
    return (
      <div className={cn("meta-trader__tool-icon")}>
        <img
          className="meta-trader__tool-icon-img"
          src={typeof item.icon === "string" ? item.icon : item.icon?.src}
          alt={t(item.title)}
        />
      </div>
    );
  };

  TraderToolIcon.propTypes = {
    item: PropTypes.shape({
      icon: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    }).isRequired,
  };

  return (
    <section
      className={cn("meta-trader", classname, {
        "meta-trader--gray-bg": isGrayBackground,
        "meta-trader--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className={cn("meta-trader__wrapper")}>
        <div className={cn("meta-trader__description")}>
          <h2 className={cn("meta-trader__title")}>{t(title)}</h2>
          <p className={cn("meta-trader__text")}>
            {text.map((item, number) => (
              <span key={`${t(title)}-text-${number}`}>{t(item)}</span>
            ))}
          </p>
          {!isMobile && isTablet && AdvantagesTemplate}
          <div className={cn("meta-trader__footer")}>
            <div className={cn("meta-trader__links")}>
              <ButtonLink
                link={learMoreLink}
                className={cn("meta-trader__more-link")}
              >
                {t(learMoreLinkTitle)}
              </ButtonLink>
              <ButtonLink
                link={downloadLink}
                className={cn("meta-trader__download-link", "button-link--red")}
              >
                {t(downloadLinkTitle)}
              </ButtonLink>
            </div>
            {isLG && (
              <div className={cn("meta-trader__trader-icon")}>
                <img
                  className="meta-trader__tool-icon-img"
                  src={typeof icon === "string" ? icon : icon?.src}
                  alt={t(title)}
                />
              </div>
            )}
            <div className={cn("meta-trader__tool-icons")}>
              {TRADER_TOOLS.map((tool) => (
                <TraderToolIcon
                  key={`traderToolIconKey${tool.title}`}
                  item={tool}
                />
              ))}
            </div>
          </div>
        </div>

        {(isMobile || isLG || isXL) && AdvantagesTemplate}
      </div>
    </section>
  );
};

MetaTrader.propTypes = {
  classname: PropTypes.string,
  title: PropTypes.string.isRequired,
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
  icon: PropTypes.string.isRequired,
  learMoreLink: PropTypes.string.isRequired,
  learMoreLinkTitle: PropTypes.string.isRequired,
  downloadLinkTitle: PropTypes.string.isRequired,
  advantages: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      description: PropTypes.string,
    })
  ).isRequired,
  isGrayBackground: PropTypes.bool,
  downloadLink: PropTypes.string.isRequired,
};
export default MetaTrader;
