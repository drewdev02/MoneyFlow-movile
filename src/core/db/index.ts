import { drizzle, ExpoSQLiteDatabase } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync, addDatabaseChangeListener } from "expo-sqlite";
import { LoggerFactory } from "../logger";
import * as schema from "./schema";

const logger = LoggerFactory.createLogger("Database")
const expo = openDatabaseSync("db.db", { enableChangeListener: true });
addDatabaseChangeListener( event => {
    //aqui escucho los cambios en la base de datos y actulizo los datos de la tabla de sincronizacion
    logger.debug(event)
})


export abstract class Database extends ExpoSQLiteDatabase<typeof schema> { }
export const drizzleDb = drizzle(expo, {
    schema: schema,
    logger: {
        logQuery(query: string, params: unknown[]) {
            logger.debug(query, params)
        }
    },
});