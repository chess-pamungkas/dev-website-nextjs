import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../helpers/hooks/use-translation-with-vars";
import HighlightedLocalizationText from "../../components/shared/highlighted-localization-text";
import { ACCOUNT_TYPES } from "../../helpers/accounts-type.config";
import AccountType from "./account-type";
import { stringTransformToKebabCase } from "../../helpers/services/string-service";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";
import { DIR_LTR, DIR_RTL } from "../../helpers/constants";

const AccountsType = ({ className }) => {
  const { t } = useTranslationWithVariables();
  const isRTL = useRtlDirection();

  return (
    <section
      className={cn("accounts-type", className, {
        "accounts-type--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="accounts-type__desc-block">
        <h2 className="accounts-type__title">
          {t("accounts-type_accounts-type-title")}
        </h2>
        <p className="accounts-type__description">
          <HighlightedLocalizationText
            localizationText="accounts-type_accounts-type-description"
            wordsToHighlight="accounts-type_accounts-type-description-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        </p>
      </div>
      {ACCOUNT_TYPES.map((block) => (
        <AccountType
          key={`account-type-${stringTransformToKebabCase(block.name)}`}
          {...block}
        />
      ))}
    </section>
  );
};

AccountsType.propTypes = {
  className: PropTypes.string,
};

export default AccountsType;
