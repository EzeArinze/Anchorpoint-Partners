import React from "react";
import { TransactionList } from "./trasanction-list";
import { getUserTransaction } from "@/data/user/get-investment";

export async function Transaction() {
  const transactions = await getUserTransaction();
  return (
    <div className="p-6">
      <TransactionList transactions={transactions} />
    </div>
  );
}
