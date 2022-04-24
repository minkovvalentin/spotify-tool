import { Track as ITrack } from "../../types/spotify";
import styles from "./Track.module.scss";

interface Props {
  track: ITrack;
}

const Track = ({ track }: Props) => {
  const { name, album } = track;

  return (
    <div className={styles.container}>
      <span>{name}</span>
      <span>{album.name}</span>
    </div>
  );
};

export default Track;
