import { Colors } from '@/shared/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Transaction } from '../../domain/models/CalendarInfo';

interface Props {
    transaction: Transaction;
}

export const CalendarTransactionItem = ({transaction}: Props) => {
    const isExpense = transaction.type === 'expense';
    // const amountColor = isExpense ? Colors.dark.text : Colors.dark.income; 

    const getIconName = (category: string) => {
        switch (category.toLowerCase()) {
            case 'food': return 'fast-food';
            case 'transport': return 'car';
            case 'shopping': return 'cart';
            case 'housing': return 'home';
            case 'salary': return 'cash';
            default: return 'pricetag';
        }
    };

    const getIconColor = (category: string) => {
        // Just some mock colors matching the screenshot vibe
        switch (category.toLowerCase()) {
            case 'food': return '#FF453A'; // Red
            case 'transport': return '#0A84FF'; // Blue
            case 'shopping': return '#FF9F0A'; // Orange
            case 'housing': return '#BF5AF2'; // Purple
            case 'salary': return '#30D158'; // Green
            default: return '#64D2FF';
        }
    };

    const iconName = getIconName(transaction.category);
    const iconColor = getIconColor(transaction.category);

    return (
        <View style={styles.container}>
            <View style={styles.leftContent}>
                <View style={styles.iconContainer}>
                     <Ionicons name={iconName as any} size={24} color={iconColor} />
                </View>
                <View>
                    <Text style={styles.title}>{transaction.description}</Text>
                    <Text style={styles.subtitle}>
                        {transaction.paymentMethod ? transaction.paymentMethod : transaction.category}
                    </Text>
                </View>
            </View>

            <View style={styles.rightContent}>
                <Text style={styles.amount}>
                    {isExpense ? '-' : '+'}${transaction.amount.toFixed(2)}
                </Text>
                {transaction.isPaid ? (
                    <Ionicons name="checkmark-circle" size={20} color={Colors.dark.income} />
                ) : (
                    <View style={styles.unpaidCircle} />
                )}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: '#1E293B', // Dark card background
        marginBottom: 8,
        borderRadius: 16,
    },
    leftContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
        // The screenshot shows icons without container background, just the icon colored?
        // Actually it looks like the icon itself is colored, maybe on a transparent bg.
        // Let's try just the icon.
    },
    title: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 2,
    },
    subtitle: {
        color: '#94A3B8',
        fontSize: 12,
    },
    rightContent: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    amount: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
        marginRight: 8,
    },
    unpaidCircle: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 2,
        borderColor: '#94A3B8',
    },
});
