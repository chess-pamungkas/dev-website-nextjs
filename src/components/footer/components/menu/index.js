import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import MenuColumn from "../menu-column";
import { stringTransformToKebabCase } from "../../../../helpers/services/string-service";
import { getMenuItems } from "../../../../helpers/menu.config";

const Menu = ({ className }) => {
  const { t } = useTranslationWithVariables();
  const menu = getMenuItems();

  return (
    <div className={cn("menu", className)}>
      {menu.length > 0 &&
        menu.map(
          (item) =>
            !item.mobileOnly && (
              <div
                key={`footer-menu-${stringTransformToKebabCase(item.title)}`}
                className="menu__wrapper"
              >
                <h4 className="menu__column-title">{t(item.title)}</h4>
                <MenuColumn items={item.subItems} />
              </div>
            )
        )}
    </div>
  );
};

Menu.propTypes = {
  className: PropTypes.string,
};
export default Menu;
