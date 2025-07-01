import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";
import HighlightedLocalizationText from "../../../shared/highlighted-localization-text";
import SwapFreeAdvantageItem from "../swap-free-advantage-item";

const SwapFreeAdvantages = ({ className, advantages }) => {
  const isRTL = useRtlDirection();

  return (
    <section
      className={cn("swap-free-advantages", className, {
        "swap-free-advantages--rtl": isRTL,
      })}
    >
      <h2 className="swap-free-advantages__title">
        {
          <HighlightedLocalizationText
            localizationText="swap-free_advantages-title"
            wordsToHighlight="swap-free_advantages-title-accent"
            primaryClassName="highlighted-in-white"
            accentClassName="highlighted-in-red"
          />
        }
      </h2>
      <div className="swap-free-advantages__items">
        {advantages.length > 0 &&
          advantages.map((item) => (
            <SwapFreeAdvantageItem
              key={`adv-${item.title}`}
              icon={item.img}
              title={item.title}
              titleAccent={item.titleAccent}
              titleObject={item.titleObject}
            />
          ))}
      </div>
    </section>
  );
};

SwapFreeAdvantages.propTypes = {
  className: PropTypes.string,
  advantages: PropTypes.arrayOf(
    PropTypes.shape({
      img: PropTypes.string.isRequired,
      title: PropTypes.string,
      titleAccent: PropTypes.string,
      titleObject: PropTypes.shape({
        p1: PropTypes.string.isRequired,
        link: PropTypes.string.isRequired,
        linkText: PropTypes.string.isRequired,
        p2: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
};
export default SwapFreeAdvantages;
