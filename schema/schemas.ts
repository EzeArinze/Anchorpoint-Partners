import z from "zod";

export interface AddWalletSchemaType {
  address: string;
  type: "bitcoin" | "ethereum";
}

export interface AddNewWalletSchemaType {
  address: string;
  method: "bitcoin" | "ethereum";
}

export const AddWalletSchema: z.ZodType<AddWalletSchemaType> = z
  .object({
    address: z.string().min(1, { message: "Address is required" }).trim(),
    type: z.enum(["bitcoin", "ethereum"], {
      message: "Coin type is required",
    }),
  })
  .refine(
    (data: AddWalletSchemaType) => {
      if (data.type === "ethereum") {
        return /^0x[a-fA-F0-9]{40}$/.test(data.address);
      }
      if (data.type === "bitcoin") {
        return /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/.test(data.address);
      }
      return false;
    },
    { message: "Invalid wallet address", path: ["address"] }
  );

export const AddNewWalletSchema: z.ZodType<AddNewWalletSchemaType> = z
  .object({
    address: z.string().min(1, { message: "Address is required" }).trim(),
    method: z.enum(["bitcoin", "ethereum"], {
      message: "Coin type is required",
    }),
  })
  .refine(
    (data: AddNewWalletSchemaType) => {
      if (data.method === "ethereum") {
        return /^0x[a-fA-F0-9]{40}$/.test(data.address);
      }
      if (data.method === "bitcoin") {
        return /^(bc1|[13])[a-zA-HJ-NP-Z0-9]{25,39}$/.test(data.address);
      }
      return false;
    },
    { message: "Invalid wallet address", path: ["address"] }
  );
