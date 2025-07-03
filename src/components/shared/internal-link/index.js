import React, { useContext } from "react";
import Link from "next/link";
import cn from "classnames";
import PropTypes from "prop-types";
import LanguageContext from "../../../context/language-context";

const InternalLink = ({ children, className, to, onClick }) => {
  const { selectedLanguage } = useContext(LanguageContext) || {};

  if (!to) {
    console.error('InternalLink: "to" prop is missing or undefined');
    return <span className={cn(className)}>{children}</span>;
  }

  if (typeof to !== "string") {
    console.error('InternalLink: "to" prop is not a string:', to, typeof to);
    return <span className={cn(className)}>{children}</span>;
  }

  // If link is external, do not modify
  if (String(to).startsWith("http")) {
    return (
      <a href={to} className={cn(className)} onClick={onClick}>
        {children}
      </a>
    );
  }

  // If link already starts with a language code, do not modify
  if (/^\/[a-z]{2}(\/|$)/.test(to)) {
    return (
      <Link href={to} className={cn(className)} onClick={onClick}>
        {children}
      </Link>
    );
  }

  // Prepend language prefix if not English and not already present
  let processedTo = to;
  if (selectedLanguage && selectedLanguage.id && selectedLanguage.id !== "en") {
    // Ensure no double slashes
    processedTo = `/${selectedLanguage.id}${
      to.startsWith("/") ? to : "/" + to
    }`.replace(/\/\//g, "/");
  }

  return (
    <Link href={processedTo} className={cn(className)} onClick={onClick}>
      {children}
    </Link>
  );
};

InternalLink.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  to: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};
export default InternalLink;
