import "server-only";
// utils/handleAuthError.ts
import { redirect } from "next/navigation";

export async function handleAuthError(
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
) {
  const params = await searchParams;
  const error = params?.error;

  if (error === "EXPIRED_TOKEN" || error === "INVALID_TOKEN") {
    redirect("/sign-in/expired-token");
  }
}
