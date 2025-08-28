import React from "react";
import { Referral } from "./_components/refferals";

function RefferalsRoute() {
  return (
    <section className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h2 className="text-2xl font-bold">Referral Program</h2>
        <p className="text-gray-500 dark:text-gray-400">
          Invite your friends and earn bonus rewards when they join.
        </p>
      </div>
      <Referral />
    </section>
  );
}

export default RefferalsRoute;
