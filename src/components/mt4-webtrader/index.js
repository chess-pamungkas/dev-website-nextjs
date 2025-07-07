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

    function callWebTerminal() {
      if (typeof window.MetaTraderWebTerminal === "function") {
        window.MetaTraderWebTerminal("webterminal", {
          version: 4,
          servers: ["OqtimaGlobal-Demo", "OqtimaGlobal-Server"],
          server: "OqtimaGlobal-Server",
          startMode: "login",
          language: MT_LANGUAGES_MAP[selectedLanguage.id],
          colorScheme: "green_on_black",
        });
        isIFrameAdded.current = true;
      } else {
        console.error("MetaTraderWebTerminal is not loaded or not a function");
      }
    }

    if (typeof window.MetaTraderWebTerminal !== "function") {
      const script = document.createElement("script");
      script.src = "https://trade.mql5.com/trade/widget.js";
      script.async = true;
      script.onload = callWebTerminal;
      document.body.appendChild(script);
    } else {
      callWebTerminal();
    }
  }, [selectedLanguage.id]);

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
