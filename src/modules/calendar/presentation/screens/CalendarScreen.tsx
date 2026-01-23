import { Colors } from '@/shared/constants/theme';
import { useInjection } from '@/shared/hooks/use-injection';
import { AppRoutes } from '@/shared/types/routes';
import { Ionicons } from '@expo/vector-icons';
import { FlashList } from "@shopify/flash-list";
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CalendarViewModel } from '../viewmodels/CalendarViewModel';
import { CalendarTransactionItem } from '../components/CalendarTransactionItem';


// const { width } = Dimensions.get('window');

export const CalendarScreen = observer(() => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const vm = useInjection(CalendarViewModel);
    const animation = useSharedValue(0);

    React.useEffect(() => {
        animation.value = withSpring(vm.isFabOpen ? 1 : 0, {
            damping: 12,
            stiffness: 200, // Increased stiffness for more speed
            mass: 0.5,      // Reduced mass for less inertia
        });
    }, [vm.isFabOpen, animation]);

    const expandedStyles = useAnimatedStyle(() => {
        return {
            opacity: animation.value,
            transform: [
                {translateY: interpolate(animation.value, [0, 1], [20, 0])},
                {scale: interpolate(animation.value, [0, 1], [0.8, 1])},
            ],
        };
    });

    const fabIconStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {rotate: `${interpolate(animation.value, [0, 1], [0, 45])}deg`},
            ],
        };
    });

    return (
        <LinearGradient
            colors={[Colors.dark.gradientStart, Colors.dark.gradientEnd]}
            style={[styles.container, {paddingTop: insets.top}]}
        >
            {/* Header */}
            <View style={styles.header}>
                <View style={styles.headerTop}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity
                            style={styles.iconButton}
                            onPress={() => router.push(AppRoutes.PROFILE as any)}
                        >
                            <Ionicons name="person-outline" size={24} color={Colors.dark.text}/>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="wallet-outline" size={24} color={Colors.dark.text}/>
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.balanceContainer}>
                        <View style={styles.balanceDropdown}>
                            <Text style={styles.balanceLabel}>December Balance</Text>
                            <Ionicons name="chevron-down" size={16} color={Colors.dark.text}/>
                        </View>
                        <Text style={styles.balanceAmount}>${vm.balance.toFixed(2)}</Text>
                    </TouchableOpacity>

                    <View style={styles.headerRight}>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="stats-chart" size={24} color={Colors.dark.text}/>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.iconButton}>
                            <Ionicons name="ellipsis-vertical" size={24} color={Colors.dark.text}/>
                        </TouchableOpacity>
                    </View>
                </View>

                {/* Month Selector */}
                <FlashList
                    horizontal
                    data={vm.months}
                    renderItem={({item}) => {
                        const isSelected = item.value === vm.selectedMonth;
                        return (
                            <TouchableOpacity
                                style={[styles.monthItem, isSelected && styles.monthItemActive]}
                                onPress={() => vm.setSelectedMonth(item.value)}
                            >
                                <Text style={[styles.monthText, isSelected && styles.monthTextActive]}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}
                    keyExtractor={(item) => item.value}
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.monthList}
                    initialScrollIndex={3}
                />

                {/* Summary Cards */}
                <View style={styles.summaryContainer}>
                    <View style={styles.summaryCard}>
                        <View style={[styles.iconContainer, {backgroundColor: 'rgba(76, 175, 80, 0.1)'}]}>
                            <Ionicons name="trending-up" size={20} color={Colors.dark.income}/>
                        </View>
                        <View>
                            <Text style={styles.summaryLabel}>Income</Text>
                            <Text style={styles.summaryValue}>${vm.income.toFixed(2)}</Text>
                        </View>
                    </View>
                    <View style={styles.summaryCard}>
                        <View style={[styles.iconContainer, {backgroundColor: 'rgba(244, 67, 54, 0.1)'}]}>
                            <Ionicons name="trending-down" size={20} color={Colors.dark.expense}/>
                        </View>
                        <View>
                            <Text style={styles.summaryLabel}>Expenses</Text>
                            <Text style={styles.summaryValue}>${vm.expenses.toFixed(2)}</Text>
                        </View>
                    </View>
                </View>
            </View>

            {/* Content */}
            <FlashList
                data={vm.calendarList}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.content}
                initialScrollIndex={vm.currentMonthIndex}
                keyExtractor={(item) => `${item.month}-${item.year}`}
                renderItem={({item}) => (
                    <View style={styles.monthSection}>
                        <View style={styles.illustrationContainer}>
                            <Image
                                source={require('../../../../../assets/images/calendar_landscape.png')}
                                style={styles.illustration}
                                contentFit="cover"
                            />
                            <View style={styles.monthBadge}>
                                <Text style={styles.monthBadgeText}>{item.month} {item.year}</Text>
                            </View>
                        </View>

                        <View style={styles.daysContainer}>
                            {item.days.map((day, dIdx) => (
                                <View key={dIdx} style={styles.daySection}>
                                    <View style={styles.dayHeader}>
                                        <Text style={styles.dayHeaderText}>{day.label}</Text>
                                        <Text style={styles.dayBalanceText}>-${Math.abs(day.dayBalance).toFixed(2)}</Text>
                                    </View>
                                    {day.transactions.map((transaction) => (
                                        <CalendarTransactionItem key={transaction.id} transaction={transaction} />
                                    ))}
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            />

            {/* FAB Overlay Background */}
            {vm.isFabOpen && (
                <TouchableOpacity
                    activeOpacity={1}
                    style={StyleSheet.absoluteFill}
                    onPress={() => vm.toggleFab()}
                >
                    <View style={styles.overlay}/>
                </TouchableOpacity>
            )}

            {/* Expanded Buttons */}
            <View
                style={[styles.fabContainer, {bottom: 85 + insets.bottom}]}
                pointerEvents="box-none"
            >
                <Animated.View
                    style={[styles.expandedButtons, expandedStyles]}
                    pointerEvents={vm.isFabOpen ? 'auto' : 'none'}
                >
                    <TouchableOpacity
                        style={styles.expandedButton}
                        onPress={() => {
                            vm.toggleFab();
                            router.push(AppRoutes.PLAN_EXPENSE as any);
                        }}
                    >
                        <View style={[styles.expandedIconContainer, {backgroundColor: 'rgba(244, 67, 54, 0.1)'}]}>
                            <Ionicons name="trending-down" size={20} color={Colors.dark.expense}/>
                        </View>
                        <Text style={styles.expandedButtonText}>Expense</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.expandedButton}
                        onPress={() => {
                            vm.toggleFab();
                            router.push(AppRoutes.PLAN_INCOME as any);
                        }}
                    >
                        <View style={[styles.expandedIconContainer, {backgroundColor: 'rgba(76, 175, 80, 0.1)'}]}>
                            <Ionicons name="trending-up" size={20} color={Colors.dark.income}/>
                        </View>
                        <Text style={styles.expandedButtonText}>Income</Text>
                    </TouchableOpacity>
                </Animated.View>

                {/* FAB */}
                <TouchableOpacity
                    style={styles.fab}
                    onPress={() => vm.toggleFab()}
                >
                    <Animated.View style={fabIconStyle}>
                        <Ionicons name={vm.isFabOpen ? "close" : "add"} size={32} color="white"/>
                    </Animated.View>
                </TouchableOpacity>
            </View>
        </LinearGradient>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    headerTop: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    headerLeft: {
        flexDirection: 'row',
    },
    headerRight: {
        flexDirection: 'row',
    },
    iconButton: {
        padding: 8,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        marginHorizontal: 4,
    },
    balanceContainer: {
        alignItems: 'center',
    },
    balanceDropdown: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 4,
    },
    balanceLabel: {
        color: '#9BA1A6',
        fontSize: 14,
        marginRight: 4,
    },
    balanceAmount: {
        color: 'white',
        fontSize: 24,
        fontWeight: '700',
    },
    monthList: {
        paddingVertical: 10,
        marginBottom: 20,
    },
    monthItem: {
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 12,
        marginRight: 8,
        minWidth: 70,
        alignItems: 'center',
    },
    monthItemActive: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    monthText: {
        color: '#687076',
        fontSize: 14,
        fontWeight: '600',
    },
    monthTextActive: {
        color: 'white',
    },
    summaryContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    summaryCard: {
        flex: 0.48,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        padding: 12,
        borderRadius: 16,
    },
    iconContainer: {
        width: 36,
        height: 36,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    summaryLabel: {
        color: '#9BA1A6',
        fontSize: 12,
    },
    summaryValue: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    content: {
        paddingBottom: 100,
    },
    monthSection: {
        marginBottom: 20,
    },
    illustrationContainer: {
        height: 180,
        width: '100%',
        position: 'relative',
    },
    illustration: {
        flex: 1,
    },
    monthBadge: {
        position: 'absolute',
        top: 10,
        alignSelf: 'center',
        backgroundColor: 'rgba(0,0,0,0.4)',
        paddingHorizontal: 16,
        paddingVertical: 6,
        borderRadius: 20,
    },
    monthBadgeText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    daysContainer: {
        paddingTop: 20,
        paddingHorizontal: 16,
    },
    daySection: {
        marginBottom: 20,
    },
    dayHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    dayHeaderText: {
        color: '#9BA1A6',
        fontSize: 14,
        fontWeight: '600',
    },
    dayBalanceText: {
        color: '#9BA1A6',
        fontSize: 14,
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
    tabTextActive: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        marginLeft: 8,
    },
    fabContainer: {
        position: 'absolute',
        right: 20,
        alignItems: 'flex-end',
        zIndex: 999,
    },
    fab: {
        width: 60,
        height: 60,
        borderRadius: 20,
        backgroundColor: Colors.dark.primary,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 8,
        shadowColor: Colors.dark.primary,
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.4,
        shadowRadius: 8,
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    expandedButtons: {
        marginBottom: 16,
        alignItems: 'flex-end',
    },
    expandedButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#1E293B',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    expandedIconContainer: {
        width: 32,
        height: 32,
        borderRadius: 16,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    expandedButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
