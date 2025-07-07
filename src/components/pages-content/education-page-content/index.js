import React from "react";
import cn from "classnames";
import TopMarketPromotion from "../../top-market-promotion";
const promotion = "/images/education/promotion.svg";
import HighlightedLocalizationText from "../../shared/highlighted-localization-text";
import MainEducationVideo from "../../education/components/main-education-video";
import Playlist from "../../education/components/playlist";
import { useRtlDirection } from "../../../helpers/hooks/use-rtl-direction";

const EducationPageContent = () => {
  const isRTL = useRtlDirection();

  return (
    <>
      <TopMarketPromotion
        className={cn("education-page-promotion", {
          "split-bg--rtl": isRTL,
          "education-page-promotion--rtl": isRTL,
        })}
        image={promotion}
        note={
          <HighlightedLocalizationText
            localizationText="education_top-market-promo-note"
            wordsToHighlight="education_top-market-promo-note-accent"
            primaryClassName="highlighted-in-black"
            accentClassName="highlighted-in-white"
          />
        }
      >
        <HighlightedLocalizationText
          localizationText="education_top-market-promo-text"
          wordsToHighlight="education_top-market-promo-text-accent"
          primaryClassName="highlighted-in-black"
          accentClassName="highlighted-in-white"
        />
      </TopMarketPromotion>
      <MainEducationVideo />
      <Playlist />
    </>
  );
};

export default EducationPageContent;
