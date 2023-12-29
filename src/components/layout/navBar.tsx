import { ArrowLeft, LogIn, LogOut } from "lucide-react";
import { type ReactNode } from "react";
import Link from "next/link";

import NavBarGenerateMenu from "@/components/layout/navBarGenerateMenu";
import { ThemeModeToggle } from "@/components/toggles/themeModeToggle";
import { Separator } from "@/components/ui/separator";
import { getLoggedUserData } from "@/utils/auth";
import { Button } from "@/components/ui/button";

export type MenuItem = {
  id: string;
  name: string;
  href: string;
};

type NavBarProps = {
  leftItem: ReactNode;
  items: MenuItem[];
  isHome?: boolean;
};

export default async function NavBar({ leftItem, items, isHome }: NavBarProps) {
  const { isAuthenticated, profile } = await getLoggedUserData();

  return (
    <nav
      className={
        "sticky top-0 flex h-[60px] items-center justify-between border-b border-b-foreground bg-background px-8"
      }
    >
      <div className={"flex items-center gap-2"}>
        {!isHome && (
          <Link href={"/projects"}>
            <Button variant={"ghost"} size={"icon"}>
              <ArrowLeft size={20} />
            </Button>
          </Link>
        )}
        {leftItem}
      </div>
      <div className={"flex items-center gap-2"}>
        <NavBarGenerateMenu items={items} />
        <Separator orientation={"vertical"} className={"h-[40px]"} />
        <ThemeModeToggle />
        {isAuthenticated ? (
          <>
            Hi {profile?.full_name}
            <form action={"auth/logout"} method={"post"}>
              <Button type={"submit"} variant={"outline"} size={"icon"}>
                <LogOut />
              </Button>
            </form>
          </>
        ) : (
          <Link href={"/login"}>
            <Button variant={"ghost"} size={"icon"}>
              <LogIn />
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}
