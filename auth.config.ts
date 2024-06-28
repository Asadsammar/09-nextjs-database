/*import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }: { auth: any, request: { nextUrl: any } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/');
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;*/

import type { NextAuthOptions } from 'next-auth';

export const authConfig: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    signIn: async ({ user, account, profile, email, credentials }) => {
      // Extract redirectUrl safely
      const redirectUrl = credentials?.redirectUrl ? credentials.redirectUrl as string : '/';

      const isLoggedIn = !!user;
      const isOnDashboard = new URL(redirectUrl, 'http://localhost').pathname.startsWith('/');

      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return '/login'; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return '/'; // Redirect logged-in users to the homepage
      }
      return true;
    },
  },
  providers: [], // Add providers here
};
