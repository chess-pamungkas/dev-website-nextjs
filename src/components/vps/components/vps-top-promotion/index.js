import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";
import HighlightedLocalizationText from "../../../shared/highlighted-localization-text";
import { DIR_RTL, DIR_LTR } from "../../../../helpers/constants";

const VPSTopPromotion = ({ className }) => {
  const isRTL = useRtlDirection();
  const { t } = useTranslationWithVariables();

  return (
    <section
      className={cn("vps-promotion", className, {
        "vps-promotion--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className={cn("vps-promotion__wrapper")}>
        <div className="vps-promotion__img-block">
          <img
            src="/images/vps/vps.png"
            alt=""
            className="vps-promotion__img"
          />
        </div>
        <div className="vps-promotion__text-block">
          <p className="vps-promotion__title">
            {
              <HighlightedLocalizationText
                localizationText="vps_promotion-title"
                wordsToHighlight="vps_promotion-title-accent"
                primaryClassName="highlighted-in-black"
                accentClassName="highlighted-in-red"
              />
            }
          </p>
          <p className="vps-promotion__text">
            {
              <HighlightedLocalizationText
                localizationText="vps_promotion-text1"
                wordsToHighlight="vps_promotion-text1-accent"
                primaryClassName="highlighted-in-black"
                accentClassName="highlighted-in-red"
              />
            }
          </p>
          <p className="vps-promotion__text">
            {
              <HighlightedLocalizationText
                localizationText="vps_promotion-text2"
                wordsToHighlight="vps_promotion-text2-accent"
                primaryClassName="highlighted-in-black"
                accentClassName="highlighted-in-red"
              />
            }
          </p>
          <p className="vps-promotion__note">{t("vps_promotion-note")}</p>
        </div>
      </div>
    </section>
  );
};

VPSTopPromotion.propTypes = {
  className: PropTypes.string, // Additional className for styling
};
export default VPSTopPromotion;
