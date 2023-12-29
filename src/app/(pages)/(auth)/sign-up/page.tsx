import { redirect } from "next/navigation";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { verifySession } from "@/utils/auth";
import SingUp from "@/components/pages/auth/singUp";

export default async function Page() {
  const isAuthenticated = await verifySession();
  if (isAuthenticated) {
    redirect("/");
  }
  return (
    <>
      <main className={"flex min-h-screen items-center justify-center"}>
        <Card className={"max-w-auth-card m-2 w-full"}>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create an account to test the authentication
            </CardDescription>
          </CardHeader>
          <SingUp />
        </Card>
      </main>
    </>
  );
}
