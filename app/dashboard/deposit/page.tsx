import React, { Suspense } from "react";
import { Deposit } from "./_components/deposit";

function DepositRoute() {
  return (
    <section>
      <div className="flex flex-col  w-full p-6 gap-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
          Deposit Funds
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Please select a plan to deposit funds into your account.
        </p>
      </div>
      <Suspense>
        <Deposit />
      </Suspense>
    </section>
  );
}

export default DepositRoute;
