export interface IExternalUrls {
  spotify: string;
}

export interface IExternalIds {
  isrc: string;
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

export interface IGetPlaylistsResponse extends ISpotifyList {
  items: Playlist[];
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

export interface SpotifyPlaylistTracks extends Partial<ISpotifyList> {
  items: Item[];
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

export interface ISpotifyList {
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  href: string;
}

export interface Item {
  added_at: string;
  added_by: IAddedBy;
  is_local: boolean;
  primary_color: any;
  track: Track;
  video_thumbnail: VideoThumbnail;
}

interface IAddedBy {
  external_urls: IExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

export interface VideoThumbnail {
  url: string | null;
}

export interface Track {
  album: Album;
  artists: Artist;
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  episode: boolean;
  explicit: boolean;
  external_urls: IExternalUrls;
  external_ids: IExternalIds;
  href: string;
  id: string;
  isLocale: boolean;
  name: string;
  popularity: number;
  previuew_url: string;
  track: boolean;
  track_number: number;
  type: string;
  uri: string;
}

export interface Album {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: IExternalUrls;
  href: string;
  id: string;
  images: SpotifyImage[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface Artist {
  external_urls: IExternalUrls;
  href: string;
  id: string;
  name: string;
  type: string;
  uri: string;
}
