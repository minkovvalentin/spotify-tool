import type { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useContext, useEffect } from "react";
import { getAccountByUserId, getUserByEmail } from "../api/db";
import {
  getAllPlaylistsInUserLibrary,
  getAuthenticatedUser,
} from "../api/spotify";
import PlaylistCover from "../components/PlaylistCover/PlaylistCover";
import { UserContext } from "../context/UserContext";
import styles from "../styles/Playlists.module.scss";
import { Playlist } from "../types/spotify";

interface Props {
  playlists: Playlist[];
  accessToken: string;
}

const PlaylistsPage: NextPage<Props, any> = ({ playlists, accessToken }) => {
  const userContext = useContext(UserContext);

  useEffect(() => {
    userContext.setUserContext({ ...userContext, accessToken });
    console.log(accessToken);
  }, [accessToken]);

  return (
    <div>
      <h1>Playlists ( {playlists.length} ) </h1>
      <div className={styles.playlistsContainer}>
        {playlists.map((playlist) => {
          return <PlaylistCover playlist={playlist} key={playlist.name} />;
        })}
      </div>
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  // If user is logged in, get session
  const session = await getSession(context);
  let playlists: Playlist[] = [];
  let accessToken;

  // TO DO :
  // This whole process should be simplified.
  // chaining promises could improve readability but probably the whole process should be refactored.
  // need to check in Spotify's terms and conditions which users data can save on db as saving some additional data on db
  // can potentially reduce server calls

  if (session && session.user?.email) {
    // If user is logged in (has session)
    // fetch the auth user's email from the current session
    const user = await getUserByEmail(session.user.email);
    if (user) {
      // then fetch the saved account on login in mongodb
      const foundAccounts = await getAccountByUserId(user._id);
      if (foundAccounts) {
        // to get the access_token
        const { access_token } = foundAccounts[0];
        accessToken = access_token;
        // to fetch the authenticated user from spotify api using the access_token
        const authenticatedUser = await getAuthenticatedUser(access_token);
        if (authenticatedUser) {
          // to fetch playlists with from spotify api.
          const allUsersPlaylists = await getAllPlaylistsInUserLibrary(
            authenticatedUser.id,
            access_token
          );
          if (allUsersPlaylists) {
            playlists = allUsersPlaylists;
          }
        }
      }
    }
  }

  return {
    props: { playlists, accessToken },
  };
}

export default PlaylistsPage;
