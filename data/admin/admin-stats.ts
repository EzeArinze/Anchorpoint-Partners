import { countDistinct, gte, sum } from "drizzle-orm";
import { db } from "@/db";
import { investment, referral, user } from "@/db/schema";
import { requireAdmin } from "./verify-admin";

export type AdminDashboardState = {
  totalCustomers: number;
  totalInvestedCustomers: number;
  totalInvestedAmount: number;
  totalProfitEarnedbyUsers: number;
};

export async function getAdminDashboardState(): Promise<AdminDashboardState> {
  const [totalCustomers, investmentStats, referralStats] = await Promise.all([
    db.$count(user),
    db
      .select({
        totalInvestedCustomers: countDistinct(investment.userId),
        totalInvestedAmount: sum(investment.amount),
        totalProfit: sum(investment.profit),
      })
      .from(investment)
      .then((res) => res[0]),
    db
      .select({ totalReferralBonus: sum(referral.bonus) })
      .from(referral)
      .then((res) => res[0]),
  ]);

  const totalProfitEarnedbyUsers =
    Number(investmentStats.totalProfit ?? 0) +
    Number(referralStats.totalReferralBonus ?? 0);

  return {
    totalCustomers: Number(totalCustomers ?? 0),
    totalInvestedCustomers: Number(investmentStats.totalInvestedCustomers ?? 0),
    totalInvestedAmount: Number(investmentStats.totalInvestedAmount ?? 0),
    totalProfitEarnedbyUsers,
  };
}

export type AdminStats = Awaited<ReturnType<typeof getAdminDashboardState>>;

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
