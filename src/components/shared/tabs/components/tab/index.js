import React, { memo } from "react";
import cn from "classnames";
import PropTypes from "prop-types";

const Tab = memo(({ children, isSelected, tabIndex, onTabClick }) => {
  return (
    <li
      className={cn("tabs__tab", { "tabs__tab--active": isSelected })}
      role="tab"
      id={`tab-${tabIndex}`}
      aria-selected={isSelected}
      aria-controls={`panel-${tabIndex}`}
      tabIndex={tabIndex}
      onClick={onTabClick}
      onKeyPress={(event) => {
        if (event.key === "Enter") {
          onTabClick();
        }
      }}
    >
      {children}
    </li>
  );
});

Tab.propTypes = {
  children: PropTypes.node.isRequired,
  isSelected: PropTypes.bool.isRequired,
  tabIndex: PropTypes.number.isRequired,
  onTabClick: PropTypes.func.isRequired,
};

Tab.displayName = "Tab";

export default Tab;
