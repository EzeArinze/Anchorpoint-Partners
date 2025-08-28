type InvestmentStatus = "pending" | "active" | "completed" | "cancelled";

const statusColors: Record<InvestmentStatus, string> = {
  pending: "text-yellow-500",
  active: "text-green-500",
  completed: "text-blue-500",
  cancelled: "text-red-500",
};

export function statusChangeColor(status: InvestmentStatus): string {
  return statusColors[status];
}
