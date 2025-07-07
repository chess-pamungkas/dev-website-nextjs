import React, { useCallback } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import ReactPlayer from "react-player";
import { useWindowSize } from "../../../../helpers/hooks/use-window-size";
import { getYoutubeLink } from "../helpers";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";
import { DIR_LTR, DIR_RTL } from "../../../../helpers/constants";

const VideoBlock = ({ className, video }) => {
  const { isMobile, isMD, isLG, isXL } = useWindowSize();
  const isRTL = useRtlDirection();

  const getVideoStyles = useCallback(() => {
    switch (true) {
      case isXL:
        return { width: "359px", height: "202px" };
      case isLG:
        return { width: "359px", height: "202px" };
      case isMD:
        return { width: "274px", height: "155px" };
      case isMobile:
        return { width: "150px", height: "85px" };
      default:
        return { width: "359px", height: "202px" };
    }
  }, [isMobile, isMD, isLG, isXL]);

  return (
    <div
      className={cn("video-block", className)}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <ReactPlayer
        url={getYoutubeLink(video.resourceId.videoId)}
        config={{
          youtube: {
            playerVars: {
              origin: window.location.hostname,
            },
          },
        }}
        {...getVideoStyles()}
      />
      <p className="video-block__title">{video.title}</p>
      <p className="video-block__description">{video.description}</p>
    </div>
  );
};

VideoBlock.propTypes = {
  className: PropTypes.string,
  video: PropTypes.string.isRequired,
};

export default VideoBlock;
