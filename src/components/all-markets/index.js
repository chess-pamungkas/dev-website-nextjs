import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import image from "../../assets/images/all-markets/markets-image.svg";
import { useTranslationWithVariables } from "../../helpers/hooks/use-translation-with-vars";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";
import { DIR_LTR, DIR_RTL } from "../../helpers/constants";

const AllMarkets = ({ className }) => {
  const { t } = useTranslationWithVariables();
  const isRTL = useRtlDirection();

  return (
    <section
      className={cn("all-markets", className, {
        "all-markets--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="all-markets__wrapper">
        <div className="all-markets__block">
          <h2 className="all-markets__title">
            {t("all-markets_all-markets-title")}
          </h2>
          <div className="all-markets__text">
            {t("all-markets_all-markets-text")}
          </div>
        </div>
        <div className={cn("all-markets__block", "all-markets__block--flexed")}>
          <img
            src={typeof image === "string" ? image : image.src}
            alt=""
            className="all-markets__img"
          />
        </div>
      </div>
    </section>
  );
};
AllMarkets.propTypes = {
  className: PropTypes.string,
};

AllMarkets.propTypes = {
  className: PropTypes.string,
};
export default AllMarkets;
