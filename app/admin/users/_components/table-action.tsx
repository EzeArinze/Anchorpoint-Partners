"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { tryCatch } from "@/utils/try-catch";
import { UserWithRole } from "better-auth/plugins";
import { MoreHorizontal } from "lucide-react";
import { useState, useTransition } from "react";
import { BanUserAction, RevokeUserSessions, unBanUserAction } from "../action";
import { toast } from "sonner";
import { UseQueryResult } from "@tanstack/react-query";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DeleteDialog } from "./delete-dialog";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { UserRoleDialog } from "./user-role-selector";

type TableActionProps<TData = unknown, TError = unknown> = {
  user: UserWithRole;
  refetch?: UseQueryResult<TData, TError>["refetch"];
};

function TableAction({ user, refetch }: TableActionProps) {
  const [open, setOpen] = useState(false);
  const [banUserPending, startBanUserTransition] = useTransition();

  const [revokeUserPending, startRevokeUserTransition] = useTransition();

  function handleBanUser(id: string) {
    if (!id) return;
    startBanUserTransition(async () => {
      const { data, error } = await tryCatch(BanUserAction({ userId: id }));
      if (error) {
        toast.error("Error occured while banning user");
      }
      if (data?.status === "error") {
        toast.error(data.message);
      } else if (data?.status === "success") {
        toast.success(data.message);
        refetch?.();
      }
    });
  }

  function handleUnBanUser(id: string) {
    if (!id) return;
    startBanUserTransition(async () => {
      const { data, error } = await tryCatch(unBanUserAction(id));
      if (error) {
        toast.error("Error occured while revoking user");
      }
      if (data?.status === "error") {
        toast.error(data.message);
      } else if (data?.status === "success") {
        toast.success(data.message);
        refetch?.();
      }
    });
  }

  function handleRevokeUser(id: string) {
    if (!id) return;
    startRevokeUserTransition(async () => {
      const { data, error } = await tryCatch(RevokeUserSessions(id));
      if (error) {
        toast.error("Error occured while unbanning user");
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {user.banned ? (
          <DropdownMenuItem
            onClick={() => handleUnBanUser(user.id)}
            disabled={banUserPending}
          >
            unBan User
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => handleBanUser(user.id)}
            disabled={banUserPending}
          >
            Ban User
          </DropdownMenuItem>
        )}

        <DropdownMenuItem
          onClick={() => handleRevokeUser(user.id)}
          disabled={revokeUserPending}
        >
          Revoke User
        </DropdownMenuItem>

        <DropdownMenuSeparator />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="ghost" className="w-full">
              Change Role
            </Button>
          </DialogTrigger>

          <UserRoleDialog
            currentRole={user.role}
            setOpen={setOpen}
            userId={user.id}
            refetch={refetch}
          />
        </Dialog>

        <DropdownMenuSeparator />
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" className="w-full text-red-400">
              Delete User
            </Button>
          </AlertDialogTrigger>
          <DeleteDialog user={user} refetch={refetch} />
        </AlertDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default TableAction;
