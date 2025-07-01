import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";
import HighlightedLocalizationText from "../../../shared/highlighted-localization-text";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";

const CenterPromoOption = ({ img, title, titleAccent, text, btnTitle }) => {
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
    <div
      className={cn("swap-free-promo-option-item", {
        "swap-free-promo-option-item--rtl": isRTL,
      })}
    >
      <img className="swap-free-promo-option-item__img" src={img} alt={""} />
      <p className="swap-free-promo-option-item__title">
        {
          <HighlightedLocalizationText
            localizationText={title}
            wordsToHighlight={titleAccent}
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
      </p>
      <div className="swap-free-promo-option-item__text-block">
        <p className="swap-free-promo-option-item__text">{t(text)}</p>
      </div>
      <button
        onClick={startConvrsSession}
        className="button-link button-link--red swap-free-promo-option-item__btn"
      >
        {t(btnTitle)}
      </button>
    </div>
  );
};

CenterPromoOption.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  titleAccent: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  btnTitle: PropTypes.string.isRequired,
};
export default CenterPromoOption;
