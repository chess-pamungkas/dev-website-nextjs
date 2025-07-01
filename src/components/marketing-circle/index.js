import React, { useContext } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import Lottie from "lottie-react";
import { useWindowSize } from "../../helpers/hooks/use-window-size";
import ButtonPopup from "../shared/button-popup";
import { BIGGER_LANGUAGES } from "../../helpers/constants";
import { useTranslationWithVariables } from "../../helpers/hooks/use-translation-with-vars";
import LanguageContext from "../../context/language-context";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";

export const MarketingCircle = ({
  animation,
  upper,
  bottom,
  leftUpper,
  leftBottom,
  rightUpper,
  rightBottom,
  btnOnClick,
  isCrypto,
  isEtf,
  isIndices,
  isForex,
  isEnergies,
}) => {
  const { isMobile, isMD, isLG } = useWindowSize();
  const { t } = useTranslationWithVariables();
  const { selectedLanguage } = useContext(LanguageContext);
  const isRTL = useRtlDirection();

  let animationHeight = 492;
  if (isMobile) {
    animationHeight = 169;
  }
  if (isMD) {
    animationHeight = 242;
  }
  if (isLG) {
    animationHeight = 361;
  }

  const itemClass = cn("marketing-circle__item", {
    "marketing-circle__item--bigger-lang": BIGGER_LANGUAGES.includes(
      selectedLanguage.id
    ),
    "marketing-circle__item--rtl": isRTL,
  });

  return (
    <div className="marketing-circle">
      <div className="container">
        <Lottie
          className="promotion-markets__svg"
          animationData={animation}
          style={{ height: animationHeight }}
        />
        <div
          className={cn("marketing-circle__wrapper", {
            "marketing-circle__wrapper--bigger-lang": BIGGER_LANGUAGES.includes(
              selectedLanguage.id
            ),
            "marketing-circle__wrapper--crypto": isCrypto,
            "marketing-circle__wrapper--etf": isEtf,
            "marketing-circle__wrapper--indices": isIndices,
            "marketing-circle__wrapper--forex": isForex,
            "marketing-circle__wrapper--energies": isEnergies,
          })}
        >
          <div className={itemClass}>
            <p className="marketing-circle__item-text">{upper}</p>
          </div>
          <div className="marketing-circle__row">
            <div className={itemClass}>
              <p className="marketing-circle__item-text">{leftUpper}</p>
            </div>
            <div className={itemClass}>
              <p className="marketing-circle__item-text">{rightUpper}</p>
            </div>
          </div>
          <div className="marketing-circle__row">
            <div className={itemClass}>
              <p className="marketing-circle__item-text">{leftBottom}</p>
            </div>
            <div className={itemClass}>
              <p className="marketing-circle__item-text">{rightBottom}</p>
            </div>
          </div>
          <div className={itemClass}>
            <p className="marketing-circle__item-text">{bottom}</p>
          </div>
        </div>
        <ButtonPopup
          onClick={btnOnClick}
          className="button-link button-link--red marketing-circle__btn"
        >
          {t("button-start-now")}
        </ButtonPopup>
      </div>
    </div>
  );
};

MarketingCircle.propTypes = {
  animation: PropTypes.object.isRequired,
  upper: PropTypes.element.isRequired,
  leftUpper: PropTypes.element.isRequired,
  rightUpper: PropTypes.element.isRequired,
  bottom: PropTypes.element.isRequired,
  leftBottom: PropTypes.element.isRequired,
  rightBottom: PropTypes.element.isRequired,
  btnOnClick: PropTypes.func.isRequired,
  isCrypto: PropTypes.bool.isRequired,
  isEtf: PropTypes.bool.isRequired,
  isIndices: PropTypes.bool.isRequired,
  isForex: PropTypes.bool.isRequired,
  isEnergies: PropTypes.bool.isRequired,
};

export default MarketingCircle;
