import React from "react";
import ErrorMessage from "../error-message";
import cn from "classnames";
import PropTypes from "prop-types";

const Checkbox = ({
  title,
  note,
  text,
  name,
  value,
  isError,
  errorMessage,
  ...props
}) => {
  return (
    <div className={cn("input-wrapper")}>
      {title && <span className="input-title">{title}</span>}
      {note && <span className="input-note">{note}</span>}
      <div className="checkbox-wrapper">
        <input
          className="input-checkbox"
          type="checkbox"
          name={name}
          value={value}
          {...props}
        />
        <p className="checkbox-text">{text}</p>
      </div>
      {isError && <ErrorMessage text={errorMessage} />}
    </div>
  );
};

Checkbox.propTypes = {
  title: PropTypes.string,
  note: PropTypes.string,
  text: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  isError: PropTypes.bool,
  errorMessage: PropTypes.string,
};
export default Checkbox;
