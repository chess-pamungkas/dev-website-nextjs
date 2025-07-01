import React, { useEffect, useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import VideosCarousel from "../videos-carousel";
import { YOUTUBE_PLAYLIST_IDS } from "../../../../helpers/education.config";
import {
  getPlaylistItemsFromYoutube,
  getPlaylistTitleFromYoutube,
} from "../../../../helpers/services/get-videos";
import { stringTransformToKebabCase } from "../../../../helpers/services/string-service";
import { useRtlDirection } from "../../../../helpers/hooks/use-rtl-direction";
import { DIR_LTR, DIR_RTL } from "../../../../helpers/constants";

const Playlist = ({ className }) => {
  const [playlist, setPlaylist] = useState(null);
  const isRTL = useRtlDirection();

  useEffect(() => {
    const getPlaylists = async () => {
      await Promise.all(
        YOUTUBE_PLAYLIST_IDS.map(async (id) => {
          return await Promise.all([
            getPlaylistTitleFromYoutube(id),
            getPlaylistItemsFromYoutube(id),
          ]);
        })
      )
        .then((data) => {
          const temp = {};
          data.forEach(([playlistInfo, items]) => {
            temp[playlistInfo[0].snippet.title] = items;
          });
          setPlaylist(temp);
        })
        .catch((e) => console.log(e.message));
    };

    getPlaylists();
  }, []);

  return (
    <section
      className={cn("playlist", className, {
        "playlist--rtl": isRTL,
      })}
      dir={isRTL ? DIR_RTL : DIR_LTR}
    >
      {playlist &&
        Object.entries(playlist).map(([key, value]) => (
          <div
            key={`playlist-${stringTransformToKebabCase(key)}`}
            className="playlist__block"
          >
            <h4 className="playlist__title">{key}</h4>
            <VideosCarousel videos={value} />
          </div>
        ))}
    </section>
  );
};

Playlist.propTypes = {
  className: PropTypes.string,
};
export default Playlist;
