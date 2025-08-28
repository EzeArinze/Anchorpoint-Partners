"use client";
import React, { useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { WithdrawalListType } from "@/data/user/get-withrawals";
import { Button } from "@/components/ui/button";
import { Loader2, X } from "lucide-react";
import { tryCatch } from "@/utils/try-catch";
import { deletePendingWithdrawal } from "../action";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface WithdrawalListProps {
  withdrawals: WithdrawalListType;
}

function WithdrawalList({ withdrawals }: WithdrawalListProps) {
  const [pending, startTransition] = useTransition();

  if (withdrawals.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Your Withdrawals</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            You have not made any withdrawal requests yet.
          </p>
        </CardContent>
      </Card>
    );
  }

  function handleDeletePendingWithdrawal(userId: string, id: string) {
    if (!userId && !id) return;
    startTransition(async () => {
      const { data, error } = await tryCatch(
        deletePendingWithdrawal(userId, id)
      );
      if (error) {
        toast.error("Error occurred while deleting pending withdrawal");
      }
      if (data?.status === "error") {
        toast.error(data.message);
      } else if (data?.status === "success") {
        toast.success(data.message);
      }
    });
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Withdrawals</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="border-b text-gray-600 dark:text-gray-300">
                <th className="py-2 px-3 text-left">Date</th>
                <th className="py-2 px-3 text-left">Amount</th>
                <th className="py-2 px-3 text-left">Method</th>
                <th className="py-2 px-3 text-left">Address</th>
                <th className="py-2 px-3 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {withdrawals.map((w) => (
                <tr key={w.id} className="border-b last:border-0">
                  <td className="py-2 px-3">
                    {new Date(w.createdAt || "").toLocaleDateString()}
                  </td>
                  <td className="py-2 px-3">${w.amount.toLocaleString()}</td>
                  <td className="py-2 px-3 capitalize">{w.wallet.type}</td>
                  <td className="py-2 px-3 truncate max-w-[150px]">
                    {w.wallet.address}
                  </td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        w.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : w.status === "approved"
                            ? "bg-blue-100 text-blue-800"
                            : w.status === "completed"
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                      }`}
                    >
                      {w.status}
                    </span>
                  </td>
                  {w.status === "pending" && (
                    <td>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              variant={"destructive"}
                              size={"icon"}
                              className="size-7 rounded hover:bg-muted"
                              onClick={() =>
                                handleDeletePendingWithdrawal(w.userId, w.id)
                              }
                              disabled={pending}
                            >
                              {pending ? (
                                <Loader2 className="size-4 animate-spin" />
                              ) : (
                                <X className="size-4" />
                              )}
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="top">
                            <p className="font-semibold">Cancel</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}

export default WithdrawalList;
