import React, { useRef, useState, useEffect } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import TradingSymbol from "../trading-symbol";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";
import { useWindowSize } from "../../../../helpers/hooks/use-window-size";

const TradingSymbols = ({ className, symbols }) => {
  const symbolsRef = useRef();
  const isRTL = useRtlDirection();
  const { isMobile } = useWindowSize();
  const margin = isMobile ? 10 : 0;
  const [isTouched, setIsTouched] = useState(false);

  const prepareSymbols = (symbols) => {
    // To ensure the best working scrolling, initial symbols count should be > 20
    return symbols.length > 0 && symbols.length < 20
      ? prepareSymbols(symbols.concat(symbols))
      : symbols;
  };

  // check is scroll passed center of scroll width
  const isMiddleOfScroll = (width, offset) => Math.abs(offset) > width / 2;
  // check is scroll passed center of scroll width in reversed direction, used for check when manual scroll is active
  const isMiddleOfScrollReversed = (width, offset) =>
    Math.abs(offset) < width / 2;

  const performScroll = () => {
    const cont = document.getElementById("trading-symbols");

    // Add null check to prevent errors
    if (!cont) {
      return;
    }

    if (isMiddleOfScroll(cont.scrollWidth, cont.scrollLeft)) {
      // move first child to the end when center of scroll width passed
      const first = document.querySelector("#trading-symbols .trading-symbol");
      if (first) {
        cont.appendChild(first);
        cont.scrollTo(cont.scrollLeft - first.offsetWidth - margin, 0);
      }
    }
    if (
      isMiddleOfScrollReversed(cont.scrollWidth, cont.scrollLeft) &&
      isTouched
    ) {
      // move last child to the start when center of scroll width passed in reversed direction while manual scroll is active
      const lastchild = cont.lastChild;
      if (lastchild) {
        cont.prepend(lastchild);
        cont.scrollTo(cont.scrollLeft + lastchild.offsetWidth + margin, 0);
      }
    }
    // perform auto scroll when not touched
    if (cont.scrollLeft !== cont.scrollWidth && !isTouched) {
      cont.scrollTo(cont.scrollLeft + 1, 0);
    }
  };

  const performScrollRTL = () => {
    // for RTL it is almost the same as normal, the only thing that is important to know here is that ScrollLeft has a negative value and decreases
    const cont = document.getElementById("trading-symbols");

    // Add null check to prevent errors
    if (!cont) {
      return;
    }

    if (isMiddleOfScroll(cont.scrollWidth, cont.scrollLeft)) {
      const first = document.querySelector("#trading-symbols .trading-symbol");
      if (first) {
        cont.appendChild(first);
        cont.scrollTo(cont.scrollLeft - -first.offsetWidth - -margin, 0);
      }
    }
    if (
      isMiddleOfScrollReversed(cont.scrollWidth, cont.scrollLeft) &&
      isTouched
    ) {
      const lastchild = cont.lastChild;
      if (lastchild) {
        cont.prepend(lastchild);
        cont.scrollTo(cont.scrollLeft + -lastchild.offsetWidth + -margin, 0);
      }
    }
    if (cont.scrollLeft !== cont.scrollWidth && !isTouched) {
      cont.scrollTo(cont.scrollLeft - 1, 0);
    }
  };

  useEffect(() => {
    let animationId;
    let lastTime = 0;
    const targetInterval = 30; // Increased from 20ms to 30ms for better performance

    const animate = (currentTime) => {
      if (currentTime - lastTime >= targetInterval) {
        // Use requestIdleCallback for better performance
        if ("requestIdleCallback" in window) {
          requestIdleCallback(
            () => {
              if (isRTL) {
                performScrollRTL();
              } else {
                performScroll();
              }
            },
            { timeout: 16 }
          );
        } else {
          if (isRTL) {
            performScrollRTL();
          } else {
            performScroll();
          }
        }
        lastTime = currentTime;
      }
      animationId = requestAnimationFrame(animate);
    };

    if (!isTouched) {
      animationId = requestAnimationFrame(animate);
    }

    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isTouched, isRTL]);

  return (
    <div
      className={cn("trading-symbols-wrapper", className, {
        "trading-symbols-wrapper--rtl": isRTL,
      })}
    >
      <div className="scroll-disabler"></div>
      <div
        id="trading-symbols"
        className="trading-symbols"
        ref={symbolsRef}
        onTouchStart={() => setIsTouched(true)}
        onTouchEnd={() => setIsTouched(false)}
      >
        {symbols &&
          prepareSymbols(symbols).map((symbol, key) => (
            <TradingSymbol
              key={`TradingSymbol${symbol.symbol}-${key}`}
              {...symbol}
            />
          ))}
      </div>
    </div>
  );
};

TradingSymbols.propTypes = {
  className: PropTypes.string,
  symbols: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      direction: PropTypes.oneOf(["up", "down"]).isRequired,
      bid: PropTypes.string.isRequired,
      ask: PropTypes.string.isRequired,
      spread: PropTypes.string.isRequired,
    })
  ),
};
export default TradingSymbols;
