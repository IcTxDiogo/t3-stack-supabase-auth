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

export type BodyDialogAlert = {
  title: ReactNode;
  description: ReactNode;
  redirect: boolean;
  url?: string;
};

type DialogAlertProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
} & BodyDialogAlert;
export default function DialogAlert({
  isOpen,
  setIsOpen,
  title,
  description,
  redirect,
  url,
}: DialogAlertProps) {
  const router = useRouter();
  function goToHome() {
    if (redirect) {
      const href = url ? url : "/";
      router.push(href);
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
