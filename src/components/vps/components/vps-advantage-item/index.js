import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";

const VPSAdvantageItem = ({ className, icon, title, text }) => {
  const { t } = useTranslationWithVariables();
  return (
    <div className={cn("vps-advantage-item", className)}>
      <img
        src={typeof icon === "string" ? icon : icon?.src}
        alt=""
        className="vps-advantage-item__icon"
      />
      <p className="vps-advantage-item__title">{t(title)}</p>
      <p className="vps-advantage-item__text">{t(text)}</p>
    </div>
  );
};

VPSAdvantageItem.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

VPSAdvantageItem.defaultProps = {
  className: "",
};
export default VPSAdvantageItem;
