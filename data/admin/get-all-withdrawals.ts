import "server-only";

import { db } from "@/db";
import { requireAdmin } from "./verify-admin";
import { notFound } from "next/navigation";

export async function getAllWithdrawals() {
  await requireAdmin();

  const withdrawals = await db.query.withdrawal.findMany({
    orderBy: (withdraws, { desc }) => [desc(withdraws.createdAt)],
    with: {
      user: {
        columns: {
          id: true,
          email: true,
          image: true,
        },
      },
    },
  });

  if (!withdrawals) {
    return notFound();
  }
  return withdrawals;
}

export type AdminGetAllWithdrawals = Awaited<
  ReturnType<typeof getAllWithdrawals>
>;
