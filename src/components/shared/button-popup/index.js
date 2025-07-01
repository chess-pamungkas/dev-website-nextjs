import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

const ButtonPopup = React.forwardRef(
  ({ children, className, onClick }, ref) => {
    const handleClick = (e) => {
      e.preventDefault();
      onClick(); // Call function onClick to display popup
    };

    return (
      <button
        type="button"
        rel="noopener noreferrer"
        className={cn("button-link", className)}
        onClick={handleClick}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

// Setting the displayName for the component
ButtonPopup.displayName = "ButtonPopup";

ButtonPopup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func.isRequired,
};

export default ButtonPopup;
