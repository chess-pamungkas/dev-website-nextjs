import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { Logo } from "../shared/icons";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";
import { DIR_LTR, DIR_RTL } from "../../helpers/constants";

const SplitTextPromotion = ({
  className,
  children,
  title,
  subtitle,
  table,
  button,
  buttonNote,
  id,
}) => {
  const isRTL = useRtlDirection();

  return (
    <section
      id={id}
      className={cn("split-text-promotion", className, {
        "split-text-promotion--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="split-text-promotion__wrapper">
        <div
          className={cn(
            "split-text-promotion__block",
            "split-text-promotion__block--left"
          )}
        >
          <Logo className="split-text-promotion__icon" />
        </div>
        <div
          className={cn(
            "split-text-promotion__block",
            "split-text-promotion__block--right"
          )}
        >
          <h3 className="split-text-promotion__title">{title}</h3>
          {subtitle && (
            <span className="split-text-promotion__subtitle">{subtitle}</span>
          )}
          <p className="split-text-promotion__text">{children}</p>
          {table && table}
          {button && button}
          {buttonNote && (
            <p className="split-text-promotion__btn-note">{buttonNote}</p>
          )}
        </div>
      </div>
    </section>
  );
};

SplitTextPromotion.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
  table: PropTypes.node,
  button: PropTypes.node,
  buttonNote: PropTypes.string,
  id: PropTypes.string,
};

export default SplitTextPromotion;
