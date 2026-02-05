import { integer, real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const incomes = sqliteTable('incomes', {
  id: text('id').primaryKey(),
  categoryId: text('category_id').notNull(),
  amount: real('amount').notNull(),
  currency: text('currency').notNull(),
  date: integer('date', { mode: 'timestamp' }).notNull(),
  time: text('time').notNull(),
  name: text('name').notNull(),
  isPaid: integer('is_paid', { mode: 'boolean' }).notNull(),
  notes: text('notes'),
  repeat: text('repeat'),
  remind: text('remind'),
  goalOrDebt: text('goal_or_debt'),
});
