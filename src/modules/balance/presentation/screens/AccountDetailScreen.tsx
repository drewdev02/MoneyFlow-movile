import { Colors } from '@/shared/constants/theme';
import { useInjection } from '@/shared/hooks/use-injection';
import { Ionicons } from '@expo/vector-icons';
import { format } from 'date-fns';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { AccountDetailViewModel } from '../viewmodels/AccountDetailViewModel';

export const AccountDetailScreen = observer(() => {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const viewModel = useInjection(AccountDetailViewModel);
    const insets = useSafeAreaInsets();

    useEffect(() => {
        if (id) {
            viewModel.loadAccount(id);
        }
    }, [id]);

    if (!viewModel.account && viewModel.loading) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    if (!viewModel.account) {
        return (
            <View style={styles.loadingContainer}>
                <Text style={styles.loadingText}>Account not found</Text>
            </View>
        );
    }

    const { account } = viewModel;

    return (
        <LinearGradient
            colors={[Colors.dark.gradientStart, Colors.dark.gradientEnd]}
            style={styles.container}
        >
                <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                    <TouchableOpacity onPress={() => router.back()}>
                        <Ionicons name="arrow-back" size={24} color="white" />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>{account.name}</Text>
                    <TouchableOpacity>
                        <Ionicons name="ellipsis-vertical" size={24} color="white" />
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={styles.content}>
                    <View style={styles.balanceCard}>
                        <View style={styles.balanceIconContainer}>
                            {/* <Image
                                source={require('@/assets/images/money.png')} // Assuming this exists or using icon
                                style={{ width: 40, height: 40, display: 'none' }} // Placeholder if image not found
                            /> */}
                            <Ionicons name="cash" size={30} color={Colors.dark.income} />
                        </View>
                        <View style={styles.balanceInfo}>
                            <Text style={styles.balanceLabel}>Account balance</Text>
                            <Text style={styles.balanceAmount}>
                                ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </Text>
                        </View>
                        <TouchableOpacity style={styles.editButton}>
                            <Ionicons name="pencil" size={16} color={Colors.dark.icon} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.transactionsList}>
                        {account.transactions.map((transaction) => (
                            <View key={transaction.id} style={styles.transactionItem}>
                                <View style={styles.transactionLeft}>
                                    <View style={styles.transactionIconContainer}>
                                        <Ionicons name={transaction.categoryIcon as any || "help"} size={24} color={transaction.categoryColor || "white"} />
                                    </View>
                                    <View>
                                        <Text style={styles.transactionTitle}>{transaction.description}</Text>
                                        <Text style={styles.transactionDate}>
                                            {format(new Date(transaction.date), 'dd MMMM yyyy')}
                                        </Text>
                                    </View>
                                </View>
                                <Text style={[
                                    styles.transactionAmount,
                                    { color: transaction.type === 'income' ? Colors.dark.income : Colors.dark.expense }
                                ]}>
                                    {transaction.amount < 0 ? '-' : ''}${Math.abs(transaction.amount).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                                </Text>
                            </View>
                        ))}
                    </View>
                </ScrollView>

                <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
                    <TouchableOpacity style={styles.okButton} onPress={() => router.back()}>
                        <Text style={styles.okButtonText}>OK</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.removeButton}>
                        <Text style={styles.removeButtonText}>Remove</Text>
                    </TouchableOpacity>
                </View>
        </LinearGradient>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.dark.gradientStart,
    },
    loadingText: {
        color: 'white',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingBottom: 16,
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    content: {
        padding: 16,
    },
    balanceCard: {
        backgroundColor: Colors.dark.surface, // Approximation of the card color
        borderRadius: 20,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
        marginTop: 8,
    },
    balanceIconContainer: {
        marginRight: 16,
    },
    balanceInfo: {
        flex: 1,
    },
    balanceLabel: {
        color: Colors.dark.icon,
        fontSize: 14,
        marginBottom: 4,
    },
    balanceAmount: {
        color: Colors.dark.income,
        fontSize: 24,
        fontWeight: 'bold',
    },
    editButton: {
        padding: 8,
    },
    transactionsList: {
        gap: 20,
    },
    transactionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    transactionLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 16,
    },
    transactionIconContainer: {
        width: 40,
        // alignItems: 'center', // Icons seem to be just floating w/o background container in the image, or distinct icons. 
        // Image shows icons like car, apple, money sign. 
        // The apple is red, car is blue, money is inside circle. 
    },
    transactionTitle: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 4,
    },
    transactionDate: {
        color: Colors.dark.icon,
        fontSize: 12,
    },
    transactionAmount: {
        fontSize: 16,
        fontWeight: '600',
    },
    footer: {
        paddingHorizontal: 0,
        paddingVertical: 12,
        gap: 12,
    },
    okButton: {
        backgroundColor: Colors.dark.primary, // Blue color
        paddingVertical: 16,
        borderRadius: 30,
        alignItems: 'center',
    },
    okButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    removeButton: {
        paddingVertical: 12,
        alignItems: 'center',
    },
    removeButtonText: {
        color: Colors.dark.expense, // Red color
        fontSize: 16,
        fontWeight: '600',
    },
});
