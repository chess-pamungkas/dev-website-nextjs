import React from "react";
import { animated } from "react-spring";
import cn from "classnames";
import PropTypes from "prop-types";
import ButtonLink from "../shared/button-link";
import ButtonPopup from "../shared/button-popup";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";
import { DIR_LTR, DIR_RTL } from "../../helpers/constants";

const Promotion = ({
  className,
  children,
  sectionRef,
  bgAnimationConfig,
  textAnimationConfig,
  image,
  btnTitle,
  link,
  btnOnClick,
  isReverseOrder = false,
  isRedPalette = false,
}) => {
  const isRTL = useRtlDirection();

  const getButton = () => {
    if (btnOnClick) {
      return (
        <ButtonPopup
          onClick={btnOnClick}
          className={cn("promotion__btn", {
            "promotion__btn--red": isRedPalette,
            "promotion__btn--black": !isRedPalette,
          })}
        >
          {btnTitle}
        </ButtonPopup>
      );
    }

    if (link) {
      return (
        <ButtonLink
          link={link}
          className={cn("promotion__btn", {
            "promotion__btn--red": isRedPalette,
            "promotion__btn--black": !isRedPalette,
          })}
        >
          {btnTitle}
        </ButtonLink>
      );
    }

    return null;
  };

  return (
    <section
      ref={sectionRef}
      className={cn("promotion", className, {
        "promotion--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div
        className={cn("promotion__wrapper", {
          "promotion__wrapper--reverse": isReverseOrder,
        })}
      >
        <div className="promotion__block">
          <div className="promotion__description">
            <animated.p style={textAnimationConfig} className="promotion__text">
              {children}
            </animated.p>
          </div>
          {btnTitle && getButton()}
        </div>
        <div className={cn("promotion__block", "promotion__block--flexed")}>
          <img
            src={typeof image === "string" ? image : image?.src}
            alt=""
            className="promotion__img"
          />
        </div>
      </div>
      {bgAnimationConfig ? (
        <animated.div
          className={cn("promotion__bg")}
          style={bgAnimationConfig}
        />
      ) : (
        <div className="promotion__bg" />
      )}
    </section>
  );
};

Promotion.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  sectionRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  bgAnimationConfig: PropTypes.object,
  textAnimationConfig: PropTypes.object,
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  btnTitle: PropTypes.string,
  link: PropTypes.string,
  btnOnClick: PropTypes.func,
  isReverseOrder: PropTypes.bool,
  isRedPalette: PropTypes.bool,
};
export default Promotion;
