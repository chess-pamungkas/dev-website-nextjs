import React, { useEffect, useRef, useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import Lottie from "lottie-react";
import {
  DIR_LTR,
  DIR_RTL,
  ShowRegistrationPopup,
} from "../../helpers/constants";
import ButtonPopup from "../shared/button-popup";
import {
  OPACITY_0,
  OPACITY_1,
  TITLES_ANIMATION_DEFAULT_FROM_CONFIG,
} from "../../helpers/animation.config";
import { animated, easings, useSpring } from "react-spring";
import { useIntersectionObserver } from "../../helpers/hooks/use-intersection-observer";
import { scrollTo } from "../../helpers/scroll-to";
import { isBrowser } from "../../helpers/services/is-browser";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";
import { setLangParam } from "../../helpers/services/language-service";

const PromotionMarkets = ({
  className,
  animation,
  animationStyle,
  children,
  btnTitle,
}) => {
  const isRTL = useRtlDirection();
  let lastTouchPointY = 0;
  const promoRef = useRef();
  const scrollCount = children.length;
  const langParam = setLangParam(); // Get the language parameter
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const handleShowRegistrationPopup = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  const autoScrollPromoRef = useIntersectionObserver(promoRef, {
    threshold: 0.2,
    freezeOnceVisible: false,
  });

  const animationToStep1Config = {
    ...OPACITY_1,
    top: "0",
    config: {
      duration: 1000,
    },
  };

  const animationToStep2Config = {
    ...OPACITY_0,
    top: "40px",
    config: {
      duration: 1000,
    },
  };

  const [backgroundPositionX, setBackgroundPositionX] = useState(0);
  const [currentScroll, setCurrentScroll] = useState(0);
  const [currentTitle, setCurrentTitle] = useState(children[0]);
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);
  const [isAnimationStarted, setIsAnimationStarted] = useState(false);
  const [isAnimationReady, setIsAnimationReady] = useState(true);
  const [isAnimationReverse, setIsAnimationReverse] = useState(false);

  const [chartAnimationStyles, chartAnimationApi] = useSpring(() => ({
    delay: 250,
    config: {
      duration: 1000,
      easing: easings.easeInOutCubic,
    },
  }));

  const [titleAnimationStyles, titleAnimationApi] = useSpring(() => ({}));

  useEffect(() => {
    if (autoScrollPromoRef?.isIntersecting && !isAnimationFinished) {
      scrollTo({
        ref:
          promoRef?.current.clientHeight > window.innerHeight
            ? promoRef?.current.offsetTop +
              promoRef?.current.clientHeight -
              window.innerHeight
            : promoRef,
        duration: 1000,
        callback: () => {
          setIsAnimationStarted(true);

          if (isBrowser()) {
            document.querySelector("body").style.paddingRight =
              window.outerWidth - document.body.offsetWidth + "px";
            document.querySelector("body").style.overflowY = "hidden";
          }
        },
      });
    }
  }, [autoScrollPromoRef, isAnimationFinished]);

  useEffect(() => {
    if (currentScroll < children.length) {
      setBackgroundPositionX(
        backgroundPositionX + (isAnimationReverse ? -200 : 200)
      );
      setIsAnimationReady(false);

      titleAnimationApi.start({
        from: isAnimationReverse
          ? animationToStep1Config
          : animationToStep1Config,
        to: isAnimationReverse
          ? TITLES_ANIMATION_DEFAULT_FROM_CONFIG
          : animationToStep2Config,
        config: {
          duration: 500,
        },
        onRest: () => {
          setCurrentTitle(children[currentScroll]);

          titleAnimationApi.start({
            from: isAnimationReverse
              ? animationToStep2Config
              : TITLES_ANIMATION_DEFAULT_FROM_CONFIG,
            to: isAnimationReverse
              ? animationToStep1Config
              : animationToStep1Config,
            config: {
              duration: 500,
            },
            onRest: () => {
              setIsAnimationReady(true);
            },
          });
        },
      });
    }

    if (currentScroll === children.length) {
      setIsAnimationFinished(true);

      if (isBrowser()) {
        document.querySelector("body").style.overflowY = "scroll";
        document.querySelector("body").style.paddingRight = "0px";
      }
    }
    //TODO refactor to remove this
    // eslint-disable-next-line
  }, [currentScroll]);

  useEffect(() => {
    const wheelHandler = (e) => {
      if (!isAnimationReady) {
        e.preventDefault();
        return;
      }

      if (e.deltaY > 0 && currentScroll < scrollCount) {
        setCurrentScroll(currentScroll + 1);
        setIsAnimationReverse(false);
        e.preventDefault();
      }

      if (e.deltaY < 0 && currentScroll > 0) {
        setCurrentScroll(currentScroll - 1);
        setIsAnimationReverse(true);
        e.preventDefault();
      }

      if (e.deltaY < 0 && currentScroll === 0) {
        setCurrentScroll(0);
        setIsAnimationStarted(false);
        setIsAnimationReverse(false);
        setIsAnimationFinished(false);

        if (isBrowser()) {
          document.querySelector("body").style.overflowY = "scroll";
          document.querySelector("body").style.paddingRight = "0px";
        }
      }
    };

    const touchStartHandler = (e) => {
      // eslint-disable-next-line
      lastTouchPointY = e.touches[0].pageY;
    };

    const touchMoveHandler = (e) => {
      if (isAnimationReady && isAnimationStarted) {
        e.preventDefault();
      }
    };

    const touchEndHandler = (e) => {
      if (isAnimationReady && isAnimationStarted) {
        const event = document.createEvent("MouseEvents");
        event.initEvent("wheel", false, true);
        event.deltaY =
          e.changedTouches[0].pageY - lastTouchPointY < 0 ? 120 : -120;
        if (promoRef.current) {
          promoRef.current.dispatchEvent(event);
          lastTouchPointY = e.changedTouches[0].pageY;
        }
        e.preventDefault();
      }
    };

    const promoElement = promoRef.current;

    if (isAnimationStarted && !isAnimationFinished) {
      promoElement.addEventListener("wheel", wheelHandler);
      promoElement.addEventListener("touchstart", touchStartHandler);
      promoElement.addEventListener("touchend", touchEndHandler);
      promoElement.addEventListener("touchmove", touchMoveHandler);
    }

    return () => {
      promoElement.removeEventListener("wheel", wheelHandler);
      promoElement.removeEventListener("touchstart", touchStartHandler);
      promoElement.removeEventListener("touchend", touchEndHandler);
      promoElement.removeEventListener("touchmove", touchMoveHandler);
    };
  }, [
    backgroundPositionX,
    isAnimationFinished,
    isAnimationStarted,
    isAnimationReady,
    promoRef,
    scrollCount,
    setBackgroundPositionX,
  ]);

  useEffect(() => {
    if (isAnimationStarted) {
      chartAnimationApi.start({
        backgroundPositionX: `${backgroundPositionX}px`,
        config: {
          easing: easings.easeInOutCubic,
          duration: 1000,
        },
      });
    }
  }, [backgroundPositionX, chartAnimationApi, isAnimationStarted]);

  return (
    <section
      className={cn("promotion-markets", className, {
        "promotion-markets--rtl": isRTL,
      })}
      ref={promoRef}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="promotion-markets__images">
        <animated.div
          className="promotion-markets__chart"
          style={chartAnimationStyles}
        />
        <Lottie
          className="promotion-markets__svg"
          animationData={animation}
          style={animationStyle}
        />
      </div>

      <div className="promotion-markets__content">
        <h2 className="promotion-markets__title">
          <animated.div style={titleAnimationStyles}>
            {currentTitle}
          </animated.div>
        </h2>

        <ButtonPopup
          className="promotion-markets__btn button-link button-link--red"
          onClick={handleShowRegistrationPopup}
        >
          {btnTitle}
        </ButtonPopup>
      </div>

      {/* Render the popup */}
      {isPopupOpen && (
        <ShowRegistrationPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          langParam={langParam} // Pass langParam if needed
        />
      )}
    </section>
  );
};

PromotionMarkets.propTypes = {
  className: PropTypes.string,
  animation: PropTypes.object,
  animationStyle: PropTypes.object,
  children: PropTypes.arrayOf(PropTypes.node),
  btnTitle: PropTypes.string,
};
export default PromotionMarkets;
