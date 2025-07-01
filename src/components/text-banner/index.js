import React from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import ButtonLink from "../shared/button-link";
import { useRtlDirection } from "../../helpers/hooks/use-rtl-direction";
import { DIR_LTR, DIR_RTL } from "../../helpers/constants";

const TextBanner = ({
  className,
  title,
  note,
  children,
  btnTitle1,
  link1,
  btnTitle2,
  link2,
  id,
}) => {
  const isRTL = useRtlDirection();

  return (
    <section
      className={cn("text-banner", className, {
        "text-banner--rtl": isRTL,
      })}
      id={id}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      <div className="text-banner__wrapper">
        {note && <p className="text-banner__note">{note}</p>}
        <h2 className="text-banner__title">{title}</h2>
        <p className="text-banner__description">{children}</p>
        {(btnTitle1 || btnTitle2) && (
          <div className="text-banner__btn-wrapper">
            {btnTitle1 && (
              <ButtonLink link={link1} className={cn("text-banner__btn")}>
                {btnTitle1}
              </ButtonLink>
            )}
            {btnTitle2 && (
              <ButtonLink link={link2} className={cn("text-banner__btn")}>
                {btnTitle2}
              </ButtonLink>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

TextBanner.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string.isRequired,
  note: PropTypes.string,
  children: PropTypes.node.isRequired,
  btnTitle1: PropTypes.string,
  link1: PropTypes.string,
  btnTitle2: PropTypes.string,
  link2: PropTypes.string,
  id: PropTypes.string,
};

export default TextBanner;
