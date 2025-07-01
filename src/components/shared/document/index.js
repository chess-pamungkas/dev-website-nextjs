import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { DownloadIcon } from "../icons";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";

const Document = ({ className, document }) => {
  const { t } = useTranslationWithVariables();

  return (
    <div className={cn("document", className)}>
      <a
        className="document__link"
        href={document.file}
        target="_blank"
        rel="noreferrer"
      >
        <DownloadIcon className="document__icon" />
        <span className="document__name">{t(document.name)}</span>
        <span
          className={cn(
            "button-link",
            "button-link--with-red-border",
            "document__mock-btn"
          )}
        >
          {t("legal_documents-btn")}
        </span>
      </a>
    </div>
  );
};

Document.propTypes = {
  className: PropTypes.string,
  document: PropTypes.shape({
    file: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Document;
