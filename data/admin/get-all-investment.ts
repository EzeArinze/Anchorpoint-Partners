import "server-only";
import { requireAdmin } from "./verify-admin";
import { db } from "@/db";
import { notFound } from "next/navigation";

export async function getAllinvestments() {
  await requireAdmin();

  const investments = await db.query.investment.findMany({
    orderBy: (inv, { desc }) => [desc(inv.createdAt)],
    with: {
      user: {
        columns: {
          id: true,
          name: true,
          email: true,
          image: true,
        },
      },
    },
  });

  if (!investments) {
    return notFound();
  }

  return investments;
}

export type AdminGetAllInvestments = Awaited<
  ReturnType<typeof getAllinvestments>
>;
