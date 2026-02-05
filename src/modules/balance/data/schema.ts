import { real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const accounts = sqliteTable('accounts', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  balance: real('balance').notNull(),
  currency: text('currency').notNull(),
  color: text('color').notNull(),
  icon: text('icon').notNull(),
  type: text('type').notNull(), // 'cash' | 'bank' | 'card' | 'other'
  percentage: real('percentage'),
});
