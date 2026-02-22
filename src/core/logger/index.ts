import { ConfigService } from "../config/ConfigService";

export abstract class Logger {
    abstract error(message?: any, ...optionalParams: any[]): void;
    abstract info(message?: any, ...optionalParams: any[]): void;
    abstract warn(message?: any, ...optionalParams: any[]): void;
    abstract debug(message?: any, ...optionalParams: any[]): void;
}

const levelOrder = ['debug', 'info', 'warn', 'error'];

export class LoggerFactory {
    private static config: ConfigService;

    static init(config: ConfigService) {
        this.config = config;
    }

    static createLogger(name: string): Logger {
        const config = this.config;
        if (!config) {
            // Fallback for early logging if not initialized or if config is not available
            return this.createConsoleLogger(name, 'info');
        }

        if (config.logFilters.includes(name)) {
            return {
                error: () => { },
                info: () => { },
                warn: () => { },
                debug: () => { },
            };
        }

        return this.createConsoleLogger(name, config.logLevel);
    }

    private static createConsoleLogger(name: string, logLevel: string): Logger {
        const minLevelIdx = levelOrder.indexOf(logLevel);
        return {
            error: (message?: any, ...optionalParams: any[]) => {
                if (minLevelIdx <= 3) console.error(`[${name}] ${new Date().toUTCString()} =>`, message, ...optionalParams);
            },
            warn: (message?: any, ...optionalParams: any[]) => {
                if (minLevelIdx <= 2) console.warn(`[${name}] ${new Date().toUTCString()} =>`, message, ...optionalParams);
            },
            info: (message?: any, ...optionalParams: any[]) => {
                if (minLevelIdx <= 1) console.info(`[${name}] ${new Date().toUTCString()} =>`, message, ...optionalParams);
            },
            debug: (message?: any, ...optionalParams: any[]) => {
                if (minLevelIdx <= 0) console.debug(`[${name}] ${new Date().toUTCString()} =>`, message, ...optionalParams);
            },
        }
    }
}