import type { NextAuthConfig } from "next-auth";
import type { Role } from "@prisma/client";

import { can, getModuleForPath } from "@/lib/permissions";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const pathname = nextUrl.pathname;
      const isOnLogin = pathname === "/login";
      const isUnauthorized = pathname === "/unauthorized";

      if (isOnLogin) {
        if (isLoggedIn) return Response.redirect(new URL("/", nextUrl));
        return true;
      }

      if (isUnauthorized) return true;

      if (!isLoggedIn) return false;

      const module = getModuleForPath(pathname);
      if (module && auth.user?.role) {
        const role = auth.user.role as Role;
        if (!can(role, "view", module)) {
          return Response.redirect(new URL("/unauthorized", nextUrl));
        }
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
