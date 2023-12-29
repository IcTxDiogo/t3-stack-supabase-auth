import { redirect } from "next/navigation";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginOrSingIn from "@/components/pages/auth/loginOrSingIn";
import { verifySession } from "@/utils/auth";

export default async function Page() {
  const isAuthenticated = await verifySession();
  if (isAuthenticated) {
    redirect("/");
  }
  return (
    <>
      <main className={"flex min-h-screen items-center justify-center"}>
        <Card className={"m-2 w-full max-w-[400px]"}>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create an account to test the authentication
            </CardDescription>
          </CardHeader>
          <LoginOrSingIn page={"signUp"} />
        </Card>
      </main>
    </>
  );
}
