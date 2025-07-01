// the hook for the dynamic definition of 'slides to show' depends on screen width
// check src/assets/styles/playlist.scss for the values of paddings and blocks

import { useCallback, useEffect, useState } from "react";
import { isBrowser } from "../../../../helpers/services/is-browser";
import { useWindowSize } from "../../../../helpers/hooks/use-window-size";

export const useScreenWidth = () => {
  const PADDINGS_SM = 51 + 15;
  const PADDINGS_MD = 105 + 35;
  const PADDINGS_LG = 98 + 42;
  const PADDINGS_XL = 155 + 55;

  const WIDTH_SM = 150;
  const WIDTH_MD = 274;
  const WIDTH_LG = 359;
  const WIDTH_XL = 359;

  const RIGHT_MARGIN_SM = 10;
  const RIGHT_MARGIN_MD = 10;
  const RIGHT_MARGIN_LG = 35;
  const RIGHT_MARGIN_XL = 35;

  const DEVIATION = 0.1;
  const FRACTION_DIGITS = 1;

  const [responsiveSettings, setResponsiveSettings] = useState({
    sm: {
      slidesToScroll: 2,
      slidesToShow: 2,
    },
    md: {
      slidesToScroll: 2,
      slidesToShow: 2.3,
    },
    lg: {
      slidesToScroll: 1,
      slidesToShow: 2.3,
    },
    xl: {
      slidesToScroll: 1,
      slidesToShow: 4.3,
    },
  });
  const { width } = useWindowSize();

  const [isFirstTime, setIsFirstTime] = useState(true);

  const calculateSettings = useCallback(
    (_width) => {
      return {
        sm: {
          slidesToScroll: 2,
          slidesToShow:
            ((_width - PADDINGS_SM) / (WIDTH_SM + RIGHT_MARGIN_SM)).toFixed(
              FRACTION_DIGITS
            ) - DEVIATION,
        },
        md: {
          slidesToScroll: 2,
          slidesToShow:
            ((_width - PADDINGS_MD) / (WIDTH_MD + RIGHT_MARGIN_MD)).toFixed(
              FRACTION_DIGITS
            ) - DEVIATION,
        },
        lg: {
          slidesToScroll: 1,
          slidesToShow:
            ((_width - PADDINGS_LG) / (WIDTH_LG + RIGHT_MARGIN_LG)).toFixed(
              FRACTION_DIGITS
            ) - DEVIATION,
        },
        xl: {
          slidesToScroll: 1,
          slidesToShow:
            ((_width - PADDINGS_XL) / (WIDTH_XL + RIGHT_MARGIN_XL)).toFixed(
              FRACTION_DIGITS
            ) - DEVIATION,
        },
      };
    },
    [PADDINGS_XL, PADDINGS_LG, PADDINGS_MD, PADDINGS_SM]
  );

  const handleResizeForCarousel = useCallback(() => {
    const resizedWidth = window.innerWidth;

    setResponsiveSettings(calculateSettings(resizedWidth));
  }, [calculateSettings]);

  useEffect(() => {
    if (isBrowser() && width && isFirstTime) {
      // to calculate setting before resizing the screen
      setResponsiveSettings(calculateSettings(width));
      setIsFirstTime(false);
    }
  }, [width, isFirstTime, calculateSettings]);

  useEffect(() => {
    window.addEventListener("resize", handleResizeForCarousel);

    return () => window.removeEventListener("resize", handleResizeForCarousel);
  }, [handleResizeForCarousel]);

  return responsiveSettings;
};
