import React from "react";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";

const ErrorMessage = ({ text }) => {
  const { t } = useTranslationWithVariables();

  return <span className="error-message">{t(text)}</span>;
};

ErrorMessage.propTypes = {
  text: PropTypes.string.isRequired,
};
export default ErrorMessage;
