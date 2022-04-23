import type { NextPage, NextPageContext } from "next";
import { getPlaylist } from "../../api/spotify";
import { ISpotifyGetPlaylist } from "../../types/spotify";

interface Props {
  playlistData: ISpotifyGetPlaylist;
}

const Home: NextPage<Props, any> = ({ playlistData }) => {
  const { name, tracks } = playlistData;

  return (
    <>
      <h1>
        {name} ( {tracks.total} )
      </h1>
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

  const playlistData = await getPlaylist(playlistId, accessToken);

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
