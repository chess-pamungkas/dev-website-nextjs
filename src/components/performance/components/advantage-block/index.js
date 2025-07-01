import React, { useContext } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import HighlightedLocalizationText from "../../../shared/highlighted-localization-text";
import LanguageContext from "../../../../context/language-context";

const AdvantageBlock = ({ className, icon: Icon, text, accent, subtext }) => {
  const { selectedLanguage } = useContext(LanguageContext);

  return (
    <div className={cn("advantage-block", className)}>
      <div className="advantage-block__icon-wrapper">
        <Icon className="advantage-block__icon" />
      </div>
      <p className="advantage-block__text">
        <HighlightedLocalizationText
          localizationText={text}
          wordsToHighlight={accent}
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-red"
        />
      </p>
      {selectedLanguage.id === "jp" &&
        subtext && ( // Conditionally render subtext for Japanese locale
          <p className="advantage-block__text">
            <HighlightedLocalizationText
              localizationText={subtext}
              wordsToHighlight={accent}
              primaryClassName="highlighted-in-black"
              accentClassName="highlighted-in-red"
            />
          </p>
        )}
    </div>
  );
};

AdvantageBlock.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.elementType.isRequired,
  text: PropTypes.string.isRequired,
  accent: PropTypes.string.isRequired,
  subtext: PropTypes.string,
};

export default AdvantageBlock;
