// MONGO DB ENDPOINTS

export enum MongoEndpoints {
  Accounts = "accounts",
  AccountByUserId = "accounts/userId/",
  Users = "users",
  UserByEmail = "users/email/",
  Sessions = "sessions",
}

const apiUrl = process.env.API_URL ?? "";
const middlemanApiUrl = process.env.SPOTIFY_MIDDLEMAN_API ?? "";

const accountsDBEndpoint = () => {
  return apiUrl + MongoEndpoints.Accounts;
};

const usersDBEndpoint = () => {
  return apiUrl + MongoEndpoints.Users;
};

const userByEmailDBEndpoint = (userEmail: string) => {
  return apiUrl + MongoEndpoints.UserByEmail + userEmail;
};

const sessionsDBEndpoint = () => {
  return apiUrl + MongoEndpoints.Sessions;
};

const accountByUserIdDBEndpoint = (userId: string) => {
  return apiUrl + MongoEndpoints.AccountByUserId + userId;
};

// SPOTIFY ENDPOINTS

/**
 *
 * @param limit
 * The maximum number of items to return. Default: 20. Minimum: 1. Maximum: 50.
 * @param offset
 * The index of the first playlist to return. Default: 0 (the first object). Maximum offset: 100.000. Use with limit to get the next set of playlists.
 * @description https://developer.spotify.com/documentation/web-api/reference/#/operations/get-list-users-playlists
 */

/**
 * @description url for currently authenticated spotify user
 * @returns
 */
const getSpotifyAuthenticatedUserUrl = () => {
  return `https://api.spotify.com/v1/me`;
};

const getSpotifyPlaylistsUrl = (
  userId: string,
  limit: number = 20,
  offset: number = 0
) => {
  return `https://api.spotify.com/v1/users/${userId}/playlists?limit=${limit}&offset=${offset}`;
};

const getSpotifyPlaylistUrl = (playlistId: string) => {
  return `https://api.spotify.com/v1/playlists/${playlistId}`;
};

const getSpotifyPlaylistItemsUrl = (playlistId: string) => {
  return `https://api.spotify.com/v1/playlists/${playlistId}/tracks`;
};

const getMiddlemanPlaylistUrl = () => {
  return `${middlemanApiUrl}/playlist`;
};

export {
  accountsDBEndpoint,
  usersDBEndpoint,
  sessionsDBEndpoint,
  accountByUserIdDBEndpoint,
  userByEmailDBEndpoint,
  getSpotifyAuthenticatedUserUrl,
  getSpotifyPlaylistsUrl,
  getSpotifyPlaylistUrl,
  getSpotifyPlaylistItemsUrl,
  getMiddlemanPlaylistUrl,
};
