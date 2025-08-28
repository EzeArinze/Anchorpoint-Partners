import { authClient, signOut } from "@/lib/auth-client";
import { toast } from "sonner";

export function clientSession() {
  const { data: session, isPending, error } = authClient.useSession();

  const email = session?.user.email || "";

  const name = session?.user.name || "";

  const initials =
    session?.user.email.split("@")[0]?.slice(0, 1).toLocaleUpperCase() || "K";

  const image =
    session?.user.image ||
    `https://avatar.vercel.sh/${email}.svg?text=${initials}`;

  return { session, email, name, image, initials, isPending, error };
}

export async function handleSignOut() {
  return await signOut({
    fetchOptions: {
      onSuccess: () => {
        toast.success("signed out successfully");
        window.location.href = "/";
      },
      onError: () => {
        toast.error("failed to sign out");
      },
    },
  });
}
