import { isEqual } from "lodash";
import type { NextPage, NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { useContext, useEffect, useState } from "react";
import { getAccountByUserId, getUserByEmail } from "../api/db";
import {
  getAllPlaylistsInUserLibrary,
  getAuthenticatedUser,
} from "../api/spotify";
import PlaylistCover from "../components/PlaylistCover/PlaylistCover";
import Select, { SelectListItem } from "../components/Select/Select";
import { UserContext } from "../context/UserContext";
import styles from "../styles/Playlists.module.scss";
import { Playlist } from "../types/spotify";

interface Props {
  playlists: Playlist[];
  accessToken: string;
}

const PlaylistsPage: NextPage<Props, any> = ({ playlists, accessToken }) => {
  const userContext = useContext(UserContext);
  const [creators, setCreators] = useState<SelectListItem[]>([]);
  const [playlistsToDisplay, setPlaylistsToDisplay] =
    useState<Playlist[]>(playlists);
  const [selectedCreator, setSelectedCreator] = useState<SelectListItem | null>(
    null
  );

  // Set access token in context as it is used in other components - e.g. : PlaylistCover.tsx
  useEffect(() => {
    userContext.setUserContext({ ...userContext, accessToken });
  }, [accessToken]);

  // Set filters based on playlist content
  useEffect(() => {
    // Wait for context to be inited so filters can take logged user in considiration
    if (userContext.user.name) {
      let playlistCreators: string[] = [];
      playlists.map((playlist) => {
        playlistCreators.push(playlist.owner.display_name);
      });

      // set creators as SelectListItem[] for the creators filter
      const creators: SelectListItem[] = [...new Set(playlistCreators)].map(
        (creator, i) => {
          return { id: i, name: creator };
        }
      );

      let ownerPlaylistCreator: SelectListItem | null = null;

      creators.forEach((creator, i) => {
        if (creator.name === userContext.user.name) {
          // Assign the playlist creator for adding on top later
          ownerPlaylistCreator = creator;
          // and remove it from current array.
          creators.splice(i, 1);
        }
      });

      if (ownerPlaylistCreator) {
        // if owner found, add it on top of list
        creators.unshift(ownerPlaylistCreator);
        setCreatorAndFilteredPlaylists(ownerPlaylistCreator);
      }

      setCreators(creators);
    }
  }, [userContext]);

  const onSelect = (key: string | number) => {
    const newSelectedCreator = creators.filter((creator) => {
      return creator.id == key;
    })[0];

    if (newSelectedCreator && !isEqual(selectedCreator, newSelectedCreator)) {
      setCreatorAndFilteredPlaylists(newSelectedCreator);
    }
  };

  const setCreatorAndFilteredPlaylists = (playlistCreator: SelectListItem) => {
    setSelectedCreator(playlistCreator);

    setPlaylistsToDisplay(
      playlists
        .filter((playlist) => {
          return playlist.owner.display_name === playlistCreator.name;
        })
        .sort((a, b) => {
          const bTracks = b.tracks.total ?? 0;
          const aTracks = a.tracks.total ?? 0;

          return bTracks - aTracks;
        })
    );
  };

  return (
    <div>
      <h1>Saved Playlists ( {playlists.length} ) </h1>
      <Select
        label="Playlist creator"
        defaultLabel="Filter by creator"
        selectedKey={selectedCreator?.id.toString()}
        options={creators}
        onSelectionChange={(key) => {
          onSelect(key);
        }}
      />

      {selectedCreator?.name && (
        <div>Showing playlists by {selectedCreator?.name}</div>
      )}

      <div className={styles.playlistsContainer}>
        {playlistsToDisplay.map((playlist) => {
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
