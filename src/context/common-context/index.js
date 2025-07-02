import React, {
  useContext,
  createContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";
import PropTypes from "prop-types";
import { useWindowSize } from "../../helpers/hooks/use-window-size";
import { isBrowser } from "../../helpers/services/is-browser";
import LanguageContext from "../language-context";

const CommonContext = createContext({});

export const CommonProvider = ({ children }) => {
  const { width } = useWindowSize();
  const [sectionOptions, setSectionOptions] = useState(null);
  const [headerRef, setHeaderRef] = useState(useRef());
  const [isSearchBarAttached, setIsSearchBarAttached] = useState(true);
  const [heightOffset, setHeightOffset] = useState(0);
  const [dropdownHeightOffset, setDropdownHeightOffset] = useState(0);
  const { selectedLanguage } = useContext(LanguageContext);
  const headerMainWrapperRef = useRef();
  const riskWarningRef = useRef();
  const [isScrolled, setIsScrolled] = useState("");

  const checkIsScrolled = () => {
    if (isBrowser()) {
      setIsScrolled(window.scrollY > 0);
    }
  };

  // Add throttling for scroll events
  const throttledCheckIsScrolled = useCallback(() => {
    let ticking = false;

    return () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkIsScrolled();
          ticking = false;
        });
        ticking = true;
      }
    };
  }, []);

  useEffect(() => {
    if (isBrowser()) {
      const throttledHandler = throttledCheckIsScrolled();
      window.addEventListener("scroll", throttledHandler, { passive: true });

      return () => {
        window.removeEventListener("scroll", throttledHandler);
      };
    }
  }, [throttledCheckIsScrolled]);

  useEffect(() => {
    const updateOffset = () => {
      if (isBrowser()) {
        setHeightOffset(riskWarningRef?.current?.offsetHeight || 0);
      }
    };

    const updateDropdownOffset = () => {
      if (isBrowser() && headerMainWrapperRef?.current?.offsetTop) {
        setDropdownHeightOffset(
          headerMainWrapperRef.current.offsetTop +
            headerMainWrapperRef.current.offsetHeight
        );
      }
    };

    // Use requestIdleCallback for better performance
    const updateOffsets = () => {
      if ("requestIdleCallback" in window) {
        requestIdleCallback(
          () => {
            updateOffset();
            updateDropdownOffset();
          },
          { timeout: 100 }
        );
      } else {
        // Fallback to requestAnimationFrame
        requestAnimationFrame(() => {
          updateOffset();
          updateDropdownOffset();
        });
      }
    };

    // Initial update with minimal delay
    const initialTimer = setTimeout(updateOffsets, 50);

    // We should do this after header transition (0.4s) ends
    const transitionTimer = setTimeout(updateOffsets, 400);

    return () => {
      clearTimeout(initialTimer);
      clearTimeout(transitionTimer);
    };
  }, [
    headerRef,
    sectionOptions,
    width,
    selectedLanguage,
    isScrolled,
    riskWarningRef,
  ]);

  return (
    <CommonContext.Provider
      value={{
        sectionOptions,
        setSectionOptions,
        headerRef,
        setHeaderRef,
        isSearchBarAttached,
        setIsSearchBarAttached,
        heightOffset,
        headerMainWrapperRef,
        dropdownHeightOffset,
        isScrolled,
        riskWarningRef,
      }}
    >
      {children}
    </CommonContext.Provider>
  );
};

CommonProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default CommonContext;
