import React, { useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { stringTransformToKebabCase } from "../../../../helpers/services/string-service";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import ButtonPopup from "../../../shared/button-popup";
import { ShowRegistrationPopup } from "../../../../helpers/constants";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";
import VPSAdvantageItem from "../vps-advantage-item";
import HighlightedLocalizationText from "../../../shared/highlighted-localization-text";
import { setLangParam } from "../../../../helpers/services/language-service";
import { DIR_RTL, DIR_LTR } from "../../../../helpers/constants";

const VPSAdvantages = ({ className, advantages }) => {
  const { t } = useTranslationWithVariables();
  const isRTL = useRtlDirection();
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
      className={cn("vps-advantages", className, {
        "vps-advantages--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <h2 className="vps-advantages__title">
        {
          <HighlightedLocalizationText
            localizationText="vps_advantages-title"
            wordsToHighlight="vps_advantages-title-accent"
            primaryClassName="highlighted-in-white"
            accentClassName="highlighted-in-red"
          />
        }
      </h2>
      <div className="vps-advantages__items">
        {advantages.length > 0 &&
          advantages.map((item) => (
            <VPSAdvantageItem
              key={`start-item-${stringTransformToKebabCase(item.title)}`}
              icon={item.img}
              text={item.text}
              title={item.title}
            />
          ))}
      </div>
      <ButtonPopup
        className={cn("vps-advantages__btn")}
        onClick={handleShowRegistrationPopup}
      >
        {t("vps_advantages-btn")}
      </ButtonPopup>

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

VPSAdvantages.propTypes = {
  className: PropTypes.string,
  advantages: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
};

VPSAdvantages.defaultProps = {
  className: "",
};
export default VPSAdvantages;
