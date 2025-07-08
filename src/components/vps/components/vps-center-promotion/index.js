import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";
import HighlightedLocalizationText from "../../../shared/highlighted-localization-text";
import { VPS_PROMO_ADVANTAGES } from "../../../../helpers/vps.config";
import VPSPromoAdvantage from "../vps-promo-advantage";
import { stringTransformToKebabCase } from "../../../../helpers/services/string-service";
import { DIR_RTL, DIR_LTR } from "../../../../helpers/constants";

const VPSCenterPromotion = ({ className }) => {
  const isRTL = useRtlDirection();
  const { t } = useTranslationWithVariables();

  return (
    <section
      className={cn("vps-center-promotion", className, {
        "vps-center-promotion--rtl": isRTL,
      })}
    >
      <div
        className={cn("vps-center-promotion__wrapper")}
        dir={isRTL ? DIR_RTL : DIR_LTR}
      >
        <p className="vps-center-promotion__title">
          {
            <HighlightedLocalizationText
              localizationText="vps_center-promotion-title"
              wordsToHighlight="vps_center-promotion-title-accent"
              primaryClassName="highlighted-in-black"
              accentClassName="highlighted-in-red"
            />
          }
        </p>
        <p className="vps-center-promotion__text">
          {
            <HighlightedLocalizationText
              localizationText="vps_center-promotion-text1"
              wordsToHighlight="vps_center-promotion-text1-accent"
              primaryClassName="highlighted-in-black"
              accentClassName="highlighted-in-red"
            />
          }
        </p>
        <p className="vps-center-promotion__text">
          {
            <HighlightedLocalizationText
              localizationText="vps_center-promotion-text2"
              wordsToHighlight="vps_center-promotion-text2-accent"
              primaryClassName="highlighted-in-black"
              accentClassName="highlighted-in-red"
            />
          }
        </p>

        <div className="vps-center-promotion__advantages">
          {VPS_PROMO_ADVANTAGES.map((item) => (
            <VPSPromoAdvantage
              key={stringTransformToKebabCase(item.title)}
              title={item.title}
              titleAccent={item.titleAccent}
              img={item.img}
            />
          ))}
        </div>

        <p className="vps-center-promotion__bottom-text">
          {
            <HighlightedLocalizationText
              localizationText="vps_center-promotion-bottom-text"
              wordsToHighlight="vps_center-promotion-bottom-text-accent"
              primaryClassName="highlighted-in-black"
              accentClassName="highlighted-in-red"
            />
          }
        </p>
        <p className="vps-center-promotion__bottom-note">
          {t("vps_center-promotion-bottom-note")}
        </p>
      </div>
    </section>
  );
};

VPSCenterPromotion.propTypes = {
  className: PropTypes.string,
};

VPSCenterPromotion.defaultProps = {
  className: "",
};

export default VPSCenterPromotion;
