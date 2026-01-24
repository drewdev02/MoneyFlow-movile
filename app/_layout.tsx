import { useLogger } from "@/shared/hooks/use-logger";
import * as Sentry from '@sentry/react-native';
import { Stack, usePathname } from "expo-router";

Sentry.init({
  dsn: process.env.EXPO_PUBLIC_SENTRY_DSN,
  enabled: !__DEV__,
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

export default Sentry.wrap(function RootLayout() {
  const logger = useLogger("root-layout");
  const route = usePathname();
  logger.debug(`Current route: ${route}`);
  return (
    <Stack screenOptions={{ headerShown: false, gestureEnabled: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(home)" />
      <Stack.Screen name="(profile)/profile" />
    </Stack>
  )
});