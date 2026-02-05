import { real, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const goals = sqliteTable('goals', {
  id: text('id').primaryKey(),
  name: text('name').notNull(),
  targetAmount: real('target_amount').notNull(),
  currentAmount: real('current_amount').notNull(),
  icon: text('icon').notNull(),
  color: text('color').notNull(),
  categoryId: text('category_id').notNull(),
  notes: text('notes'),
  date: text('date').notNull(),
  imageUrl: text('image_url'),
});
