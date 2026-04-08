import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Environments, Pages, Routes } from "@/constants/enums";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/prisma";

const handler = NextAuth({
  providers: [
    Credentials({
      name: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "hello@example.com",
        },

        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Your Password",
        },
      },

      authorize: (credentials) => {
        const user = credentials;

        return { id: crypto.randomUUID(), ...user };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: 7 * 24 * 60 * 60, // 7 dayes (refresh token => login again),
    updateAge: 24 * 60 * 60, // 24 hours (access token)
  },

  secret: process.env.NEXTAUTH_SECRET,

  debug: process.env.NODE_ENV === Environments.DEV,

  adapter: PrismaAdapter(db),

  pages: { signIn: `${Routes.AUTH}${Pages.LOGIN}` },
});

export { handler as GET, handler as POST };
