import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AccountItem } from '../components/AccountItem';
import { BalancePieChart } from '../components/BalancePieChart';
import { BalanceViewModel } from '../viewmodels/BalanceViewModel';
import { useInjection } from '@/shared/hooks/use-injection';
import { Colors } from '@/shared/constants/theme';

export const BalanceScreen = observer(() => {
    const viewModel = useInjection(BalanceViewModel);
    const router = useRouter();

    useEffect(() => {
        viewModel.loadData();
    }, []);

    const goToAddAccount = () => {
        router.push('/(home)/add-account');
    };

    return (
        <LinearGradient
            colors={[Colors.dark.gradientStart, Colors.dark.gradientEnd]}
            style={styles.container}
        >
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.header}>
                    <View style={styles.headerLeft}>
                        <TouchableOpacity>
                            <Ionicons name="person-circle-outline" size={32} color="#aaa" />
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Balance</Text>
                    </View>
                    <TouchableOpacity style={styles.addAccountButton} onPress={goToAddAccount}>
                        <Ionicons name="add" size={20} color="#ddd" />
                        <Text style={styles.addAccountText}>Add Account</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView contentContainerStyle={[styles.content, { paddingBottom: 100 }]}>
                    <BalancePieChart
                        accounts={viewModel.accounts}
                        totalBalance={viewModel.totalBalance}
                    />

                    <View style={styles.accountsHeader}>
                        <View>
                            <View style={styles.sectionTitleRow}>
                                <Ionicons name="menu-outline" size={24} color="white" />
                                <Text style={styles.sectionTitle}>My Accounts</Text>
                            </View>
                            <Text style={styles.sectionSubtitle}>
                                +${viewModel.totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </Text>
                        </View>
                        <TouchableOpacity>
                            <Ionicons name="ellipsis-vertical" size={20} color="#aaa" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.accountsList}>
                        {viewModel.accounts.map(account => (
                            <AccountItem key={account.id} account={account} />
                        ))}
                    </View>

                    <TouchableOpacity style={styles.addCategoryButton}>
                        <Text style={styles.addCategoryButtonText}>Add category</Text>
                    </TouchableOpacity>
                </ScrollView>
            </SafeAreaView>
        </LinearGradient>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    safeArea: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    headerLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    addAccountButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 20,
        gap: 4,
    },
    addAccountText: {
        color: '#ddd',
        fontSize: 14,
        fontWeight: '500',
    },
    content: {
        paddingHorizontal: 16,
    },
    accountsHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start', // Align to top
        marginBottom: 16,
        marginTop: 20,
    },
    sectionTitleRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        marginBottom: 4,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    sectionSubtitle: {
        color: '#ddd',
        fontSize: 14,
        fontWeight: '500',
        marginLeft: 32, // Indent to align with text above
    },
    accountsList: {
        marginBottom: 24,
    },
    addCategoryButton: {
        backgroundColor: '#42a5f5',
        paddingVertical: 14,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 16,
        alignSelf: 'center',
        paddingHorizontal: 48,
        minWidth: 200,
    },
    addCategoryButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
