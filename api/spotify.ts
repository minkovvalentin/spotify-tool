import {
  IGetAuthUserResponse,
  IGetPlaylistsResponse,
  ISpotifyGetPlaylist,
  Playlist,
} from "../types/spotify";
import {
  getSpotifyPlaylistsUrl,
  getSpotifyAuthenticatedUserUrl,
  getSpotifyPlaylistItemsUrl,
  getSpotifyPlaylistUrl,
} from "../utils/endpoints";

const getAuthenticatedUser = async (
  access_token: string
): Promise<IGetAuthUserResponse | undefined> => {
  try {
    const data = await fetch(getSpotifyAuthenticatedUserUrl(), {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    const response = await data.json();

    if (response.error) {
      console.error("Error fetching playlists", data);
      return;
    }

    return response;
  } catch (error) {
    console.error("Error fetching auth user", error);
  }
};

const getPlaylists = async (
  userId: string,
  access_token: string,
  limit: number = 20,
  offset: number = 0,
  overwriteUrl: string | null = null
): Promise<IGetPlaylistsResponse | undefined> => {
  const url = overwriteUrl
    ? overwriteUrl
    : getSpotifyPlaylistsUrl(userId, limit, offset);

  try {
    const playlists = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await playlists.json();
    /// TO DO Maybe display some notification on such errors
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

/**
 *
 * @param access_token
 * @description Returns all the playlists user has saved or created in his library.
 */
const getAllPlaylistsInUserLibrary = async (
  userId: string,
  access_token: string
) => {
  let playlists: Playlist[] = [];
  let nextUrl = getSpotifyPlaylistsUrl(userId, 50, 0);
  let hasNext = true;

  do {
    const userPlaylists = await getPlaylists(
      userId,
      access_token,
      0,
      0,
      nextUrl
    );
    // Keep fetching the playlists until the api stops returning '.next'
    // which indicates no further offset can be set.
    if (userPlaylists) {
      playlists = playlists.concat(userPlaylists.items);
      if (userPlaylists.next) {
        nextUrl = userPlaylists.next;
      } else {
        hasNext = false;
      }
    } else {
      hasNext = false;
    }
  } while (hasNext);

  return playlists;
};

const getPlaylist = async (
  playlistId: string,
  access_token: string
): Promise<ISpotifyGetPlaylist | undefined> => {
  const url = getSpotifyPlaylistUrl(playlistId);

  try {
    const playlists = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
      },
    });

    const result = await playlists.json();

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

export {
  getPlaylists,
  getAllPlaylistsInUserLibrary,
  getAuthenticatedUser,
  getPlaylist,
};
