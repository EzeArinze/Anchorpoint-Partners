"use server";

import { requireUser } from "@/data/user/verify-user";
import { db } from "@/db"; // your drizzle db instance
import { wallet } from "@/db/schema";
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function AddWallet({
  address,
  type,
}: {
  address: string;
  type: string;
}): Promise<ActionReturnType> {
  const user = await requireUser();

  try {
    await db.insert(wallet).values({
      userId: user.id,
      type: type,
      address,
    });

    revalidatePath("/dashboard/settings");

    return {
      status: "success",
      message: "Action performed successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to add wallet.. please try again",
    };
  }
}

// ✅ Update a wallet (e.g., change address)
export async function updateWallet(
  userId: string,
  walletId: string,
  newAddress: string
): Promise<ActionReturnType> {
  await requireUser();

  try {
    await db
      .update(wallet)
      .set({
        address: newAddress,
        updatedAt: new Date(),
      })
      .where(and(eq(wallet.id, walletId), eq(wallet.userId, userId)));

    revalidatePath("/dashboard/settings");
    return {
      status: "success",
      message: "Wallet address updated successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to update wallet address. Please try again.",
    };
  }
}

// // ✅ Delete a wallet
export async function deleteWallet(
  walletId: string
): Promise<ActionReturnType> {
  const user = await requireUser();
  try {
    await db
      .delete(wallet)
      .where(and(eq(wallet.id, walletId), eq(wallet.userId, user.id)));

    revalidatePath("/dashboard/settings");
    return {
      status: "success",
      message: "Wallet deleted successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to delete wallet. Please try again.",
    };
  }
}

// ✅ Get user wallets
export async function getUserWallets() {
  const user = await requireUser();

  const userWallets = await db.query.wallet.findMany({
    where: eq(wallet.userId, user.id),
    orderBy: (w, { desc }) => [desc(w.createdAt)],
    columns: {
      id: true,
      type: true,
      address: true,
    },
  });
  if (userWallets.length === 0) {
    return [];
  }
  return userWallets;
}

// // ✅ Get single wallet (consistent with .findFirst)
// export async function getUserWallet(userId: string, walletId: string) {
//   return await db.query.wallets.findFirst({
//     where: (w, { and }) => and(eq(w.userId, userId), eq(w.id, walletId)),
//   });
// }

export type UserWalletsType = Awaited<
  ReturnType<typeof getUserWallets>
>[number];
