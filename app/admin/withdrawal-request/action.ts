"use server";

import { requireAdmin } from "@/data/admin/verify-admin";
import { db } from "@/db";
import { withdrawal, transaction, investment } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function approveWithdrawal(
  withdrawalId: string
): Promise<ActionReturnType> {
  await requireAdmin();

  try {
    db.transaction(async (tx) => {
      const w = await tx.query.withdrawal.findFirst({
        where: eq(withdrawal.id, withdrawalId),
      });

      if (!w || w.status !== "pending") {
        throw new Error("Invalid or already processed withdrawal");
      }

      // ✅ Update withdrawal status → approved
      await tx
        .update(withdrawal)
        .set({ status: "approved" })
        .where(eq(withdrawal.id, withdrawalId));

      // ✅ Fetch all active investments (oldest first)
      const investments = await tx.query.investment.findMany({
        where: and(
          eq(investment.userId, w.userId),
          eq(investment.status, "active")
        ),
        orderBy: (inv, { asc }) => [asc(inv.createdAt)],
      });

      let remaining = w.amount;

      for (const inv of investments) {
        if (remaining <= 0) break;

        const available = (inv.profit ?? 0) + inv.amount;
        if (available <= 0) continue;

        const withdrawFromThis = Math.min(available, remaining);
        remaining -= withdrawFromThis;

        // 🔹 Deduct from profit first, then principal
        let newProfit = inv.profit ?? 0;
        let newAmount = inv.amount ?? 0;

        if (withdrawFromThis <= newProfit) {
          newProfit -= withdrawFromThis;
        } else {
          const leftover = withdrawFromThis - newProfit;
          newProfit = 0;
          newAmount = Math.max(0, newAmount - leftover);
        }

        // 🔹 Update investment
        await tx
          .update(investment)
          .set({
            profit: newProfit,
            amount: newAmount,
            status: newProfit === 0 && newAmount === 0 ? "completed" : "active",
          })
          .where(eq(investment.id, inv.id));
      }

      if (remaining > 0) {
        throw new Error(
          "Not enough balance in investments to cover withdrawal"
        );
      }

      // ✅ Insert ONE transaction record for the full withdrawal
      await tx.insert(transaction).values({
        userId: w.userId,
        type: "withdrawal",
        amount: w.amount,
        reference: w.id,
      });
    });

    revalidatePath("/admin/withdrawal-request");
    return {
      status: "success",
      message: "Withdrawal aprroved",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to Approve withdrawal",
    };
  }
}

export async function updateWithdrawalStatus(
  id: string,
  status: "rejected" | "completed",
  adminNote?: string
): Promise<ActionReturnType> {
  await requireAdmin();

  try {
    const w = await db.query.withdrawal.findFirst({
      where: eq(withdrawal.id, id),
    });

    if (!w || w.status !== "pending") {
      return {
        status: "error",
        message: "Invalid or already processed withdrawal",
      };
    }

    await db
      .update(withdrawal)
      .set({ status, adminNote })
      .where(eq(withdrawal.id, id));

    // revalidate pages
    revalidatePath("/admin/withdrawal-request");

    return {
      status: "success",
      message:
        status === "rejected"
          ? "Withdrawal rejected successfully"
          : "Withdrawal marked completed successfully",
    };
  } catch (err) {
    console.error("updateWithdrawalStatus error:", err);
    return {
      status: "error",
      message:
        err instanceof Error
          ? err.message
          : "Failed to update withdrawal status",
    };
  }
}
