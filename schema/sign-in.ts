import z from "zod";

export const signInSchema = z.object({
  email: z.email({ error: "email is required" }).min(3).trim(),
  name: z.string({ error: "name/username is required" }).min(3).trim(),
});
