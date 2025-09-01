"use server";
import { db } from "@/db";
import { investment } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { requireAdmin } from "./verify-admin";

export async function processWeeklyProfits(): Promise<ActionReturnType> {
  await requireAdmin();

  try {
    const count = await db.$count(investment, eq(investment.status, "active"));

    if (count === 0) {
      return {
        status: "error",
        message: "No active investments found. Skipping update.",
      };
    }

    const result = await db.execute(sql`
      UPDATE ${investment}
      SET profit = COALESCE(profit, 0) + FLOOR(COALESCE(amount, 0) * COALESCE(roi, 0))
      WHERE ${investment.status} = 'active'
      RETURNING id, profit
    `);

    revalidatePath("/admin/investments");

    const updatedCount = Array.isArray(result)
      ? result.length
      : (result.rowCount ?? 0);

    return {
      status: "success",
      message: `Weekly profit added for ${updatedCount} investments`,
    };
  } catch (err) {
    console.error("processWeeklyProfits error:", err);
    return {
      status: "error",
      message: "Failed to add weekly profit",
    };
  }
}
