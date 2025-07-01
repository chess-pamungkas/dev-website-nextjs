import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import { stringTransformToKebabCase } from "../../../../helpers/services/string-service";
import InternalLink from "../../../shared/internal-link";

const MenuColumn = ({ className, items }) => {
  const { t } = useTranslationWithVariables();

  return (
    <ul className={cn("menu-column", className)}>
      {items.map((item) => {
        return (
          <li
            className="menu-column__item"
            key={`footer-menu-${stringTransformToKebabCase(item.title)}`}
          >
            <InternalLink className={cn("menu-column__link")} to={item.link}>
              {t(item.title)}
            </InternalLink>
          </li>
        );
      })}
    </ul>
  );
};

MenuColumn.propTypes = {
  className: PropTypes.string,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      link: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default MenuColumn;
