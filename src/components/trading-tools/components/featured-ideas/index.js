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
import FeaturedIdeasTabs from "../featured-ideas-tabs";
import ButtonPopup from "../../../shared/button-popup";
import { setLangParam } from "../../../../helpers/services/language-service";

const FeaturedIdeas = ({ className }) => {
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
      id="featuredIdeas"
      className={cn("featured-ideas", className, {
        "featured-ideas--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="featured-ideas__wrapper">
        <div className="featured-ideas__title-wrapper">
          <h2 className="featured-ideas__title">
            {t("trading-tools_featured-ideas_title")}
          </h2>
          <p className="featured-ideas__subtitle">
            {t("trading-tools_featured-ideas_subtitle")}
          </p>
          <p className="featured-ideas__description">
            {t("trading-tools_featured-ideas_description")}
          </p>
        </div>
        <FeaturedIdeasTabs />

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

FeaturedIdeas.propTypes = {
  className: PropTypes.string,
};
export default FeaturedIdeas;
