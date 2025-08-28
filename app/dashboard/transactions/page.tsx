import React from "react";
import { Transaction } from "./_components/transactions";

function TransactionsRoute() {
  return (
    <section>
      <div className="flex flex-col w-full p-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Transactions
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          View all your deposits, withdrawals, bonuses and payouts.
        </p>
      </div>

      <Transaction />
    </section>
  );
}

export default TransactionsRoute;
