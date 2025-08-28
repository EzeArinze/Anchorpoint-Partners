"use server";

import { requireAdmin } from "@/data/admin/verify-admin";
import { db } from "@/db";
import { investment } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function updateInvestmentStatus(
  id: string,
  newStatus: "pending" | "active" | "completed" | "cancelled"
): Promise<ActionReturnType> {
  await requireAdmin();

  try {
    if (newStatus === "active") {
      await db.transaction(async (tx) => {
        const inv = await tx.query.investment.findFirst({
          where: eq(investment.id, id),
          with: {
            deposit: {
              columns: { id: true, status: true },
            },
          },
        });

        if (!inv) {
          throw new Error("Investment not found");
        }

        if (inv.deposit?.status !== "approved") {
          throw new Error(
            "Deposit must be approved before activating investment"
          );
        }

        await tx
          .update(investment)
          .set({ status: "active" })
          .where(eq(investment.id, id));
      });
    } else {
      // all other statuses
      await db
        .update(investment)
        .set({ status: newStatus })
        .where(eq(investment.id, id));
    }

    revalidatePath("/admin/investments");

    return {
      status: "success",
      message: "Investment status updated successfully",
    };
  } catch (err) {
    console.error("updateInvestmentStatus error:", err);
    return {
      status: "error",
      message:
        err instanceof Error
          ? err.message
          : "Failed to update investment status",
    };
  }
}

export async function updateInvestmentProfit(
  id: string,
  profit: number | null
): Promise<ActionReturnType> {
  await requireAdmin();
  try {
    const [result] = await db
      .update(investment)
      .set({ profit })
      .where(and(eq(investment.id, id), eq(investment.status, "active")))
      .returning({
        id: investment.id,
        status: investment.status,
      });

    // If no result, nothing was updated
    if (!result) {
      return {
        status: "error",
        message: "Investment must be active to update profit",
      };
    }

    revalidatePath("/admin/investments");
    return {
      status: "success",
      message: "Investment profit updated successfully",
    };
  } catch (err) {
    console.error("updateInvestmentProfit error:", err);
    return {
      status: "error",
      message:
        err instanceof Error
          ? err.message
          : "Failed to update investment profit",
    };
  }
}
