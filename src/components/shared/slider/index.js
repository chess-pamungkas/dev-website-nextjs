import * as RadixSlider from "@radix-ui/react-slider";
import PropTypes from "prop-types";
import React from "react";

const Slider = ({
  className,
  thumbClassName,
  trackClassName,
  markClassName,
  minValue,
  maxValue,
  marks = [],
  currentValue,
  onChange,
  renderMark,
  step = 1,
  disabled = false,
  invert = false,
}) => {
  // Calculate mark positions (0-1 range for Radix)
  const getMarkPosition = (mark) => {
    if (maxValue === minValue) return 0;
    return (mark - minValue) / (maxValue - minValue);
  };

  return (
    <div
      className={className}
      style={{
        direction: invert ? "rtl" : "ltr",
        position: "relative",
        width: "100%",
      }}
    >
      <RadixSlider.Root
        min={minValue}
        max={maxValue}
        step={step}
        value={[currentValue]}
        onValueChange={([val]) => onChange(val)}
        disabled={disabled}
        style={{ width: "100%" }}
      >
        <RadixSlider.Track className={trackClassName || "slider-track"}>
          <RadixSlider.Range className="slider-range" />
        </RadixSlider.Track>
        <RadixSlider.Thumb className={thumbClassName || "slider-thumb"} />
      </RadixSlider.Root>
      {/* Render marks as siblings to the slider, absolutely positioned */}
      {marks &&
        marks.length > 0 &&
        marks.map((mark, idx) => {
          const left = `${getMarkPosition(mark) * 100}%`;
          const markProps = {
            key: `mark-${mark}-${idx}`,
            className: markClassName || "slider-mark",
            style: {
              position: "absolute",
              left,
              top: "0", // Adjust as needed for vertical alignment
              pointerEvents: "none",
              width: "0",
              zIndex: 1, // Lower z-index so track/thumb appear above
            },
          };
          return renderMark ? (
            renderMark(markProps, idx, mark)
          ) : (
            <div {...markProps}>{mark}</div>
          );
        })}
    </div>
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
  step: PropTypes.number,
  disabled: PropTypes.bool,
  invert: PropTypes.bool,
};
export default Slider;
