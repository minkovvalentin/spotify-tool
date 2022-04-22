export interface IExternalUrls {
  spotify: string;
}

export interface ISpotifyExplicitContent {
  filter_enabled: boolean;
  filter_locked: boolean;
}

export interface ISpotifyFollowers {
  href: string | null;
  total: number;
}

export interface IGetAuthUserResponse {
  country: string;
  display_name: string;
  email: string;
  explicit_content: ISpotifyExplicitContent;
  external_urls: IExternalUrls;
  followers: ISpotifyFollowers;
  href: string;
  id: string;
  product: string;
  type: string;
  uri: string;
}

export interface IGetPlaylistsResponse {
  href: string;
  items: Playlist[];
  limit: number;
  next: string;
  offset: number;
  previous: string;
  total: number;
}

export interface SpotifyImage {
  height: number;
  width: number;
  url: string;
}

export interface SpotifyPlaylistOwner {
  display_name: string;
  external_urls: IExternalUrls;
  href: string;
  id: string;
  // TO DO check which are the other types for playlist owner besides user
  type: "user" | string;
  uri: string;
}

export interface SpotifyPlaylistTracks {
  href: string;
  total: number;
}

export interface Playlist {
  collaborative: boolean;
  description: string;
  external_urls: IExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  owner: SpotifyPlaylistOwner;
  primary_color?: any;
  public: boolean;
  snapshot_id: string;
  tracks: SpotifyPlaylistTracks;
  type: string;
  uri: string;
}