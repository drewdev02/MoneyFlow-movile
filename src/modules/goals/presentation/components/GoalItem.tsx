import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Goal } from '../../domain/models/Goal';

interface GoalItemProps {
    goal: Goal;
}

export const GoalItem: React.FC<GoalItemProps> = ({ goal }) => {
    const progress = (goal.currentAmount / goal.targetAmount) * 100;

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.iconContainer}>
                    <View style={[styles.iconBox, { backgroundColor: 'rgba(255, 140, 0, 0.1)' }]}>
                        <Ionicons name={goal.icon as any} size={24} color={goal.color} />
                    </View>
                    <Text style={styles.name}>{goal.name}</Text>
                </View>
                <Text style={styles.targetAmount}>${goal.targetAmount.toFixed(2)}</Text>
            </View>

            <View style={styles.progressLabelContainer}>
                <Text style={styles.currentAmount}>${goal.currentAmount.toFixed(2)}</Text>
                <Text style={styles.percentage}>{progress.toFixed(1)} %</Text>
            </View>

            <View style={styles.progressBarBackground}>
                <View style={[styles.progressBarFill, { width: `${progress}%` }]} />
            </View>

            <Text style={styles.leftAmount}>Left: ${(goal.targetAmount - goal.currentAmount).toFixed(2)}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 16,
        marginBottom: 16,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    iconContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconBox: {
        width: 44,
        height: 44,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    name: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    targetAmount: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    progressLabelContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    currentAmount: {
        color: '#9BA1A6',
        fontSize: 14,
    },
    percentage: {
        color: '#9BA1A6',
        fontSize: 14,
    },
    progressBarBackground: {
        height: 6,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 3,
        marginBottom: 8,
        overflow: 'hidden',
    },
    progressBarFill: {
        height: '100%',
        backgroundColor: 'white',
        borderRadius: 3,
    },
    leftAmount: {
        color: '#687076',
        fontSize: 12,
        textAlign: 'right',
    },
});
