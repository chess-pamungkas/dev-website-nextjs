import React, { memo } from "react";
import cn from "classnames";
import PropTypes from "prop-types";

const TabPanel = memo(({ children, isSelected, tabIndex }) => {
  return (
    <div
      className={cn("tabs__panel", { "tabs__panel--active": isSelected })}
      role="tabpanel"
      id={`panel-${tabIndex}`}
      aria-labelledby={`tab-${tabIndex}`}
      aria-hidden={!isSelected} // Ensuring accessibility with aria-hidden
    >
      {children}
    </div>
  );
});

TabPanel.propTypes = {
  children: PropTypes.node,
  isSelected: PropTypes.bool.isRequired,
  tabIndex: PropTypes.number.isRequired,
};

TabPanel.displayName = "TabPanel";

export default TabPanel;
