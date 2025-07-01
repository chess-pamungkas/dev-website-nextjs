import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";
import { DIR_LTR, DIR_RTL } from "../../../helpers/constants";
import InternalLink from "../internal-link";

const SystemInfoComponent = ({
  className,
  title,
  subTitle,
  image,
  goBackBtnTitle,
}) => {
  const isRTL = useRtlDirection();

  return (
    <div
      className={cn(className, "system-info", {
        "system-info--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="system-info__img-container">
        <img
          src={typeof image === "string" ? image : image?.src}
          alt=""
          className="system-info__img"
        />
      </div>
      <div className="system-info__title">{title}</div>
      <div className="system-info__subtitle">{subTitle}</div>
      <InternalLink
        to="/"
        className={cn("button-link", "system-info__go-back-btn")}
      >
        {goBackBtnTitle}
      </InternalLink>
    </div>
  );
};

SystemInfoComponent.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  goBackBtnTitle: PropTypes.string.isRequired,
};
export default SystemInfoComponent;
