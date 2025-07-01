import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import { useWindowSize } from "../../../../helpers/hooks/use-window-size";

const CompanyAdvantageBlock = ({ className, icon: Icon, title, textArray }) => {
  const { t } = useTranslationWithVariables();
  const { isTablet } = useWindowSize();

  return (
    <div className={cn("company-advantage-block", className)}>
      {isTablet ? (
        <div>
          <div className="company-advantage-block__icon-wrapper">
            <Icon className="company-advantage-block__icon--mobile" />
          </div>
          <div className="company-advantage-block__text-wrapper">
            <p
              className={cn(
                "company-advantage-block__title",
                "company-advantage-block__title--mobile"
              )}
            >
              {t(title)}
            </p>
            <p
              className={cn(
                "company-advantage-block__text",
                "company-advantage-block__text--mobile"
              )}
            >
              {textArray.map((text) => (
                <span key={`company-advantage-${text}-mobile`}>{t(text)}</span>
              ))}
            </p>
          </div>
        </div>
      ) : (
        <>
          <div className="company-advantage-block__front">
            <Icon className="company-advantage-block__icon" />
            <p className={cn("company-advantage-block__title")}>{t(title)}</p>
          </div>
          <div className="company-advantage-block__back">
            <p
              className={cn(
                "company-advantage-block__title",
                "company-advantage-block__title--back"
              )}
            >
              {t(title)}
            </p>
            <p className={cn("company-advantage-block__text")}>
              {textArray.map((text) => (
                <span key={`company-advantage-${text}`}>{t(text)}</span>
              ))}
            </p>
          </div>
        </>
      )}
    </div>
  );
};

CompanyAdvantageBlock.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  textArray: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default CompanyAdvantageBlock;
