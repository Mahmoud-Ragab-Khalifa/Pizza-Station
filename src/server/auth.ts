import { DefaultSession, NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { Environments, Pages, Routes } from "@/constants/enums";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/prisma";
import { login } from "@/server/_actions/auth";
import { Locale } from "next-intl";
import { JWT } from "next-auth/jwt";
import { User, UserRole } from "@prisma/client";

// override next-auth jwt type to include user role
declare module "next-auth/jwt" {
  interface JWT extends Partial<User> {
    id: string;
    name: string;
    email: string;
    role: UserRole;
  }
}

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: User;
  }
}

export const authOptions: NextAuthOptions = {
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

      authorize: async (credentials, req) => {
        const currentUrl = req?.headers?.referer;
        const locale = currentUrl?.split("/")[3] as Locale;
        const res = await login(credentials, locale);

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

  callbacks: {
    jwt: async ({ token }): Promise<JWT> => {
      const dbUser = await db.user.findUnique({
        where: {
          email: token?.email,
        },
      });

      // if user not found return default next-auth token
      if (!dbUser) {
        return token;
      }

      // if user found update session data by provide it in jwt
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        role: dbUser.role,
        image: dbUser.image,
        city: dbUser.city,
        country: dbUser.country,
        phone: dbUser.phone,
        postalCode: dbUser.postalCode,
        streetAddress: dbUser.streetAddress,
      };
    },

    // add all needed user data to session
    session: ({ session, token }) => {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.image = token.image as string;
        session.user.country = token.country as string;
        session.user.city = token.city as string;
        session.user.postalCode = token.postalCode as string;
        session.user.streetAddress = token.streetAddress as string;
        session.user.phone = token.phone as string;
      }

      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          role: token.role,
          image: token.image,
        },
      };
    },
  },
};
