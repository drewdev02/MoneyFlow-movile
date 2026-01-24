import {Colors} from '@/shared/constants/theme';
import {Ionicons} from '@expo/vector-icons';
import React, {memo} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Transaction} from '../../domain/models/CalendarInfo';

interface Props {
    transaction: Transaction;
    onPress?: () => void;
}

const ICON_NAME_BY_CATEGORY: Record<string, keyof typeof Ionicons.glyphMap> = {
    food: 'fast-food',
    transport: 'car',
    shopping: 'cart',
    housing: 'home',
    salary: 'cash',
};

const ICON_COLOR_BY_CATEGORY: Record<string, string> = {
    food: '#FF453A',
    transport: '#0A84FF',
    shopping: '#FF9F0A',
    housing: '#BF5AF2',
    salary: '#30D158',
};

const CalendarTransactionItemComponent = ({transaction, onPress}: Props) => {
    const normalizedCategory = transaction.category.toLowerCase();
    const iconName = ICON_NAME_BY_CATEGORY[normalizedCategory] ?? 'pricetag';
    const iconColor = ICON_COLOR_BY_CATEGORY[normalizedCategory] ?? '#64D2FF';
    const isExpense = transaction.type === 'expense';

    return (
        <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
            <View style={styles.leftContent}>
                <View style={styles.iconContainer}>
                    <Ionicons name={iconName as any} size={24} color={iconColor}/>
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
                    <Ionicons name="checkmark-circle" size={20} color={Colors.dark.income}/>
                ) : (
                    <View style={styles.unpaidCircle}/>
                )}
            </View>
        </TouchableOpacity>
    );
};

export const CalendarTransactionItem = memo(CalendarTransactionItemComponent, (prev, next) => {
    if (prev.transaction === next.transaction && prev.onPress === next.onPress) {
        return true;
    }

    if (prev.transaction.id !== next.transaction.id) {
        return false;
    }

    return (
        prev.transaction.amount === next.transaction.amount &&
        prev.transaction.type === next.transaction.type &&
        prev.transaction.description === next.transaction.description &&
        prev.transaction.paymentMethod === next.transaction.paymentMethod &&
        prev.transaction.isPaid === next.transaction.isPaid &&
        prev.transaction.category === next.transaction.category &&
        prev.onPress === next.onPress
    );
});

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
