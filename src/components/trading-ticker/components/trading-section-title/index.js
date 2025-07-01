import * as React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";

const TradingSectionTitle = ({
  section,
  selectedSection,
  setSelectedSection,
  className,
}) => {
  const { t } = useTranslationWithVariables();

  return (
    <div
      className={cn(
        "trading-section-title",
        {
          "trading-section-title__active": section.id === selectedSection.id,
        },
        className
      )}
      onClick={() => {
        setSelectedSection(section);
      }}
      role="presentation"
    >
      {t(section.title)}
    </div>
  );
};

TradingSectionTitle.propTypes = {
  section: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  selectedSection: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedSection: PropTypes.func.isRequired,
  className: PropTypes.string,
};
export default TradingSectionTitle;
