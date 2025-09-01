"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { requireUser } from "@/data/user/verify-user";
import { revalidatePath } from "next/cache";

export async function generateReferralCode(): Promise<ActionReturnType> {
  const currentUser = await requireUser();

  try {
    const referralCode = `REF-${nanoid(8)}`;

    await db
      .update(user)
      .set({ referralCode })
      .where(eq(user.id, currentUser.id));

    revalidatePath("/dashboard/referals");
    return {
      status: "success",
      message: "Referal code generated successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to generate referal code",
    };
  }
}
