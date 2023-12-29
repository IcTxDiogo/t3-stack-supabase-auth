"use client";

import DialogAlert from "@/components/base/dialogs/dialogAlert";
import { useRouter, useSearchParams } from "next/navigation";
import { Home } from "lucide-react";
import { useState } from "react";
import { type z } from "zod";
import Link from "next/link";

import AuthForm, { type formSchema } from "@/components/pages/auth/authForm";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { CardContent, CardFooter } from "@/components/ui/card";
import type { Database } from "@/lib/database.types";
import { Button } from "@/components/ui/button";

const dialogData = {
  title: "Wrong credentials",
  description: "Please check your email and password and try again or sign up.",
  redirect: false,
};

export default function Login() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();
  const hasConfirmEmailCode = searchParams.get("code");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const supabase = createClientComponentClient<Database>();
    const response = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (response.error) {
      setIsOpen(true);
    } else {
      if (hasConfirmEmailCode) {
        router.push("/finish-register");
      } else {
        router.refresh();
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
        <Link href={"/sign-up"}>
          <Button variant="outline" className={"w-auth-button"}>
            Sign up
          </Button>
        </Link>
        <Link href={"/reset-password"}>
          <Button variant="ghost" className={"w-auth-button"}>
            Forgot password
          </Button>
        </Link>
        <Link href={"/"}>
          <Button variant="ghost" className={"w-auth-button"}>
            <Home />
          </Button>
        </Link>
      </CardFooter>
    </>
  );
}
