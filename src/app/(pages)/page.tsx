import { randomUUID } from "crypto";

import NavBar, { type MenuItem } from "@/components/base/layout/navBar";

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
      <main className="flex min-h-[calc(100vh-60px)] flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> App
          </h1>
          <span className="text-2xl font-extrabold tracking-tight sm:text-[2.5rem]">
            +
          </span>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Supabase <span className="text-[hsl(122,70%,50%)]">Auth</span>
          </h1>
        </div>
      </main>
    </>
  );
}
