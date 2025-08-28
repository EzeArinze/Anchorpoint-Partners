import "server-only";

import { db } from "@/db";
import { requireAdmin } from "./verify-admin";
import { notFound } from "next/navigation";

export async function getAllDeposits() {
  await requireAdmin();

  const deposits = await db.query.deposit.findMany({
    orderBy: (dep, { desc }) => [desc(dep.createdAt)],
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

  if (!deposits) {
    return notFound();
  }
  return deposits;
}

export type AdminGetAllDeposits = Awaited<ReturnType<typeof getAllDeposits>>;
