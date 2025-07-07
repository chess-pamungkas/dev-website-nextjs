import React, { useRef, useState, useLayoutEffect, useCallback } from "react";
import PropTypes from "prop-types";

// Utility to clamp value
const clamp = (val, min, max) => Math.max(min, Math.min(val, max));

const CustomProductionSlider = ({
  minValue,
  maxValue,
  marks = [],
  currentValue,
  onChange,
  step = 1,
  className = "",
  trackClassName = "partners-income__slider-track",
  thumbClassName = "partners-income__slider-thumb",
  markClassName = "partners-income__slider-mark",
  renderMark,
  invert = false,
}) => {
  const sliderRef = useRef(null);
  const [sliderWidth, setSliderWidth] = useState(0);

  // Update slider width on mount and resize
  useLayoutEffect(() => {
    const updateWidth = () => {
      if (sliderRef.current) {
        setSliderWidth(sliderRef.current.offsetWidth);
      }
    };
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  // Calculate pixel position for a value
  const getPosition = useCallback(
    (val) => {
      if (maxValue === minValue) return 0;
      const percent = (val - minValue) / (maxValue - minValue);
      return percent * sliderWidth;
    },
    [minValue, maxValue, sliderWidth]
  );

  // Handle drag
  const handleDrag = (e) => {
    if (!sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    let x = e.type.startsWith("touch") ? e.touches[0].clientX : e.clientX;
    let pos = clamp(x - rect.left, 0, sliderWidth);
    let percent = pos / sliderWidth;
    let value =
      Math.round((minValue + percent * (maxValue - minValue)) / step) * step;
    value = clamp(value, minValue, maxValue);
    onChange(value);
  };

  // Mouse/touch event handlers
  const startDrag = (e) => {
    e.preventDefault();
    handleDrag(e);
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("touchmove", handleDrag);
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchend", stopDrag);
  };
  const stopDrag = () => {
    window.removeEventListener("mousemove", handleDrag);
    window.removeEventListener("touchmove", handleDrag);
    window.removeEventListener("mouseup", stopDrag);
    window.removeEventListener("touchend", stopDrag);
  };

  // Allow clicking/dragging anywhere on the slider (not just the thumb)
  const handleTrackMouseDown = (e) => {
    // Only respond to left mouse button
    if (e.type === "mousedown" && e.button !== 0) return;
    startDrag(e);
  };

  // Track positions
  const thumbPos = getPosition(currentValue);
  const leftTrackWidth = invert ? sliderWidth - thumbPos : thumbPos;
  const rightTrackWidth = invert ? thumbPos : sliderWidth - thumbPos;

  return (
    <div
      className={className}
      ref={sliderRef}
      style={{
        position: "relative",
        // width: "100%",
        direction: invert ? "rtl" : "ltr",
      }}
      onMouseDown={handleTrackMouseDown}
      onTouchStart={handleTrackMouseDown}
    >
      {/* Left (filled) track */}
      <div
        className={`${trackClassName} ${trackClassName}-0`}
        style={{
          position: "absolute",
          left: invert ? thumbPos : 0,
          right: invert ? 0 : undefined,
          width: leftTrackWidth,
          height: "7px",
          background: "#FF3C00", // orange
          zIndex: 0,
        }}
      />
      {/* Right (unfilled) track */}
      <div
        className={`${trackClassName} ${trackClassName}-1`}
        style={{
          position: "absolute",
          left: invert ? 0 : thumbPos,
          right: invert ? thumbPos : undefined,
          width: rightTrackWidth,
          height: "7px",
          background: "#191919", // black-secondary
          zIndex: 0,
        }}
      />
      {/* Marks */}
      {marks.map((mark, idx) => {
        const markPos = getPosition(mark);
        return (
          <div
            key={`mark-${mark}-${idx}`}
            className={markClassName}
            style={{
              position: "absolute",
              left: invert ? sliderWidth - markPos : markPos,
              top: 0,
              width: 0,
              zIndex: 2,
              pointerEvents: "none",
            }}
          >
            <span
              className={`${markClassName}-v-line`}
              style={{
                position: "absolute",
                left: 0,
              }}
            />
            <span
              className={`${markClassName}-number`}
              style={{
                position: "absolute",
                left: 0,
              }}
            >
              {mark}
            </span>
          </div>
        );
      })}
      {/* Thumb */}
      <div
        className={`${thumbClassName} ${thumbClassName}-0`}
        tabIndex={0}
        role="slider"
        aria-orientation="horizontal"
        aria-valuenow={currentValue}
        aria-valuemin={minValue}
        aria-valuemax={maxValue}
        style={{
          position: "absolute",
          left: invert ? sliderWidth - thumbPos : thumbPos,
          top: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 3,
          touchAction: "none",
        }}
      />
    </div>
  );
};

CustomProductionSlider.propTypes = {
  minValue: PropTypes.number.isRequired,
  maxValue: PropTypes.number.isRequired,
  marks: PropTypes.arrayOf(PropTypes.number),
  currentValue: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
  step: PropTypes.number,
  className: PropTypes.string,
  trackClassName: PropTypes.string,
  thumbClassName: PropTypes.string,
  markClassName: PropTypes.string,
  renderMark: PropTypes.func,
  invert: PropTypes.bool,
};

export default CustomProductionSlider;
