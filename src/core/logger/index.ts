
export abstract class Logger {
    abstract error(message?: any, ...optionalParams: any[]): void;
    abstract info(message?: any, ...optionalParams: any[]): void;
    abstract warn(message?: any, ...optionalParams: any[]): void;
    abstract debug(message?: any, ...optionalParams: any[]): void;
}


type LogLevel = 'debug' | 'info' | 'warn' | 'error' | undefined;

function getLogLevel(): LogLevel {
    if (process.env.EXPO_PUBLIC_LOG_LEVEL) {
        return process.env.EXPO_PUBLIC_LOG_LEVEL as LogLevel;
    }
    return 'info';
}

const levelOrder = ['debug', 'info', 'warn', 'error'];

export class LoggerFactory {
    static createLogger(name: string): Logger {
        const ignoredLoggers = (process.env.EXPO_PUBLIC_LOG_FILTERS || '').split(',').map(s => s.trim());
        
        if (ignoredLoggers.includes(name)) {
             return {
                error: () => {},
                info: () => {},
                warn: () => {},
                debug: () => {},
            };
        }

        const logLevel = getLogLevel();
        const minLevelIdx = logLevel ? levelOrder.indexOf(logLevel) : 0;
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