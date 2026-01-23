import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(home)/index" />
      <Stack.Screen name="(home)/category-selection" options={{
        presentation: 'modal',
      }} />
      <Stack.Screen name="(home)/plan-expense" />
      <Stack.Screen name="(home)/plan-income" />
      <Stack.Screen name="(profile)/index" />
      <Stack.Screen name="(auth)/login" />
    </Stack>

  )
}
