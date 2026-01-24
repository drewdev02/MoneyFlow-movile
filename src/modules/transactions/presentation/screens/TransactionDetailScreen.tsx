import {Colors} from '@/shared/constants/theme';
import {FontAwesome, Ionicons, MaterialCommunityIcons} from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';
import {useLocalSearchParams, useRouter} from 'expo-router';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import React from 'react';
import {observer} from 'mobx-react-lite';
import {useInjection} from '@/shared/hooks/use-injection';
import {TransactionDetailViewModel} from '../viewmodels/TransactionDetailViewModel';
import {ScrollView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';


export const TransactionDetailScreen = observer(() => {
    const {id} = useLocalSearchParams<{ id: string }>();
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const vm = useInjection(TransactionDetailViewModel);
    React.useEffect(() => {
        if (id) {
            vm.loadTransaction(id);
        }
    }, [id, vm]);

    if (vm.loading) return (
        <LinearGradient colors={[Colors.dark.gradientStart, Colors.dark.gradientEnd]} style={[styles.container, {
            paddingTop: insets.top,
            justifyContent: 'center',
            alignItems: 'center'
        }]}>
            <Text style={{color: 'white', fontSize: 20}}>Loading...</Text>
        </LinearGradient>
    );
    if (!vm.transaction) return (
        <LinearGradient colors={[Colors.dark.gradientStart, Colors.dark.gradientEnd]} style={[styles.container, {
            paddingTop: insets.top,
            justifyContent: 'center',
            alignItems: 'center'
        }]}>
            <Text style={{color: 'white', fontSize: 20}}>Transaction not found</Text>
        </LinearGradient>
    );
    return (
        <LinearGradient
            colors={[Colors.dark.gradientStart, Colors.dark.gradientEnd]}
            style={[styles.container, {paddingTop: insets.top}]}
        >
            <View style={styles.topBar}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={28} color="white"/>
                </TouchableOpacity>
                <View>
                    <Text style={styles.dateBig}>20 Jan <Text style={styles.weekDay}>Tuesday</Text></Text>
                </View>
            </View>

            <ScrollView style={{flex: 1}} contentContainerStyle={{paddingBottom: 36}}
                        showsVerticalScrollIndicator={false}>
                <View style={styles.categoryRow}>
                    <View style={[styles.categoryChip, {backgroundColor: vm.transaction.category.color}]}>
                        <Ionicons name="restaurant" size={18} color="#FF4848" style={{marginRight: 8}}/>
                        <Text style={styles.categoryText}>Food</Text>
                    </View>
                </View>

                <Text style={styles.title}>{vm.transaction.description}</Text>

                <View style={styles.amountCard}>
                    <View style={styles.amountLeft}>
                        <MaterialCommunityIcons name="check-circle" size={32} color="#44DF80"/>
                        <Text style={styles.amountTotalLabel}>Total</Text>
                    </View>
                    <Text style={styles.amountValue}>-${Math.abs(vm.transaction.amount).toFixed(2)}</Text>
                </View>

                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Date</Text>
                    <View style={styles.detailValueChip}>
                        <Text style={styles.detailValueText}>{vm.transaction.date}</Text>
                    </View>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Sum at original currency rate</Text>
                    <Text style={styles.detailValueText}>-${Math.abs(vm.transaction.sum).toFixed(2)}</Text>
                </View>
                <View style={styles.detailRow}>
                    <Text style={styles.detailLabel}>Balance <FontAwesome name="money" size={16} color="#68DE8F"/> <Text
                        style={styles.detailAccount}>{vm.transaction.account.name}</Text></Text>
                    <Text
                        style={styles.detailValueText}>${vm.transaction.balance.toLocaleString('en-US', {minimumFractionDigits: 2})}</Text>
                </View>

                <TouchableOpacity style={styles.deleteButton}>
                    <MaterialCommunityIcons name="trash-can" size={34} color="#FC6262"/>
                </TouchableOpacity>
            </ScrollView>

            <View style={[styles.actionBar, {paddingBottom: insets.bottom + 6}]}>
                <TouchableOpacity style={styles.actionButton}>
                    <Text style={styles.actionButtonText}>CANCEL PAYMENT </Text>
                    <FontAwesome name="money" size={18} color="#68DE8F"/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.cancelLink} onPress={() => router.back()}>
                <Text style={styles.cancelLinkText}>Cancel</Text>
            </TouchableOpacity>
        </LinearGradient>
    );
})


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.dark.background,
    },
    topBar: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 6,
        paddingBottom: 12,
        paddingHorizontal: 18,
        backgroundColor: 'transparent',
    },
    backButton: {
        padding: 6,
        marginRight: 12,
    },
    dateBig: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        letterSpacing: 0.5,
    },
    weekDay: {
        color: '#8C95B7',
        fontSize: 16,
        fontWeight: 'normal',
        marginLeft: 12,
    },
    categoryRow: {
        flexDirection: 'row',
        marginLeft: 26,
        marginBottom: 10,
    },
    categoryChip: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 17,
        marginTop: 4,
        backgroundColor: '#40313C',
    },
    categoryText: {
        color: '#ECEDEE',
        fontWeight: '600',
        fontSize: 16,
    },
    title: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 28,
        marginLeft: 26,
        marginBottom: 12,
        marginTop: 4,
    },
    amountCard: {
        backgroundColor: '#181A21',
        flexDirection: 'row',
        borderRadius: 22,
        paddingVertical: 16,
        paddingHorizontal: 22,
        marginHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 18,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 7,
        shadowOffset: {width: 0, height: 2},
        elevation: 1,
    },
    amountLeft: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    amountTotalLabel: {
        color: '#B4DEC5',
        fontWeight: '700',
        fontSize: 16,
        marginLeft: 10,
    },
    amountValue: {
        color: '#44DF80',
        fontSize: 28,
        fontWeight: '700',
    },
    detailRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 24,
        marginBottom: 7,
        minHeight: 40,
    },
    detailLabel: {
        color: '#7E899B',
        fontSize: 15,
        fontWeight: '400',
    },
    detailAccount: {
        color: '#7DDB7B',
        fontWeight: '600',
        fontSize: 14,
    },
    detailValueChip: {
        backgroundColor: '#21223A',
        borderRadius: 16,
        paddingHorizontal: 13,
        paddingVertical: 6,
    },
    detailValueText: {
        color: 'white',
        fontSize: 15,
        fontWeight: '500',
    },
    deleteButton: {
        marginLeft: 22,
        marginTop: 24,
        width: 40,
        height: 40,
        alignItems: 'flex-start',
        justifyContent: 'center',
    },
    actionBar: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 56,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButton: {
        backgroundColor: '#181A21',
        borderWidth: 1.5,
        borderColor: '#2E313C',
        borderRadius: 27,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 36,
        paddingVertical: 13,
        marginHorizontal: 25,
    },
    actionButtonText: {
        color: '#B9BDCE',
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 1,
        marginRight: 10,
    },
    cancelLink: {
        alignSelf: 'center',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 18,
    },
    cancelLinkText: {
        color: '#4D81F7',
        fontSize: 19,
        fontWeight: '600',
        textAlign: 'center',
        letterSpacing: 0.3,
    },
});

