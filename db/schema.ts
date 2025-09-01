import { relations } from "drizzle-orm";
import {
  pgTable,
  text,
  timestamp,
  boolean,
  integer,
  pgEnum,
  numeric,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified")
    .$defaultFn(() => false)
    .notNull(),
  image: text("image"),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  updatedAt: timestamp("updated_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: text("role"),
  banned: boolean("banned"),
  banReason: text("ban_reason"),
  banExpires: timestamp("ban_expires"),
  referralCode: text("referral_code").unique(),
});

export const session = pgTable("session", {
  id: text("id").primaryKey(),
  expiresAt: timestamp("expires_at").notNull(),
  token: text("token").notNull().unique(),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  impersonatedBy: text("impersonated_by"),
});

export const account = pgTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  password: text("password"),
  createdAt: timestamp("created_at").notNull(),
  updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
  updatedAt: timestamp("updated_at").$defaultFn(
    () => /* @__PURE__ */ new Date()
  ),
});

// ========== ENUMS ==========
export const investmentStatusEnum = pgEnum("investment_status", [
  "pending",
  "active",
  "completed",
  "cancelled",
]);

export const withdrawalStatusEnum = pgEnum("withdrawal_status", [
  "pending",
  "approved",
  "rejected",
  "completed",
]);

export const transactionTypeEnum = pgEnum("transaction_type", [
  "investment",
  "referral_bonus",
  "withdrawal",
  "payout",
  "deposit",
]);

// ========== APP TABLES ==========
export const wallet = pgTable("wallet", {
  id: text()
    .$default(() => nanoid())
    .primaryKey(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: text().notNull(), // bitcoin, ethereum
  address: text().notNull(),
  createdAt: timestamp().$defaultFn(() => new Date()),
  updatedAt: timestamp().$defaultFn(() => new Date()),
});

export const deposit = pgTable("deposit", {
  id: text()
    .$default(() => nanoid())
    .primaryKey(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  amount: integer().notNull(),
  plan: text().notNull(),
  status: text().$defaultFn(() => "pending"), // pending, approved, rejected
  paymentMethod: text().notNull(),
  createdAt: timestamp().$defaultFn(() => new Date()),
});

export const investment = pgTable("investment", {
  id: text()
    .$default(() => nanoid())
    .primaryKey(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  depositId: text().references(() => deposit.id, {
    onDelete: "set null",
  }),
  amount: integer().notNull(),
  plan: text().notNull(),
  status: investmentStatusEnum().default("pending"),
  profit: integer().default(0),
  roi: numeric({ precision: 5, scale: 4 }).$type<number>().notNull(),
  startedAt: timestamp(),
  endsAt: timestamp(),
  createdAt: timestamp().$defaultFn(() => new Date()),
});

export const withdrawal = pgTable("withdrawal", {
  id: text()
    .$default(() => nanoid())
    .primaryKey(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  walletId: text()
    .notNull()
    .references(() => wallet.id, { onDelete: "restrict" }),
  adminNote: text(),
  amount: integer().notNull(),
  status: withdrawalStatusEnum().default("pending"),
  createdAt: timestamp().$defaultFn(() => new Date()),
});

export const transaction = pgTable("transaction", {
  id: text()
    .$default(() => nanoid())
    .primaryKey(),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  type: transactionTypeEnum().notNull(),
  amount: integer().notNull(),
  reference: text(),
  createdAt: timestamp().$defaultFn(() => new Date()),
});

export const referral = pgTable(
  "referral",
  {
    id: text()
      .$default(() => nanoid())
      .primaryKey(),
    referrerId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    referredId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    bonus: integer().default(0),
    createdAt: timestamp().$defaultFn(() => new Date()),
  },
  (table) => ({
    oneReferralPerUser: uniqueIndex("unique_referred").on(table.referredId),
  })
);

// ========== RELATIONS ==========
export const userRelations = relations(user, ({ many }) => ({
  wallets: many(wallet),
  deposits: many(deposit),
  investments: many(investment),
  withdrawals: many(withdrawal),
  transactions: many(transaction),
  referralsSent: many(referral, { relationName: "referrer" }),
  referralsReceived: many(referral, { relationName: "referred" }),
}));

export const walletRelations = relations(wallet, ({ one, many }) => ({
  user: one(user, {
    fields: [wallet.userId],
    references: [user.id],
  }),
  withdrawals: many(withdrawal),
}));

export const depositRelations = relations(deposit, ({ one, many }) => ({
  user: one(user, {
    fields: [deposit.userId],
    references: [user.id],
  }),
  investments: many(investment),
}));

export const investmentRelations = relations(investment, ({ one }) => ({
  user: one(user, {
    fields: [investment.userId],
    references: [user.id],
  }),
  deposit: one(deposit, {
    fields: [investment.depositId],
    references: [deposit.id],
  }),
}));

export const withdrawalRelations = relations(withdrawal, ({ one }) => ({
  user: one(user, {
    fields: [withdrawal.userId],
    references: [user.id],
  }),
  wallet: one(wallet, {
    fields: [withdrawal.walletId],
    references: [wallet.id],
  }),
}));

export const transactionRelations = relations(transaction, ({ one }) => ({
  user: one(user, {
    fields: [transaction.userId],
    references: [user.id],
  }),
}));

export const referralRelations = relations(referral, ({ one }) => ({
  referrer: one(user, {
    fields: [referral.referrerId],
    references: [user.id],
    relationName: "referrer",
  }),
  referred: one(user, {
    fields: [referral.referredId],
    references: [user.id],
    relationName: "referred",
  }),
}));
