import React, { useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";

export const CookieCategoryItem = ({
  title,
  categoryKey,
  initialValue,
  canBeChanged,
  acceptedCookies,
  setAcceptedCookies,
  className,
}) => {
  const { t } = useTranslationWithVariables();
  const [checked, setChecked] = useState(initialValue);

  const onClick = () => {
    if (!canBeChanged) return;

    acceptedCookies[categoryKey] = !checked;
    setAcceptedCookies(acceptedCookies);
    setChecked(!checked);
  };

  return (
    <div className={cn("gdpr-popup__category", className)}>
      <div
        className={cn("gdpr-popup__category-title", {
          "gdpr-popup__category-title--disabled": !canBeChanged,
        })}
      >
        {t(title)}
      </div>
      <label className="gdpr-popup__switch">
        <input
          className="gdpr-popup__checkbox"
          type="checkbox"
          checked={checked}
          id={categoryKey}
          onChange={onClick}
        />
        <span
          className={cn(
            "gdpr-popup__slider",
            { "gdpr-popup__slider--checked": checked },
            { "gdpr-popup__slider--disabled": !canBeChanged }
          )}
        />
      </label>
    </div>
  );
};
CookieCategoryItem.propTypes = {
  title: PropTypes.string.isRequired,
  categoryKey: PropTypes.string.isRequired,
  initialValue: PropTypes.bool.isRequired,
  canBeChanged: PropTypes.bool.isRequired,
  acceptedCookies: PropTypes.object.isRequired,
  setAcceptedCookies: PropTypes.func.isRequired,
  className: PropTypes.string,
  checked: PropTypes.bool,
  onClick: PropTypes.func,
};
