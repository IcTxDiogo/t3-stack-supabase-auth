import Login from "@/components/auth/login";
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
        <Card className={"m-4 w-full max-w-[400px]"}>
          <CardHeader>
            <CardTitle>Login</CardTitle>
            <CardDescription>
              login to your account to access your virtual closet
            </CardDescription>
          </CardHeader>
          <Login />
        </Card>
      </main>
    </>
  );
}
