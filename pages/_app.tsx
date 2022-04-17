import "../styles/globals.scss";
import {
  ClientSafeProvider,
  LiteralUnion,
  SessionProvider,
} from "next-auth/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps, AppContext } from "next/app";
import { UserProvider } from "../context/UserContext";
import Layout from "../components/Layout/Layout";
import { Accounts, Sessions, Users } from "../utils/types";
import {
  accountsEndpoint,
  sessionsEndpoint,
  usersEndpoint,
} from "../utils/endpoints";
import { library } from "@fortawesome/fontawesome-svg-core";
import { BuiltInProviderType } from "next-auth/providers";
import App from "next/app";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { RouteGuard } from "../components/RouteGuard";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;
interface Props extends AppProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  accounts: Accounts[];
  sessions: Sessions[];
  users: Users[];
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: Props) {
  library.add(fas, fab);

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <UserProvider>
        <Layout>
          <RouteGuard>
            <div id="mainContainer">
              <Component {...pageProps} />
            </div>
          </RouteGuard>
        </Layout>
      </UserProvider>
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);

  let accounts: Accounts[] = [];
  let sessions: Sessions[] = [];
  let users: Users[] = [];

  try {
    const sessionsRes = await fetch(sessionsEndpoint());
    const usersRes = await fetch(usersEndpoint());
    const accountsRes = await fetch(accountsEndpoint());
    accounts = await accountsRes.json();
    sessions = await sessionsRes.json();
    users = await usersRes.json();
  } catch (error) {
    console.error("Couldn't fetch", error);
  }
  return { ...appProps, accounts, sessions, users };
};

export default MyApp;
