import { Colors } from '@/shared/constants/theme';
import { useInjection } from '@/shared/hooks/use-injection';
import { AppRoutes } from '@/shared/types/routes';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
    ActivityIndicator,
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PlanExpenseViewModel } from '../viewmodels/PlanExpenseViewModel';

export const PlanExpenseScreen = observer(() => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const vm = useInjection(PlanExpenseViewModel);

    const handleCreate = async () => {
        const success = await vm.createExpense();
        if (success) {
            router.back();
        }
    };

    return (
        <LinearGradient
            colors={[Colors.dark.gradientStart, Colors.dark.gradientEnd]}
            style={styles.container}
        >
            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Plan an outcome</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Category Selector */}
                <Text style={styles.label}>Category</Text>
                <TouchableOpacity
                    style={styles.selector}
                    onPress={() => router.push(AppRoutes.CATEGORY_SELECTION as any)}
                >
                    <View style={styles.selectorLeft}>
                        <View style={[styles.iconCircle, { backgroundColor: '#FF5722' }]}>
                            <Ionicons name="cart" size={20} color="white" />
                        </View>
                        <Text style={styles.selectorText}>{vm.category}</Text>
                    </View>
                    <Ionicons name="chevron-down" size={20} color={Colors.dark.icon} />
                </TouchableOpacity>

                {/* Amount and Currency */}
                <View style={styles.row}>
                    <View style={[styles.inputGroup, { flex: 1 }]}>
                        <Text style={styles.label}>Amount</Text>
                        <View style={styles.inputWrapper}>
                            <TextInput
                                style={styles.input}
                                placeholder="|"
                                placeholderTextColor={Colors.dark.icon}
                                keyboardType="numeric"
                                value={vm.amount}
                                onChangeText={(text) => vm.setAmount(text)}
                            />
                            <Ionicons name="calculator-outline" size={20} color={Colors.dark.icon} style={styles.inputIcon} />
                        </View>
                    </View>

                    <View style={[styles.inputGroup, { width: 100, marginLeft: 16 }]}>
                        <Text style={styles.label}>Currency</Text>
                        <TouchableOpacity style={styles.selector}>
                            <Text style={styles.selectorText}>{vm.currency}</Text>
                            <Ionicons name="chevron-down" size={16} color={Colors.dark.icon} />
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.inputGroup, { marginLeft: 16, alignItems: 'center' }]}>
                        <Text style={styles.label}>Paid</Text>
                        <Switch
                            value={vm.isPaid}
                            onValueChange={(val) => vm.setIsPaid(val)}
                            trackColor={{ false: '#2C2C2E', true: Colors.dark.accent }}
                            thumbColor="white"
                        />
                    </View>
                </View>

                {/* Date */}
                <Text style={styles.label}>Date</Text>
                <TouchableOpacity style={styles.selector}>
                    <Text style={styles.selectorText}>{vm.formattedDate}</Text>
                    <View style={styles.dateSelectorRight}>
                        <Ionicons name="calendar-outline" size={20} color={Colors.dark.icon} />
                        <View style={styles.todayBadge}>
                            <Text style={styles.todayText}>Today</Text>
                            <Ionicons name="chevron-up" size={14} color="white" />
                        </View>
                    </View>
                </TouchableOpacity>

                {/* Time */}
                <Text style={styles.label}>Time</Text>
                <TouchableOpacity style={styles.selector}>
                    <Text style={styles.selectorText}>{vm.time}</Text>
                    <Ionicons name="time-outline" size={20} color={Colors.dark.icon} />
                </TouchableOpacity>

                {/* Name */}
                <TextInput
                    style={styles.nameInput}
                    placeholder="Name"
                    placeholderTextColor={Colors.dark.icon}
                    value={vm.name}
                    onChangeText={(text) => vm.setName(text)}
                />

                <TouchableOpacity style={styles.moreButton} onPress={() => vm.toggleMore()}>
                    <Text style={styles.moreText}>MORE</Text>
                    <Ionicons name={vm.isMoreExpanded ? "chevron-up" : "chevron-down"} size={16} color={Colors.dark.primary} />
                </TouchableOpacity>

                {vm.isMoreExpanded && (
                    <View style={styles.moreContainer}>
                        {/* Notes */}
                        <Text style={styles.label}>Notes</Text>
                        <TextInput
                            style={styles.notesInput}
                            multiline
                            numberOfLines={3}
                            placeholderTextColor={Colors.dark.icon}
                            value={vm.notes}
                            onChangeText={(text) => vm.setNotes(text)}
                        />

                        {/* Repeat */}
                        <Text style={styles.label}>Repeat</Text>
                        <TouchableOpacity style={styles.selector}>
                            <Text style={styles.selectorText}>{vm.repeat}</Text>
                            <Ionicons name="chevron-down" size={20} color={Colors.dark.icon} />
                        </TouchableOpacity>

                        {/* Remind */}
                        <Text style={styles.label}>Remind</Text>
                        <TouchableOpacity style={styles.selector}>
                            <Text style={styles.selectorText}>{vm.remind}</Text>
                            <Ionicons name="chevron-down" size={20} color={Colors.dark.icon} />
                        </TouchableOpacity>

                        {/* Goal or debt */}
                        <Text style={styles.label}>Goal or debt</Text>
                        <TouchableOpacity style={styles.selector}>
                            <Text style={styles.selectorText}>{vm.goalOrDebt || ''}</Text>
                            <Ionicons name="chevron-down" size={20} color={Colors.dark.icon} />
                        </TouchableOpacity>

                        {/* Color */}
                        <Text style={styles.label}>Color</Text>
                        <View style={styles.colorPlaceholder}>
                            <View style={[styles.colorLine, { backgroundColor: '#1E1F26' }]} />
                        </View>

                        {/* Icon Color */}
                        <Text style={styles.label}>Icon color</Text>
                        <View style={styles.colorPlaceholder}>
                            <View style={[styles.colorLine, { backgroundColor: '#FF5722' }]} />
                        </View>

                        {/* Is income */}
                        <View style={styles.incomeContainer}>
                            <Switch
                                value={vm.isIncome}
                                onValueChange={(val) => vm.setIsIncome(val)}
                                trackColor={{ false: '#2C2C2E', true: Colors.dark.accent }}
                                thumbColor="white"
                            />
                            <Text style={styles.incomeText}>Is income</Text>
                        </View>

                        {/* Image */}
                        <Text style={styles.imageLabel}>Image</Text>
                        <View style={styles.imageRow}>
                            <TouchableOpacity style={styles.addImageButton}>
                                <Text style={styles.addImageText}>Add</Text>
                                <Ionicons name="camera-outline" size={20} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                {/* Bottom Form Actions (Inside ScrollView) */}
                <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
                    <TouchableOpacity
                        style={[styles.createButton, vm.loading && styles.buttonDisabled]}
                        onPress={handleCreate}
                        disabled={vm.loading}
                    >
                        {vm.loading ? (
                            <ActivityIndicator color="white" />
                        ) : (
                            <Text style={styles.createButtonText}>Create</Text>
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
    label: {
        color: '#687076',
        fontSize: 14,
        marginBottom: 8,
        marginTop: 16,
    },
    selector: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.dark.surface,
        borderRadius: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    selectorLeft: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconCircle: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    selectorText: {
        color: 'white',
        fontSize: 16,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
    inputGroup: {
        marginTop: 0,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.dark.surface,
        borderRadius: 12,
        paddingHorizontal: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        height: 48,
    },
    input: {
        flex: 1,
        color: 'white',
        fontSize: 16,
        height: '100%',
    },
    inputIcon: {
        marginLeft: 8,
    },
    dateSelectorRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    todayBadge: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.dark.primary,
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 20,
        marginLeft: 12,
    },
    todayText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        marginRight: 4,
    },
    nameInput: {
        backgroundColor: Colors.dark.surface,
        borderRadius: 12,
        padding: 12,
        color: 'white',
        fontSize: 16,
        marginTop: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        height: 48,
    },
    moreButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
    moreText: {
        color: Colors.dark.primary,
        fontSize: 16,
        fontWeight: '700',
        marginRight: 4,
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
    moreContainer: {
        marginTop: 10,
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
    incomeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
    },
    incomeText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 12,
    },
    imageLabel: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
        marginTop: 24,
        marginBottom: 12,
    },
    imageRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    addImageButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingVertical: 10,
        paddingHorizontal: 16,
        borderRadius: 15,
    },
    addImageText: {
        color: 'white',
        fontSize: 14,
        marginRight: 8,
    },
});
