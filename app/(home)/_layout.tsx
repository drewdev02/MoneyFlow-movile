import { Stack } from "expo-router";

export function HomeLayout() {
    return (
        <Stack>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="(home)/category-selection" options={{
                presentation: 'modal',
            }}
            />
            <Stack.Screen name="plan-expense" />
            <Stack.Screen name="plan-income" />
            <Stack.Screen name="create-goal" />
        </Stack>
    )
}