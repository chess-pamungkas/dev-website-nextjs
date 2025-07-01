import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import TradingSectionTitle from "../trading-section-title";
import { useWindowSize } from "../../../../helpers/hooks/use-window-size";
import Dropdown from "../../../shared/dropdown";

const TradingSections = ({
  className,
  title,
  selectedSection,
  setSelectedSection,
  tradingSection,
}) => {
  const { isMobile } = useWindowSize();

  return (
    <div className={cn("trading-sections-wrapper", className)}>
      {title ? (
        <div className="trading-sections">
          <h4 className="trading-sections__header">{title}</h4>
        </div>
      ) : (
        <div className="trading-sections">
          {isMobile ? (
            <Dropdown
              selectedItem={selectedSection}
              items={tradingSection.map((item) => {
                return {
                  title: item.title,
                  value: item.id,
                };
              })}
              setSelectedItem={(item) => {
                setSelectedSection({
                  title: item.title,
                  id: item.value,
                });
              }}
              isDropdownShown
            />
          ) : (
            tradingSection.map((section) => (
              <TradingSectionTitle
                key={`tradingSection${section.id}`}
                section={section}
                selectedSection={selectedSection}
                setSelectedSection={setSelectedSection}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
};

TradingSections.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  selectedSection: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  setSelectedSection: PropTypes.func.isRequired,
  tradingSection: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TradingSections;
