"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";

import { CardContent, CardFooter } from "@/components/ui/card";
import FormItemRender from "@/components/form/formItemRender";
import DialogAlert from "@/components/auth/dialogAlert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";
import { api } from "@/trpc/react";

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(3).max(255),
  gender: z.string(),
  birthDate: z.string(),
  phone: z.string(),
});

type FinishRegisterProps = {
  id?: string;
};

export default function FinishRegister({ id }: FinishRegisterProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id,
      name: "",
      gender: "",
      birthDate: "",
      phone: "",
    },
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const updateProfile = api.profile.update.useMutation();

  async function onSubmit(values: z.infer<typeof formSchema>) {
    values.birthDate = new Date(values.birthDate).toISOString();
    await updateProfile.mutateAsync(values);
    setIsOpen(true);
  }

  return (
    <>
      <DialogAlert
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title={"register success"}
        description={"Now you are ready to your cloud closet"}
      />
      <CardContent className="space-y-2">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormItemRender
              form={form}
              name={"name"}
              label={"Name"}
              renderItem={(field) => <Input {...field} />}
            />
            <FormItemRender
              form={form}
              name={"gender"}
              label={"Gender"}
              renderItem={(field) => <Input {...field} />}
            />
            <FormItemRender
              form={form}
              name={"birthDate"}
              label={"Birth Date"}
              renderItem={(field) => <Input {...field} />}
            />
            <FormItemRender
              form={form}
              name={"phone"}
              label={"Phone"}
              renderItem={(field) => <Input {...field} />}
            />
          </form>
        </Form>
      </CardContent>
      <CardFooter className={"flex-col gap-2"}>
        <Button onClick={form.handleSubmit(onSubmit)} className={"w-[160px]"}>
          Finish Register
        </Button>
      </CardFooter>
    </>
  );
}
