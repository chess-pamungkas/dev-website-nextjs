import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import { stringTransformToKebabCase } from "../../../../helpers/services/string-service";

const BenefitBlock = ({ className, title, text, icon: Icon }) => {
  const { t } = useTranslationWithVariables();

  return (
    <div className={cn("benefit-block", className)}>
      <div className="benefit-block__wrapper">
        <div className="benefit-block__icon-wrapper">
          <Icon className="benefit-block__icon" />
        </div>

        <p className="benefit-block__title">{t(title)}</p>
        <p className="benefit-block__text">
          {text.map((item, index) => (
            <span
              key={`${stringTransformToKebabCase(title)}-desc-${index}`}
              className="display-block"
            >
              {t(item)}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

BenefitBlock.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  text: PropTypes.arrayOf(PropTypes.string).isRequired,
  icon: PropTypes.func.isRequired,
};
export default BenefitBlock;
