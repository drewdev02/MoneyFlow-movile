import { useLogger } from "@/shared/hooks/use-logger";
import { Providers } from "@/shared/providers/Providers";
import * as Sentry from '@sentry/react-native';
import { Stack, usePathname } from "expo-router";

import { container } from "@/core/di/container";
import { ConfigService } from "@/core/config/ConfigService";
import { LoggerFactory } from "@/core/logger";

// Initialize core services
const config = container.get(ConfigService);
LoggerFactory.init(config);

Sentry.init({
  dsn: config.sentryDsn,
  enabled: config.env === 'production',
  sendDefaultPii: true,
  enableLogs: true,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [
    Sentry.mobileReplayIntegration(),
    Sentry.feedbackIntegration(),
    Sentry.consoleLoggingIntegration({
      levels: [
        'error',
        'warn',
        "debug",
        "info"
      ]
    })
  ],
});

export default Sentry.wrap(() => {
  const logger = useLogger("root-layout");
  const route = usePathname();
  logger.debug(`Current route: ${route}`);
  return (
    <Providers>
      <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(home)" />
        <Stack.Screen name="(profile)/profile" />
      </Stack>
    </Providers>
  )
});