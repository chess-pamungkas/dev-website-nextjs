import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import AdvantageBlock from "../../../performance/components/advantage-block";
import { stringTransformToKebabCase } from "../../../../helpers/services/string-service";
import { DIR_LTR, DIR_RTL } from "../../../../helpers/constants";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";

const PartnersAdvantages = ({ className, title, advantages }) => {
  const isRTL = useRtlDirection();

  return (
    <section
      className={cn("partners-advantages", className, {
        "partners-advantages--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="container">
        <div className="partners-advantages__wrapper">
          <h2 className="partners-advantages__title">{title}</h2>
          <div className="partners-advantages__advantages">
            {advantages.length > 0 &&
              advantages.map((block) => (
                <AdvantageBlock
                  key={`advantage-${stringTransformToKebabCase(block.text)}`}
                  icon={block.icon}
                  text={block.text}
                  accent={block.accent}
                />
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

PartnersAdvantages.propTypes = {
  className: PropTypes.string,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  advantages: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.func,
      text: PropTypes.string.isRequired,
      accent: PropTypes.string,
    })
  ).isRequired,
};

export default PartnersAdvantages;
