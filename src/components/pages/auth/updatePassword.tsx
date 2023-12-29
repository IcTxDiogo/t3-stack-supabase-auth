"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { z } from "zod";

import DialogAlert, {
  type BodyDialogAlert,
} from "@/components/base/dialogs/dialogAlert";
import { CardContent, CardFooter } from "@/components/ui/card";
import FormItemRender from "@/components/form/formItemRender";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

const formSchema = z.object({
  password: z.string().min(8),
});

const passwordUpdatedDialogData = {
  title: "Password updated",
  description: "Your password has been updated",
  redirect: true,
};

export default function UpdatePassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [showWarning, setShowWarning] = useState<boolean>(false);
  const [dialogData, setDialogData] = useState<BodyDialogAlert>(
    passwordUpdatedDialogData,
  );
  const searchParams = useSearchParams();
  const hasRedirectCode = searchParams.get("code");
  const router = useRouter();

  useEffect(() => {
    if (!hasRedirectCode && showWarning && !isOpen) {
      router.push("/");
    }
    if (!hasRedirectCode) {
      setDialogData({
        title: "Not valid Link",
        description:
          "Please check your email for new link or generate a new one",
        redirect: true,
        url: "/reset-password",
      });
      setIsOpen(true);
      setShowWarning(true);
    }
  }, [showWarning, isOpen]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.updateUser({
      password: values.password,
    });
    if (error) {
      setDialogData({
        title: "Error",
        description: error.message,
        redirect: false,
      });
    }
    setIsOpen(true);
  }

  return (
    <>
      <DialogAlert isOpen={isOpen} setIsOpen={setIsOpen} {...dialogData} />
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
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
          Reset password
        </Button>
        <Link href={"/login"}>
          <Button variant="outline" className={"w-auth-button"}>
            Login
          </Button>
        </Link>
      </CardFooter>
    </>
  );
}
