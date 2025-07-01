import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import InternalLink from "../../../shared/internal-link";

const NavbarSubItem = ({ className, subItem = {}, onClick }) => {
  const { title, link, icon: Icon, description } = subItem;
  const { t } = useTranslationWithVariables();

  return (
    <li className={cn("dropdown-item", className)} onClick={onClick}>
      <InternalLink className="dropdown-item__link" to={link}>
        {Icon && <Icon className="dropdown-item__icon" />}
        <div className="dropdown-item__content">
          <span className="dropdown-item__title">{t(title)}</span>
          {description && (
            <p className="dropdown-item__description">{t(description)}</p>
          )}
        </div>
      </InternalLink>
    </li>
  );
};

NavbarSubItem.propTypes = {
  className: PropTypes.string,
  subItem: PropTypes.shape({
    title: PropTypes.string,
    link: PropTypes.string,
    icon: PropTypes.elementType, // for React components passed as icons
    description: PropTypes.string,
  }),
  onClick: PropTypes.func,
};

export default NavbarSubItem;
