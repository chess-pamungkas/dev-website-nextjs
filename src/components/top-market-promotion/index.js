import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import ButtonLink from "../shared/button-link";
import ButtonPopup from "../shared/button-popup";
import AnchorLink from "react-anchor-link-smooth-scroll";
import Lottie from "lottie-react";
import ReactPlayer from "react-player";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";
import { DIR_RTL, DIR_LTR } from "../../helpers/constants";

const TopMarketPromotion = ({
  className,
  children,
  note,
  image,
  btnClassName,
  btnTitle,
  btnOnClick,
  link,
  btnClassName2,
  btnTitle2,
  link2,
  isDocumentLink = false,
  isAnchorLink = false,
  isButtonAndLink = false,
  isLottieImage = false,
  isVideo = false,
  videoSettings = {},
  lottieStyle = {},
  content,
  id,
}) => {
  const isRTL = useRtlDirection();

  const getButton = () => {
    switch (true) {
      case isDocumentLink && link:
        return (
          <a
            className={cn(
              "button-link",
              "top-market-promotion__btn",
              btnClassName
            )}
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            {btnTitle}
          </a>
        );
      case isAnchorLink && link:
        return (
          <AnchorLink
            href={link}
            className={cn(
              "button-link",
              "button-link--red",
              "top-market-promotion__btn",
              btnClassName
            )}
          >
            {btnTitle}
          </AnchorLink>
        );
      case isButtonAndLink:
        return (
          <div className="top-market-promotion__btn-wrapper">
            <ButtonLink
              link={link}
              className={cn(
                "button-link--red",
                "top-market-promotion__btn",
                btnClassName
              )}
            >
              {btnTitle}
            </ButtonLink>
            <ButtonLink
              link={link2}
              className={cn(
                "button-link--without-bg",
                "top-market-promotion__btn--secondary",
                btnClassName2
              )}
            >
              {btnTitle2}
            </ButtonLink>
          </div>
        );

      case Boolean(btnOnClick):
        return (
          <ButtonPopup
            onClick={btnOnClick}
            className={cn(
              "button-link",
              "button-link--red",
              "top-market-promotion__btn",
              btnClassName
            )}
          >
            {btnTitle}
          </ButtonPopup>
        );

      default:
        if (link) {
          return (
            <ButtonLink
              link={link}
              className={cn(
                "button-link--red",
                "top-market-promotion__btn",
                btnClassName
              )}
            >
              {btnTitle}
            </ButtonLink>
          );
        }
        return (
          <ButtonPopup
            onClick={() => {}}
            className={cn(
              "button-link",
              "button-link--red",
              "top-market-promotion__btn",
              btnClassName
            )}
          >
            {btnTitle}
          </ButtonPopup>
        );
    }
  };

  const getImage = () => {
    switch (true) {
      case isVideo:
        return <ReactPlayer url={image} {...videoSettings} />;
      case isLottieImage:
        return (
          <Lottie
            className="top-market-promotion__img--lottie"
            {...(typeof image === "string"
              ? { path: image }
              : { animationData: image })}
            style={lottieStyle}
          />
        );
      default:
        return (
          <img
            src={typeof image === "string" ? image : image?.src}
            alt=""
            className="top-market-promotion__img"
          />
        );
    }
  };

  return (
    <section
      className={cn("top-market-promotion", className, {
        "top-market-promotion--rtl": isRTL,
      })}
      id={id}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="container">
        <div className={cn("top-market-promotion__wrapper")}>
          <div className="top-market-promotion__block">
            <div className="top-market-promotion__description">
              <p className="top-market-promotion__text">{children}</p>
              {note && <div className="top-market-promotion__note">{note}</div>}
            </div>
            {btnTitle && getButton()}
            {content && (
              <div className="top-market-promotion__content">{content}</div>
            )}
          </div>
          {image && (
            <div
              className={cn(
                "top-market-promotion__block",
                "top-market-promotion__block--flexed"
              )}
            >
              {getImage()}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

TopMarketPromotion.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  note: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  image: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  btnClassName: PropTypes.string,
  btnTitle: PropTypes.string,
  btnOnClick: PropTypes.func,
  link: PropTypes.string,
  btnClassName2: PropTypes.string,
  btnTitle2: PropTypes.string,
  link2: PropTypes.string,
  isDocumentLink: PropTypes.bool,
  isAnchorLink: PropTypes.bool,
  isButtonAndLink: PropTypes.bool,
  isLottieImage: PropTypes.bool,
  isVideo: PropTypes.bool,
  videoSettings: PropTypes.object,
  lottieStyle: PropTypes.object,
  content: PropTypes.node,
  id: PropTypes.string,
};
export default TopMarketPromotion;
