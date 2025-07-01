import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";
import { DIR_LTR, DIR_RTL } from "../../helpers/constants";
import HighlightedLocalizationText from "../shared/highlighted-localization-text";
import { CAREER_BENEFITS } from "../../helpers/career.config";
import BenefitBlock from "./components/benefit-block";
import { stringTransformToKebabCase } from "../../helpers/services/string-service";

const CareerBenefits = ({ className }) => {
  const isRTL = useRtlDirection();

  return (
    <section
      className={cn("career-benefits", className, {
        "career-benefits--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="career-benefits__title-wrapper">
        <h2 className="career-benefits__title">
          <HighlightedLocalizationText
            localizationText="career_benefits-title"
            wordsToHighlight="career_benefits-title-accent"
            primaryClassName="highlighted-in-white"
            accentClassName="highlighted-in-red"
          />
        </h2>
        <p className="career-benefits__subtitle">
          <HighlightedLocalizationText
            localizationText="career_benefits-subtitle"
            wordsToHighlight="career_benefits-subtitle-accent"
            primaryClassName="highlighted-in-white"
            accentClassName="highlighted-in-red"
          />
        </p>
      </div>
      <div className="career-benefits__advantages">
        {CAREER_BENEFITS.map((item) => (
          <BenefitBlock
            key={`career-benefits-${stringTransformToKebabCase(item.title)}`}
            icon={item.icon}
            title={item.title}
            text={item.text}
          />
        ))}
      </div>
    </section>
  );
};

CareerBenefits.propTypes = {
  className: PropTypes.string,
};
export default CareerBenefits;
