import {ThemeModeToggle} from "@/components/toggles/themeModeToggle";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1> Hello world</h1>
        <ThemeModeToggle />
      </div>
    </main>
  );
}
