import { serverSession } from "@/hooks/server-session";
import { handleAuthError } from "@/utils/auth-error";
import { redirect } from "next/navigation";
import { AdminSectionCards } from "./_components/admin-section-card";

import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { getRecentTransaction } from "@/data/admin/get-recent-transaction";
import { Suspense } from "react";
import { UserAvatar } from "@/components/user-avatar";
import {
  getAdminDashboardState,
  adminGetmonthlyInvestment,
} from "@/data/admin/admin-stats";
import { ChartAreaInteractive } from "./_components/chart/pie-chart";
import { RecentTransactionSkeleton } from "./_components/trasanction-list-skeleton";

export default async function AdminDashboardRoute({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  await handleAuthError(searchParams);

  const { session } = await serverSession();

  if (!session) {
    redirect("/sign-in");
  }

  if (session?.user.role !== "admin") {
    redirect("/not-admin");
  }

  return (
    <section className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
      <RenderSectionCards />

      <div className="px-4 lg:px-6">
        {/* Charts Grid */}
        <div className=" max-w-full">
          <RenderChartData />
        </div>

        <Separator className="mt-4" />
        <Suspense fallback={<RecentTransactionSkeleton />}>
          <RecentTransactionRender />
        </Suspense>
      </div>
    </section>
  );
}

async function RenderSectionCards() {
  const stats = await getAdminDashboardState();

  return <AdminSectionCards stats={stats} />;
}

async function RecentTransactionRender() {
  const recentTransactions = await getRecentTransaction();

  return (
    <div className="mt-4 px-4 lg:px-6 space-y-3">
      <h2 className="font-semibold text-xl">Recent Transactions</h2>

      <div className="space-y-4">
        {recentTransactions.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No recent transactions
          </p>
        )}

        {recentTransactions.map((tx) => (
          <div
            key={tx.id}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-lg border p-3 hover:bg-muted/50 transition"
          >
            {/* Left: User Info */}
            <div className="flex items-center gap-3">
              <UserAvatar
                email={tx.user.email}
                size="md"
                image={tx.user.image}
              />
              <div>
                <p className="text-sm font-medium">{tx.user.email}</p>
                <p className="text-xs text-muted-foreground">
                  {tx.createdAt
                    ? format(new Date(tx.createdAt), "PPpp")
                    : "Unknown date"}
                </p>
              </div>
            </div>

            {/* Right: Badge + Amount (stacked on mobile) */}
            <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 text-right">
              <Badge
                className="w-fit"
                variant={
                  tx.type === "deposit" || tx.type === "investment"
                    ? "default"
                    : tx.type === "withdrawal"
                      ? "destructive"
                      : "secondary"
                }
              >
                {tx.type.replace("_", " ")}
              </Badge>

              <p
                className={`text-sm font-semibold ${
                  tx.type === "withdrawal" ? "text-red-600" : "text-green-600"
                }`}
              >
                {tx.type === "withdrawal" ? "-" : "+"}$
                {tx.amount.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

async function RenderChartData() {
  const chartData = await adminGetmonthlyInvestment();

  return <ChartAreaInteractive data={chartData} />;
}
