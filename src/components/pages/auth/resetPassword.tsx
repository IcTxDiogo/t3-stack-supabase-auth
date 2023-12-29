"use client";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

import { tooManyRequestsDialogData } from "@/components/pages/auth/singUp";
import DialogAlert from "@/components/base/dialogs/dialogAlert";
import { CardContent, CardFooter } from "@/components/ui/card";
import FormItemRender from "@/components/form/formItemRender";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email(),
});

const resetSendToEmailDialogData = {
  title: "Email sent",
  description: "Check your email to reset your password",
  redirect: true,
};

export default function ResetPassword() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [dialogData, setDialogData] = useState(resetSendToEmailDialogData);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const supabase = createClientComponentClient();
    const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
      redirectTo: `${location.origin}/update-password`,
    });
    if (error) {
      setDialogData(tooManyRequestsDialogData);
    } else {
      setDialogData(resetSendToEmailDialogData);
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
              name={"email"}
              label={"Email"}
              renderItem={(field) => <Input {...field} />}
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
