import { LoggerFactory } from "../logger";

export abstract class ConfigService {
  abstract get apiUrl(): string;
  abstract get logLevel(): 'debug' | 'info' | 'warn' | 'error';
  abstract get logFilters(): string[];
  abstract get env(): string;
  abstract get sentryDsn(): string | undefined;
}

export class EnvConfigService extends ConfigService {

    private readonly logger = LoggerFactory.createLogger(EnvConfigService.name);
    constructor() {
        super();
        if (!process.env.EXPO_PUBLIC_API_URL) {
            this.logger.error('EXPO_PUBLIC_API_URL is not defined');
            throw new Error('EXPO_PUBLIC_API_URL is not defined');
        }
        this.logger.info('EXPO_PUBLIC_API_URL', process.env.EXPO_PUBLIC_API_URL);
        if (!process.env.EXPO_PUBLIC_LOG_LEVEL) {
            this.logger.warn('EXPO_PUBLIC_LOG_LEVEL is not defined');
        }
        if (!process.env.EXPO_PUBLIC_LOG_FILTERS) {
            this.logger.warn('EXPO_PUBLIC_LOG_FILTERS is not defined');
        }
        if (!process.env.ENV) {
            this.logger.warn('ENV is not defined');
        }
        if (!process.env.EXPO_PUBLIC_SENTRY_DSN) {
            this.logger.warn('EXPO_PUBLIC_SENTRY_DSN is not defined');
        }
    }
  get apiUrl(): string {
    return process.env.EXPO_PUBLIC_API_URL!;
  }

  get logLevel(): 'debug' | 'info' | 'warn' | 'error' {
    return (process.env.EXPO_PUBLIC_LOG_LEVEL as any) || 'info';
  }

  get logFilters(): string[] {
    return (process.env.EXPO_PUBLIC_LOG_FILTERS || '').split(',').map(s => s.trim()).filter(Boolean);
  }

  get env(): string {
    return process.env.ENV || 'development';
  }

  get sentryDsn(): string | undefined {
    return process.env.EXPO_PUBLIC_SENTRY_DSN;
  }
}
