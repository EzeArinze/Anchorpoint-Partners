import { NextResponse } from "next/server";
import { db } from "@/db";
import { investment } from "@/db/schema";
import { eq, sql } from "drizzle-orm";
import { verifySignatureAppRouter } from "@upstash/qstash/nextjs";

export const POST = verifySignatureAppRouter(async () => {
  try {
    const count = await db.$count(investment, eq(investment.status, "active"));

    if (count === 0) {
      return NextResponse.json({
        success: false,
        message: "No active investments found. Skipping update.",
      });
    }

    const result = await db.execute(sql`
      UPDATE ${investment}
      SET profit = COALESCE(profit, 0) + FLOOR(COALESCE(amount, 0) * COALESCE(roi, 0))
      WHERE ${investment.status} = 'active'
      RETURNING id, profit
    `);

    return NextResponse.json({
      success: true,
      updated: result.rowCount ?? 0,
    });
  } catch (err) {
    console.error("CRON JOB ERROR:", err);
    return NextResponse.json(
      { success: false, message: "Server error" },
      { status: 500 }
    );
  }
});
