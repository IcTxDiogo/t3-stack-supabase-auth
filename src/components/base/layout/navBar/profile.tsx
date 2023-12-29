import { LogIn, LogOut } from "lucide-react";
import Link from "next/link";

import { getLoggedUserData } from "@/utils/auth";
import { Button } from "@/components/ui/button";

export default async function Profile() {
  const { isAuthenticated, profile } = await getLoggedUserData();

  return (
    <>
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
    </>
  );
}
