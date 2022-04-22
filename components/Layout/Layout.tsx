import Profile from "./Profile/Profile";
import { useContext } from "react";
import { UserContext, UserStatus } from "../../context/UserContext";
import Nav from "./Nav/Nav";
import styles from "./Layout.module.scss";
interface Props {
  children: JSX.Element;
}

const Layout = ({ children }: Props) => {
  const { status } = useContext(UserContext);

  return (
    <>
      <>
        {status === UserStatus.Authenticated && (
          <div className={styles.container}>
            <Profile />
            <Nav />
          </div>
        )}
      </>
      {children}
    </>
  );
};

export default Layout;
