import React, { useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import {
  DIR_LTR,
  DIR_RTL,
  ShowRegistrationPopup,
} from "../../../../helpers/constants";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";
import AlphaGenerationTabs from "../alpha-generation-tabs";
import ButtonPopup from "../../../shared/button-popup";
import { setLangParam } from "../../../../helpers/services/language-service";

const AlphaGeneration = ({ className }) => {
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
      id="alphaGeneration"
      className={cn("alpha-generation", className, {
        "alpha-generation--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="alpha-generation__wrapper">
        <div className="alpha-generation__title-wrapper">
          <h2 className="alpha-generation__title">
            {t("trading-tools_alpha-generation_title")}
          </h2>
          <p className="alpha-generation__subtitle">
            {t("trading-tools_alpha-generation_subtitle")}
          </p>
          <p className="alpha-generation__description">
            {t("trading-tools_alpha-generation_description")}
          </p>
        </div>
        <AlphaGenerationTabs />

        <ButtonPopup
          onClick={handleShowRegistrationPopup}
          className="button-link button-link--red trading-tools-btn"
        >
          {t("trading-tools_top-market-promo-btn3")}
        </ButtonPopup>
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

AlphaGeneration.propTypes = {
  className: PropTypes.string,
};
export default AlphaGeneration;
