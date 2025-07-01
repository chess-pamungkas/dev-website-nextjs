import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import HighlightedLocalizationText from "../../../shared/highlighted-localization-text";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";

const SwapFreeAdvantageItem = ({
  className,
  icon,
  title,
  titleAccent,
  titleObject,
}) => {
  const { t } = useTranslationWithVariables();
  return (
    <div className={cn("swap-free-advantage-item", className)}>
      <img
        src={typeof icon === "string" ? icon : icon?.src}
        alt=""
        className="swap-free-advantage-item__icon"
      />
      {title && (
        <p className="swap-free-advantage-item__title">
          <HighlightedLocalizationText
            localizationText={title}
            wordsToHighlight={titleAccent}
            primaryClassName="highlighted-in-white"
            accentClassName="highlighted-in-red"
          />
        </p>
      )}
      {titleObject && (
        <p className="swap-free-advantage-item__title">
          {t(titleObject.p1)}&nbsp;
          <a href={titleObject.link} target="_blank" rel="noreferrer">
            {t(titleObject.linkText)}
          </a>
          &nbsp;
          {t(titleObject.p2)}
        </p>
      )}
    </div>
  );
};

SwapFreeAdvantageItem.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string,
  titleAccent: PropTypes.string,
  titleObject: PropTypes.shape({
    p1: PropTypes.string.isRequired,
    link: PropTypes.string.isRequired,
    linkText: PropTypes.string.isRequired,
    p2: PropTypes.string.isRequired,
  }),
};
export default SwapFreeAdvantageItem;
