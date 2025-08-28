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
import { updateDepositStatus } from "../action";
import { AdminGetAllDeposits } from "@/data/admin/get-all-deposits";
import { tryCatch } from "@/utils/try-catch";
import { toast } from "sonner";
import { UserAvatar } from "@/components/user-avatar";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { StatusBadge } from "@/components/status-badge";

type Props = {
  deposits: AdminGetAllDeposits;
};

export default function AdminDepositList({ deposits }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleAction = (id: string, status: "approved" | "rejected") => {
    startTransition(async () => {
      const { data, error } = await tryCatch(updateDepositStatus(id, status));
      if (error) {
        toast.error(
          "Unexpected error occurred please try refreshing your browser"
        );
      }
      if (data?.status === "error") {
        toast.error(data.message);
      } else if (data?.status === "success") {
        toast.success(data.message);
      }
    });
  };

  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <h2 className="text-lg font-semibold mb-4">Deposits</h2>
        {deposits.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No deposits have been made.
          </p>
        )}
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Plan</TableHead>
                <TableHead>Method</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deposits.map((dep) => (
                <TableRow key={dep.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <UserAvatar
                        email={dep.user.email}
                        image={dep.user.image}
                        size="md"
                      />
                      <p>{dep.user.email}</p>
                    </div>
                  </TableCell>
                  <TableCell>${dep.amount.toFixed(2)}</TableCell>
                  <TableCell>{dep.plan}</TableCell>
                  <TableCell>{dep.paymentMethod}</TableCell>
                  <TableCell>
                    <StatusBadge status={dep.status} />
                  </TableCell>
                  <TableCell>
                    {dep.createdAt
                      ? format(new Date(dep.createdAt), "dd MMM yyyy")
                      : "N/A"}
                  </TableCell>
                  <TableCell className="text-right">
                    {dep.status === "pending" && (
                      <div className="flex justify-end">
                        {/* Desktop: show buttons */}
                        <div className="hidden sm:flex space-x-2">
                          <Button
                            size="sm"
                            disabled={isPending}
                            onClick={() => handleAction(dep.id, "approved")}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            disabled={isPending}
                            onClick={() => handleAction(dep.id, "rejected")}
                          >
                            Reject
                          </Button>
                        </div>

                        {/* Mobile: show dropdown */}
                        <div className="sm:hidden">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button size="icon" variant="ghost">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                onClick={() => handleAction(dep.id, "approved")}
                                disabled={isPending}
                              >
                                ✅ Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                onClick={() => handleAction(dep.id, "rejected")}
                                disabled={isPending}
                                className="text-red-600"
                              >
                                ❌ Reject
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
