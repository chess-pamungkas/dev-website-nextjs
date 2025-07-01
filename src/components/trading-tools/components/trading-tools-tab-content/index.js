import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

const TradingToolsTabContent = ({
  className,
  img1,
  img2,
  title,
  children,
  darkBG = false,
}) => (
  <div className={cn("trading-tools-tab-content", className)}>
    <div className="trading-tools-tab-content__image-wrapper">
      <img
        src={typeof img1 === "string" ? img1 : img1?.src}
        alt={title}
        className="trading-tools-tab-content__image"
      />
      {img2 && (
        <img
          src={typeof img2 === "string" ? img2 : img2?.src}
          alt={title}
          className="trading-tools-tab-content__image"
        />
      )}
    </div>
    <div className="trading-tools-tab-content__text-wrapper">
      <h3
        className={cn("trading-tools-tab-content__title", {
          "trading-tools-tab-content__title--red": darkBG,
        })}
      >
        {title}
      </h3>
      <div
        className={cn("trading-tools-tab-content__text", {
          "trading-tools-tab-content__text--white": darkBG,
        })}
      >
        {children}
      </div>
    </div>
  </div>
);

TradingToolsTabContent.propTypes = {
  className: PropTypes.string,
  img1: PropTypes.string.isRequired,
  img2: PropTypes.string,
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  darkBG: PropTypes.bool,
};
export default TradingToolsTabContent;
