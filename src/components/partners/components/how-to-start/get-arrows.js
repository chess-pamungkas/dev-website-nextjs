const arrowLg = "/images/partners/arrow-lg.svg";
const arrowXl = "/images/partners/arrow-xl.svg";
const arrowSm1 = "/images/partners/arrow1-sm.svg";
const arrowSm2 = "/images/partners/arrow2-sm.svg";
const arrowMd1 = "/images/partners/arrow1-md.svg";
const arrowMd2 = "/images/partners/arrow2-md.svg";
export const getArrows = (isMobile, isTablet, isLG, isXL) => {
  let arrow1, arrow2;
  switch (true) {
    case isMobile:
      arrow1 = arrowSm1;
      arrow2 = arrowSm2;
      break;
    case isTablet:
      arrow1 = arrowMd1;
      arrow2 = arrowMd2;
      break;
    case isLG:
      arrow1 = arrowLg;
      break;
    case isXL:
      arrow1 = arrowXl;
      break;
    default:
      arrow1 = "";
      arrow2 = "";
  }

  return { arrow1, arrow2 };
};
