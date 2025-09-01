import { getAllinvestments } from "@/data/admin/get-all-investment";
import React from "react";
import AdminInvestmentsList from "./_components/investment-list";
import WeeklyProfitButton from "./_components/weekly-profit-manuel";

async function InvestmentPageRoute() {
  const investments = await getAllinvestments();

  return (
    <div className="mt-4 px-4 lg:px-6 space-y-3">
      <div className="flex items-center justify-between">
        <h2 className="font-semibold text-xl">All Investments</h2>
        <WeeklyProfitButton />
      </div>

      <AdminInvestmentsList investments={investments} />
    </div>
  );
}

export default InvestmentPageRoute;
