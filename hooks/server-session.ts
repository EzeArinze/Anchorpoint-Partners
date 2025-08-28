import "server-only";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function serverSession() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const isAuthenicated = !!session;

  return { session, isAuthenicated };
}
