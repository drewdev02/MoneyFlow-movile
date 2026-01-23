import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="category-selection" options={{
        presentation: 'modal',
      }} />
      <Stack.Screen name="plan-expense" />
    </Stack>
  )
}
