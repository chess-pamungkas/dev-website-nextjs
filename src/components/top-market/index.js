import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import ButtonLink from "../shared/button-link";
import ButtonPopup from "../shared/button-popup";
import AnchorLink from "react-anchor-link-smooth-scroll";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";
import { DIR_LTR, DIR_RTL } from "../../helpers/constants";

const TopMarket = ({
  className,
  children,
  title,
  isTitleUppercase = false,
  isChildrenHasSmallSize = false,
  image,
  btn1Title,
  link1,
  btn2Title,
  link2,
  btn3Title,
  link3,
  btn4Title,
  link4,
  subImageTemplate,
  isAnchorLink1 = false,
  isAnchorLink2 = false,
  isAnchorLink3 = false,
  isAnchorLink4 = false,
  btnClassName1,
  btnClassName2,
  btnClassName3,
  btnClassName4,
  btnOnClick1,
  btnOnClick2,
  btnOnClick3,
  btnOnClick4,
}) => {
  const isRTL = useRtlDirection();

  const getButton = (
    btnTitle,
    link,
    isAnchorLink,
    btnClassName,
    btnOnClick
  ) => {
    if (btnOnClick) {
      return (
        <ButtonPopup
          onClick={btnOnClick}
          className={cn("button-link", "top-market__btn", btnClassName)}
        >
          {btnTitle}
        </ButtonPopup>
      );
    }

    if (isAnchorLink) {
      return (
        <AnchorLink
          href={link}
          className={cn("button-link", "top-market__btn", btnClassName)}
        >
          {btnTitle}
        </AnchorLink>
      );
    }

    if (link) {
      return (
        <ButtonLink link={link} className={cn("top-market__btn", btnClassName)}>
          {btnTitle}
        </ButtonLink>
      );
    }

    return (
      <ButtonPopup
        onClick={btnOnClick}
        className={cn("button-link", "top-market__btn", btnClassName)}
      >
        {btnTitle}
      </ButtonPopup>
    );
  };

  return (
    <section
      className={cn("top-market", className, {
        "top-market--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="container">
        <div className="top-market__wrapper">
          <div className="top-market__block">
            {title && (
              <h2
                className={cn("top-market__title", {
                  "top-market__title--uppercase": isTitleUppercase,
                })}
              >
                {title}
              </h2>
            )}
            <div className="top-market__description">
              <p
                className={cn("top-market__text", {
                  "top-market__text--small": isChildrenHasSmallSize,
                })}
              >
                {children}
              </p>
            </div>
            {(btn1Title || btn2Title || btn3Title) && (
              <div className="top-market__btn-wrapper">
                {btn1Title &&
                  getButton(
                    btn1Title,
                    link1,
                    isAnchorLink1,
                    cn("top-market__btn--black", btnClassName1),
                    btnOnClick1
                  )}
                {btn2Title &&
                  getButton(
                    btn2Title,
                    link2,
                    isAnchorLink2,
                    cn("top-market__btn--white", btnClassName2),
                    btnOnClick2
                  )}
                {btn3Title &&
                  getButton(
                    btn3Title,
                    link3,
                    isAnchorLink3,
                    cn("top-market__btn--white", btnClassName3),
                    btnOnClick3
                  )}
                {btn4Title &&
                  getButton(
                    btn4Title,
                    link4,
                    isAnchorLink4,
                    cn("top-market__btn--white", btnClassName4),
                    btnOnClick4
                  )}
              </div>
            )}
          </div>
          <div className={cn("top-market__block", "top-market__block--flexed")}>
            <img
              src={typeof image === "string" ? image : image?.src}
              alt=""
              className="top-market__img"
            />
            {subImageTemplate && subImageTemplate}
          </div>
        </div>
      </div>
    </section>
  );
};

TopMarket.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  isTitleUppercase: PropTypes.bool,
  isChildrenHasSmallSize: PropTypes.bool,
  image: PropTypes.string,
  btn1Title: PropTypes.string,
  link1: PropTypes.string,
  btn2Title: PropTypes.string,
  link2: PropTypes.string,
  btn3Title: PropTypes.string,
  link3: PropTypes.string,
  btn4Title: PropTypes.string,
  link4: PropTypes.string,
  subImageTemplate: PropTypes.node,
  isAnchorLink1: PropTypes.bool,
  isAnchorLink2: PropTypes.bool,
  isAnchorLink3: PropTypes.bool,
  isAnchorLink4: PropTypes.bool,
  btnClassName1: PropTypes.string,
  btnClassName2: PropTypes.string,
  btnClassName3: PropTypes.string,
  btnClassName4: PropTypes.string,
  btnOnClick1: PropTypes.func,
  btnOnClick2: PropTypes.func,
  btnOnClick3: PropTypes.func,
  btnOnClick4: PropTypes.func,
};
export default TopMarket;
