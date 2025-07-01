import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import InternalLink from "../../../shared/internal-link";
import LangSelect from "../lang-select";

const CornerPanel = ({ className, items }) => {
  const { t } = useTranslationWithVariables();

  return (
    <div className={cn("corner-panel", className)}>
      <div className="container">
        <div className="corner-panel__content">
          {items.map((item, key) => (
            <div key={`corner-item-${key}`} className="corner-panel__item">
              <InternalLink className="corner-panel__link" to={item.link}>
                {t(item.title)}
              </InternalLink>
              <div className="corner-panel__separator">{"|"}</div>
            </div>
          ))}

          <LangSelect className="lang-select--header" isHeader={true} />
        </div>
      </div>
    </div>
  );
};

CornerPanel.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};
export default CornerPanel;
