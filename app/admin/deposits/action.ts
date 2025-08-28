"use server";

import { requireAdmin } from "@/data/admin/verify-admin";
import { db } from "@/db";
import { deposit, investment } from "@/db/schema";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateDepositStatus(
  id: string,
  newStatus: "pending" | "approved" | "rejected"
): Promise<ActionReturnType> {
  await requireAdmin();

  try {
    await db.transaction(async (tx) => {
      const dep = await tx.query.deposit.findFirst({
        where: eq(deposit.id, id),
        with: {
          investments: {
            columns: { id: true, status: true },
          },
        },
      });

      if (!dep) throw new Error("Deposit not found");

      // Update deposit itself
      await tx
        .update(deposit)
        .set({ status: newStatus })
        .where(eq(deposit.id, id));

      // If deposit is approved, activate its linked investment
      if (newStatus === "approved" && dep.investments) {
        await tx
          .update(investment)
          .set({ status: "active" })
          .where(eq(investment.id, dep.investments[0].id));
      }

      // If rejected, optionally cancel the investment
      if (newStatus === "rejected" && dep.investments) {
        await tx
          .update(investment)
          .set({ status: "cancelled" })
          .where(eq(investment.id, dep.investments[0].id));
      }
    });

    revalidatePath("/admin/deposits");
    revalidatePath("/admin/investments");

    return {
      status: "success",
      message: "Deposit status updated successfully",
    };
  } catch (err) {
    console.error("updateDepositStatus error:", err);
    return {
      status: "error",
      message:
        err instanceof Error ? err.message : "Failed to update deposit status",
    };
  }
}
