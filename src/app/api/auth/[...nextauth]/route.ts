/**
 * @fileoverview This file sets up the Next-Auth API route.
 *
 * It serves as the single endpoint for all authentication-related requests,
 * such as sign-in, sign-out, session management, and provider callbacks.
 * The `[...nextauth]` is a "catch-all" route that handles all requests
 * under `/api/auth/`.
 *
 * @see https://next-auth.js.org/getting-started/route-handlers
 */

import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

/**
 * The main handler for Next-Auth. It is configured with authentication providers
 * and other options.
 *
 * @see https://next-auth.js.org/configuration/options
 */
const handler = NextAuth({
  /**
   * An array of authentication providers.
   * We are using the Google provider here. You can add more providers like GitHub,
   * Apple, etc., by importing them from `next-auth/providers/*`.
   * Each provider requires environment variables for its client ID and secret.
   */
  providers: [
    GoogleProvider({
      // The client ID obtained from the Google Cloud Console.
      // It's crucial to store this in environment variables and not hard-code it.
      clientId: process.env.GOOGLE_CLIENT_ID!,
      // The client secret obtained from the Google Cloud Console.
      // This should also be stored securely in environment variables.
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],

  /**
   * A secret used to sign and encrypt JWTs and hash cookies.
   * This is a critical security setting. In production, this must be a strong,
   * randomly generated string stored as an environment variable.
   */
  secret: process.env.NEXTAUTH_SECRET,

  /**
   * Callbacks are asynchronous functions you can use to control what happens
   * when an action is performed.
   * We can use them here to log events or customize behavior, though they are
   * not strictly necessary for a basic setup.
   */
  callbacks: {
    /**
     * The `session` callback is called whenever a session is checked.
     * By default, only a subset of the token is returned for security reasons.
     * If you want to make more data available to the client, you can add it here.
     */
    async session({ session, token }) {
      // You could add custom properties to the session object here.
      // For example: session.user.id = token.sub;
      return session;
    },
  },
});

// We export the handler for both GET and POST requests, as Next-Auth
// uses both methods for different parts of the authentication flow.
export { handler as GET, handler as POST };
