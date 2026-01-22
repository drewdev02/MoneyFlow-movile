

export abstract class Logger {
    abstract error(message?: any, ...optionalParams: any[]): void;
    abstract info(message?: any, ...optionalParams: any[]): void;
    abstract warn(message?: any, ...optionalParams: any[]): void;
    abstract debug(message?: any, ...optionalParams: any[]): void;
    
}


export class LoggerFactory {

    static createLogger(name: string): Logger {
        return {
            error: (message?: any, ...optionalParams: any[]) => console.error(`[${name}]`, message, ...optionalParams),
            info: (message?: any, ...optionalParams: any[]) => console.info(`[${name}]`, message, ...optionalParams),
            warn: (message?: any, ...optionalParams: any[]) => console.warn(`[${name}]`, message, ...optionalParams),
            debug: (message?: any, ...optionalParams: any[]) => console.debug(`[${name}]`, message, ...optionalParams),
        }
    }
}