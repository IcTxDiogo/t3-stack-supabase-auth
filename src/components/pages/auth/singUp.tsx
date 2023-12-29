"use client";

import DialogAlert from "@/components/base/dialogs/dialogAlert";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { type z } from "zod";
import Link from "next/link";

import AuthForm, { type formSchema } from "@/components/pages/auth/authForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CardContent, CardFooter } from "@/components/ui/card";
import type { Database } from "@/lib/database.types";
import { Button } from "@/components/ui/button";

const dialogData = {
  title: "Email confirmation need",
  description:
    "A confirmation email has been sent to your email address. Please click on the confirmation link in the email to activate your account.",
  redirect: true,
};

export default function SingUp() {
  const [isOpen, setIsOpen] = useState(false);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const supabase = createClientComponentClient<Database>();
    await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${location.origin}/login`,
      },
    });
    setIsOpen(true);
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
