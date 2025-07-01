import React, { forwardRef } from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import MarketItemAdvantageList from "../all-markets/components/market-item-advantage-list";
import Tabs from "../shared/tabs";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";
import { DIR_LTR, DIR_RTL } from "../../helpers/constants";

const MtPromotion = forwardRef(
  (
    {
      className,
      title,
      advantages,
      advantagesTitle,
      downloadTitle,
      tabs,
      image,
    },
    ref
  ) => {
    const isRTL = useRtlDirection();

    return (
      <section
        className={cn("mt-promotion", className, {
          "mt-promotion--rtl": isRTL,
        })}
        dir={isRTL ? DIR_RTL : DIR_LTR}
      >
        <div className={cn("mt-promotion__wrapper")}>
          <div
            className={cn("mt-promotion__block", "mt-promotion__block--flexed")}
          >
            <img
              src={image}
              alt={advantagesTitle}
              className="mt-promotion__img"
            />
          </div>
          <div className="mt-promotion__block">
            <div className="mt-promotion__description">
              <h2 className="mt-promotion__title">{title}</h2>
              <div className="mt-promotion__advantages">
                <MarketItemAdvantageList
                  title={advantagesTitle}
                  advantages={advantages}
                  className="mt-promotion-market-item-advantages"
                />
              </div>
            </div>
            <div className="mt-promotion__download" ref={ref} id="mt-download">
              <h2
                className={cn(
                  "mt-promotion__title",
                  "mt-promotion__title--download"
                )}
              >
                {downloadTitle}
              </h2>
              <Tabs tabList={tabs} classname="mt-promotion__download-tabs" />
            </div>
          </div>
        </div>
      </section>
    );
  }
);

MtPromotion.propTypes = {
  className: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  advantages: PropTypes.array.isRequired,
  advantagesTitle: PropTypes.string.isRequired,
  downloadTitle: PropTypes.string.isRequired,
  tabs: PropTypes.arrayOf(PropTypes.object).isRequired,
  image: PropTypes.string.isRequired,
};

// Set display name for the component
MtPromotion.displayName = "MtPromotion";

export default MtPromotion;
