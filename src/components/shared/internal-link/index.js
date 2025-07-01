import React from "react";
import Link from "next/link";
import cn from "classnames";
import PropTypes from "prop-types";
import { modifyInternalLinkForLP } from "../../../helpers/services/modify-internal-links";

const InternalLink = ({ children, className, to, onClick }) => {
  // Better error handling for the 'to' prop
  if (!to) {
    console.error('InternalLink: "to" prop is missing or undefined');
    return <span className={cn(className)}>{children}</span>;
  }

  if (typeof to !== "string") {
    console.error('InternalLink: "to" prop is not a string:', to, typeof to);
    return <span className={cn(className)}>{children}</span>;
  }

  const processedTo = modifyInternalLinkForLP(to);

  if (String(processedTo).startsWith("http")) {
    return (
      <a href={processedTo} className={cn(className)} onClick={onClick}>
        {children}
      </a>
    );
  } else {
    return (
      <Link href={processedTo} className={cn(className)} onClick={onClick}>
        {children}
      </Link>
    );
  }
};

InternalLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
export default InternalLink;
