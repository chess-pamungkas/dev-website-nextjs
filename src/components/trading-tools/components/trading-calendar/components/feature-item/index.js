import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useRtlDirection } from "../../../../../../helpers/hooks/use-rtl-direction";
import { useTranslationWithVariables } from "../../../../../../helpers/hooks/use-translation-with-vars";

const FeatureItem = ({ img, title, description }) => {
  const isRTL = useRtlDirection();
  const { t } = useTranslationWithVariables();

  return (
    <div
      className={cn("feature-item", {
        "feature-item--rtl": isRTL,
      })}
    >
      <img className="feature-item__img" src={img} alt={""} />
      <h2 className="feature-item__title">{t(title)}</h2>
      <p className="feature-item__description">{t(description)}</p>
    </div>
  );
};

FeatureItem.propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
export default FeatureItem;
