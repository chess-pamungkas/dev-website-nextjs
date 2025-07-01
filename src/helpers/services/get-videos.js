import axios from "axios";

const KEY = process.env.YOUTUBE_API_KEY;

export const getPlaylistItemsFromYoutube = async (playlistId) => {
  const API_URL = process.env.YOUTUBE_PLAYLIST_ITEMS_API_URL;
  const MAX_COUNT_OF_ITEMS = 50;

  const response = await axios.get(
    `${API_URL}?part=snippet&fields=items(id,snippet(title,description,resourceId))&playlistId=${playlistId}&key=${KEY}&maxResults=${MAX_COUNT_OF_ITEMS}`
  );

  return response.data?.items;
};

export const getPlaylistTitleFromYoutube = async (playlistId) => {
  const API_URL = process.env.YOUTUBE_PLAYLIST_API_URL;

  const response = await axios.get(
    `${API_URL}?part=snippet&fields=items(id,snippet(title))&id=${playlistId}&key=${KEY}`
  );
  return response.data?.items;
};

export function getVideoById(id) {
  // Return a dummy video object
  return {
    id,
    title: "Dummy Video",
    url: "",
    description: "This is a placeholder video.",
  };
}
