import React from "react";
import PropTypes from "prop-types";
import cn from "classnames";
import { useTranslationWithVariables } from "../../helpers/hooks/use-translation-with-vars";
import Accordion from "../shared/accordion";
import { AccordionActiveIcon, AccordionIcon } from "../shared/icons";
import ButtonLink from "../shared/button-link";
import { DIR_LTR, DIR_RTL, FAQ_PAGE_LINK } from "../../helpers/constants";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";

const Faq = ({ className, title, faq, isFaqBtnHidden, subTitleTemplate }) => {
  const { t } = useTranslationWithVariables();
  const isRTL = useRtlDirection();

  return (
    <section
      className={cn("faq", className, {
        "faq--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="faq__wrapper">
        <div className="faq__delimiter" />
        <h2 className="faq__title">{title || t("faq-title")}</h2>
        {subTitleTemplate && subTitleTemplate}
        <div className="faq__accordion-wrapper">
          {faq.length > 0 &&
            faq.map((item, i) => (
              <Accordion
                key={`faq-accordion-${i}`}
                className="faq__accordion"
                icon={AccordionIcon}
                iconForActive={AccordionActiveIcon}
                title={item.question}
              >
                {item.answer.map((content, i) => (
                  <span
                    key={`faq-answer-${i}`}
                    className={cn("faq__text", {
                      "faq__text--bold": item.bold?.includes(i),
                    })}
                  >
                    {t(content)}
                  </span>
                ))}
              </Accordion>
            ))}
        </div>
        {!isFaqBtnHidden && (
          <ButtonLink
            link={FAQ_PAGE_LINK}
            className="button-link--with-red-border"
          >
            {t("faq-btn-text")}
          </ButtonLink>
        )}
      </div>
    </section>
  );
};

Faq.propTypes = {
  className: PropTypes.string,
  title: PropTypes.object,
  faq: PropTypes.arrayOf(
    PropTypes.shape({
      question: PropTypes.string.isRequired,
      answer: PropTypes.arrayOf(PropTypes.string).isRequired,
      bold: PropTypes.arrayOf(PropTypes.number),
    })
  ).isRequired,
  isFaqBtnHidden: PropTypes.bool,
  subTitleTemplate: PropTypes.node,
};
export default Faq;
