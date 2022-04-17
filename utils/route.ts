import { NextPageContext } from "next";
import { Session } from "next-auth";
import Router from "next/router";

export const routeGuard = (ctx: NextPageContext, session: Session | null) => {
  const loginPath = "/login";
  const playlistPath = "/playlists";
  const unprotectedRoutes = [loginPath];

  const pathName = ctx.pathname;

  if (!session) {
    if (!unprotectedRoutes.includes(pathName)) {
      if (ctx.res) {
        // If unauthenticated push to login page.
        ctx.res.writeHead(302, { Location: loginPath });
        ctx.res.end();
      } else {
        Router.push(location);
      }
    }
  } else {
    // Authenticated
    if (pathName === loginPath) {
      // If authenticated and accessing login page, push to playlists page.
      if (ctx.res) {
        ctx.res.writeHead(302, { Location: playlistPath });
        ctx.res.end();
      } else {
        Router.push(location);
      }
    }
  }
};
