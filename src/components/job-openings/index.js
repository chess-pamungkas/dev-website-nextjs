import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";
import { useTranslationWithVariables } from "../../helpers/hooks/use-translation-with-vars";
import { DIR_LTR, DIR_RTL } from "../../helpers/constants";
import { VACANCY } from "../../helpers/career.config";
import Accordion from "../shared/accordion";
import Vacancy from "./components/vacancy";
import { stringTransformToKebabCase } from "../../helpers/services/string-service";
import { AccordionActiveIcon, AccordionIcon } from "../shared/icons";

const JobOpenings = ({ className }) => {
  const isRTL = useRtlDirection();
  const { t } = useTranslationWithVariables();

  return (
    <section
      className={cn("job-openings", className, {
        "job-openings--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="job-openings__wrapper">
        <h2 className="job-openings__title">
          {t("career_job-openings_title")}
        </h2>
        <div className="job-openings__vacancy-wrapper">
          {VACANCY.map((item) => (
            <Accordion
              key={`vacancy-${stringTransformToKebabCase(item.title)}`}
              className={cn("faq__accordion", "vacancy__accordion")}
              icon={AccordionIcon}
              iconForActive={AccordionActiveIcon}
              title={item.title}
            >
              <Vacancy {...item} />
            </Accordion>
          ))}
        </div>
      </div>
    </section>
  );
};

JobOpenings.propTypes = {
  className: PropTypes.string,
};
export default JobOpenings;
