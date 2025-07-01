import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import CompanyAdvantageBlock from "./components/company-advantage-block";
import { stringTransformToKebabCase } from "../../helpers/services/string-service";
import { COMPANY_ADVANTAGES } from "../../helpers/config";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";
import { DIR_LTR, DIR_RTL } from "../../helpers/constants";

const CompanyAdvantages = ({ className }) => {
  const isRTL = useRtlDirection();

  return (
    <section
      className={cn("company-advantages", className, {
        "company-advantages--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="container">
        <div className="company-advantages__wrapper">
          {COMPANY_ADVANTAGES.map((block) => (
            <CompanyAdvantageBlock
              key={`company-advantage-${stringTransformToKebabCase(
                block.title
              )}`}
              icon={block.icon}
              title={block.title}
              textArray={block.textArray}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

CompanyAdvantages.propTypes = {
  className: PropTypes.string,
};

export default CompanyAdvantages;
