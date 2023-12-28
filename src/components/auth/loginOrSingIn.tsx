"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Database } from "@/lib/database.types";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

type LoginOrSingInProps = {
  page: "login" | "signUp";
};

export default function LoginOrSingIn({ page }: LoginOrSingInProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();

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
        emailRedirectTo: `${location.origin}/complete-register`,
      },
    });
    router.push("/");
  }

  async function handleSignIn() {
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
    router.push("/");
  }

  const isLogin = page === "login";

  return (
    <>
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
