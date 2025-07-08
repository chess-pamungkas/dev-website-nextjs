import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";
import HighlightedLocalizationText from "../../../shared/highlighted-localization-text";
import { DIR_RTL, DIR_LTR } from "../../../../helpers/constants";

const SwapFreeBottomPromotion = ({ className }) => {
  const isRTL = useRtlDirection();
  const { t } = useTranslationWithVariables();

  const startConvrsSession = () => {
    if (typeof window !== "undefined" && window.ConvrsChat) {
      window.ConvrsChat.ShowWebChat();
    } else {
      // ConvrsChat not available
    }
  };

  return (
    <section
      className={cn("swap-free-bottom-promotion", className, {
        "swap-free-bottom-promotion--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <p className="swap-free-bottom-promotion__title">
        {
          <HighlightedLocalizationText
            localizationText="swap-free_bottom-promotion-title"
            wordsToHighlight="swap-free_bottom-promotion-title-accent"
            primaryClassName="highlighted-in-white"
            accentClassName="highlighted-in-red"
          />
        }
      </p>
      <p className="swap-free-bottom-promotion__text">
        {t("swap-free_bottom-promotion-text")}
      </p>
      <button
        onClick={startConvrsSession}
        className="button-link swap-free-bottom-promotion__btn"
      >
        {t("swap-free_bottom-promotion-btn")}
      </button>
    </section>
  );
};

SwapFreeBottomPromotion.propTypes = {
  className: PropTypes.string,
};

export default SwapFreeBottomPromotion;
