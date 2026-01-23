import { AppRoutes } from '@/shared/types/routes';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Account } from '../../domain/models/Account';

interface Props {
    account: Account;
}

export const AccountItem = ({ account }: Props) => {
    const router = useRouter();

    const handlePress = () => {
        router.push({
            pathname: AppRoutes.ACCOUNT_DETAIL as any,
            params: { id: account.id }
        });
    };

    return (
        <TouchableOpacity onPress={handlePress} style={styles.container}>
            <View style={styles.leftContent}>
                <View style={[styles.iconContainer, { backgroundColor: account.color }]}>
                    <Ionicons name={account.icon as any} size={20} color="white" />
                </View>
                <Text style={styles.name}>{account.name}</Text>
            </View>
            <Text style={[styles.amount, { color: account.color }]}>
                ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        marginBottom: 12,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    amount: {
        fontSize: 16,
        fontWeight: '600',
    },
});
