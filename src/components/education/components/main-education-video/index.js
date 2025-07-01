import React, { useCallback, useEffect, useState } from "react";
import cn from "classnames";
import { MAIN_VIDEO_ID } from "../../../../helpers/education.config";
import TopMarketPromotion from "../../../top-market-promotion";
import { getVideoById } from "../../../../helpers/services/get-videos";
import { getYoutubeLink } from "../helpers";
import { useWindowSize } from "../../../../helpers/hooks/use-window-size";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";

const MainEducationVideo = () => {
  const [video, setVideo] = useState(null);
  const { isMobile, isMD, isLG, isXL } = useWindowSize();
  const isRTL = useRtlDirection();

  useEffect(() => {
    const getVideo = async () => {
      await getVideoById(MAIN_VIDEO_ID)
        .then((data) => {
          setVideo(data[0]);
        })
        .catch((e) => console.log(e.message));
    };
    getVideo();
  }, []);

  const getVideoStyles = useCallback(() => {
    switch (true) {
      case isXL:
        return { width: "740px", height: "417px" };
      case isLG:
        return { width: "422px", height: "238px" };
      case isMD:
        return { width: "633px", height: "356px" };
      case isMobile:
        return { width: "344px", height: "195px" };
      default:
        return { width: "740px", height: "417px" };
    }
  }, [isMobile, isMD, isLG, isXL]);

  return (
    <>
      {video && (
        <TopMarketPromotion
          className={cn("black-promotion", "top-market-promotion--education", {
            "top-market-promotion--education--rtl": isRTL,
          })}
          image={getYoutubeLink(video.id)}
          isVideo
          note={video.snippet.description}
          videoSettings={getVideoStyles()}
        >
          {video.snippet.title}
        </TopMarketPromotion>
      )}
    </>
  );
};

export default MainEducationVideo;
