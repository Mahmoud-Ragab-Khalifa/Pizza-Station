import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Environments, Pages, Routes } from "@/constants/enums";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/prisma";
import { login } from "@/server/_actions/auth";

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

      authorize: async (credentials) => {
        const res = await login(credentials);

        if (res.status === 200 && res.user) {
          return res.user;
        } else {
          throw new Error(
            JSON.stringify({
              validationError: res.error,
              responseError: res.message,
            }),
          );
        }
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
