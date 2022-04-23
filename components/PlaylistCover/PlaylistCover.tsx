import styles from "./PlaylistCover.module.scss";
import classNames from "classnames";
import { Playlist } from "../../types/spotify";
import Router from "next/router";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

interface Props {
  playlist: Playlist;
  containerClass?: string;
}

function PlaylistCover({ playlist, containerClass = "" }: Props) {
  const { accessToken } = useContext(UserContext);

  const { name, tracks, owner, images, description, id } = playlist;

  return (
    <div
      className={classNames(styles.container, containerClass)}
      onClick={() => {
        Router.push(`/playlist/${id}/${accessToken}`);
      }}
    >
      {/* <image className={styles.imageContainer} href={}></image> */}
      <div className={styles.contentContainer}>
        <div className={classNames(styles.titleContainer, styles.containerRow)}>
          <span className={styles.nameTitle}>{name}</span>{" "}
          <span className={styles.grow}></span>
          <span>
            <b>{tracks.total} tracks</b>
          </span>
        </div>
        {/* <div className={classNames(styles.contentContainer, styles.containerRow)}>
        <span>{description}</span>
      </div> */}
        <div
          className={classNames(styles.footerContainer, styles.containerRow)}
        >
          <span className={styles.grow}></span>

          <span>
            Created by <b>{owner.display_name}</b>
          </span>
        </div>
      </div>
    </div>
  );
}

export default PlaylistCover;
