import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";
import HighlightedLocalizationText from "../../../shared/highlighted-localization-text";
import { SWAP_FREE_PROMO_LIST } from "../../../../helpers/swap-free.config";

const SwapFreeTopPromotion = ({ className }) => {
  const isRTL = useRtlDirection();
  const { t } = useTranslationWithVariables();

  return (
    <section
      className={cn("swap-free-promotion", className, {
        "swap-free-promotion--rtl": isRTL,
      })}
    >
      <div className={cn("swap-free-promotion__wrapper")}>
        <div className="swap-free-promotion__img-block">
          <img
            src="/images/swap-free/swap-free.svg"
            alt=""
            className="swap-free-promotion__img"
          />
        </div>
        <div className="swap-free-promotion__text-block">
          <p className="swap-free-promotion__title">
            {t("swap-free_promotion-title")}
          </p>
          <p className="swap-free-promotion__description">
            <HighlightedLocalizationText
              localizationText="swap-free_promotion-description"
              wordsToHighlight="swap-free_promotion-description-accent"
              primaryClassName="highlighted-in-black"
              accentClassName="highlighted-in-red"
            />
          </p>
          {SWAP_FREE_PROMO_LIST.map((item, index) => (
            <p key={index} className="swap-free-promotion__text">
              {t(item.text)}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
};

SwapFreeTopPromotion.propTypes = {
  className: PropTypes.string,
};
export default SwapFreeTopPromotion;
