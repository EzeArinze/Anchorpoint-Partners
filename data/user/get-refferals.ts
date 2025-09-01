import "server-only";

import { requireUser } from "@/data/user/verify-user";
import { db } from "@/db";
import { eq, sum } from "drizzle-orm";
import { user, referral } from "@/db/schema";

export async function getReferralInfo() {
  const currentUser = await requireUser();

  const [refUser, [bonusResult]] = await Promise.all([
    db.query.user.findFirst({
      where: eq(user.id, currentUser.id),
      columns: { referralCode: true },
    }),
    db
      .select({
        totalBonus: sum(referral.bonus).mapWith(Number),
      })
      .from(referral)
      .where(eq(referral.referrerId, currentUser.id)),
  ]);

  return {
    referralCode: refUser?.referralCode,
    totalBonus: bonusResult?.totalBonus ?? 0,
  };
}

export type GetReferralInfoType = Awaited<ReturnType<typeof getReferralInfo>>;
