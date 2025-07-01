import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

const PrivacyPolicySubItem = ({ className, text, subItems }) => {
  return (
    <div className={cn("privacy-policy-subitem", className)}>
      <p className="privacy-policy-subitem__text">{text}</p>
      {subItems &&
        subItems.map((subItem, index) => (
          <p key={index} className="privacy-policy-subitem__subitem-text">
            {subItem.text}
          </p>
        ))}
    </div>
  );
};

PrivacyPolicySubItem.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  subItems: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

export default PrivacyPolicySubItem;
