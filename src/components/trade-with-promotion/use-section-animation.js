import { useSpring } from "react-spring";
import {
  TWP_SECTION_CONFIG_BG,
  TWP_ICONS_INITIAL_SHIFT,
  setPositionY,
} from "../../helpers/animation.config";

export const useSectionAnimation = (elementIntersectionRef) => {
  const sectionAnimation1 = useSpring({
    ...TWP_SECTION_CONFIG_BG,
    from: setPositionY(TWP_ICONS_INITIAL_SHIFT.logo1),
    to: elementIntersectionRef?.isIntersecting
      ? setPositionY(0)
      : setPositionY(TWP_ICONS_INITIAL_SHIFT.logo1),
  });
  const sectionAnimation2 = useSpring({
    ...TWP_SECTION_CONFIG_BG,
    from: setPositionY(TWP_ICONS_INITIAL_SHIFT.logo2),
    to: elementIntersectionRef?.isIntersecting
      ? setPositionY(0)
      : setPositionY(TWP_ICONS_INITIAL_SHIFT.logo2),
  });
  const sectionAnimation3 = useSpring({
    ...TWP_SECTION_CONFIG_BG,
    from: setPositionY(TWP_ICONS_INITIAL_SHIFT.logo3),
    to: elementIntersectionRef?.isIntersecting
      ? setPositionY(0)
      : setPositionY(TWP_ICONS_INITIAL_SHIFT.logo3),
  });
  const sectionAnimation4 = useSpring({
    ...TWP_SECTION_CONFIG_BG,
    from: setPositionY(TWP_ICONS_INITIAL_SHIFT.netflix),
    to: elementIntersectionRef?.isIntersecting
      ? setPositionY(0)
      : setPositionY(TWP_ICONS_INITIAL_SHIFT.netflix),
  });
  const sectionAnimation5 = useSpring({
    ...TWP_SECTION_CONFIG_BG,
    from: setPositionY(TWP_ICONS_INITIAL_SHIFT.tesla),
    to: elementIntersectionRef?.isIntersecting
      ? setPositionY(0)
      : setPositionY(TWP_ICONS_INITIAL_SHIFT.tesla),
  });
  const sectionAnimation6 = useSpring({
    ...TWP_SECTION_CONFIG_BG,
    from: setPositionY(TWP_ICONS_INITIAL_SHIFT.airbnb),
    to: elementIntersectionRef?.isIntersecting
      ? setPositionY(0)
      : setPositionY(TWP_ICONS_INITIAL_SHIFT.airbnb),
  });
  const sectionAnimation7 = useSpring({
    ...TWP_SECTION_CONFIG_BG,
    from: setPositionY(TWP_ICONS_INITIAL_SHIFT.meta),
    to: elementIntersectionRef?.isIntersecting
      ? setPositionY(0)
      : setPositionY(TWP_ICONS_INITIAL_SHIFT.meta),
  });
  const sectionAnimation8 = useSpring({
    ...TWP_SECTION_CONFIG_BG,
    from: setPositionY(TWP_ICONS_INITIAL_SHIFT.amazon),
    to: elementIntersectionRef?.isIntersecting
      ? setPositionY(0)
      : setPositionY(TWP_ICONS_INITIAL_SHIFT.amazon),
  });
  const sectionAnimation9 = useSpring({
    ...TWP_SECTION_CONFIG_BG,
    from: setPositionY(TWP_ICONS_INITIAL_SHIFT.bitcoin),
    to: elementIntersectionRef?.isIntersecting
      ? setPositionY(0)
      : setPositionY(TWP_ICONS_INITIAL_SHIFT.bitcoin),
  });

  return {
    sectionAnimation1,
    sectionAnimation2,
    sectionAnimation3,
    sectionAnimation4,
    sectionAnimation5,
    sectionAnimation6,
    sectionAnimation7,
    sectionAnimation8,
    sectionAnimation9,
  };
};
