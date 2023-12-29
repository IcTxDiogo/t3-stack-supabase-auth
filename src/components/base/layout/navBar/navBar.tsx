import { ArrowLeft } from "lucide-react";
import { type ReactNode, Suspense } from "react";
import Link from "next/link";

import NavBarGenerateMenu from "@/components/base/layout/navBar/navBarGenerateMenu";
import { ThemeModeToggle } from "@/components/base/toggles/themeModeToggle";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Profile from "@/components/base/layout/navBar/profile";
import { Skeleton } from "@/components/ui/skeleton";

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

export default function NavBar({ leftItem, items, isHome }: NavBarProps) {
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
        <Suspense fallback={<Skeleton className={"h-[40px] w-[40px]"} />}>
          <Profile />
        </Suspense>
      </div>
    </nav>
  );
}
