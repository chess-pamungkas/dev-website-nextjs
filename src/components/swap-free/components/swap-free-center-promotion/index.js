import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";
import HighlightedLocalizationText from "../../../shared/highlighted-localization-text";
import { SWAP_FREE_PROMO_OPTIONS } from "../../../../helpers/swap-free.config";
import { stringTransformToKebabCase } from "../../../../helpers/services/string-service";
import CenterPromoOption from "../center-promo-option";
import { DIR_RTL, DIR_LTR } from "../../../../helpers/constants";

const SwapFreeCenterPromotion = ({ className }) => {
  const isRTL = useRtlDirection();

  return (
    <section
      className={cn("swap-free-center-promotion", className, {
        "swap-free-center-promotion--rtl": isRTL,
      })}
    >
      <div
        className={cn("swap-free-center-promotion__wrapper")}
        dir={isRTL ? DIR_RTL : DIR_LTR}
      >
        <p className="swap-free-center-promotion__title">
          {
            <HighlightedLocalizationText
              localizationText="swap-free_center-promotion-title"
              wordsToHighlight="swap-free_center-promotion-title-accent"
              primaryClassName="highlighted-in-black"
              accentClassName="highlighted-in-red"
            />
          }
        </p>
        <div className="swap-free-center-promotion__options">
          {SWAP_FREE_PROMO_OPTIONS.map((item) => (
            <CenterPromoOption
              key={stringTransformToKebabCase(item.title)}
              title={item.title}
              titleAccent={item.titleAccent}
              img={item.img}
              text={item.text}
              btnTitle={item.btnTitle}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

SwapFreeCenterPromotion.propTypes = {
  className: PropTypes.string,
};

export default SwapFreeCenterPromotion;
