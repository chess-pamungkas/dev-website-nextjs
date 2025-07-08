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
    let pos;
    if (invert) {
      pos = clamp(sliderWidth - (x - rect.left), 0, sliderWidth);
    } else {
      pos = clamp(x - rect.left, 0, sliderWidth);
    }
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
  // For RTL, thumb and tracks are mirrored to match production
  let filledTrackStyle, unfilledTrackStyle, thumbLeft;
  let filledTrackClass, unfilledTrackClass;
  if (invert) {
    thumbLeft = sliderWidth - thumbPos;
    // In RTL: filled (orange) is from thumb to right, unfilled (black) is from left to thumb
    filledTrackStyle = {
      position: "absolute",
      left: thumbLeft,
      width: sliderWidth - thumbLeft,
      height: "7px",
      background: "#FF3C00", // orange
      zIndex: 0,
      top: "50%",
      transform: "translateY(-50%)",
    };
    unfilledTrackStyle = {
      position: "absolute",
      left: 0,
      width: thumbLeft,
      height: "7px",
      background: "#191919", // black-secondary
      zIndex: 0,
      top: "50%",
      transform: "translateY(-50%)",
    };
    filledTrackClass =
      "partners-income__slider-track partners-income__slider-track-0";
    unfilledTrackClass =
      "partners-income__slider-track partners-income__slider-track-1";
  } else {
    thumbLeft = thumbPos;
    // In LTR: filled (orange) is from left to thumb, unfilled (black) is from thumb to right
    filledTrackStyle = {
      position: "absolute",
      left: 0,
      width: thumbLeft,
      height: "7px",
      background: "#FF3C00", // orange
      zIndex: 0,
      top: "50%",
      transform: "translateY(-50%)",
    };
    unfilledTrackStyle = {
      position: "absolute",
      left: thumbLeft,
      width: sliderWidth - thumbLeft,
      height: "7px",
      background: "#191919", // black-secondary
      zIndex: 0,
      top: "50%",
      transform: "translateY(-50%)",
    };
    filledTrackClass =
      "partners-income__slider-track partners-income__slider-track-0";
    unfilledTrackClass =
      "partners-income__slider-track partners-income__slider-track-1";
  }

  // For RTL, do NOT reverse marks; just mirror their positions
  const marksToRender = marks;

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
      {/* Tracks: assign classes dynamically for correct DOM order */}
      <div className={filledTrackClass} style={filledTrackStyle} />
      <div className={unfilledTrackClass} style={unfilledTrackStyle} />
      {/* Marks */}
      {marksToRender.map((mark, idx) => {
        const markPos = getPosition(mark);
        const markLeft = invert ? sliderWidth - markPos : markPos;
        return (
          <div
            key={`mark-${mark}-${idx}`}
            className={markClassName}
            style={{
              position: "absolute",
              left: markLeft,
              top: 0,
              width: 0,
              zIndex: 2,
              pointerEvents: "none",
              textAlign: invert ? "right" : "left",
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
                left: invert ? "auto" : 0,
                right: invert ? 0 : "auto",
                textAlign: invert ? "right" : "left",
                direction: invert ? "rtl" : "ltr",
              }}
            >
              {mark}
            </span>
          </div>
        );
      })}
      {/* Thumb */}
      <div
        className={
          "partners-income__slider-thumb partners-income__slider-thumb-0"
        }
        tabIndex={0}
        role="slider"
        aria-orientation="horizontal"
        aria-valuenow={currentValue}
        aria-valuemin={minValue}
        aria-valuemax={maxValue}
        style={{
          position: "absolute",
          left: thumbLeft,
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
