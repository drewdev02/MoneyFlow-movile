import { drizzle, ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";
import { LoggerFactory } from "../logger";
import * as schema from "./schema";
const expo = openDatabaseSync("db.db", { enableChangeListener: true });

export abstract class Database extends ExpoSQLiteDatabase<typeof schema> { }
const logger = LoggerFactory.createLogger("Database")
export const drizzleDb = drizzle(expo, {
    schema: schema,
    logger: {
        logQuery(query: string, params: unknown[]) {
            logger.debug(query, params)
        }
    },
});