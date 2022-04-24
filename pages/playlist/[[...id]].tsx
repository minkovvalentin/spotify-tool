import type { NextPage, NextPageContext } from "next";
import { getPlaylist } from "../../api/spotify";
import { Playlist } from "../../types/spotify";
import Track from "../../components/Track/Track";

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
