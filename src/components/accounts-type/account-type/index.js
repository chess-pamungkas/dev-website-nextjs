import React, { useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import { ShowRegistrationPopup } from "../../../helpers/constants";
import ButtonPopup from "../../shared/button-popup";
import AccountTypeAdvantage from "../account-type-advantage";
import { stringTransformToKebabCase } from "../../../helpers/services/string-service";
import { setLangParam } from "../../../helpers/services/language-service";

const AccountType = ({
  className,
  title,
  name,
  btnTitle,
  gridArea,
  advantages,
}) => {
  const { t } = useTranslationWithVariables();
  const langParam = setLangParam(); // Get the language parameter
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const handleShowRegistrationPopup = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  return (
    <div className={cn("account-type", className, gridArea)}>
      <div className="account-type__header" />
      <p className="account-type__title">{t(title)}</p>
      <h2 className="account-type__name">{t(name)}</h2>
      {advantages.map((block) => (
        <AccountTypeAdvantage
          key={`account-type-adv-${stringTransformToKebabCase(block.title)}`}
          {...block}
        />
      ))}
      <ButtonPopup
        onClick={handleShowRegistrationPopup}
        className="account-type__btn"
      >
        {t(btnTitle)}
      </ButtonPopup>

      {/* Render the popup */}
      {isPopupOpen && (
        <ShowRegistrationPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          langParam={langParam} // Pass langParam if needed
        />
      )}
    </div>
  );
};

AccountType.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  btnTitle: PropTypes.string.isRequired,
  gridArea: PropTypes.string,
  advantages: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
    })
  ).isRequired,
};
export default AccountType;
