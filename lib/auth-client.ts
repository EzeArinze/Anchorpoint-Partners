import { createAuthClient } from "better-auth/react";
import { adminClient, magicLinkClient } from "better-auth/client/plugins";
import { toast } from "sonner";

export const authClient = createAuthClient({
  fetchOptions: {
    onError: async (context) => {
      const { response } = context;
      if (response.status === 429) {
        const retryAfter = response.headers.get("X-Retry-After");
        toast.error(`Rate limit exceeded. Retry after ${retryAfter} seconds`);
      }
    },
  },
  plugins: [adminClient(), magicLinkClient()],
});

export const { signIn, signUp, useSession, signOut } = authClient;
