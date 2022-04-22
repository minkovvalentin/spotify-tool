import "../styles/globals.scss";
import {
  ClientSafeProvider,
  getSession,
  LiteralUnion,
  SessionProvider,
} from "next-auth/react";
import { config } from "@fortawesome/fontawesome-svg-core";
import type { AppProps, AppContext } from "next/app";
import { UserProvider } from "../context/UserContext";
import Layout from "../components/Layout/Layout";
import { Accounts } from "../utils/types";
import { library } from "@fortawesome/fontawesome-svg-core";
import { BuiltInProviderType } from "next-auth/providers";
import App from "next/app";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { routeGuard, unprotectedRoutes } from "../utils/route";
config.autoAddCss = false;
interface Props extends AppProps {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  account: Accounts;
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: Props) {
  library.add(fas, fab);

  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <UserProvider>
        <Layout>
          <div id="mainContainer">
            <Component {...pageProps} />
          </div>
        </Layout>
      </UserProvider>
    </SessionProvider>
  );
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  // calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(appContext);
  // If user is logged in, get session
  const session = await getSession(appContext.ctx);
  
  routeGuard(appContext.ctx, session);

  return { ...appProps };
};

export default MyApp;
