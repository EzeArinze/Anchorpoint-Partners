"use client";

import * as React from "react";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { tryCatch } from "@/utils/try-catch";
import { toast } from "sonner";
import { setUserRole } from "../action";
import { UseQueryResult } from "@tanstack/react-query";

type UserRole = "user" | "admin" | ("user" | "admin")[];

interface UserRoleDialogProps<TData = unknown, TError = unknown> {
  userId: string;
  currentRole?: string;
  setOpen: (value: boolean) => void;
  refetch?: UseQueryResult<TData, TError>["refetch"];
}

export function UserRoleDialog({
  userId,
  currentRole,
  setOpen,
  refetch,
}: UserRoleDialogProps) {
  const [role, setRole] = React.useState<string | undefined>(currentRole);
  const [roleChangePending, startRoleChangeTransition] = useTransition();

  function handleChangeUserRole() {
    if (!userId) return;
    startRoleChangeTransition(async () => {
      const { data, error } = await tryCatch(
        setUserRole({ userId: userId, role: role as UserRole })
      );
      if (error) {
        toast.error("Error occured while unbanning user");
      }
      if (data?.status === "error") {
        toast.error(data.message);
      } else if (data?.status === "success") {
        toast.success(data.message);
        setOpen(false);
        refetch?.();
      }
    });
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>Change User Role</DialogTitle>
        <DialogDescription>
          Select a new role for this user and save changes.
        </DialogDescription>
      </DialogHeader>

      <div className="py-4">
        <Select value={role} onValueChange={(val) => setRole(val)}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Roles</SelectLabel>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <DialogFooter>
        <Button variant="outline" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button onClick={handleChangeUserRole} disabled={roleChangePending}>
          {roleChangePending ? "Saving..." : "Save"}
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
