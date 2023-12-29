import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ResetPassword from "@/components/pages/auth/resetPassword";

export default function Page() {
  return (
    <>
      <main className={"flex min-h-screen items-center justify-center"}>
        <Card className={"max-w-auth-card m-2 w-full"}>
          <CardHeader>
            <CardTitle>Reset Password</CardTitle>
            <CardDescription>What is your email address?</CardDescription>
          </CardHeader>
          <ResetPassword />
        </Card>
      </main>
    </>
  );
}
