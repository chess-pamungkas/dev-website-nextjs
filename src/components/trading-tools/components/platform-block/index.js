import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { animated } from "react-spring";

const PlatformBlock = ({ className, icon, title, animationStyle }) => {
  return (
    <animated.div
      style={animationStyle}
      className={cn("platform-block", className)}
    >
      <img
        src={typeof icon === "string" ? icon : icon?.src}
        alt={title}
        className="platform-block__img"
      />
    </animated.div>
  );
};

PlatformBlock.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  title: PropTypes.string.isRequired,
  animationStyle: PropTypes.object,
};
export default PlatformBlock;
