import { redirect } from "next/navigation";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FinishRegister from "@/components/pages/auth/finishRegister";
import { getLoggedUserData } from "@/utils/auth";

export default async function Page() {
  const { profile } = await getLoggedUserData();
  if (!(profile?.full_name === null)) {
    redirect("/");
  }

  const id = profile?.id;
  return (
    <>
      <main className={"flex min-h-screen items-center justify-center"}>
        <Card className={"max-w-auth-card m-2 w-full"}>
          <CardHeader>
            <CardTitle>Finish register</CardTitle>
            <CardDescription>
              Please fill in the form below to complete your registration.
            </CardDescription>
          </CardHeader>
          <FinishRegister id={id} />
        </Card>
      </main>
    </>
  );
}
