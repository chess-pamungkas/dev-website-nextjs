import React, { useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../helpers/hooks/use-translation-with-vars";
import {
  FAQ_ALL,
  FAQ_BEGINNERS,
  FAQ_QUICK_ANSWER,
  getFAQMarket,
} from "../../helpers/faq";
import Faq from "../faq";
import { stringTransformToKebabCase } from "../../helpers/services/string-service";
import FaqSearchBar from "./faq-search-bar";
const marketsIcon = "/images/icons/markets.svg";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";
import { DIR_LTR, DIR_RTL } from "../../helpers/constants";

const HelpCenter = ({ className }) => {
  const { t } = useTranslationWithVariables();
  const [searchResults, setSearchResults] = useState([]);
  const [noSearchResult, setNoSearchResult] = useState(false);
  const isRTL = useRtlDirection();
  const faqMarket = getFAQMarket();

  const HelpCenterBlock = ({
    title,
    subtitle,
    faq,
    titleClassName,
    classNames,
  }) => (
    <div className="help-center__block">
      {title && (
        <h4 className={cn("help-center__block-title", titleClassName)}>
          {title}
        </h4>
      )}
      {subtitle && <p className="help-center__block-subtitle">{subtitle}</p>}
      {faq.map((item, i) => (
        <Faq
          key={`faq-${stringTransformToKebabCase(
            item.title || title || `faq-search-${i}`
          )}`}
          title={
            item.title && (
              <>
                <img
                  src={
                    typeof item.icon === "string" ? item.icon : item.icon?.src
                  }
                  alt=""
                  className="help-center__title-icon"
                />
                <span>{t(item.title)}</span>
              </>
            )
          }
          faq={item.content}
          className={cn("faq--help-center", classNames)}
          isFaqBtnHidden
        />
      ))}
    </div>
  );
  HelpCenterBlock.propTypes = {
    title: PropTypes.node,
    subtitle: PropTypes.string,
    faq: PropTypes.array.isRequired,
    titleClassName: PropTypes.string,
    classNames: PropTypes.arrayOf(PropTypes.string),
  };
  return (
    <section
      className={cn("help-center", className, {
        "help-center--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="help-center__wrapper">
        <h2 className="help-center__title">{t("faq-title")}</h2>
        <FaqSearchBar
          setSearchResults={setSearchResults}
          setNoSearchResult={setNoSearchResult}
        />
        {noSearchResult ? (
          <h2 className="help-center__title">{t("search-no-results-text")}</h2>
        ) : searchResults.length > 0 ? (
          <HelpCenterBlock
            faq={searchResults}
            classNames={["help-center--market"]}
          />
        ) : (
          <>
            <HelpCenterBlock
              title={t("faq_quick-title")}
              titleClassName="help-center__block-title--quick-answer"
              subtitle={t("faq_quick-subtitle")}
              faq={FAQ_QUICK_ANSWER}
              classNames={[
                "help-center--no-title",
                "help-center--quick-answer",
              ]}
            />
            <HelpCenterBlock faq={FAQ_ALL} classNames={["help-center--all"]} />
            <HelpCenterBlock
              title={
                <>
                  <img
                    src={
                      typeof marketsIcon === "string"
                        ? marketsIcon
                        : marketsIcon.src
                    }
                    className="help-center__block-icon"
                    alt=""
                  />
                  <span>{t("faq_market-title")}</span>
                </>
              }
              titleClassName="help-center__block-title--market"
              faq={faqMarket}
              classNames={["help-center--market"]}
            />
            <HelpCenterBlock
              title={t("faq_beginners-title")}
              titleClassName="help-center__block-title--beginners"
              faq={FAQ_BEGINNERS}
              classNames={["help-center--no-title", "help-center--beginners"]}
            />
          </>
        )}
      </div>
    </section>
  );
};

HelpCenter.propTypes = {
  className: PropTypes.string,
};
export default HelpCenter;
