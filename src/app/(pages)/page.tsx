import Link from "next/link";

import { ThemeModeToggle } from "@/components/toggles/themeModeToggle";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import type { Database } from "@/lib/database.types";
export default async function Home() {
  const cookie = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookie,
  });
  const { data } = await supabase.from("profiles").select("*");
  return (
    <main className={"flex min-h-screen items-center justify-center"}>
      <div
        className={
          "container flex flex-col items-center justify-center gap-12 px-4 py-16"
        }
      >
        <h1> Hello world</h1>
        <ThemeModeToggle />
        <Link href={"/login"}>
          <Button variant={"outline"}>Login page</Button>
        </Link>
        {data?.[0]?.full_name &&
          `Wellcome back ${data?.[0]?.full_name} to your virtual closet`}
      </div>
    </main>
  );
}
