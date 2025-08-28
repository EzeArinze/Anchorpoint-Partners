import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { tryCatch } from "@/utils/try-catch";
import { UserWithRole } from "better-auth/plugins";
import { useTransition } from "react";
import { RemoveUser } from "../action";
import { toast } from "sonner";
import { buttonVariants } from "@/components/ui/button";
import { UseQueryResult } from "@tanstack/react-query";

interface iAppProps<TData = unknown, TError = unknown> {
  user: UserWithRole;
  refetch?: UseQueryResult<TData, TError>["refetch"];
}

export function DeleteDialog({ user, refetch }: iAppProps) {
  const [deleteIsPending, startDeletionTransition] = useTransition();

  function handleDeleteUser(id: string) {
    if (!id) return;
    startDeletionTransition(async () => {
      const { data, error } = await tryCatch(RemoveUser(id));
      if (error) {
        toast.error("Error occured while deleting user");
      }
      if (data?.status === "error") {
        toast.error(data.message);
      } else if (data?.status === "success") {
        toast.success(data.message);
        refetch?.();
      }
    });
  }

  return (
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
        <AlertDialogDescription>
          This action cannot be undone. This will permanently delete{" "}
          {user.email} and remove related data from our database.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction
          onClick={() => handleDeleteUser(user.id)}
          disabled={deleteIsPending}
          className={buttonVariants({ variant: "destructive" })}
        >
          {deleteIsPending ? "Deleting..." : "Delete"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
