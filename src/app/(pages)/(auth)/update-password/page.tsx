import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import UpdatePassword from "@/components/pages/auth/updatePassword";
import { verifySession } from "@/utils/auth";
import { redirect } from "next/navigation";

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
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>Type your new password</CardDescription>
          </CardHeader>
          <UpdatePassword />
        </Card>
      </main>
    </>
  );
}
