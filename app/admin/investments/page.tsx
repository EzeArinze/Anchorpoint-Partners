import { getAllinvestments } from "@/data/admin/get-all-investment";
import React from "react";
import AdminInvestmentsList from "./_components/investment-list";

async function InvestmentPageRoute() {
  const investments = await getAllinvestments();

  return (
    <div className="mt-4 px-4 lg:px-6 space-y-3">
      <h2 className="font-semibold text-xl">All Investments</h2>

      <AdminInvestmentsList investments={investments} />
    </div>
  );
}

export default InvestmentPageRoute;
