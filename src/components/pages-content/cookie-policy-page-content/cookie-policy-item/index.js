import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import CookiePolicySubItem from "../cookie-policy-subitem";

const CookiePolicyItem = ({ className, title, subItems }) => {
  return (
    <div className={cn("privacy-policy-item", className)}>
      <h2 className="privacy-policy-item__title">{title}</h2>
      {subItems &&
        subItems.map((subItem, index) => (
          <CookiePolicySubItem key={index} {...subItem} />
        ))}
    </div>
  );
};
CookiePolicyItem.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  subItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
    })
  ),
};

export default CookiePolicyItem;
