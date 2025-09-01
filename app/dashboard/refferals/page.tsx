import React from "react";
import { Referral } from "./_components/refferals";
import { getReferralInfo } from "@/data/user/get-refferals";
import ReferralShare from "./_components/share-referal-code";

async function ReferalsRoute() {
  const { referralCode, totalBonus } = await getReferralInfo();

  return (
    <section className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold">Referral Program</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Invite your friends and earn bonus rewards when they join.
        </p>
      </div>
      <Referral referralCode={referralCode} referalBonus={totalBonus} />
      <ReferralShare referralCode={referralCode} />
    </section>
  );
}

export default ReferalsRoute;
