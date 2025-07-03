import React, { useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";
import HighlightedLocalizationText from "../../../shared/highlighted-localization-text";
import ButtonPopup from "../../../shared/button-popup";
import { ShowRegistrationPopup } from "../../../../helpers/constants";
import { setLangParam } from "../../../../helpers/services/language-service";

const VPSBottomPromotion = ({ className }) => {
  const isRTL = useRtlDirection();
  const { t } = useTranslationWithVariables();
  const langParam = setLangParam();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleShowRegistrationPopup = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <section
      className={cn("vps-bottom-promotion", className, {
        "vps-bottom-promotion--rtl": isRTL,
      })}
    >
      <div className={cn("vps-bottom-promotion__wrapper")}>
        <div className="vps-bottom-promotion__img-block">
          <img
            src="/images/vps/bottom-promo.svg"
            alt=""
            className="vps-bottom-promotion__img"
          />
        </div>
        <div className="vps-bottom-promotion__text-block">
          <p className="vps-bottom-promotion__title">
            {
              <HighlightedLocalizationText
                localizationText="vps_bottom-promotion-title"
                wordsToHighlight="vps_bottom-promotion-title-accent"
                primaryClassName="highlighted-in-black"
                accentClassName="highlighted-in-white"
              />
            }
          </p>
          <ButtonPopup
            onClick={handleShowRegistrationPopup}
            className={"top-market__btn top-market__btn--white"}
          >
            {t("vps_bottom-promotion-btn")}
          </ButtonPopup>
        </div>
      </div>

      {/* Render the popup */}
      {isPopupOpen && (
        <ShowRegistrationPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          langParam={langParam} // Pass langParam if needed
        />
      )}
    </section>
  );
};

VPSBottomPromotion.propTypes = {
  className: PropTypes.string,
};

VPSBottomPromotion.defaultProps = {
  className: "",
};
export default VPSBottomPromotion;
