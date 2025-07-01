import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";
import HighlightedLocalizationText from "../../../shared/highlighted-localization-text";

const VPSPromoAdvantage = ({ img, title, titleAccent }) => {
  const isRTL = useRtlDirection();

  return (
    <div
      className={cn("vps-promo-advantage-item", {
        "vps-promo-advantage-item--rtl": isRTL,
      })}
    >
      <img
        className="vps-promo-advantage-item__img"
        src={typeof img === "string" ? img : img?.src}
        alt={""}
      />
      <p className="vps-promo-advantage-item__title">
        {
          <HighlightedLocalizationText
            localizationText={title}
            wordsToHighlight={titleAccent}
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        }
      </p>
    </div>
  );
};

VPSPromoAdvantage.propTypes = {
  img: PropTypes.string.isRequired, // Image source URL
  title: PropTypes.string.isRequired, // Main title text
  titleAccent: PropTypes.string.isRequired, // Words to be highlighted in the title
};
export default VPSPromoAdvantage;
