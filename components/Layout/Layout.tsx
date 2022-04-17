import Profile from "./Profile/Profile";
import { useContext } from "react";
import { UserContext, UserStatus } from "../../context/UserContext";

interface Props {
  children: JSX.Element;
}

const Layout = ({ children }: Props) => {
  const { status } = useContext(UserContext);

  return (
    <>
      <div>{status === UserStatus.Authenticated && <Profile />}</div>
      {children}
    </>
  );
};

export default Layout;
