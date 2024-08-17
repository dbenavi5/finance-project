import { createInsertSchema } from 'drizzle-zod';
import { integer, pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import { relations } from 'drizzle-orm';
import { z } from 'zod';

export const accounts = pgTable('accounts', {
    id: text('id').primaryKey(),
    plaidId: text('plaid_id'),
    name: text('name').notNull(),
    userId: text('user_id').notNull(),
});

export const accountRelations = relations(accounts, ({ many }) => ({
    // One account can have many transactions
    transactions: many(transactions),
}));

export const insertAccountSchema = createInsertSchema(accounts);

export const categories = pgTable('categories', {
    id: text('id').primaryKey(),
    plaidId: text('plaid_id'),
    name: text('name').notNull(),
    userId: text('user_id').notNull(),
});

export const categoriesRelations = relations(categories, ({ many }) => ({
    // One account can have many transactions
    transactions: many(transactions),
}));

export const insertCategorySchema = createInsertSchema(categories);

export const transactions = pgTable('transactions', {
    id: text('id').primaryKey(),
    amount: integer('amount').notNull(),
    payee: text('payee').notNull(),
    notes: text('notes'),
    date: timestamp('date', { mode: 'date' }).notNull(),
    accountId: text('account_id').references(() => accounts.id, {
        onDelete: 'cascade',
    }).notNull(),
    categoryId: text('category_id').references(() => categories.id, {
        onDelete: 'set null',
    }),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
    // Transactions can have only one account
    account: one(accounts, {
        fields: [transactions.accountId],
        references: [accounts.id],
    }),
    categories: one(categories, {
        fields: [transactions.categoryId],
        references: [categories.id],
    }),
}));


export const insertTransactionsSchema = createInsertSchema(transactions, {
    date: z.coerce.date(),
});