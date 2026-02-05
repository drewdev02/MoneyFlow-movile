import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export enum SyncOperation {
  CREATE = 'CREATE',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export const localChanges = sqliteTable('local_changes', {
  id: text('id').primaryKey(), // UUID
  tableName: text('table_name').notNull(), // ej: 'expenses', 'users'
  recordId: text('record_id').notNull(), // El ID del registro afectado
  operation: text('operation', { enum: [SyncOperation.CREATE, SyncOperation.UPDATE, SyncOperation.DELETE] }).notNull(),
  changedAt: integer('changed_at', { mode: 'timestamp' }).notNull(),
});