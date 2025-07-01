import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import ButtonLink from "../shared/button-link";
import ButtonPopup from "../shared/button-popup";
import { DIR_LTR, DIR_RTL } from "../../helpers/constants";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";

const TopMarketLayout = ({
  className,
  children,
  title,
  btnTitle,
  link,
  headerTemplate,
  btnOnClick,
}) => {
  const isRTL = useRtlDirection();

  const getButton = () => {
    if (btnOnClick) {
      return (
        <ButtonPopup
          onClick={btnOnClick}
          className={cn("top-market-layout__btn", "button-link--red")}
        >
          {btnTitle}
        </ButtonPopup>
      );
    }

    if (link) {
      return (
        <ButtonLink
          link={link}
          className={cn("top-market-layout__btn", "button-link--red")}
        >
          {btnTitle}
        </ButtonLink>
      );
    }

    return null;
  };

  return (
    <section
      className={cn("top-market-layout", className, {
        "top-market-layout--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className={"top-market-layout__wrapper"}>
        {headerTemplate && headerTemplate}
        {title && <h2 className="top-market-layout__title">{title}</h2>}
        <div className="top-market-layout__content">{children}</div>
        {btnTitle && getButton()}
      </div>
    </section>
  );
};

TopMarketLayout.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string,
  btnTitle: PropTypes.string,
  link: PropTypes.string,
  headerTemplate: PropTypes.node,
  btnOnClick: PropTypes.func,
};
export default TopMarketLayout;
