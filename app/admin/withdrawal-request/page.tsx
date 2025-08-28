import { getAllWithdrawals } from "@/data/admin/get-all-withdrawals";
import React from "react";
import AdminWithdrawalList from "./_components/withdrawal-list";

async function WithdrawalPageRoute() {
  const withdrawals = await getAllWithdrawals();

  return (
    <div className="mt-4 px-4 lg:px-6 space-y-3">
      <h2 className="font-semibold text-xl">All Withdrawals</h2>
      <AdminWithdrawalList withdrawals={withdrawals} />
    </div>
  );
}

export default WithdrawalPageRoute;
