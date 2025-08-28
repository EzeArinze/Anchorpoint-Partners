import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { recentInvestment } from "@/data/user/get-user-investments";
import { format } from "date-fns";
import { CircleDollarSign, TrendingUp, Clock } from "lucide-react";

interface iAppProps {
  investment: recentInvestment;
}

const statusColors: Record<NonNullable<recentInvestment["status"]>, string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  active: "bg-teal-100 text-teal-800 border-teal-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

function InvestmentCard({ investment }: iAppProps) {
  const { plan, amount, profit, status, startedAt, endsAt } = investment;

  return (
    <Card className="rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 border border-gray-200">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">{plan}</CardTitle>
          {status && (
            <Badge
              variant="outline"
              className={`capitalize px-2 py-1 rounded-lg text-xs font-medium ${statusColors[status]}`}
            >
              {status}
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Amount */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-muted-foreground">
            <CircleDollarSign size={18} /> Amount
          </span>
          <span className="font-medium ">${amount.toFixed(2)}</span>
        </div>

        {/* Profit */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-muted-foreground">
            <TrendingUp size={18} /> Profit
          </span>
          <span className="font-medium ">
            {profit ? `$${profit.toFixed(2)}` : "-"}
          </span>
        </div>

        {/* Duration */}
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-muted-foreground">
            <Clock size={18} /> Duration before withdrawal
          </span>
          <span className="font-medium text-muted-foreground">
            {startedAt ? format(new Date(startedAt), "MMM d, yyyy") : "—"} →{" "}
            {endsAt ? format(new Date(endsAt), "MMM d, yyyy") : "—"}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

export default InvestmentCard;
