import { redirect } from "next/navigation";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FinishRegister from "@/components/pages/auth/finish-register";
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
        <Card className={"m-2 w-full max-w-[400px]"}>
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
