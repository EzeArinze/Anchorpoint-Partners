"use client";

import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import React, { useTransition } from "react";
import { deleteWallet, UserWalletsType } from "../action";
import { tryCatch } from "@/utils/try-catch";
import { toast } from "sonner";

interface iAppProps {
  wallets: UserWalletsType[];
}

export default function UserWallet({ wallets }: iAppProps) {
  const [pending, startTransition] = useTransition();

  function handleDelete(id: string) {
    startTransition(async () => {
      const { data, error } = await tryCatch(deleteWallet(id));

      if (error) {
        toast.error("Failed to delete wallet");
      }
      if (data?.status === "error") {
        toast.error(data.message);
      } else if (data?.status === "success") {
        toast.error(data.message);
      }
    });
  }

  return (
    <>
      {wallets.length > 0 && (
        <div className="space-y-3">
          {wallets.map((wallet) => (
            <div
              key={wallet.id}
              className="p-3 border rounded-md flex items-center justify-between"
            >
              <div>
                <p className="font-medium capitalize">{wallet.type}</p>
                <p className="text-sm text-gray-500">{wallet.address}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(wallet.id)}
                  disabled={pending}
                >
                  {pending ? (
                    <>
                      <Loader2 className="size-4 mr-1" /> Deleting...
                    </>
                  ) : (
                    <>
                      <Trash2 className="size-4 mr-1" /> Delete
                    </>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
