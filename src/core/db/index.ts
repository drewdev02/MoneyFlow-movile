import { generateUUID } from "@/shared/utils/uuid";
import { drizzle, ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { addDatabaseChangeListener, openDatabaseSync } from "expo-sqlite";
import { LoggerFactory } from "../logger";
import * as schema from "./schema";

const logger = LoggerFactory.createLogger("Database")
const expo = openDatabaseSync("db.db", { enableChangeListener: true });


export abstract class Database extends ExpoSQLiteDatabase<typeof schema> { }
export const drizzleDb = drizzle(expo, {
    schema: schema,
    logger: {
        logQuery(query: string, params: unknown[]) {
            logger.debug(query, params)
        }
    },
});

addDatabaseChangeListener(event => {
    //aqui escucho los cambios en la base de datos y actualizo los datos de la tabla de sincronizacion
    if (event.tableName === "local_changes") {
        return
    }

    // Action codes: 18=INSERT, 23=UPDATE, 9=DELETE
    // typeId: 'insert', 'update', 'delete' (from our native patch or Android implementation)
    const nativeAction = (event as any).action;
    const typeId = (event as any).typeId;
    let operation: schema.SyncOperation = schema.SyncOperation.UPDATE;

    if (typeId === 'insert' || nativeAction === 18) {
        operation = schema.SyncOperation.CREATE;
    } else if (typeId === 'delete' || nativeAction === 9) {
        operation = schema.SyncOperation.DELETE;
    } else if (typeId === 'update' || nativeAction === 23) {
        operation = schema.SyncOperation.UPDATE;
    }

    logger.debug(`Change: ${event.tableName}#${event.rowId} [${operation}]`, { event });

    drizzleDb.insert(schema.localChanges).values({
        id: generateUUID(),
        tableName: event.tableName,
        recordId: String(event.rowId),
        operation,
        changedAt: new Date(),
    })
})