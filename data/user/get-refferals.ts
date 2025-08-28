import "server-only";

import { requireUser } from "@/data/user/verify-user";

export async function getRefferals(): Promise<ActionReturnType> {
  await requireUser();

  try {
    return {
      status: "success",
      message: "Action performed successfully",
    };
  } catch {
    return {
      status: "error",
      message: "Failed to get refferals.. ",
    };
  }
}
