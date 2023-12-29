import { redirect } from "next/navigation";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { verifySession } from "@/utils/auth";
import Login from "@/components/pages/auth/login";

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
            <CardTitle>Login</CardTitle>
            <CardDescription>Login to test the authentication</CardDescription>
          </CardHeader>
          <Login />
        </Card>
      </main>
    </>
  );
}
