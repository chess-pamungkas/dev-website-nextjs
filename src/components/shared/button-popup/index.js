import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";

const ButtonPopup = React.forwardRef(
  ({ children, className, onClick }, ref) => {
    const handleClick = (e) => {
      e.preventDefault();
      if (typeof onClick === "function") {
        onClick(); // Call function onClick to display popup
      } else {
        console.warn(
          "ButtonPopup: onClick prop is not a function or not provided"
        );
      }
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
  onClick: PropTypes.func,
};

export default ButtonPopup;
