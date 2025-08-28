import { db } from "@/db";
import { transaction } from "@/db/schema";
import { eq } from "drizzle-orm";
import { requireUser } from "./verify-user";
import { notFound } from "next/navigation";

// ✅ Get all investments for a user
export async function getUserTransaction() {
  const user = await requireUser();

  const transactios = await db.query.transaction.findMany({
    where: eq(transaction.userId, user.id),
    orderBy: (tx, { desc }) => [desc(tx.createdAt)],
    with: {
      user: {
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

  if (!transactios) {
    return notFound();
  }

  return transactios;
}

// ✅ Get single investment (uses findFirst)
export async function getInvestment(investmentId: string) {
  const user = await requireUser();

  const investment = await db.query.investment.findFirst({
    where: (inv, { and }) =>
      and(eq(inv.userId, user.id), eq(inv.id, investmentId)),
  });
  return { investment };
}

export type TransactionType = Awaited<ReturnType<typeof getUserTransaction>>;
