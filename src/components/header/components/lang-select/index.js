import React, { useEffect } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import { AngleDownIcon } from "../../../shared/icons";
import { ANGLE_ICON_COLOR } from "../../../../helpers/constants";
import { useModal } from "../../../../helpers/hooks/use-modal";
import Popup from "../../../shared/popup";
import LangOptions from "../lang-options";
import { useRouter } from "next/router";
import { useCurrentLanguage } from "../../../../lib/i18n";

const LangSelect = ({ className, isHeader = false, setIsLangPopupOpened }) => {
  const { isShow, handleOpen, handleClose } = useModal();
  const router = useRouter();
  const currentLanguage = useCurrentLanguage();
  const { icon: Icon } = currentLanguage || {};

  const closePopup = () => {
    setIsLangPopupOpened?.(false);
    handleClose();
  };

  const setIconColor = (isShow) => {
    if (isHeader) {
      return isShow ? ANGLE_ICON_COLOR.white : ANGLE_ICON_COLOR.white;
    }
    return isShow ? ANGLE_ICON_COLOR.white : ANGLE_ICON_COLOR.red;
  };

  useEffect(() => {
    const handleRouteChange = () => {
      closePopup();
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router]);

  // Re-render when language changes (router.asPath changes)
  useEffect(() => {}, [router.asPath]);

  return (
    <>
      <button
        className={cn(
          "lang-select",
          { "lang-select--active": isShow },
          className
        )}
        type="button"
        onClick={() => {
          handleOpen();
          setIsLangPopupOpened?.(true);
        }}
      >
        {Icon && <Icon className="lang-select__flag" />}
        {isHeader && (
          <span className="lang-select__title">{currentLanguage.id}</span>
        )}
        <AngleDownIcon
          className={cn("lang-select__icon", {
            "lang-select__icon--up": isShow,
          })}
          color={setIconColor(isShow)}
        />
      </button>
      <Popup isPopupOpen={isShow} handlePopupClose={closePopup}>
        <LangOptions
          selectedLanguage={currentLanguage}
          languageSelectHandler={closePopup}
        />
      </Popup>
    </>
  );
};

LangSelect.propTypes = {
  className: PropTypes.string,
  isHeader: PropTypes.bool,
  setIsLangPopupOpened: PropTypes.func,
};
export default LangSelect;
