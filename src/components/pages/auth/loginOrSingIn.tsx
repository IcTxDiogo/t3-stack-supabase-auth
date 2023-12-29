"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

import { CardContent, CardFooter } from "@/components/ui/card";
import DialogAlert from "@/components/base/dialogs/dialogAlert";
import type { Database } from "@/lib/database.types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import FormItemRender from "@/components/form/formItemRender";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type LoginOrSingInProps = {
  page: "login" | "signUp";
};

const dialogDataEmailConfirmation = {
  title: "Email confirmation need",
  description:
    "A confirmation email has been sent to your email address. Please click on the confirmation link in the email to activate your account.",
  redirect: true,
};

const dialogDataWrongCredentials = {
  title: "Wrong credentials",
  description: "Please check your email and password and try again or sign up.",
  redirect: false,
};

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function LoginOrSingIn({ page }: LoginOrSingInProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const [isOpen, setIsOpen] = useState(false);
  const [dialogData, setDialogData] = useState({
    title: "",
    description: "",
    redirect: true,
  });

  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const searchParams = useSearchParams();

  const hasConfirmEmailCode = searchParams.get("code");

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (page === "login") {
      await handleSignIn(values);
    } else {
      await handleSignUp(values);
    }
  }

  async function handleSignUp(values: z.infer<typeof formSchema>) {
    await supabase.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        emailRedirectTo: `${location.origin}/login`,
      },
    });
    setDialogData(dialogDataEmailConfirmation);
    setIsOpen(true);
  }

  async function handleSignIn(values: z.infer<typeof formSchema>) {
    const response = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (response.error) {
      setDialogData(dialogDataWrongCredentials);
      setIsOpen(true);
    } else {
      if (hasConfirmEmailCode) {
        router.push("/finish-register");
      } else {
        router.refresh();
      }
    }
  }

  const isLogin = page === "login";

  return (
    <>
      <DialogAlert isOpen={isOpen} setIsOpen={setIsOpen} {...dialogData} />
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormItemRender
              form={form}
              name={"email"}
              label={"Email"}
              renderItem={(field) => <Input {...field} />}
            />
            <FormItemRender
              form={form}
              name={"password"}
              label={"Password"}
              renderItem={(field) => <Input type={"password"} {...field} />}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className={"flex-col gap-2"}>
        <Button onClick={form.handleSubmit(onSubmit)} className={"w-[160px]"}>
          Submit
        </Button>
        <Link href={isLogin ? "/sign-up" : "/login"}>
          <Button variant="outline" className={"w-[160px]"}>
            {isLogin ? "Sign up" : "Login"}
          </Button>
        </Link>
        <Link href={"/"}>
          <Button variant="ghost" className={"w-[160px]"}>
            <ArrowLeft />
            Back
          </Button>
        </Link>
      </CardFooter>
    </>
  );
}
