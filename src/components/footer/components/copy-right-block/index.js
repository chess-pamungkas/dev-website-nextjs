import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import {
  getFooterCompanyName,
  getFooterCopyright,
} from "../../../../helpers/footer.config";
import { useTranslationWithVariables } from "../../../../helpers/hooks/use-translation-with-vars";

const CopyRightBlock = ({ className }) => {
  const { t } = useTranslationWithVariables();

  return (
    <>
      <section className={cn("copy-right-block", className)}>
        <div className="container">
          <div className="copy-right-block__text">{getFooterCopyright(t)}</div>
        </div>
      </section>
      <section className={cn("copy-right-block-company", className)}>
        <div className="container">
          <div className="copy-right-block-company__text">
            {getFooterCompanyName(t)}
          </div>
        </div>
      </section>
    </>
  );
};

CopyRightBlock.propTypes = {
  className: PropTypes.string,
};

export default CopyRightBlock;
