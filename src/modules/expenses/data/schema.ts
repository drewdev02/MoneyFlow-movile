import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const expenses = sqliteTable('expenses', {
  id: text('id').primaryKey(),
  categoryId: text('category_id').notNull(),
  amount: real('amount').notNull(),
  currency: text('currency').notNull(),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  time: text('time').notNull(),
  name: text('name').notNull(),
  isPaid: integer('is_paid', { mode: 'boolean' }).notNull(),
});
