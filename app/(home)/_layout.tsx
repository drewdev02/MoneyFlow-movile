import { Stack } from "expo-router";

export default function HomeLayout() {
    return (
        <Stack screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="(tabs)" />
            <Stack.Screen name="category-selection" options={{
                presentation: 'containedModal',
            }}
            />
            <Stack.Screen name="plan-expense" />
            <Stack.Screen name="plan-income" />
            <Stack.Screen name="create-goal" />
            <Stack.Screen name="add-account" />
            <Stack.Screen name="account-detail" />
        </Stack>
    )
}