"use server";

import { db } from "@/db";
import { requireUser } from "./verify-user";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { withdrawal } from "@/db/schema";

export async function getWithDrawals() {
  const user = await requireUser();

  const withdraws = await db.query.withdrawal.findMany({
    where: eq(withdrawal.userId, user.id),
    orderBy: (withdraw, { desc }) => [desc(withdraw.createdAt)],
    limit: 5,
    with: {
      wallet: true,
    },
  });

  if (!withdraws) {
    return notFound();
  }

  return withdraws;
}

export type WithdrawalListType = Awaited<ReturnType<typeof getWithDrawals>>;
