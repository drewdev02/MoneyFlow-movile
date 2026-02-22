export abstract class ConfigService {
  abstract get apiUrl(): string;
  abstract get logLevel(): 'debug' | 'info' | 'warn' | 'error';
  abstract get logFilters(): string[];
  abstract get env(): string;
  abstract get sentryDsn(): string | undefined;
}

export class EnvConfigService extends ConfigService {
  get apiUrl(): string {
    return process.env.EXPO_PUBLIC_API_URL || 'http://localhost:8080';
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
