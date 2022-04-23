import styles from "./PlaylistCover.module.scss";
import classNames from "classnames";
import { Playlist } from "../../types/spotify";

interface Props {
  playlist: Playlist;
  containerClass?: string;
}

function PlaylistCover({ playlist, containerClass = "" }: Props) {
  const { name, tracks, owner, description } = playlist;

  return (
    <div className={classNames(styles.container, containerClass)}>
      <div className={styles.titleContainer}>
        <span>{name}</span> <span className={styles.grow}></span>
        <span>{tracks.total} tracks</span>
      </div>
      {/* <div className={styles.contentContainer}>
        <span>{description}</span>
      </div> */}
      <div className={styles.footerContainer}>
        <span>Created by {owner.display_name} </span>
      </div>
    </div>
  );
}

export default PlaylistCover;
