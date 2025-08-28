import { countDistinct, gte, sum } from "drizzle-orm";
import { db } from "@/db";
import { investment, user } from "@/db/schema";
import { requireAdmin } from "./verify-admin";

export type AdminDashboardState = {
  totalCustomers: number;
  totalInvestedCustomers: number;
  // totalAvailableBalance: number;
  totalInvestedAmount: number;
  totalProfitEarnedbyUsers: number;
};

export async function getAdminDashboardState(): Promise<AdminDashboardState> {
  const totalCustomers = await db.$count(user);

  const [row] = await db
    .select({
      totalInvestedCustomers: countDistinct(investment.userId),
      totalInvestedAmount: sum(investment.amount),
      profitSum: sum(investment.profit),
    })
    .from(investment);

  return {
    totalCustomers: totalCustomers,
    totalInvestedCustomers: Number(row.totalInvestedCustomers ?? 0),
    totalInvestedAmount: Number(row.totalInvestedAmount ?? 0),
    totalProfitEarnedbyUsers: Number(row.profitSum ?? 0),
  };
}

export type AdminStats = Awaited<ReturnType<typeof getAdminDashboardState>>;

// export async function getAdminDashboardState(): Promise<AdminDashboardState> {
//   const [row] = await db
//     .select({
//       totalCustomers: sql<number>`(select count(*) from ${user})`,
//       totalInvestedCustomers: countDistinct(investment.userId),
//       totalInvestedAmount: sum(investment.amount),
//       amountSum: sum(investment.amount),
//       profitSum: sum(investment.profit),
//     })
//     .from(investment);

//   return {
//     totalCustomers: Number(row.totalCustomers ?? 0),
//     totalInvestedCustomers: Number(row.totalInvestedCustomers ?? 0),
//     totalInvestedAmount: Number(row.totalInvestedAmount ?? 0),
//     totalAvailableBalance:
//       Number(row.amountSum ?? 0) + Number(row.profitSum ?? 0),
//   };
// }

export async function adminGetmonthlyInvestment() {
  await requireAdmin();

  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const investments = await db.query.investment.findMany({
    where: gte(investment.createdAt, thirtyDaysAgo),
    columns: {
      createdAt: true,
    },
    orderBy: (inv, { asc }) => [asc(inv.createdAt)],
  });

  const last30Days: { date: string; investments: number }[] = [];

  for (let index = 29; index >= 0; index--) {
    const date = new Date();
    date.setDate(date.getDate() - index);
    last30Days.push({
      date: date.toISOString().split("T")[0],
      investments: 0,
    });
  }

  investments.forEach((investment) => {
    const investmentDate = investment.createdAt?.toISOString().split("T")[0];
    const dayIndex = last30Days.findIndex((day) => day.date === investmentDate);

    if (dayIndex !== -1) {
      last30Days[dayIndex].investments++;
    }
  });

  return last30Days;
}

export type InvestmentDataType = Awaited<
  ReturnType<typeof adminGetmonthlyInvestment>
>;
