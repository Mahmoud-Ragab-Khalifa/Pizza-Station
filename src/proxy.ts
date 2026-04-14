import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/routing";
import { NextRequest, NextResponse } from "next/server";
import withAuth from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { Locale } from "next-intl";
import { Pages, Routes, UserRole } from "./constants/enums";

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

    // if logged in user try yo access auth page this action make user conflict so redirect to role page
    if (isAuth && isAuthPage) {
      const role = isAuth.role;

      if (role === UserRole.ADMIN) {
        return NextResponse.redirect(
          new URL(`/${locale}${Routes.ADMIN}`, req.url),
        );
      }

      return NextResponse.redirect(
        new URL(`/${locale}${Routes.PROFILE}`, req.url),
      );
    }

    // if logged in user he isn't admin try to access admin page redirect it to profile page
    if (isAuth && pathname.startsWith(`/${locale}${Routes.ADMIN}`)) {
      const role = isAuth.role;

      if (role !== UserRole.ADMIN) {
        return NextResponse.redirect(
          new URL(`/${locale}${Routes.PROFILE}`, req.url),
        );
      }
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
