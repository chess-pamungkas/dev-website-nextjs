import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";
import { DIR_LTR, DIR_RTL } from "../../helpers/constants";

const VideoBanner = ({ className, video, title, subtitle }) => {
  const isRTL = useRtlDirection();

  return (
    <section
      className={cn("video-banner", className, {
        "video-banner--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <video className="video-banner__video" autoPlay loop muted>
        <source src={video} type="video/mp4" />
      </video>
      <div className="video-banner__wrapper">
        <h2 className="video-banner__title">{title}</h2>
        <span className="video-banner__subtitle">{subtitle}</span>
      </div>
    </section>
  );
};

VideoBanner.propTypes = {
  className: PropTypes.string,
  video: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
};

VideoBanner.defaultProps = {
  className: "",
};

export default VideoBanner;
