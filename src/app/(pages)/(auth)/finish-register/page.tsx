import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import FinishRegister from "@/components/auth/finish-register";
import type { Database } from "@/lib/database.types";

export default async function Page() {
  const cookie = cookies();
  const supabase = createServerComponentClient<Database>({
    cookies: () => cookie,
  });
  const { data } = await supabase.from("profiles").select("*");
  const fullName = data?.[0]?.full_name;
  const id = data?.[0]?.id;
  if (fullName ?? !id) {
    redirect("/");
  }
  return (
    <>
      <main className={"flex min-h-screen items-center justify-center"}>
        <Card className={"m-2 w-full max-w-[400px]"}>
          <CardHeader>
            <CardTitle>Finish register </CardTitle>
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
