import { Stack, useNavigation, usePathname } from "expo-router";
import * as Sentry from '@sentry/react-native';
import { useLogger } from "@/shared/hooks/use-logger";

Sentry.init({
  dsn: 'https://a18f6993331a3efc34afd3757a09da95@o4507473669652480.ingest.us.sentry.io/4510760271478784',
  enabled: false,
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
      <Stack.Screen name="(auth)/index" />
      <Stack.Screen name="(home)" />
      <Stack.Screen name="(profile)" />
    </Stack>
  )
});