import { db } from "../db";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { admin, createAuthMiddleware, magicLink } from "better-auth/plugins";
import * as schema from "../db/schema";
import { nextCookies } from "better-auth/next-js";
import { resend } from "./resend";
import EmailConfirmation from "@/components/email-template";

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: schema,
  }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  rateLimit: {
    window: 60, // time window in seconds
    max: 10,
  },
  session: {
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60,
    },
  },
  hooks: {
    after: createAuthMiddleware(async (ctx) => {
      const newSession = ctx.context.newSession;

      if (!newSession) return;

      // Admins → /admin
      if (newSession.user.role === "admin") {
        throw ctx.redirect("/admin");
      }

      throw ctx.redirect("/dashboard");
    }),
  },
  plugins: [
    admin(),
    magicLink({
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      sendMagicLink: async ({ email, token, url }) => {
        await resend.emails.send({
          from: "UPC@universalprimecapital.org",
          to: email,
          subject: "Email-verification",
          react: EmailConfirmation({ email, url }),
        });
      },
    }),
    nextCookies(),
  ],
});
