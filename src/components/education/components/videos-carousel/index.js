import React, { useCallback } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { stringTransformToKebabCase } from "../../../../helpers/services/string-service";
import VideoBlock from "../video-block";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  DIR_LTR,
  DIR_RTL,
  LG_MAX_WIDTH,
  MD_MAX_WIDTH,
  SM_MAX_WIDTH,
} from "../../../../helpers/constants";
import { useScreenWidth } from "./use-screen-width";
import { ArrowNext } from "../../../shared/icons";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";

const VideosCarousel = ({ className, videos }) => {
  const isRTL = useRtlDirection();
  const responsiveSettings = useScreenWidth();

  const CarouselNextArrow = (sliderProps) => {
    const { onClick } = sliderProps;
    return (
      <button
        onClick={onClick}
        className={cn("videos-carousel__arrow", {
          "videos-carousel__arrow--rtl": isRTL,
        })}
      >
        <ArrowNext className="videos-carousel__arrow-icon" />
      </button>
    );
  };

  const getSettings = useCallback(() => {
    return {
      dots: false,
      infinite: false,
      nextArrow: <CarouselNextArrow />,
      ...responsiveSettings.xl,
      responsive: [
        {
          breakpoint: LG_MAX_WIDTH,
          settings: responsiveSettings.lg,
        },
        {
          breakpoint: MD_MAX_WIDTH,
          settings: responsiveSettings.md,
        },
        {
          breakpoint: SM_MAX_WIDTH,
          settings: responsiveSettings.sm,
        },
      ],
    };
  }, [responsiveSettings]);

  return (
    <div
      className={cn("videos-carousel", className)}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      {videos && (
        <Slider {...getSettings()}>
          {videos.map(({ snippet: video }) => (
            <VideoBlock
              key={`video-${stringTransformToKebabCase(video.title)}`}
              video={video}
            />
          ))}
        </Slider>
      )}
    </div>
  );
};

VideosCarousel.propTypes = {
  className: PropTypes.string,
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default VideosCarousel;
