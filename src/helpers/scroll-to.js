import { animateScroll } from "./animate-scroll";

export const scrollTo = ({
  ref = null,
  headerRef = null,
  duration = 1000,
  callback,
}) => {
  if (!ref) {
    return;
  }

  const offsetY =
    typeof headerRef === "number"
      ? headerRef
      : headerRef?.current
      ? headerRef?.current.clientHeight
      : 0;

  animateScroll({
    targetPosition:
      typeof ref === "number"
        ? ref - offsetY
        : ref?.current.offsetTop - offsetY,
    initialPosition: window.scrollY,
    duration,
  });

  if (typeof callback !== "undefined") {
    setTimeout(() => {
      callback();
    }, duration);
  }
};
