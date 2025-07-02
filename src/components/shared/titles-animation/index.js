import React, { useEffect, useState, useContext, useRef } from "react";
import PropTypes from "prop-types";
import { animated, useSpring } from "react-spring";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import LanguageContext from "../../../context/language-context";
import {
  TITLES_ANIMATION_DEFAULT_FROM_CONFIG,
  TITLES_ANIMATION_DEFAULT_TO_STEP_1_CONFIG,
  TITLES_ANIMATION_DEFAULT_TO_STEP_2_CONFIG,
} from "../../../helpers/animation.config";

const TitlesAnimation = ({
  titles,
  isAnimationFinished,
  setIsAnimationFinished,
  children,
  isChildrenAnimation,
  animationToStep1Config,
  animationToStep2Config,
}) => {
  const { t } = useTranslationWithVariables();
  const { selectedLanguage } = useContext(LanguageContext);
  const prevLanguage = useRef(selectedLanguage?.id);

  const [activeItem, setActiveItem] = useState(
    isChildrenAnimation ? React.Children.toArray(children[0]) : t(titles[0])
  );
  const [items, setItems] = useState(null);
  const [index, setIndex] = useState(0);

  // Custom slower animation configurations
  const customStep1Config = {
    ...TITLES_ANIMATION_DEFAULT_TO_STEP_1_CONFIG,
    config: {
      ...TITLES_ANIMATION_DEFAULT_TO_STEP_1_CONFIG.config,
      duration: 120, // Increased from 60 to 120ms
      mass: 1.0, // Increased from 0.8 to 1.0 for even smoother movement
      tension: 150, // Reduced from 200 to 150 for slower animation
      friction: 30, // Increased from 25 to 30 for more damping
    },
  };

  const customStep2Config = {
    ...TITLES_ANIMATION_DEFAULT_TO_STEP_2_CONFIG,
    config: {
      ...TITLES_ANIMATION_DEFAULT_TO_STEP_2_CONFIG.config,
      duration: 120, // Increased from 60 to 120ms
      mass: 1.0, // Increased from 0.8 to 1.0 for even smoother movement
      tension: 150, // Reduced from 200 to 150 for slower animation
      friction: 30, // Increased from 25 to 30 for more damping
    },
    delay: 1500, // Increased from 1000 to 1500ms for longer delay
  };

  useEffect(() => {
    let shouldReset = false;
    if (prevLanguage.current !== selectedLanguage?.id) {
      shouldReset = true;
      prevLanguage.current = selectedLanguage?.id;
    }
    if (shouldReset) {
      setIsAnimationFinished(false);
      setIndex(0);
      if (isChildrenAnimation && children?.length) {
        const arr = React.Children.toArray(children);
        setItems(arr);
        setActiveItem(arr[0]);
      } else if (titles?.length) {
        setItems(titles);
        setActiveItem(t(titles[0]));
      }
    } else if (items == null) {
      // Initial mount
      if (isChildrenAnimation && children?.length) {
        const arr = React.Children.toArray(children);
        setItems(arr);
        setActiveItem(arr[0]);
      } else if (titles?.length) {
        setItems(titles);
        setActiveItem(t(titles[0]));
      }
    }
    // eslint-disable-next-line
  }, [isChildrenAnimation, titles, children, t, selectedLanguage]);

  const animationStyles = useSpring({
    loop: true,
    from: TITLES_ANIMATION_DEFAULT_FROM_CONFIG,
    to: [
      animationToStep1Config || customStep1Config,
      {
        ...(animationToStep2Config || customStep2Config),
        onRest: () => {
          // Add a small delay before changing to next item
          setTimeout(() => {
            if (index < items.length - 1) {
              setActiveItem(
                isChildrenAnimation ? items[index + 1] : t(items[index + 1])
              );
              setIndex(index + 1);
            }

            if (index === items.length - 2) {
              setActiveItem(
                isChildrenAnimation
                  ? items[items.length - 1]
                  : t(items[titles.length - 1])
              );
              setIsAnimationFinished(true);
            }
          }, 200); // Add 200ms delay between transitions
        },
      },
    ],
  });

  return isAnimationFinished ? (
    activeItem
  ) : (
    <animated.div style={animationStyles}>{activeItem}</animated.div>
  );
};

TitlesAnimation.propTypes = {
  titles: PropTypes.arrayOf(PropTypes.string),
  isAnimationFinished: PropTypes.bool.isRequired,
  setIsAnimationFinished: PropTypes.func.isRequired,
  children: PropTypes.node,
  isChildrenAnimation: PropTypes.bool,
  animationToStep1Config: PropTypes.object,
  animationToStep2Config: PropTypes.object,
};
export default TitlesAnimation;
