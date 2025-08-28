import "server-only";

import { requireUser } from "@/data/user/verify-user";
import { db } from "@/db";
import { investment } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";

export async function getAllUserInvestment() {
  const user = await requireUser();

  const transactions = await db.query.investment.findMany({
    where: eq(investment.userId, user.id),
    orderBy: (inv, { desc }) => [desc(inv.createdAt)],
    columns: {
      amount: true,
      startedAt: true,
      endsAt: true,
      id: true,
      status: true,
      profit: true,
    },
  });

  if (!transactions) {
    return notFound();
  }

  return transactions;
}

export async function getRecentUserInvestment() {
  const user = await requireUser();

  const transactions = await db.query.investment.findMany({
    where: eq(investment.userId, user.id),
    orderBy: (inv, { desc }) => [desc(inv.createdAt)],
    limit: 3,
    columns: {
      amount: true,
      startedAt: true,
      endsAt: true,
      id: true,
      status: true,
      profit: true,
      plan: true,
    },
  });

  if (!transactions) {
    return notFound();
  }

  return transactions;
}

export type recentInvestment = Awaited<
  ReturnType<typeof getRecentUserInvestment>
>[number];
