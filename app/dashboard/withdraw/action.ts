"use server";

import { requireUser } from "@/data/user/verify-user";
import { db } from "@/db";
import { deposit, investment, withdrawal } from "@/db/schema";
import { eq, and, sum } from "drizzle-orm";
import { revalidatePath } from "next/cache";

type WithdrawalInput = {
  amount: number;
  walletId: string;
};

export async function requestWithdrawal(data: WithdrawalInput) {
  const user = await requireUser();

  try {
    const result = await db.transaction(async (tx) => {
      // Fetch balances in parallel inside transaction
      const [
        [{ activeInvestmentsRaw }],
        [{ totalDepositsRaw }],
        [{ totalWithdrawalsRaw }],
        [{ totalProfitsRaw }],
      ] = await Promise.all([
        tx
          .select({ activeInvestmentsRaw: sum(investment.amount) })
          .from(investment)
          .where(
            and(eq(investment.userId, user.id), eq(investment.status, "active"))
          ),

        tx
          .select({ totalDepositsRaw: sum(deposit.amount) })
          .from(deposit)
          .where(
            and(eq(deposit.userId, user.id), eq(deposit.status, "approved"))
          ),

        tx
          .select({ totalWithdrawalsRaw: sum(withdrawal.amount) })
          .from(withdrawal)
          .where(
            and(
              eq(withdrawal.userId, user.id),
              eq(withdrawal.status, "approved")
            )
          ),

        tx
          .select({ totalProfitsRaw: sum(investment.profit) })
          .from(investment)
          .where(
            and(eq(investment.userId, user.id), eq(investment.status, "active"))
          ),
      ]);

      // Must have at least one active investment
      if (!activeInvestmentsRaw) {
        return { status: "error", message: "No active investments found." };
      }

      const totalDeposits = Number(totalDepositsRaw ?? 0);
      const totalWithdrawals = Number(totalWithdrawalsRaw ?? 0);
      const totalProfits = Number(totalProfitsRaw ?? 0);

      const availableBalance = Math.max(
        0,
        totalDeposits + totalProfits - totalWithdrawals
      );

      if (data.amount > availableBalance) {
        return {
          status: "error",
          message: `Insufficient balance. Available: $${availableBalance}`,
        };
      }

      // Insert withdrawal
      await tx.insert(withdrawal).values({
        userId: user.id,
        walletId: data.walletId,
        amount: data.amount,
        status: "pending",
        createdAt: new Date(),
      });

      return { status: "success", message: "Withdrawal request submitted." };
    });

    revalidatePath("/dashboard/withdraw");
    return result;
  } catch (err) {
    console.error("requestWithdrawal error:", err);
    return { status: "error", message: "Failed to request withdrawal." };
  }
}

export async function deletePendingWithdrawal(
  userId: string,
  withdrawalId: string
): Promise<ActionReturnType> {
  try {
    const result = await db
      .delete(withdrawal)
      .where(
        and(
          eq(withdrawal.id, withdrawalId),
          eq(withdrawal.userId, userId),
          eq(withdrawal.status, "pending")
        )
      )
      .returning({ id: withdrawal.id });

    if (result.length === 0) {
      throw new Error("Withdrawal not found or not pending");
    }

    revalidatePath("/dashboard/withdraw");

    return {
      status: "success",
      message: "Withdrawal canceled & deleted successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to canceled & deleted withdrawal",
    };
  }
}
