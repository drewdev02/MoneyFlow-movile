import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import { Account } from '../../domain/models/Account';

interface Props {
    accounts: Account[];
    totalBalance: number;
}

export const BalancePieChart = ({ accounts, totalBalance }: Props) => {
    const data = accounts.map(acc => ({
        value: acc.balance,
        color: acc.color,
        text: acc.percentage ? `${acc.percentage.toFixed(1)}%` : '',
        shiftTextX: -10,
        shiftTextY: -5,
    }));

    return (
        <View style={styles.container}>
            <PieChart
                data={data}
                donut
                radius={120}
                innerRadius={80}
                strokeWidth={0}
                showText
                textColor="white"
                textSize={10}
                backgroundColor="transparent"
                labelsPosition='outward'
                centerLabelComponent={() => (
                    <View style={styles.centerLabel}>
                        <View style={styles.dropdownContainer}>
                            <Text style={styles.dropdownText}>Balance ▼</Text>
                        </View>
                        <Text style={styles.totalAmount}>
                            +${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </Text>
                        <View style={styles.currencyContainer}>
                            <Text style={styles.currencyText}>USD ▼</Text>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 24,
    },
    centerLabel: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    dropdownContainer: {
        backgroundColor: 'rgba(255,255,255,0.1)',
        paddingHorizontal: 8,
        paddingVertical: 4,
        borderRadius: 12,
        marginBottom: 8,
    },
    dropdownText: {
        color: '#aaa',
        fontSize: 12,
    },
    totalAmount: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 4,
    },
    currencyContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    currencyText: {
        color: '#aaa',
        fontSize: 12,
    }
});
