import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import icon from "../../../../assets/images/all-markets/advantage-icon.svg";
import iconSm from "../../../../assets/images/all-markets/advantage-icon-sm.svg";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import { useWindowSize } from "../../../../helpers/hooks/use-window-size";
import ButtonPopup from "../../../shared/button-popup";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";

const MarketItemAdvantageList = ({
  className,
  advantages,
  title,
  btnTitle,
  btnClassName,
  btnOnClick,
}) => {
  const { t } = useTranslationWithVariables();
  const { isMobile } = useWindowSize();
  const isRTL = useRtlDirection();

  return (
    <div
      className={cn("market-item-advantages-list", className, {
        "market-item-advantages-list--rtl": isRTL,
      })}
    >
      {title && (
        <div className="market-item-advantages-list__title-wrapper">
          <h4 className="market-item-advantages-list__title">{title}</h4>
        </div>
      )}
      <div className="market-item-advantages-wrapper">
        <div className="market-item-advantages">
          {advantages.map((item) => (
            <div key={item.key} className="market-item-advantages__item">
              <img
                src={
                  isMobile
                    ? typeof iconSm === "string"
                      ? iconSm
                      : iconSm.src
                    : typeof icon === "string"
                    ? icon
                    : icon.src
                }
                alt=""
                className="market-item-advantages__icon"
              />
              <span className="market-item-advantages__text">
                {t(item.text)}
              </span>
            </div>
          ))}
        </div>
        {btnTitle && btnTitle !== "" && (
          <div className="market-item-btn-wrapper">
            <ButtonPopup
              onClick={btnOnClick}
              className={cn(
                "button-link--red",
                "market-item-btn",
                btnClassName
              )}
            >
              {btnTitle}
            </ButtonPopup>
          </div>
        )}
      </div>
    </div>
  );
};

MarketItemAdvantageList.propTypes = {
  className: PropTypes.string,
  advantages: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  btnTitle: PropTypes.string,
  btnClassName: PropTypes.string,
  btnOnClick: PropTypes.func,
};

export default MarketItemAdvantageList;
