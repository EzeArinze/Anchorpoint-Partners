import React, { Suspense } from "react";
import { Withdrawal } from "./_components/withdraw";
import { getUserWallets } from "../settings/action";
import WithdrawalList from "./_components/withdrawals-lists";
import { getWithDrawals } from "@/data/user/get-withrawals";

export default async function WithdrawalRoute() {
  const wallets = await getUserWallets();

  return (
    <section>
      <div className="flex flex-col w-full p-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Withdraw Funds
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your withdrawal account and request a withdrawal.
        </p>
      </div>

      <div className="p-6 space-y-6">
        <Withdrawal wallets={wallets} />
        <Suspense>
          <RenderWithrawalList />
        </Suspense>
      </div>
    </section>
  );
}

async function RenderWithrawalList() {
  const withdraw = await getWithDrawals();

  return (
    <>
      <WithdrawalList withdrawals={withdraw} />
    </>
  );
}
