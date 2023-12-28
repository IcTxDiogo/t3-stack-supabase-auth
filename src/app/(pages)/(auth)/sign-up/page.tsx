import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import LoginOrSingIn from "@/components/auth/loginOrSingIn";

export default function Page() {
  return (
    <>
      <main className={"flex min-h-screen items-center justify-center"}>
        <Card className={"m-2 w-full max-w-[400px]"}>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>
              Create an account to save your favorite clothes
            </CardDescription>
          </CardHeader>
          <LoginOrSingIn page={"signUp"} />
        </Card>
      </main>
    </>
  );
}
