import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function TabsLayout() {
    const insets = useSafeAreaInsets();

    return (
        <Tabs screenOptions={{
            headerShown: false,
            tabBarStyle: [
                {
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    backgroundColor: 'rgba(26, 28, 46, 0.95)',
                    paddingTop: 12,
                    borderTopWidth: 1,
                    borderTopColor: 'rgba(255, 255, 255, 0.05)',
                },
                {
                    paddingBottom: insets.bottom + 10
                }
            ]
        }}>
            <Tabs.Screen name="goals" options={{
                tabBarIcon: ({ focused }) => <Ionicons
                    name={focused ? "pie-chart" : "pie-chart-outline"}
                    size={24}
                    color={focused ? "white" : "#687076"}
                />
            }} />
            <Tabs.Screen name="index" options={{
                tabBarIcon: ({ focused }) => <Ionicons
                    name={focused ? "calendar" : "calendar-outline"}
                    size={20}
                    color={focused ? "white" : "#687076"}
                />
            }} />

        </Tabs>
    )
}