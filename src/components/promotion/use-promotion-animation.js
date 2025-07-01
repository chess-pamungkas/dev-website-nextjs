import { useWindowSize } from "../../helpers/hooks/use-window-size";
import {
  PROMO_INTERSECTION_RATIO_TO_REVERSE_LG,
  PROMO_INTERSECTION_RATIO_TO_REVERSE_TABLET,
  PROMO_INTERSECTION_RATIO_TO_REVERSE_XL,
  PROMO_INTERSECTION_RATIO_TO_SCROLL_LG,
  PROMO_INTERSECTION_RATIO_TO_SCROLL_TABLET,
  PROMO_INTERSECTION_RATIO_TO_SCROLL_XL,
  TRADE_PROMO_INTERSECTION_RATIO_LG,
  TRADE_PROMO_INTERSECTION_RATIO_TABLET,
  TRADE_PROMO_INTERSECTION_RATIO_XL,
} from "../../helpers/animation.config";
import { useEffect, useState } from "react";

export const usePromotionAnimation = (
  dataPromo1Ref,
  dataPromo2Ref,
  dataPromo3Ref,
  isPromo1Scrolled,
  isPromo2Scrolled,
  isPromo3Scrolled
) => {
  const { isMobile, isTablet, isLG, isXL } = useWindowSize();

  const [isPromo12Bg, setIsPromo12Bg] = useState(false);
  const [isPromo23Bg, setIsPromo23Bg] = useState(false);
  const [isPromo32Bg, setIsPromo32Bg] = useState(false);
  const [isPromo21Bg, setIsPromo21Bg] = useState(false);

  const [tradePromoIntersectionRatio, setTradePromoIntersectionRatio] =
    useState(null);
  const [promoIntersectionRatioToScroll, setPromoIntersectionRatioToScroll] =
    useState(null);
  const [promoIntersectionRatioToReverse, setPromoIntersectionRatioToReverse] =
    useState(null);

  useEffect(() => {
    if (isMobile) {
      return;
    }

    let TRADE_PROMO_INTERSECTION_RATIO;
    let PROMO_INTERSECTION_RATIO_TO_SCROLL;
    let PROMO_INTERSECTION_RATIO_TO_REVERSE;

    if (isXL) {
      TRADE_PROMO_INTERSECTION_RATIO = TRADE_PROMO_INTERSECTION_RATIO_XL;
      PROMO_INTERSECTION_RATIO_TO_SCROLL =
        PROMO_INTERSECTION_RATIO_TO_SCROLL_XL;
      PROMO_INTERSECTION_RATIO_TO_REVERSE =
        PROMO_INTERSECTION_RATIO_TO_REVERSE_XL;
    }

    if (isLG) {
      TRADE_PROMO_INTERSECTION_RATIO = TRADE_PROMO_INTERSECTION_RATIO_LG;
      PROMO_INTERSECTION_RATIO_TO_SCROLL =
        PROMO_INTERSECTION_RATIO_TO_SCROLL_LG;
      PROMO_INTERSECTION_RATIO_TO_REVERSE =
        PROMO_INTERSECTION_RATIO_TO_REVERSE_LG;
    }

    if (isTablet) {
      TRADE_PROMO_INTERSECTION_RATIO = TRADE_PROMO_INTERSECTION_RATIO_TABLET;
      PROMO_INTERSECTION_RATIO_TO_SCROLL =
        PROMO_INTERSECTION_RATIO_TO_SCROLL_TABLET;
      PROMO_INTERSECTION_RATIO_TO_REVERSE =
        PROMO_INTERSECTION_RATIO_TO_REVERSE_TABLET;
    }

    setTradePromoIntersectionRatio(TRADE_PROMO_INTERSECTION_RATIO);
    setPromoIntersectionRatioToScroll(PROMO_INTERSECTION_RATIO_TO_SCROLL);
    setPromoIntersectionRatioToReverse(PROMO_INTERSECTION_RATIO_TO_REVERSE);

    const Promo1BgAnimation =
      dataPromo1Ref?.isIntersecting &&
      dataPromo1Ref?.intersectionRatio > PROMO_INTERSECTION_RATIO_TO_SCROLL;
    const Promo2BgAnimation =
      dataPromo2Ref?.isIntersecting &&
      dataPromo2Ref?.intersectionRatio > PROMO_INTERSECTION_RATIO_TO_SCROLL;
    const Promo3BgAnimation =
      dataPromo3Ref?.isIntersecting &&
      dataPromo3Ref?.intersectionRatio > PROMO_INTERSECTION_RATIO_TO_SCROLL;

    setIsPromo12Bg(Promo1BgAnimation && Promo2BgAnimation && !isPromo2Scrolled);
    setIsPromo23Bg(
      Promo2BgAnimation &&
        Promo3BgAnimation &&
        isPromo2Scrolled &&
        !isPromo3Scrolled
    );
    setIsPromo32Bg(
      Promo3BgAnimation &&
        dataPromo2Ref?.isIntersecting &&
        dataPromo2Ref?.intersectionRatio >
          PROMO_INTERSECTION_RATIO_TO_REVERSE &&
        isPromo2Scrolled &&
        isPromo3Scrolled
    );
    setIsPromo21Bg(
      dataPromo1Ref?.isIntersecting &&
        dataPromo1Ref?.intersectionRatio >
          PROMO_INTERSECTION_RATIO_TO_REVERSE &&
        isPromo1Scrolled &&
        isPromo2Scrolled
    );
  }, [
    isMobile,
    isTablet,
    isLG,
    isXL,
    tradePromoIntersectionRatio,
    promoIntersectionRatioToScroll,
    promoIntersectionRatioToReverse,
    dataPromo1Ref,
    dataPromo2Ref,
    dataPromo3Ref,
    isPromo1Scrolled,
    isPromo2Scrolled,
    isPromo3Scrolled,
  ]);

  return {
    isPromo12Bg,
    isPromo23Bg,
    isPromo32Bg,
    isPromo21Bg,
    tradePromoIntersectionRatio,
    promoIntersectionRatioToScroll,
    promoIntersectionRatioToReverse,
  };
};
