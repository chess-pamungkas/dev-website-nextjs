import React, { useState, useEffect, useRef } from "react";
import ButtonPopup from "../shared/button-popup";
import { ShowRegistrationPopup } from "../../helpers/constants";
import { useTranslationWithVariables } from "../../helpers/hooks/use-translation-with-vars";
const ChevronIcon = "/images/icons/chevron.svg";
import { setLangParam } from "../../helpers/services/language-service";

function Bookmark() {
  // All hooks must be called unconditionally at the top
  const [isExpanded, setExpanded] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [isBlinking, setBlinking] = useState(true);
  const [isShaking, setShaking] = useState(false);
  const [isClosing, setClosing] = useState(false);
  const [hasBeenClosed, setHasBeenClosed] = useState(false);

  const bookmarkRef = useRef(null);
  const { t } = useTranslationWithVariables();

  const langParam = setLangParam(); // Get the language parameter
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  const handleShowRegistrationPopup = () => {
    setIsPopupOpen(true); // Open the popup
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  const initiateClosingSequence = () => {
    setShaking(true);
    // Use requestAnimationFrame for better performance
    requestAnimationFrame(() => {
      setTimeout(() => {
        setShaking(false);
        setClosing(true);
        requestAnimationFrame(() => {
          setTimeout(() => {
            setExpanded(false);
            setClosing(false);
            setHasBeenClosed(true);
            setBlinking(false);
          }, 300);
        });
      }, 1500);
    });
  };

  useEffect(() => {
    if (isVisible && !isExpanded && !hasBeenClosed) {
      // Use requestIdleCallback for better performance
      const scheduleAutoOpen = () => {
        const autoOpenTimeout = setTimeout(() => {
          setExpanded(true);
          const autoCloseTimeout = setTimeout(initiateClosingSequence, 1500);
          return () => clearTimeout(autoCloseTimeout);
        }, 3000);
        return () => clearTimeout(autoOpenTimeout);
      };

      if ("requestIdleCallback" in window) {
        const idleCallback = requestIdleCallback(scheduleAutoOpen, {
          timeout: 1000,
        });
        return () => cancelIdleCallback(idleCallback);
      } else {
        return scheduleAutoOpen();
      }
    }
  }, [isVisible, isExpanded, hasBeenClosed]);

  const resetBookmark = () => {
    setExpanded(false);
    setBlinking(true);
    setShaking(false);
    setClosing(false);
    setHasBeenClosed(false);
  };

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollPosition = window.scrollY;
          const wasVisible = isVisible;
          setVisible(scrollPosition > 100);

          if (wasVisible && scrollPosition <= 100) {
            // Reset states when scrolled back to top
            resetBookmark();
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isVisible]);

  const handleBookmarkClick = () => {
    if (!isExpanded) {
      setExpanded(true);
      // Use requestAnimationFrame for better performance
      requestAnimationFrame(() => {
        setTimeout(initiateClosingSequence, 1000);
      });
    }
  };

  const bookmarkClass = `${isExpanded ? "expanded" : "closed"} ${
    isVisible ? "" : "hidden"
  }`;
  const buttonClass = `${isShaking ? "shaking" : ""} ${
    isClosing ? "closing" : ""
  }`;

  return (
    <>
      <div
        ref={bookmarkRef}
        className={`bookmark ${bookmarkClass}`}
        onClick={handleBookmarkClick}
      >
        {isExpanded ? (
          <ButtonPopup
            onClick={handleShowRegistrationPopup}
            className={`bookmark-button-link ${buttonClass}`}
          >
            {t("button-sign-up")}
          </ButtonPopup>
        ) : (
          <img
            src={
              typeof ChevronIcon === "string" ? ChevronIcon : ChevronIcon.src
            }
            alt="Chevron"
            className={`text ${isBlinking ? "blinking" : ""}`}
          />
        )}
      </div>

      {/* Render the popup */}
      {isPopupOpen && (
        <ShowRegistrationPopup
          isOpen={isPopupOpen}
          onClose={handleClosePopup}
          langParam={langParam}
        />
      )}
    </>
  );
}

export default Bookmark;
