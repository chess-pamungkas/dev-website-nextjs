import React from "react";
import PropTypes from "prop-types";
export const TableTitle = ({ title, subtitle }) => (
  <div className="table-title-wrapper">
    <h4 className="table-title">{title}</h4>
    {subtitle && <span className="table-title__subtitle">{subtitle}</span>}
  </div>
);

TableTitle.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
};
export const TableTip = ({ tip }) => (
  <div className="tip">
    <p className="tip__text">{tip}</p>
  </div>
);

TableTip.propTypes = {
  tip: PropTypes.object.isRequired,
};
