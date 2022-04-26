import type { NextPage, NextPageContext } from "next";
import { getPlaylist as getSpotifyPlaylist } from "../../api/spotify";
import { Playlist } from "../../types/spotify";
import Track from "../../components/Track/Track";
import { getPlaylist } from "../../api/middleman";

interface Props {
  playlistData: Playlist;
}

const Home: NextPage<Props, any> = ({ playlistData }) => {
  const { name, tracks } = playlistData;

  return (
    <>
      <h1>
        {name} ( {tracks.total} )
      </h1>
      <div>
        {tracks.items.map((item) => {
          return <Track track={item.track} />;
        })}
      </div>
    </>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const { query } = context;

  if (!query.id) {
    return {
      redirect: {
        permanent: false,
        destination: "/playlists",
      },
    };
  }

  const playlistId = query.id[0];
  const accessToken = query.id[1];

  const middlemanPlaylist = await getPlaylist(playlistId, accessToken);
  const playlistData = await getSpotifyPlaylist(playlistId, accessToken);

  console.log("the middleman playlist", middlemanPlaylist);

  if (!playlistData) {
    console.error(`Couldn't fetch playlist with id: '${playlistId}'`);
    return {
      redirect: {
        permanent: false,
        destination: "/playlists",
      },
    };
  }

  return {
    props: { playlistData },
  };
}

export default Home;
