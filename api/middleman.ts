import { Playlist } from "../types/spotify";
import { getMiddlemanPlaylistUrl } from "../utils/endpoints";

// Spotify middleman api

const getPlaylist = async (
  playlistId: string,
  access_token: string
): Promise<Playlist | undefined> => {
  try {
    // TODO maybe encrypt authoziation token
    const playlistData = await fetch(getMiddlemanPlaylistUrl(), {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
        id: playlistId,
        limit: "200",
      },
    });

    const result = await playlistData.json();

    if (result.error) {
      console.error("Error fetching playlists", result);
      return;
    }

    return result;
  } catch (error) {
    console.error("Error fetching playlists", error);
    return;
  }
};

export { getPlaylist };
