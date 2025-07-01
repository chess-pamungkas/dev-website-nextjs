import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import InternalLink from "../internal-link";

const ButtonLink = React.forwardRef(({ children, className, link }, ref) => {
  if (typeof link !== "string") {
    console.warn('ButtonLink: "link" prop is not a string:', link);
  }
  if (String(link).startsWith("http") && String(link).includes("portal.")) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className={cn("button-link", className)}
        ref={ref}
      >
        {children}
      </a>
    );
  } else {
    return (
      <InternalLink
        to={link}
        className={cn("button-link", className)}
        ref={ref}
      >
        {children}
      </InternalLink>
    );
  }
});

// Setting the displayName for the component
ButtonLink.displayName = "ButtonLink";

ButtonLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  link: PropTypes.string.isRequired,
};

export default ButtonLink;
