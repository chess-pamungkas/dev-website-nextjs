import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { animated, useTransition, easings } from "react-spring";
import { useTranslationWithVariables } from "../../../helpers/hooks/use-translation-with-vars";
import {
  DEFAULT_WRAPPER_WIDTH,
  DELAY_BEFORE_NEXT_KEYWORD,
} from "../../../helpers/animation.config";

const TypingAnimation = ({ keywords }) => {
  const { t } = useTranslationWithVariables();

  const buildChars = (str) => {
    return [...t(str)].map((char, key) => ({ char, key }));
  };

  const wrapperRef = useRef(null);

  const [chars, setChars] = useState(buildChars(keywords[0]));
  const [keywordIndex, setKeywordIndex] = useState(0);
  const [removeChars, setRemoveChars] = useState(false);
  const [wrapperRefWidth, setWrapperRefWidth] = useState(DEFAULT_WRAPPER_WIDTH);

  const transition = useTransition(chars, {
    from: {
      opacity: 0,
      config: {
        duration: 50,
      },
    },
    enter: [
      {
        opacity: 1,
        config: {
          duration: 100,
          easing: easings.linear,
        },
      },
    ],
    leave: {
      opacity: 0,
      config: {
        duration: 50,
      },
    },
    trail: 50,
    onRest: (_result, _spring, item) => {
      if (keywordIndex + 1 !== keywords.length) {
        if (!removeChars && item.key === chars.length - 1) {
          setWrapperRefWidth(wrapperRef?.current?.offsetWidth);
          setTimeout(() => {
            setRemoveChars(true);
            setChars(chars.slice(0, chars.length - 1));
          }, DELAY_BEFORE_NEXT_KEYWORD);
        }

        if (removeChars) {
          if (chars.length === 0) {
            setRemoveChars(false);
            setKeywordIndex(keywordIndex + 1);
            setChars(buildChars(keywords[keywordIndex + 1]));
            setWrapperRefWidth(DEFAULT_WRAPPER_WIDTH);
          } else {
            setChars(chars.slice(0, chars.length - 1));
          }
        }
      }
    },
  });

  return (
    <span
      style={{
        display: "inline-block",
        maxWidth: "100%",
        minWidth: wrapperRefWidth + "px",
        overflow: "hidden",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
      }}
      ref={wrapperRef}
    >
      {transition((styles, item) => {
        return (
          <animated.span key={`typingAnimationKey${item.key}`} style={styles}>
            {item.char}
          </animated.span>
        );
      })}
    </span>
  );
};

TypingAnimation.propTypes = {
  keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
};
export default TypingAnimation;
