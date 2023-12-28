import LoginOrSingIn from "@/components/auth/loginOrSingIn";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Page() {
  return (
    <>
      <main className={"flex min-h-screen items-center justify-center"}>
        <Card className={"m-2 w-full max-w-[400px]"}>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              Login to your account to access your virtual closet
            </CardDescription>
          </CardHeader>
          <LoginOrSingIn page={"login"} />
        </Card>
      </main>
    </>
  );
}
