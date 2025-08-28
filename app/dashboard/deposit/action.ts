"use server";

import { db } from "@/db";
import { deposit, investment, transaction } from "@/db/schema";
import { requireUser } from "@/data/user/verify-user";

type DepositInput = {
  amount: number;
  plan: string;
  roi: string;
  paymentMethod: string;
};

export async function createDeposit(
  data: DepositInput
): Promise<ActionReturnType> {
  const user = await requireUser();

  try {
    await db.transaction(async (tx) => {
      // 1. Insert into deposit table
      const [depositRecord] = await tx
        .insert(deposit)
        .values({
          userId: user.id,
          amount: data.amount,
          plan: data.plan,
          paymentMethod: data.paymentMethod,
          status: "pending",
        })
        .returning();

      // 2. Calculate investment details
      // const expectedReturn = Math.round(
      //   data.amount * (1 + Number(data.roi) / 100)
      // );
      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      const roi = Number(data.roi) / 100;

      // 3. Insert into investment table
      await tx.insert(investment).values({
        userId: user.id,
        depositId: depositRecord.id,
        amount: data.amount,
        plan: data.plan,
        status: "pending",
        profit: 0,
        roi,
        startedAt: startDate,
        endsAt: endDate,
      });

      // 4. Record transaction
      await tx.insert(transaction).values({
        userId: user.id,
        type: "deposit",
        amount: data.amount,
        reference: depositRecord.id,
      });
    });

    return {
      status: "success",
      message: "Deposit has been made",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to make deposit. Please try again..",
    };
  }
}
