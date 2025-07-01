import React from "react";
import PropTypes from "prop-types";
import ErrorMessage from "../error-message";

const Textarea = ({ title, name, value, isError, errorMessage, ...props }) => {
  const ROWS_COUNT = 4;
  return (
    <div className="input-wrapper">
      {title && <span className="input-title">{title}</span>}
      <textarea
        className="input textarea"
        name={name}
        value={value}
        rows={ROWS_COUNT}
        {...props}
      />
      {isError && <ErrorMessage text={errorMessage} />}
    </div>
  );
};

Textarea.propTypes = {
  title: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};
export default Textarea;
