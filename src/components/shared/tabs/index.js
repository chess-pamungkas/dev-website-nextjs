import React, { useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { stringTransformToKebabCase } from "../../../helpers/services/string-service";
import { useWindowSize } from "../../../helpers/hooks/use-window-size";
import Dropdown from "../dropdown";
import Tab from "./components/tab";
import TabPanel from "./components/tab-panel";

const Tabs = ({
  classname,
  tabList = [],
  activeTabIndex = 0,
  isMobileDropdown = false,
  images,
}) => {
  const [currentTabIndex, setCurrentTabIndex] = useState(activeTabIndex);
  const { isTablet } = useWindowSize();

  const handleTabClick = (index) => {
    setCurrentTabIndex(index);
  };

  return (
    <div className={cn("tabs", classname)} data-tabs="true">
      <div className="tabs__tablist-wrapper">
        {isTablet && isMobileDropdown ? (
          <Dropdown
            className="tabs__dropdown"
            selectedItem={{
              title: tabList[currentTabIndex].title,
              value: currentTabIndex,
            }}
            items={tabList.map(({ title, onClick }, tabIndex) => {
              return {
                title,
                value: tabIndex,
                onClick,
              };
            })}
            setSelectedItem={({ value }) => {
              setCurrentTabIndex(value);
            }}
            isDropdownShown
          />
        ) : (
          <ul role="tablist" className="tabs__tablist">
            {tabList.map(
              ({ title, isTitleWithIcon, icon, onClick }, tabIndex) => (
                <Tab
                  key={`${stringTransformToKebabCase(title)}_tab`}
                  tabIndex={tabIndex}
                  isSelected={currentTabIndex === tabIndex}
                  onTabClick={() => {
                    if (onClick) {
                      onClick();
                    }
                    handleTabClick(tabIndex);
                  }}
                >
                  {isTitleWithIcon && icon}
                  <span>{title}</span>
                </Tab>
              )
            )}
          </ul>
        )}
      </div>
      <div className="tabs__panels">
        {tabList.map(({ content }, tabIndex) => (
          <TabPanel
            key={`${stringTransformToKebabCase(
              tabList[tabIndex].title
            )}_tabPanel`}
            tabIndex={tabIndex}
            isSelected={currentTabIndex === tabIndex}
          >
            {content}
          </TabPanel>
        ))}
        {images && (
          <div className="tabs__images">
            {images.map((imageItem, key) => (
              <img
                key={`tabs-img-${key}`}
                src={
                  typeof imageItem.logo === "string"
                    ? imageItem.logo
                    : imageItem.logo?.src
                }
                alt={imageItem.alt}
                className="tabs__img"
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

Tabs.propTypes = {
  classname: PropTypes.string,
  tabList: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      isTitleWithIcon: PropTypes.bool,
      icon: PropTypes.node,
      onClick: PropTypes.func,
      content: PropTypes.node.isRequired,
    })
  ),
  activeTabIndex: PropTypes.number,
  isMobileDropdown: PropTypes.bool,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      logo: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ),
};

export default Tabs;
