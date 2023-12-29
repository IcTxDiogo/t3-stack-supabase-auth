"use client";

import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { type z } from "zod";
import Link from "next/link";

import DialogAlert, {
  type BodyDialogAlert,
} from "@/components/base/dialogs/dialogAlert";
import AuthForm, { type formSchema } from "@/components/pages/auth/authForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CardContent, CardFooter } from "@/components/ui/card";
import type { Database } from "@/lib/database.types";
import { Button } from "@/components/ui/button";

const newUserDialogData = {
  title: "Email confirmation need",
  description:
    "A confirmation email has been sent to your email address. Please click on the confirmation link in the email to activate your account.",
  redirect: true,
  url: undefined,
};

const areadySignedUpDialogData = {
  title: "User already signed up",
  description: "This email is already signed up. Please login.",
  redirect: true,
  url: "/login",
};

const tooManyRequestsDialogData = {
  title: "Too many requests",
  description:
    "You have reached the limit of requests. Please try again later.",
  redirect: false,
  url: undefined,
};

export default function SingUp() {
  const [isOpen, setIsOpen] = useState(false);
  const [dialogData, setDialogData] =
    useState<BodyDialogAlert>(newUserDialogData);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const supabase = createClientComponentClient<Database>();
    const response = await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${location.origin}/login`,
      },
    });
    setIsOpen(true);
    if (response.error) {
      setDialogData(tooManyRequestsDialogData);
    } else {
      if (response.data.user?.identities?.length === 0) {
        setDialogData(areadySignedUpDialogData);
      } else {
        setDialogData(newUserDialogData);
      }
    }
  }

  return (
    <>
      <DialogAlert isOpen={isOpen} setIsOpen={setIsOpen} {...dialogData} />
      <CardContent className="space-y-2">
        <AuthForm onSubmit={onSubmit} />
      </CardContent>
      <CardFooter className={"flex-col gap-2"}>
        <Link href={"/login"}>
          <Button variant="outline" className={"w-auth-button"}>
            Login
          </Button>
        </Link>
        <Link href={"/"}>
          <Button variant="ghost" className={"w-auth-button"}>
            <ArrowLeft />
          </Button>
        </Link>
      </CardFooter>
    </>
  );
}
