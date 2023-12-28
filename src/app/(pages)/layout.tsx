import { Inter as FontSans } from "next/font/google";
import { cookies } from "next/headers";
import { type ReactNode } from "react";

import { ThemeModeProvider } from "@/components/providers/themeModeProvider";
import { TRPCReactProvider } from "@/trpc/react";
import "@/styles/globals.css";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "My Closet",
  description: "Your closet, in the cloud.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

type RootLayoutProps = {
  children: ReactNode;
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default async function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <TRPCReactProvider cookies={cookies().toString()}>
          <ThemeModeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeModeProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
