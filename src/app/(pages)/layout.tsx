import { Inter as FontSans } from "next/font/google";
import { cookies } from "next/headers";
import { type ReactNode } from "react";

import { ThemeModeProvider } from "@/components/providers/themeModeProvider";
import { TRPCReactProvider } from "@/trpc/react";
import { cn } from "@/lib/utils";
import "@/styles/globals.css";

export const metadata = {
  title: "T3-stack with supabase Auth",
  description: "A boilerplate for T3-stack with Supabase Auth",
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
        suppressHydrationWarning
        className={cn("bg-background font-sans antialiased", fontSans.variable)}
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
