import { relations } from "drizzle-orm";
import {
  user,
  session,
  account,
  wallet,
  deposit,
  investment,
  withdrawal,
  transaction,
  referral,
} from "./schema";

// ========== RELATIONS ==========
export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
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
  // referred: one(user, {
  //   fields: [referral.referredId],
  //   references: [user.id],
  //   relationName: "referred",
  // }),
}));
