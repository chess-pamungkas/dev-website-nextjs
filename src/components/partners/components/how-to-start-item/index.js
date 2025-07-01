import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import HighlightedLocalizationText from "../../../shared/highlighted-localization-text";

const HowToStartItem = ({ className, icon, text, accent }) => {
  return (
    <div className={cn("partners-start-item", className)}>
      <img
        src={typeof icon === "string" ? icon : icon?.src}
        alt=""
        className="partners-start-item__icon"
      />
      <p className="partners-start-item__text">
        <HighlightedLocalizationText
          localizationText={text}
          wordsToHighlight={accent}
          primaryClassName="highlighted-in-white"
          accentClassName="highlighted-in-red"
        />
      </p>
    </div>
  );
};

HowToStartItem.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  accent: PropTypes.string.isRequired,
};
export default HowToStartItem;
