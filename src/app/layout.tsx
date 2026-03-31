import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/Header";
import { ThemeProvider } from "@/providers/ThemeProvider";
import Footer from "@/components/Footer";
import ReduxProvider from "@/providers/ReduxProvider";

const roboto = Roboto({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  preload: true,
});

export const metadata: Metadata = {
  title: "Pizza Station",
  description: "Pick Your Favourite Pizza",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(roboto.className, "font-sans", roboto.variable)}
      suppressHydrationWarning
    >
      <body>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Header />

            {children}

            <Footer />
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
