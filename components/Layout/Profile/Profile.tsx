import { useContext, useState } from "react";
import styles from "./Profile.module.scss";
import { UserContext } from "../../../context/UserContext";
import classNames from "classnames";
import Button from "../../Button/Button";
import Icon from "../../Icon/Icon";

function Profile() {
  const [expanded, setExpanded] = useState(false);

  const {
    user: { name, email, image },
    signOut,
  } = useContext(UserContext);
  // TO DO close expanded with escape key
  // TO DO close expanded with click outside
  return (
    <div className={styles.profileContainer}>
      <div
        className={classNames(styles.containerWindow, {
          [styles.expanded]: expanded,
        })}
      >
        <div className={styles.container}>
          <div
            className={classNames(styles.backIconContainer, styles.icon)}
            onClick={() => setExpanded(false)}
          >
            <Icon
              prefix="fas"
              iconName="angle-left"
              iconClass={classNames(styles.icon, styles.iconBack)}
            />
          </div>

          <div className={styles.contentContainer}>
            {name && (
              <p>
                Logged in as <span className={styles.titleLabel}>{name}</span>
              </p>
            )}
            {email && (
              <p>
                Email: <span className={styles.titleLabel}>{email}</span>
              </p>
            )}
          </div>
          <div className={styles.buttonContainer}>
            <Button
              text={"Sign out"}
              click={signOut}
              buttonTheme={"danger"}
              buttonClass={styles.button}
            />
          </div>
        </div>
      </div>

      <Icon
        prefix="fas"
        iconName="user"
        iconClass={classNames(styles.icon, styles.iconProfile)}
        onClick={() => setExpanded(true)}
      />
    </div>
  );
}

export default Profile;
