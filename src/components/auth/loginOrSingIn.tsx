"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Database } from "@/lib/database.types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import DialogAlert from "@/components/auth/dialogAlert";

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

export default function LoginOrSingIn({ page }: LoginOrSingInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  async function handleSubmit() {
    if (page === "login") {
      await handleSignIn();
    } else {
      await handleSignUp();
    }
  }

  async function handleSignUp() {
    await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${location.origin}/login`,
      },
    });
    setDialogData(dialogDataEmailConfirmation);
    setIsOpen(true);
  }

  async function handleSignIn() {
    const response = await supabase.auth.signInWithPassword({
      email,
      password,
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
        <div className="space-y-1">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder={"my@closet.com"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="space-y-1">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            id="password"
            placeholder={"********"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className={"flex-col gap-2"}>
        <Button onClick={handleSubmit} className={"w-[160px]"}>
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
