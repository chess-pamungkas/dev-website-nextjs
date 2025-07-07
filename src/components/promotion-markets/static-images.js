import React from "react";
import PropTypes from "prop-types";
import Lottie from "lottie-react";
import { useWindowSize } from "../../helpers/hooks/use-window-size";

export const StaticImages = ({
  image,
  height,
  animation,
  animationData,
  animationPath,
}) => {
  const { isMobile, isMD } = useWindowSize();

  let animationHeight = 300;
  if (isMobile) {
    animationHeight = 120;
  }
  if (isMD) {
    animationHeight = 200;
  }

  // Determine which animation prop to use
  const lottieProps = {};
  if (animationData) {
    lottieProps.animationData = animationData;
  } else if (animationPath) {
    lottieProps.path = animationPath;
  } else if (animation) {
    // Handle legacy animation prop - check if it's a string path or JSON object
    if (typeof animation === "string") {
      lottieProps.path = animation;
    } else {
      lottieProps.animationData = animation;
    }
  }

  return (
    <div
      className="marketing-static-images"
      style={{ backgroundImage: `url(${image})`, height }}
    >
      <Lottie
        className="promotion-markets__svg"
        {...lottieProps}
        style={{ height: animationHeight }}
      />
    </div>
  );
};

StaticImages.propTypes = {
  image: PropTypes.string.isRequired,
  height: PropTypes.number.isRequired,
  animation: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  animationData: PropTypes.object,
  animationPath: PropTypes.string,
};
export default StaticImages;
