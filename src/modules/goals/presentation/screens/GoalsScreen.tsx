import { Colors } from '@/shared/constants/theme';
import { useInjection } from '@/shared/hooks/use-injection';
import { AppRoutes } from '@/shared/types/routes';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GoalItem } from '../components/GoalItem';
import { GoalsViewModel } from '../viewmodels/GoalsViewModel';

export const GoalsScreen = observer(() => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const vm = useInjection(GoalsViewModel);

    const tabs: { label: string; value: typeof vm.selectedTab; count: number }[] = [
        { label: 'GOALS', value: 'GOALS', count: vm.goals.length },
        { label: 'BORROWED', value: 'BORROWED', count: vm.borrowedCount },
        { label: 'LENT', value: 'LENT', count: vm.lentCount },
    ];

    return (
        <LinearGradient
            colors={[Colors.dark.gradientStart, Colors.dark.gradientEnd]}
            style={[styles.container, { paddingTop: insets.top }]}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => router.push(AppRoutes.PROFILE as any)}
                    style={styles.profileButton}
                >
                    <Ionicons name="person-circle-outline" size={32} color="#9BA1A6" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Goals</Text>
            </View>

            {/* Tabs */}
            <View style={styles.tabsContainer}>
                {tabs.map((tab) => (
                    <TouchableOpacity
                        key={tab.value}
                        style={[
                            styles.tab,
                            vm.selectedTab === tab.value && styles.tabActive,
                        ]}
                        onPress={() => vm.setSelectedTab(tab.value)}
                    >
                        <Text
                            style={[
                                styles.tabText,
                                vm.selectedTab === tab.value && styles.tabTextActive,
                            ]}
                        >
                            {tab.label} ({tab.count})
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Summary Cards */}
            <View style={styles.summaryContainer}>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Total left</Text>
                    <Text style={styles.summaryValue}>-${Math.abs(vm.totalLeft).toFixed(2)}</Text>
                </View>
                <View style={styles.summaryCard}>
                    <Text style={styles.summaryLabel}>Fulfilled Goals</Text>
                    <Text style={styles.summaryValue}>{vm.fulfilledGoals}</Text>
                </View>
            </View>

            {/* Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
            >
                <View style={styles.sectionHeader}>
                    <Ionicons name="filter-outline" size={20} color="white" />
                    <Text style={styles.sectionTitle}>Actual</Text>
                </View>
                <View style={styles.actualAmountContainer}>
                    <Ionicons name="briefcase-outline" size={16} color="#9BA1A6" />
                    <Text style={styles.actualAmount}>-${Math.abs(vm.actualValue).toFixed(2)}</Text>
                </View>

                {vm.goals.map((goal) => (
                    <GoalItem key={goal.id} goal={goal} />
                ))}
            </ScrollView>

            {/* FAB */}
            <TouchableOpacity style={[styles.fab, { bottom: 85 + insets.bottom }]}>
                <Ionicons name="add" size={32} color="white" />
            </TouchableOpacity>

            {/* Bottom Tabs */}
            {/* <View style={[styles.bottomTabs, { paddingBottom: insets.bottom + 10 }]}>
                <TouchableOpacity
                    style={styles.tabItemActive}
                    onPress={() => router.push(AppRoutes.GOALS as any)}
                >
                    <View style={styles.tabActiveCircle}>
                        <Ionicons name="pie-chart" size={20} color="white" />
                        <Text style={styles.tabTextActiveBottom}>Goals</Text>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.tabItem}
                    onPress={() => router.push(AppRoutes.HOME as any)}
                >
                    <Ionicons name="calendar-outline" size={24} color="#687076" />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tabItem}>
                    <Ionicons name="wallet-outline" size={24} color="#687076" />
                </TouchableOpacity>
            </View> */}
        </LinearGradient>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    profileButton: {
        marginRight: 12,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
    },
    tabsContainer: {
        flexDirection: 'row',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 25,
        marginHorizontal: 16,
        padding: 4,
        marginBottom: 20,
    },
    tab: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
        borderRadius: 21,
    },
    tabActive: {
        backgroundColor: Colors.dark.accent,
    },
    tabText: {
        color: '#9BA1A6',
        fontSize: 13,
        fontWeight: '600',
    },
    tabTextActive: {
        color: 'white',
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginBottom: 24,
    },
    summaryCard: {
        flex: 0.48,
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
        padding: 16,
        borderRadius: 20,
    },
    summaryLabel: {
        color: '#9BA1A6',
        fontSize: 12,
        marginBottom: 4,
    },
    summaryValue: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
    },
    content: {
        paddingHorizontal: 16,
        paddingBottom: 150,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
        marginLeft: 8,
    },
    actualAmountContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
    },
    actualAmount: {
        color: 'white',
        fontSize: 16,
        marginLeft: 6,
    },
    fab: {
        position: 'absolute',
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 20,
        backgroundColor: Colors.dark.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: Colors.dark.primary,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.4,
        shadowRadius: 8,
    },
    bottomTabs: {
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
    tabItem: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 60,
        height: 48,
    },
    tabItemActive: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 24,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabActiveCircle: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    tabTextActiveBottom: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
});
