import React from "react";
import AdminDepositList from "./_components/deposit-list";
import { getAllDeposits } from "@/data/admin/get-all-deposits";

async function DepositPage() {
  const deposit = await getAllDeposits();
  return (
    <div className="mt-4 px-4 lg:px-6 space-y-3">
      <h2 className="font-semibold text-xl">All Investments</h2>
      <AdminDepositList deposits={deposit} />
    </div>
  );
}

export default DepositPage;
