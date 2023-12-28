import { useRouter } from "next/navigation";
import { type ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type SingInDialogProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  title: ReactNode;
  description: ReactNode;
  redirect: boolean;
};
export default function DialogAlert({
  isOpen,
  setIsOpen,
  title,
  description,
  redirect,
}: SingInDialogProps) {
  const router = useRouter();
  function goToHome() {
    if (redirect) {
      router.push("/");
    }
  }
  return (
    <>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={goToHome}>Dismiss</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
