"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { useTransition } from "react";
import { toast } from "sonner";
import { UserAvatar } from "@/components/user-avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { AdminGetAllWithdrawals } from "@/data/admin/get-all-withdrawals";
import { StatusBadge } from "@/components/status-badge";
import { tryCatch } from "@/utils/try-catch";
import { approveWithdrawal, updateWithdrawalStatus } from "../action";

type Props = {
  withdrawals: AdminGetAllWithdrawals;
};

export default function AdminWithdrawalList({ withdrawals }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleAction = (
    id: string,
    action: "approve" | "rejected" | "completed"
  ) => {
    startTransition(async () => {
      if (action === "approve") {
        const { data, error } = await tryCatch(approveWithdrawal(id));
        if (error || data?.status === "error") {
          toast.error(data?.message || "Failed to approve withdrawal");
          return;
        }
        if (data.status === "success") {
          toast.success("Withdrawal approved successfully");
        }
      } else {
        const { data, error } = await tryCatch(
          updateWithdrawalStatus(id, action)
        );
        if (error || data?.status === "error") {
          toast.error(data?.message || "Failed to update withdrawal");
          return;
        }

        if (data.status === "success") {
          toast.success(
            action === "rejected"
              ? "Withdrawal rejected"
              : "Withdrawal marked completed"
          );
        }
      }
    });
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Withdrawals</h2>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Wallet ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Admin Note</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {withdrawals.map((w) => (
                <TableRow key={w.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <UserAvatar
                        email={w.user.email}
                        image={w.user.image}
                        size="md"
                      />
                      <p>{w.user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>${w.amount.toFixed(2)}</TableCell>
                  <TableCell>{w.walletId}</TableCell>
                  <TableCell>
                    <StatusBadge status={w.status} />
                  </TableCell>
                  <TableCell>
                    {w.adminNote ? (
                      <span className="text-sm text-muted-foreground">
                        {w.adminNote}
                      </span>
                    ) : (
                      <span className="text-sm italic text-gray-400">
                        No note
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {w.createdAt
                      ? format(new Date(w.createdAt), "dd MMM yyyy")
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    {w.status === "pending" && (
                      <div className="flex justify-end">
                        {/* Desktop buttons */}
                        <div className="hidden sm:flex space-x-2">
                          <Button
                            size="sm"
                            disabled={isPending}
                            onClick={() => handleAction(w.id, "approve")}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={isPending}
                            onClick={() => handleAction(w.id, "rejected")}
                          >
                            Reject
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            disabled={isPending}
                            onClick={() => handleAction(w.id, "completed")}
                          >
                            Mark Completed
                          </Button>
                        </div>

                        {/* Mobile dropdown */}
                        <div className="sm:hidden">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleAction(w.id, "approve")}
                                disabled={isPending}
                              >
                                ✅ Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleAction(w.id, "rejected")}
                                disabled={isPending}
                                className="text-red-600"
                              >
                                ❌ Reject
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleAction(w.id, "completed")}
                                disabled={isPending}
                              >
                                ✔️ Mark Completed
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
