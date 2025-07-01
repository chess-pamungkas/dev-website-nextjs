import React, { useEffect, useRef, useContext } from "react";
import {
  HEADER_BIG_HEIGHT,
  HEADER_SMALL_HEIGHT,
} from "../../helpers/constants";
import { useWindowSize } from "../../helpers/hooks/use-window-size";
import { MT_LANGUAGES_MAP } from "../../helpers/lang-options.config";
import LanguageContext from "../../context/language-context";

const Mt4WebTraderLink = () => {
  const { isDesktop } = useWindowSize();
  const { selectedLanguage } = useContext(LanguageContext);
  const isIFrameAdded = useRef(false);

  useEffect(() => {
    if (isIFrameAdded.current) return;

    // Note: MT Script is loaded in gatsby-ssr.js file
    window.MetaTraderWebTerminal("webterminal", {
      version: 4,
      servers: ["OqtimaGlobal-Demo", "OqtimaGlobal-Server"],
      server: "OqtimaGlobal-Server",
      startMode: "login",
      language: MT_LANGUAGES_MAP[selectedLanguage.id],
      colorScheme: "green_on_black",
    });

    isIFrameAdded.current = true;
  }, []);

  return (
    <div
      id="webterminal"
      style={{
        paddingTop: isDesktop ? HEADER_BIG_HEIGHT : HEADER_SMALL_HEIGHT,
        height: "100vh",
        width: "100%",
      }}
    ></div>
  );
};

export default Mt4WebTraderLink;
