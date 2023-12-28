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
      <NavBar isHome leftItem={"My closet"} items={menuItem} />
      <main className={"flex min-h-[90vh] items-center justify-center"}>
        <div
          className={
            "container flex flex-col items-center justify-center gap-12 px-4 py-16"
          }
        >
          a
        </div>
      </main>
    </>
  );
}
