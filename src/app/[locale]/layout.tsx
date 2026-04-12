import type { Metadata } from "next";
import { Cairo, Roboto } from "next/font/google";
import Header from "@/components/Header";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Footer from "@/components/Footer";
import ReduxProvider from "@/providers/ReduxProvider";
import { NextIntlClientProvider } from "next-intl";
import { Directions, Languages } from "@/constants/enums";
import { getLocale } from "next-intl/server";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import NextAuthSessionProvider from "@/providers/NextAuthSessionProvider";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-roboto",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

const cairo = Cairo({
  subsets: ["arabic"],
  variable: "--font-cairo",
  weight: ["400", "500", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Pizza Station",
  description: "Pick Your Favourite Pizza",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  return (
    <html
      lang={locale}
      dir={locale === Languages.ARABIC ? Directions.RTL : Directions.LTR}
      className={`${locale === Languages.ARABIC ? cairo.variable : roboto.variable}`}
      suppressHydrationWarning
    >
      <body>
        <NextAuthSessionProvider>
          <NextIntlClientProvider>
            <ReduxProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Header />

                {children}

                <Toaster />

                <Footer />
              </ThemeProvider>
            </ReduxProvider>
          </NextIntlClientProvider>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
