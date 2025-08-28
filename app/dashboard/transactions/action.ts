"use server";

import { requireUser } from "@/data/user/verify-user";
import { db } from "@/db";
import { transaction } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";

function validateTransactionId(id: string): string | null {
  if (!id || typeof id !== "string") {
    return "Transaction ID is required";
  }

  if (id.trim() === "") {
    return "Invalid transaction ID";
  }

  return null;
}

export async function deleteTransanction(
  id: string
): Promise<ActionReturnType> {
  const user = await requireUser();

  try {
    const validationError = validateTransactionId(id);
    if (validationError) {
      return {
        status: "error",
        message: validationError,
      };
    }

    await db
      .delete(transaction)
      .where(and(eq(transaction.id, id), eq(transaction.userId, user.id)));

    revalidatePath("/dashboard/transactions");
    return {
      status: "success",
      message: "Transaction deleted successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to delete transaction",
    };
  }
}
