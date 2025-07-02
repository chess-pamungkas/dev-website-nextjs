import { useEffect, useState, useCallback, useRef } from "react";
import { WINDOW_SIZE_MD, WINDOW_SIZE_LG, WINDOW_SIZE_XL } from "../constants";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" && window.innerWidth,
    height: typeof window !== "undefined" && window.innerHeight,
  });

  // Debounce timer ref
  const debounceRef = useRef();

  const handleResize = useCallback(() => {
    // Debounce: clear previous timer
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      // Use requestIdleCallback for better performance
      if ("requestIdleCallback" in window) {
        requestIdleCallback(
          () => {
            setWindowSize({
              width: window.innerWidth,
              height: window.innerHeight,
            });
          },
          { timeout: 50 }
        );
      } else {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
    }, 150); // Increased from 100ms for better performance
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // Use passive event listener for better performance
      window.addEventListener("resize", handleResize, { passive: true });
      return () => {
        window.removeEventListener("resize", handleResize);
        if (debounceRef.current) clearTimeout(debounceRef.current);
      };
    }
  }, [handleResize]);

  return {
    ...windowSize,
    isMobile: windowSize.width < WINDOW_SIZE_MD,
    isMD:
      windowSize.width >= WINDOW_SIZE_MD && windowSize.width < WINDOW_SIZE_LG,
    isTablet: windowSize.width < WINDOW_SIZE_LG,
    isDesktop: windowSize.width >= WINDOW_SIZE_LG,
    isLG:
      windowSize.width >= WINDOW_SIZE_LG && windowSize.width < WINDOW_SIZE_XL,
    isXL: windowSize.width >= WINDOW_SIZE_XL,
  };
};
