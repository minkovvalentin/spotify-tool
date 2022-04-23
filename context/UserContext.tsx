import { isEqual } from "lodash";
import { signOut, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { SessionUser } from "../utils/types";

const defaultUser: SessionUser = { name: "", email: "", image: "" };

export enum UserStatus {
  Authenticated = "authenticated",
  Unauthenticated = "unauthenticated",
  Loading = "loading",
}

interface UserContext {
  user: SessionUser;
  accessToken: string | null;
  signOut: Function;
  status: UserStatus;
  setUserContext: React.Dispatch<React.SetStateAction<UserContext>>;
}

const defaultState = {
  user: defaultUser,
  accessToken: null,
  signOut: () => {},
  status: UserStatus.Unauthenticated,
  setUserContext: () => {},
};

export const UserContext = React.createContext<UserContext>(defaultState);

interface Props {
  children: JSX.Element;
}

export function UserProvider({ children }: Props) {
  const [userContext, setUserContext] = useState<UserContext>(defaultState);

  const { data: session, status } = useSession();

  useEffect(() => {
    // TODO Export in some logger
    console.info("Setting user context");
    if (status === UserStatus.Authenticated) {
      let newContext = {
        ...userContext,
      };

      if (session?.user && !isEqual(session.user, userContext.user)) {
        newContext = { ...newContext, user: session.user };
      }
      if (status !== userContext.status) {
        newContext = { ...newContext, status: status as UserStatus };
      }
      newContext = { ...newContext, signOut };

      if (!isEqual(newContext, userContext)) {
        setUserContext(newContext);
      }
    }
  }, [status, userContext, session?.user]);

  return (
    <UserContext.Provider value={{ ...userContext, setUserContext }}>
      {children}
    </UserContext.Provider>
  );
}
