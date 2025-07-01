import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import HighlightedLocalizationText from "../../../shared/highlighted-localization-text";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import AnchorLink from "react-anchor-link-smooth-scroll";

const LegalRegulatorItem = ({
  className,
  icon,
  title,
  titleAccent,
  text,
  anchorLink,
}) => {
  const { t } = useTranslationWithVariables();
  return (
    <div className={cn("legal-regulator-item", className)}>
      <img
        src={typeof icon === "string" ? icon : icon?.src}
        alt=""
        className="legal-regulator-item__icon"
      />
      <p className="legal-regulator-item__title">
        <HighlightedLocalizationText
          localizationText={title}
          wordsToHighlight={titleAccent}
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-red"
        />
      </p>
      <p className="legal-regulator-item__text">{t(text)}</p>
      <AnchorLink href={anchorLink} className={"legal-regulator-item__link"}>
        {t("legal-regulator-read-more-fsa")}
      </AnchorLink>
    </div>
  );
};

LegalRegulatorItem.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  titleAccent: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  anchorLink: PropTypes.string.isRequired,
};
export default LegalRegulatorItem;
