import React from "react";
import HighlightedLocalizationText from "../../../shared/highlighted-localization-text";
import Performance from "../../../performance";
import { ADVANTAGES } from "../../../../helpers/config";

const PerformanceContent = () => {
  return (
    <Performance
      title={
        <HighlightedLocalizationText
          localizationText="index_performance-title1"
          wordsToHighlight="performance-title1-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-red"
        >
          <br />
          <HighlightedLocalizationText
            localizationText="index_performance-title2"
            wordsToHighlight="performance-title2-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-red"
          />
        </HighlightedLocalizationText>
      }
      advantages={ADVANTAGES}
    />
  );
};

export default PerformanceContent;
