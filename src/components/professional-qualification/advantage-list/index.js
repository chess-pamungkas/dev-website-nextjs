import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { DIR_LTR, DIR_RTL } from "../../../helpers/constants";
import { Logo } from "../../shared/icons";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import { ADVANTAGES_LIST } from "../../../helpers/professional-qualification.config";

const AdvantageList = ({ className, title, text }) => {
  const isRTL = useRtlDirection();

  return (
    <section
      className={cn("pq-advantage-list", className, {
        "pq-advantage-list--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="pq-advantage-list__title-wrapper">
        <Logo className="pq-advantage-list__icon" />
        <h2 className="pq-advantage-list__title">{title}</h2>
      </div>
      <div className="pq-advantage-list__advantages">
        <p className="pq-advantage-list__text">{text}</p>
        <div className="pq-advantage-list__advantages-list">
          {ADVANTAGES_LIST.map((item, index) => (
            <div
              key={`advantage-item-${index}`}
              className="pq-advantage-list__item"
            >
              <img
                className="pq-advantage-list__item-icon"
                src={typeof item.icon === "string" ? item.icon : item.icon?.src}
                alt=""
              />
              <p className="pq-advantage-list__item-text">
                <HighlightedLocalizationText
                  localizationText={item.text}
                  wordsToHighlight={item.textAccent}
                  primaryClassName="highlighted-in-black"
                  accentClassName="highlighted-in-red"
                />
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

AdvantageList.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};
export default AdvantageList;
