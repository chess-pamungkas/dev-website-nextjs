import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import ButtonLink from "../../../shared/button-link";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";

const Vacancy = ({ className, location, area, description, link }) => {
  const { t } = useTranslationWithVariables();
  const isRTL = useRtlDirection();

  return (
    <div
      className={cn("vacancy", className, {
        "vacancy--rtl": isRTL,
      })}
    >
      <div className="vacancy__block vacancy__block--flexed">
        <div className="vacancy__text-wrapper vacancy__text-wrapper--slim">
          <p className="vacancy__title">{t("career_vacancy_location_label")}</p>
          <p className="vacancy__text">{t(location)}</p>
        </div>
        <div className="vacancy__text-wrapper vacancy__text-wrapper--slim">
          <p className="vacancy__title">{t("career_vacancy_area_label")}</p>
          <p className="vacancy__text">{t(area)}</p>
        </div>
        <div className="vacancy__text-wrapper vacancy__text-wrapper--wide">
          <p className="vacancy__title">
            {t("career_vacancy_description_label")}
          </p>
          <p className="vacancy__text ">{t(description)}</p>
        </div>
      </div>

      <div className="vacancy__block">
        <ButtonLink link={link} className="button-link--red vacancy__btn">
          {t("career_vacancy_btn")}
        </ButtonLink>
      </div>
    </div>
  );
};

Vacancy.propTypes = {
  className: PropTypes.string,
  location: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
};

export default Vacancy;
