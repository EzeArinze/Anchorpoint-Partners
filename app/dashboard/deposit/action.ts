"use server";

import { db } from "@/db";
import { deposit, investment, transaction, referral, user } from "@/db/schema";
import { requireUser } from "@/data/user/verify-user";
import { eq } from "drizzle-orm";

type DepositInput = {
  amount: number;
  plan: string;
  roi: string;
  paymentMethod: string;
  referralCode?: string;
};

const REFERRAL_PERCENTAGE = 0.1;

export async function createDeposit(
  data: DepositInput
): Promise<ActionReturnType> {
  const currentUser = await requireUser();

  try {
    await db.transaction(async (tx) => {
      // 1. Insert into deposit table
      const [depositRecord] = await tx
        .insert(deposit)
        .values({
          userId: currentUser.id,
          amount: data.amount,
          plan: data.plan,
          paymentMethod: data.paymentMethod,
          status: "pending",
        })
        .returning();

      // 2. Calculate investment details
      const startDate = new Date();
      const endDate = new Date(startDate.getTime() + 7 * 24 * 60 * 60 * 1000);
      const roi = Number(data.roi) / 100;

      await tx.insert(investment).values({
        userId: currentUser.id,
        depositId: depositRecord.id,
        amount: data.amount,
        plan: data.plan,
        status: "pending",
        profit: 0,
        roi,
        startedAt: startDate,
        endsAt: endDate,
      });

      // 3. Record transaction
      await tx.insert(transaction).values({
        userId: currentUser.id,
        type: "deposit",
        amount: data.amount,
        reference: depositRecord.id,
      });

      // 4. Handle referral bonus (only on first deposit with referralCode)
      if (data.referralCode) {
        // find referrer
        const referrer = await tx.query.user.findFirst({
          where: eq(user.referralCode, data.referralCode),
        });

        if (referrer && referrer.id !== currentUser.id) {
          // check if user already referred
          const existingReferral = await tx.query.referral.findFirst({
            where: eq(referral.referredId, user.id),
          });

          if (!existingReferral) {
            // calculate bonus
            const bonus = Math.floor(data.amount * REFERRAL_PERCENTAGE);

            // insert referral record
            await tx.insert(referral).values({
              referrerId: referrer.id,
              referredId: currentUser.id,
              bonus,
            });
          }
        }
      }
    });

    return {
      status: "success",
      message: "Deposit has been made",
    };
  } catch (err) {
    console.error(err);
    return {
      status: "error",
      message: "Failed to make deposit. Please try again.",
    };
  }
}
