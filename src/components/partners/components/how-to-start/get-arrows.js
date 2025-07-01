import arrowLg from "../../../../assets/images/partners/arrow-lg.svg";
import arrowXl from "../../../../assets/images/partners/arrow-xl.svg";
import arrowSm1 from "../../../../assets/images/partners/arrow1-sm.svg";
import arrowSm2 from "../../../../assets/images/partners/arrow2-sm.svg";
import arrowMd1 from "../../../../assets/images/partners/arrow1-md.svg";
import arrowMd2 from "../../../../assets/images/partners/arrow2-md.svg";

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
