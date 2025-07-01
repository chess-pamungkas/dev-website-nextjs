import React from "react";
import ReactSlider from "react-slider";
import PropTypes from "prop-types";

const Slider = ({
  className,
  thumbClassName,
  trackClassName,
  markClassName,
  minValue,
  maxValue,
  marks,
  currentValue,
  onChange,
  renderMark,
  invert = false,
}) => {
  const handleRenderMark = (mark, index) => {
    if (renderMark) {
      return renderMark(mark, index);
    } else {
      return <div key={`mark-${mark}-${index}`}>{mark}</div>;
    }
  };

  return (
    <ReactSlider
      className={className}
      thumbClassName={thumbClassName}
      trackClassName={trackClassName}
      markClassName={markClassName}
      defaultValue={0}
      value={currentValue}
      min={minValue}
      max={maxValue}
      marks={marks}
      onChange={(value) => onChange(value)}
      renderMark={handleRenderMark}
      invert={invert}
    />
  );
};

Slider.propTypes = {
  className: PropTypes.string,
  thumbClassName: PropTypes.string,
  trackClassName: PropTypes.string,
  markClassName: PropTypes.string,
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  marks: PropTypes.arrayOf(PropTypes.number),
  currentValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  renderMark: PropTypes.func,
  invert: PropTypes.bool,
};
export default Slider;
