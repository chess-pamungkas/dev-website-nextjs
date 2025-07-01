import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import PrivacyPolicySubItem from "../privacy-policy-subitem";

const PrivacyPolicyItem = ({ className, title, subItems }) => {
  return (
    <div className={cn("privacy-policy-item", className)}>
      <h2 className="privacy-policy-item__title">{title}</h2>
      {subItems &&
        subItems.map((subItem) => (
          <PrivacyPolicySubItem key={subItem.id} {...subItem} />
        ))}
    </div>
  );
};

PrivacyPolicyItem.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  subItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      text: PropTypes.string,
    })
  ),
};

export default PrivacyPolicyItem;
