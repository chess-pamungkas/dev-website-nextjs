"use client";
import React, { useState, useContext, useEffect } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../helpers/hooks/use-translation-with-vars";
import { ShowRegistrationPopup } from "../../helpers/constants";
import TitlesAnimation from "../shared/titles-animation";
import { MarketingContext } from "../../context/marketing-context";
import {
  CONTENT_HEROES,
  SECT1_TEXT_SEQUENCES,
  getDefaultTextSequence,
} from "../../helpers/marketing.config";
import { transformParamToKey } from "../../helpers/services/marketing-service";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";
import LanguageContext from "../../context/language-context";
import ButtonPopup from "../shared/button-popup";

const MainPromotion = ({ className, isShowHero = true }) => {
  const [isAnimationFinished, setIsAnimationFinished] = useState(false);

  const { t } = useTranslationWithVariables();
  const { selectedLanguage } = useContext(LanguageContext);
  const { content, sect1 } = useContext(MarketingContext);
  const isRTL = useRtlDirection();
  const DEFAULT_TEXT_SEQUENCE = getDefaultTextSequence(selectedLanguage.id); // Pass the current language here
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  useEffect(() => {
    // Reset animation when language changes
    setIsAnimationFinished(false);
  }, [selectedLanguage.id]);

  const handleShowRegistrationPopup = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  const hero =
    CONTENT_HEROES[transformParamToKey(content)] || CONTENT_HEROES.default;

  const titles =
    SECT1_TEXT_SEQUENCES[transformParamToKey(sect1)] || DEFAULT_TEXT_SEQUENCE;

  return (
    <div
      style={{
        position: "relative",
        width: "100vw",
        left: "50%",
        right: "50%",
        marginLeft: "-50vw",
        marginRight: "-50vw",
      }}
    >
      <div
        className={cn("main-promotion-bg", {
          "main-promotion-bg--rtl": isRTL,
        })}
      />
      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        <section
          className={cn("main-promotion", className, {
            "main-promotion--rtl": isRTL,
          })}
        >
          {isShowHero && (
            <>
              <div className="main-promotion__person">
                <span className="main-promotion__name">{t(hero.name)}</span>
                {selectedLanguage.id === "jp" &&
                  hero.surname &&
                  t(hero.surname) !== hero.surname && (
                    <span className="main-promotion__name">
                      {t(hero.surname)}
                    </span>
                  )}
                <span className="main-promotion__description">
                  {t(hero.text)}
                </span>
              </div>
              <div className="main-promotion__photo">
                <img
                  src={hero.image}
                  alt={hero.name}
                  className="main-promotion__img"
                />
              </div>
            </>
          )}
          <div
            className={cn("main-promotion__wrapper", {
              "main-promotion__wrapper--without-hero": !isShowHero,
            })}
          >
            <div className="main-promotion__block">
              <h1 className="main-promotion__title-wrapper">
                <span className="main-promotion__title">
                  {t("index_main-promotion-title")}
                </span>
                <span className="main-promotion__title main-promotion__title--big">
                  {selectedLanguage.id !== "jp" ? (
                    <TitlesAnimation
                      titles={titles}
                      isAnimationFinished={isAnimationFinished}
                      setIsAnimationFinished={setIsAnimationFinished}
                    />
                  ) : (
                    <span>{t(titles[0])}</span>
                  )}
                </span>
              </h1>
              <ButtonPopup
                onClick={handleShowRegistrationPopup}
                className={cn({
                  "button-link--snake-animation": isAnimationFinished,
                })}
              >
                {isAnimationFinished && (
                  <>
                    <span className="button-link--snake-animation-line-top" />
                    <span className="button-link--snake-animation-line-left" />
                    <span className="button-link--snake-animation-line-right" />
                    <span className="button-link--snake-animation-line-bottom" />
                  </>
                )}
                {t("button-trade-now")}
              </ButtonPopup>
            </div>
          </div>
        </section>
        {isPopupOpen && (
          <ShowRegistrationPopup
            isOpen={isPopupOpen}
            onClose={handleClosePopup}
            langParam={selectedLanguage.id}
          />
        )}
      </div>
    </div>
  );
};

MainPromotion.propTypes = {
  className: PropTypes.string,
  isShowHero: PropTypes.bool,
};
export default MainPromotion;
