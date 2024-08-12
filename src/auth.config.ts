import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import { Adapter } from "next-auth/adapters";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import CredentialsProvider from "next-auth/providers/credentials";

import { signInEmailPassword } from "./auth/auth/auth-actions";

const prisma = new PrismaClient();

export const authConfig: NextAuthConfig = {
  adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID ?? "",
      clientSecret: process.env.AUTH_GITHUB_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),

    CredentialsProvider({
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "email@email.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },

      async authorize(credentials, req) {
        if (
          typeof credentials?.email !== "string" ||
          typeof credentials?.password !== "string"
        ) {
          return null;
        }

        const user = await signInEmailPassword(
          credentials.email,
          credentials.password
        );

        if (user) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],

  session: { strategy: "jwt" },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async jwt({ token, user, account, profile }) {
      const dbUser = await prisma.user.findUnique({
        where: { email: token.email ?? "no-email" },
      });

      token.roles = dbUser?.roles ?? ["no-roles"];
      token.id = dbUser?.id ?? "no-uuid";

      return token;
    },

    async session({ session, token, user }) {
      if (session?.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }

      return session;
    },
  },
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
