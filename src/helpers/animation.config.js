import { easings } from "react-spring";

const ANIMATION_DURATION = 400;
const TEXT_ANIMATION_DURATION = 300;
const TWP_SECTION_ANIMATION_DURATION = 800;

export const BACKGROUND_ANIMATION_DURATION = 500;

export const SPRING_CONFIG_BG = {
  config: {
    duration: ANIMATION_DURATION,
    mass: 0.8,
    tension: 150,
    friction: 25,
  },
};

export const SPRING_CONFIG_TEXT = {
  config: {
    duration: TEXT_ANIMATION_DURATION,
    mass: 0.8,
    tension: 150,
    friction: 25,
  },
};

export const TWP_SECTION_CONFIG_BG = {
  config: {
    duration: TWP_SECTION_ANIMATION_DURATION,
    easing: easings.easeInOutQuad,
    mass: 0.5,
    tension: 200,
    friction: 20,
  },
};

export const OPACITY_0 = {
  opacity: "0",
};

export const OPACITY_1 = {
  opacity: "1",
};

export const TRADE_PROMO_INTERSECTION_RATIO_XL = 0.1;
export const PROMO_INTERSECTION_RATIO_TO_SCROLL_XL = 0.1;
export const PROMO_INTERSECTION_RATIO_TO_REVERSE_XL = 0.2;

export const TRADE_PROMO_INTERSECTION_RATIO_LG = 0.25;
export const PROMO_INTERSECTION_RATIO_TO_SCROLL_LG = 0.2;
export const PROMO_INTERSECTION_RATIO_TO_REVERSE_LG = 0.45;

export const TRADE_PROMO_INTERSECTION_RATIO_TABLET = 0.2;
export const PROMO_INTERSECTION_RATIO_TO_SCROLL_TABLET = 0.1;
export const PROMO_INTERSECTION_RATIO_TO_REVERSE_TABLET = 0.2;

export const TEXT_PROMO_INTERSECTION_LOW_HEIGHT = 750;

export const INTERSECTION_OBSERVER_CONFIG = {
  tradePromo: {
    threshold: [
      0.02, 0.05, 0.07, 0.1, 0.12, 0.15, 0.17, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7,
      0.85, 0.89, 0.92, 0.95, 0.97, 1,
    ],
    freezeOnceVisible: false,
  },
  tradePromoForHighScreen: {
    threshold: [0.7, 0.85, 0.89, 0.92, 0.95, 0.97, 1],
    freezeOnceVisible: false,
  },
  promo1: {
    threshold: [
      0.02, 0.05, 0.07, 0.1, 0.12, 0.15, 0.17, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7,
      0.85, 0.89, 0.92, 0.95, 0.97, 1,
    ],
    freezeOnceVisible: false,
  },
  promo1ForHighScreen: {
    threshold: [0.7, 0.85, 0.89, 0.92, 0.95, 0.97, 1],
    freezeOnceVisible: false,
  },
  promo2: {
    threshold: [
      0.02, 0.05, 0.07, 0.1, 0.12, 0.15, 0.17, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7,
      0.85, 0.89, 0.92, 0.95, 0.97, 1,
    ],
    freezeOnceVisible: false,
  },
  promo3: {
    threshold: [
      0.02, 0.05, 0.07, 0.1, 0.12, 0.15, 0.17, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7,
      0.85, 0.89, 0.92, 0.95, 0.97, 1,
    ],
    freezeOnceVisible: false,
  },
  textPromo4: {
    threshold: 0.7,
    freezeOnceVisible: true,
  },
  lowHeightTextPromo4: {
    threshold: [0.62, 0.65, 0.68],
    freezeOnceVisible: true,
  },
  TWPSection: {
    threshold: 0.1,
    freezeOnceVisible: false,
  },
};

export const TWP_ICONS_INITIAL_SHIFT = {
  logo1: -430,
  logo2: -180,
  logo3: -270,
  netflix: -100,
  tesla: -180,
  airbnb: -50,
  meta: -100,
  amazon: -300,
  bitcoin: -250,
};

export const TITLES_ANIMATION_DEFAULT_FROM_CONFIG = {
  ...OPACITY_0,
  top: "-40px",
  position: "relative",
};

export const TITLES_ANIMATION_DEFAULT_TO_STEP_1_CONFIG = {
  ...OPACITY_1,
  top: "0",
  config: {
    duration: 60, // Increased from 30 to 60ms
    mass: 0.8, // Increased from 0.5 to 0.8 for smoother movement
    tension: 200, // Reduced from 300 to 200 for slower animation
    friction: 25, // Increased from 20 to 25 for more damping
  },
};

export const TITLES_ANIMATION_DEFAULT_TO_STEP_2_CONFIG = {
  ...OPACITY_0,
  top: "40px",
  config: {
    duration: 60, // Increased from 30 to 60ms
    mass: 0.8, // Increased from 0.5 to 0.8 for smoother movement
    tension: 200, // Reduced from 300 to 200 for slower animation
    friction: 25, // Increased from 20 to 25 for more damping
  },
  delay: 1000, // Increased from 800 to 1000ms for longer delay
};

export const setPositionY = (value) => ({
  transform: `translateY(${value}px)`,
});

export const DEFAULT_WRAPPER_WIDTH = 90;
export const DELAY_BEFORE_NEXT_KEYWORD = 1800; // Increased from 1200 to 1800ms for slower keyword transitions
