import { useAuth } from "@/shared/hooks/useAuth";
import { Stack } from "expo-router";

export default function HomeLayout() {
    const { isAuthenticated } = useAuth()
    return (
        <Stack screenOptions={{
            headerShown: false,
        }}>
            <Stack.Protected guard={isAuthenticated || __DEV__}>
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
                <Stack.Screen name="transaction-detail" />
            </Stack.Protected>
        </Stack>
    )
}