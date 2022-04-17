import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext, UserStatus } from "../context/UserContext";

export { RouteGuard };

interface Props {
  children: JSX.Element;
}

// TO DO RouteGuard should be done in hook ?
function RouteGuard({ children }: Props) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const { status } = useContext(UserContext);

  useEffect(() => {
    // on initial load - run auth check
    authCheck(router.asPath, status === UserStatus.Authenticated);

    // on route change start - hide page content by setting authorized to false
    const hideContent = () => setAuthorized(false);
    router.events.on("routeChangeStart", hideContent);

    // on route change complete - run auth check
    router.events.on("routeChangeComplete", authCheck);

    // unsubscribe from events in useEffect return function
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  function authCheck(url: string, authenticated: boolean) {
    // redirect to login page if accessing a private page and not logged in
    const loginPath = "/login";
    const publicPaths = [loginPath];
    const path = url.split("?")[0];
    if (!authenticated && !publicPaths.includes(path)) {
      setAuthorized(false);
      router.push({
        pathname: "/login",
      });
    } else {
      setAuthorized(true);
    }
  }

  return authorized ? children : null;
}
