import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import FormItemRender from "@/components/form/formItemRender";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form } from "@/components/ui/form";

type AuthFormProps = {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
};

export const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export default function AuthForm({ onSubmit }: AuthFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormItemRender
            form={form}
            name={"email"}
            label={"Email"}
            renderItem={(field) => (
              <Input placeholder={"your@email.com"} {...field} />
            )}
          />
          <FormItemRender
            form={form}
            name={"password"}
            label={"Password"}
            renderItem={(field) => (
              <Input placeholder={"**********"} type={"password"} {...field} />
            )}
          />
        </form>
      </Form>
      <div className={"flex flex-col items-center pt-2"}>
        <Button
          onClick={form.handleSubmit(onSubmit)}
          className={"w-auth-button"}
        >
          Submit
        </Button>
      </div>
    </>
  );
}
