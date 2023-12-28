import { randomUUID } from "crypto";

import NavBar, { type MenuItem } from "@/components/layout/navBar";

const menuItem: MenuItem[] = [
  {
    id: randomUUID(),
    name: "Home",
    href: "/",
  },
];

export default async function Home() {
  return (
    <>
      <NavBar
        isHome
        leftItem={"T3-Stack with supabase auth"}
        items={menuItem}
      />
      <main className={"flex min-h-[90vh] items-center justify-center"}>a</main>
    </>
  );
}
