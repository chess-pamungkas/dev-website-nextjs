import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { Logo } from "../shared/icons";
import AdvantageBlock from "./components/advantage-block";
import { stringTransformToKebabCase } from "../../helpers/services/string-service";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";
import { DIR_LTR, DIR_RTL } from "../../helpers/constants";

const Performance = ({ className, title, advantages }) => {
  const isRTL = useRtlDirection();

  return (
    <section
      className={cn("performance", className, {
        "performance--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="performance__title-wrapper">
        <Logo className="performance__icon" />
        <h2 className="performance__title">{title}</h2>
      </div>
      <div className="performance__advantages">
        {advantages.length > 0 &&
          advantages.map((block) => (
            <AdvantageBlock
              key={`advantage-${stringTransformToKebabCase(block.text)}`}
              icon={block.icon}
              text={block.text}
              subtext={block.subtext}
              accent={block.accent}
            />
          ))}
      </div>
    </section>
  );
};

Performance.propTypes = {
  className: PropTypes.string,
  title: PropTypes.node.isRequired,
  advantages: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Performance;
