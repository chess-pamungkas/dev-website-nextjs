import { YOUTUBE_VIDEO_SHARE_LINK } from "../../../helpers/constants";

export const getYoutubeLink = (videoId) =>
  [YOUTUBE_VIDEO_SHARE_LINK, videoId].join("");
