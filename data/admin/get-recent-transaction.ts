import "server-only";

import { db } from "@/db";
import { requireAdmin } from "./verify-admin";
import { notFound } from "next/navigation";

const LIMIT = 5;

export async function getRecentTransaction() {
  await requireAdmin();

  const transactions = await db.query.transaction.findMany({
    orderBy: (tx, { desc }) => [desc(tx.createdAt)],
    limit: LIMIT,
    with: {
      user: {
        columns: {
          id: true,
          email: true,
          image: true,
        },
        with: {
          wallets: {
            columns: {
              type: true,
              address: true,
            },
          },
        },
      },
    },
  });

  if (!transactions) {
    return notFound();
  }

  return transactions;
}

export type AdminGetRecentTransactions = Awaited<
  ReturnType<typeof getRecentTransaction>
>;
