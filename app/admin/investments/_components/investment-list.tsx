"use client";
import { useState, useTransition } from "react";
// import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { AdminGetAllInvestments } from "@/data/admin/get-all-investment";
import { tryCatch } from "@/utils/try-catch";
import { updateInvestmentProfit, updateInvestmentStatus } from "../actions";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { statusChangeColor } from "@/utils/status-color";
import { UserAvatar } from "@/components/user-avatar";

export default function AdminInvestmentsList({
  investments,
}: {
  investments: AdminGetAllInvestments;
}) {
  const [localInvestments, setLocalInvestments] = useState(investments);
  const [statusChangePending, startStatusChange] = useTransition();
  const [profitChangePending, startProfitChange] = useTransition();

  function handleProfitChange(id: string, newProfit: string) {
    const profitNum = newProfit === "" ? null : parseFloat(newProfit);
    setLocalInvestments((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, profit: profitNum } : inv))
    );
  }

  function handleStatusChange(
    id: string,
    newStatus: "pending" | "active" | "completed" | "cancelled"
  ) {
    startStatusChange(async () => {
      const { data, error } = await tryCatch(
        updateInvestmentStatus(id, newStatus)
      );
      if (error) {
        toast.error("UnExpected error occurred");
      }
      if (data?.status === "error") {
        toast.error(data.message);
      } else if (data?.status === "success") {
        toast.success(data.message);
        setLocalInvestments((prev) =>
          prev.map((inv) =>
            inv.id === id ? { ...inv, status: newStatus } : inv
          )
        );
      }
    });
  }

  function saveProfit(id: string, newProfit: string) {
    const profitNum = newProfit === "" ? null : parseFloat(newProfit);
    const oldProfit =
      localInvestments.find((inv) => inv.id === id)?.profit ?? null;

    startProfitChange(async () => {
      const { data, error } = await tryCatch(
        updateInvestmentProfit(id, profitNum)
      );

      if (error || data?.status === "error") {
        toast.error(data?.message ?? "Unexpected error occurred");
        // rollback
        setLocalInvestments((prev) =>
          prev.map((inv) =>
            inv.id === id ? { ...inv, profit: oldProfit } : inv
          )
        );
        return;
      } else if (data.status === "success") {
        toast.success(data?.message ?? "Profit updated");
        setLocalInvestments((prev) =>
          prev.map((inv) =>
            inv.id === id ? { ...inv, profit: profitNum } : inv
          )
        );
      }
    });
  }

  return (
    <>
      <div className="space-y-4">
        {localInvestments.length === 0 && (
          <p className="text-sm text-muted-foreground">No investments found.</p>
        )}

        {localInvestments.map((inv) => (
          <Card key={inv.id}>
            <CardContent className="px-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-1">
                {/* User + Inv ID */}
                <div className="flex flex-row items-center gap-4">
                  <UserAvatar
                    email={inv.user.email}
                    size="md"
                    image={inv.user.image}
                  />
                  <p className="font-medium text-sm">👤 {inv.user.email}</p>
                </div>

                {/* Date */}
                <p className="text-xs text-muted-foreground">
                  {inv.createdAt
                    ? format(new Date(inv.createdAt), "PPpp")
                    : "Unknown"}
                </p>

                {/* Plan + Amount + ROI */}
                <p className="text-sm">
                  <span className="font-semibold">{inv.plan}</span> •{" "}
                  <span className="text-teal-600 font-medium">
                    ${inv.amount.toLocaleString()}
                  </span>{" "}
                  • ROI{" "}
                  <span className="text-purple-600 font-medium">
                    {inv.roi}%
                  </span>
                </p>

                {/* Profit (editable) */}
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-green-600">
                    Profit: $
                  </p>

                  <Input
                    type="number"
                    value={inv.profit ?? ""}
                    onChange={(e) => handleProfitChange(inv.id, e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        saveProfit(inv.id, e.currentTarget.value);
                      }
                    }}
                    className="h-7 w-24 text-xs"
                    disabled={profitChangePending}
                    aria-disabled={profitChangePending}
                  />
                  {profitChangePending && (
                    <Loader2 className="size-3 animate-spin" />
                  )}
                </div>
              </div>

              {/* Right: Status select */}
              <div className="flex items-center gap-3">
                <Select
                  value={inv.status ?? "pending"}
                  onValueChange={(val) =>
                    handleStatusChange(
                      inv.id,
                      val as "pending" | "active" | "completed" | "cancelled"
                    )
                  }
                  disabled={statusChangePending}
                >
                  <SelectTrigger
                    className={`w-[140px] border ${statusChangeColor(
                      inv.status ?? "pending"
                    )}`}
                  >
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More button
      <div className="flex justify-center mt-4">
        <Button onClick={() => {}}>Load More</Button>
      </div> */}
    </>
  );
}
