import React, { useContext } from "react";
import {
  HEADER_BIG_HEIGHT,
  HEADER_SMALL_HEIGHT,
} from "../../helpers/constants";
import { useWindowSize } from "../../helpers/hooks/use-window-size";
import LanguageContext from "../../context/language-context";
import { getWebTraderUrl } from "./webtrader-url";

const WebTraderLink = () => {
  const { isDesktop } = useWindowSize();
  const { selectedLanguage } = useContext(LanguageContext);

  return (
    <div
      style={{
        paddingTop: isDesktop ? HEADER_BIG_HEIGHT : HEADER_SMALL_HEIGHT,
      }}
    >
      <iframe
        src={getWebTraderUrl(selectedLanguage)}
        width="100%"
        height="900px"
      />
    </div>
  );
};

export default WebTraderLink;
