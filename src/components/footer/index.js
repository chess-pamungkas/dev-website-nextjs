import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { useTranslationWithVariables } from "../../helpers/hooks/use-translation-with-vars";
import CopyRightBlock from "./components/copy-right-block";
import { LogoTextMain } from "../shared/icons";
import { getFooterText } from "../../helpers/footer.config";
import Menu from "./components/menu";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";
import { DIR_LTR, DIR_RTL } from "../../helpers/constants";
import { useWindowSize } from "../../helpers/hooks/use-window-size";

const Footer = ({ className }) => {
  const { t } = useTranslationWithVariables();
  const isRTL = useRtlDirection();
  const { isTablet, isMobile } = useWindowSize();

  return (
    <footer
      className={cn("footer", className, {
        "footer--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div
        className={cn("container", {
          "container--no-padding": !isMobile && !isTablet,
        })}
      >
        <div className="footer__wrapper">
          <div className="footer__logo-wrapper">
            <LogoTextMain />
            <p className="footer__text">{t(getFooterText())}</p>
          </div>
          <div className="footer__menu-wrapper">
            <Menu />
          </div>
        </div>
      </div>
      <CopyRightBlock />
    </footer>
  );
};

Footer.propTypes = {
  className: PropTypes.string,
};
export default Footer;
