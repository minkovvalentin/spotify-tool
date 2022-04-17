import { useContext } from "react";
import { UserContext, UserStatus } from "../context/UserContext";
import type { NextPage, NextPageContext } from "next";

import { BuiltInProviderType } from "next-auth/providers";
import {
  ClientSafeProvider,
  getProviders,
  LiteralUnion,
  signIn,
  getSession,
} from "next-auth/react";

import { Sessions } from "../utils/types";
import Button from "../components/Button/Button";
import styles from "../styles/Login.module.scss";

interface Props {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  session: Sessions;
}

const Login: NextPage<Props, Props> = ({ providers, session }) => {
  const userContext = useContext(UserContext);

  const renderLogin = (
    providers: Record<
      LiteralUnion<BuiltInProviderType, string>,
      ClientSafeProvider
    >
  ) => (
    <>
      {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <Button
            click={() => signIn(provider.id)}
            text={`Sign in ${provider.name}`}
          />
        </div>
      ))}
    </>
  );

  return (
    <div className={styles.container}>
      <h1>Do stuff with your music</h1>
      {userContext.status === UserStatus.Unauthenticated &&
        (providers ? (
          renderLogin(providers)
        ) : (
          <p>No providers found. Cannot authenticate. Contact someone.</p>
        ))}
    </div>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  const providers = await getProviders();
  const session = await getSession(context);
  return {
    props: { providers, session },
  };
}

export default Login;
