import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import withAuth from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { Locale } from "next-intl";
import { Pages, Routes } from "./constants/enums";

const intlMiddleware = createMiddleware(routing);

export default withAuth(
  async function Proxy(req: NextRequest) {
    const response = intlMiddleware(req);

    const isAuth = await getToken({ req });

    const pathname = req.nextUrl.pathname;
    const locale = req.url.split("/")[3] as Locale;

    const isAuthPage = pathname.startsWith(`/${locale}${Routes.AUTH}`);

    const protectedRoutes = [Routes.PROFILE, Routes.ADMIN];
    const isProtectedRoute = protectedRoutes.some((route) =>
      pathname.startsWith(`/${locale}${route}`),
    );

    // if not loggedin user try to access protected page redirect it to login page
    if (!isAuth && isProtectedRoute) {
      return NextResponse.redirect(
        new URL(`/${locale}${Routes.AUTH}${Pages.LOGIN}`, req.url),
      );
    }

    // if logged in user try yo access auth page this action make user conflict so redirect to profile page
    if (isAuth && isAuthPage) {
      return NextResponse.redirect(
        new URL(`/${locale}${Routes.PROFILE}`, req.url),
      );
    }

    return response;
  },
  {
    callbacks: {
      authorized() {
        return true;
      },
    },
  },
);

export const config = {
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
