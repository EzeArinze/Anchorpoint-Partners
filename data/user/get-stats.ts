import "server-only";
import { db } from "@/db";
import { deposit, investment, withdrawal, referral } from "@/db/schema";
import { and, count, eq, sum } from "drizzle-orm";

export async function getUserDashboardStats(userId: string) {
  const [investmentStats, deposits, withdrawals, profits, referralBonuses] =
    await Promise.all([
      // 1. Investment stats
      db
        .select({
          totalInvested: sum(investment.amount).as("totalInvested"),
          planCount: count(investment.id).as("planCount"),
        })
        .from(investment)
        .where(
          and(
            eq(investment.userId, userId),
            inArray(investment.status, ["active", "completed"])
          )
        )
        .then((res) => res[0]),

      // 2. Deposits (only approved)
      db
        .select({ total: sum(deposit.amount).as("total") })
        .from(deposit)
        .where(and(eq(deposit.userId, userId), eq(deposit.status, "approved")))
        .then((res) => res[0]),

      // 3. Withdrawals (only approved)
      db
        .select({ total: sum(withdrawal.amount).as("total") })
        .from(withdrawal)
        .where(
          and(eq(withdrawal.userId, userId), eq(withdrawal.status, "approved"))
        )
        .then((res) => res[0]),

      // 4. Profits (active investments)
      db
        .select({ total: sum(investment.profit).as("total") })
        .from(investment)
        .where(
          and(eq(investment.userId, userId), eq(investment.status, "active"))
        )
        .then((res) => res[0]),

      // 5. Referral bonuses
      db
        .select({ total: sum(referral.bonus).as("total") })
        .from(referral)
        .where(eq(referral.referrerId, userId))
        .then((res) => res[0]),
    ]);

  const totalInvested = Number(investmentStats?.totalInvested ?? 0);
  const planCount = Number(investmentStats?.planCount ?? 0);

  const totalDeposits = Number(deposits?.total ?? 0);
  const totalWithdrawals = Number(withdrawals?.total ?? 0);
  const totalProfits =
    Number(profits?.total ?? 0) + Number(referralBonuses?.total ?? 0);

  // ✅ Profits (investment + referral) are withdrawable immediately
  const totalCredits = totalDeposits + totalProfits;
  const bookBalance = totalCredits - totalWithdrawals;

  // ✅ No subtraction of invested, since profits already reflect it
  const availableBalance = Math.max(0, bookBalance);

  return {
    totalInvested,
    planCount,
    bookBalance,
    totalProfits, // includes referral bonuses
    availableBalance,
  };
}

export type UserDashboardStats = Awaited<
  ReturnType<typeof getUserDashboardStats>
>;
