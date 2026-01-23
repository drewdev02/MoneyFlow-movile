import { Colors } from '@/shared/constants/theme';
import { FormLabel } from '@/shared/components/ui/FormLabel';
import { StyledSelector } from '@/shared/components/ui/StyledSelector';
import { StyledTextInput } from '@/shared/components/ui/StyledTextInput';
import { useInjection } from '@/shared/hooks/use-injection';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AddAccountViewModel } from '../viewmodels/AddAccountViewModel';

const AddAccountScreen = observer(() => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const vm = useInjection(AddAccountViewModel);

    const handleAddAccount = async () => {
        const success = await vm.addAccount();
        if (success) {
            router.back();
        }
    };

    return (
        <LinearGradient
            colors={[Colors.dark.gradientStart, Colors.dark.gradientEnd]}
            style={styles.container}
        >
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Add new account</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <FormLabel>Name</FormLabel>
                <StyledTextInput
                    value={vm.name}
                    onChangeText={vm.setName}
                    placeholder="Account name"
                />

                <View style={styles.toggleRow}>
                    <TouchableOpacity
                        style={[styles.toggleButton, !vm.isCredit ? styles.toggleActive : {}]}
                        onPress={() => vm.setIsCredit(false)}
                    >
                        <Text style={[styles.toggleText, !vm.isCredit ? styles.toggleTextActive : {}]}>BALANCE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.toggleButton, vm.isCredit ? styles.toggleActive : {}]}
                        onPress={() => vm.setIsCredit(true)}
                    >
                        <Text style={[styles.toggleText, vm.isCredit ? styles.toggleTextActive : {}]}>CREDIT</Text>
                    </TouchableOpacity>
                </View>

                <FormLabel>Amount</FormLabel>
                <View style={styles.row}>
                    <View style={{flex: 1}}>
                        <StyledTextInput
                            value={vm.amount}
                            onChangeText={vm.setAmount}
                            keyboardType="numeric"
                            placeholder="Amount"
                        />
                    </View>
                    <View style={[{ width: 100, marginLeft: 16 }]}>
                        <StyledSelector text={vm.currency} onPress={vm.openCurrencyPicker} icon={<Ionicons name="chevron-down" size={16} color={Colors.dark.icon} />} />
                    </View>
                </View>

                {vm.isCredit && (
                    <>
                        <FormLabel>Credit limit</FormLabel>
                        <View style={styles.row}>
                            <View style={{flex: 1}}>
                                <StyledTextInput
                                    value={vm.creditLimit}
                                    onChangeText={vm.setCreditLimit}
                                    keyboardType="numeric"
                                    placeholder="0"
                                />
                            </View>
                            <View style={[{ width: 100, marginLeft: 16 }]}>
                                <StyledSelector text={vm.currency} onPress={vm.openCurrencyPicker} icon={<Ionicons name="chevron-down" size={16} color={Colors.dark.icon} />} />
                            </View>
                        </View>

                        <FormLabel>Payment date</FormLabel>
                        <StyledSelector text={vm.paymentDate || 'None'} onPress={vm.openPaymentDatePicker} icon={<Ionicons name="calendar-outline" size={20} color={Colors.dark.icon} />} />

                        <FormLabel>Remind</FormLabel>
                        <StyledSelector text={vm.remindText} onPress={vm.openRemindPicker} />
                    </>
                )}

                <FormLabel>Choose an icon</FormLabel>
                <StyledSelector text={vm.iconText} onPress={vm.openIconPicker} />

                <FormLabel>Account type</FormLabel>
                <StyledSelector text={vm.accountTypeText} onPress={vm.openAccountTypePicker} />

                <FormLabel>Category</FormLabel>
                <StyledSelector text={vm.categoryText} onPress={vm.openCategoryPicker} />

                <FormLabel>Color</FormLabel>
                <TouchableOpacity style={styles.colorPlaceholder} onPress={vm.openColorPicker}>
                    <View style={[styles.colorLine, { backgroundColor: vm.color }]} />
                </TouchableOpacity>

                <FormLabel>Notes</FormLabel>
                <TextInput
                    style={styles.notesInput}
                    value={vm.notes}
                    onChangeText={vm.setNotes}
                    placeholder="Notes..."
                    placeholderTextColor={Colors.dark.icon}
                    multiline
                />

                <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
                    <TouchableOpacity
                        style={[styles.createButton, vm.loading && styles.buttonDisabled]}
                        onPress={handleAddAccount}
                        disabled={vm.loading}
                    >
                        {vm.loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.createButtonText}>Add</Text>
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                        <Text style={styles.cancelButtonText}>Cancel</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
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
        paddingBottom: 16,
    },
    backButton: {
        padding: 8,
        marginRight: 10,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
    },
    content: {
        paddingHorizontal: 16,
        paddingBottom: 120,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    footer: {
        width: '100%',
        paddingHorizontal: 0,
        marginTop: 20,
    },
    createButton: {
        backgroundColor: Colors.dark.primary,
        borderRadius: 25,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    createButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
    cancelButton: {
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
    notesInput: {
        backgroundColor: Colors.dark.surface,
        borderRadius: 12,
        padding: 12,
        color: 'white',
        fontSize: 16,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        height: 100,
        textAlignVertical: 'top',
    },
    colorPlaceholder: {
        height: 48,
        justifyContent: 'center',
        paddingHorizontal: 12,
        backgroundColor: Colors.dark.surface,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    colorLine: {
        height: 8,
        borderRadius: 4,
        width: '100%',
    },
    toggleRow: {
        flexDirection: 'row',
        marginTop: 16,
        backgroundColor: Colors.dark.surface,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        overflow: 'hidden',
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 10,
        alignItems: 'center',
    },
    toggleActive: {
        backgroundColor: Colors.dark.primary,
        borderRadius: 20,
    },
    toggleText: {
        color: '#aaa',
        fontWeight: 'bold',
        fontSize: 16,
    },
    toggleTextActive: {
        color: '#fff',
    },
});

export default AddAccountScreen;
