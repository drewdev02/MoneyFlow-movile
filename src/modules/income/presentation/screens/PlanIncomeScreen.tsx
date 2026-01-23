import { Colors } from '@/shared/constants/theme';
import { FormLabel } from '@/shared/components/ui/FormLabel';
import { StyledSelector } from '@/shared/components/ui/StyledSelector';
import { StyledTextInput } from '@/shared/components/ui/StyledTextInput';
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
import { PlanIncomeViewModel } from '../viewmodels/PlanIncomeViewModel';

export const PlanIncomeScreen = observer(() => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const vm = useInjection(PlanIncomeViewModel);

    const handleCreate = async () => {
        const success = await vm.createIncome();
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
                <Text style={styles.headerTitle}>Plan an income</Text>
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                {/* Category Selector */}
                <FormLabel>Category</FormLabel>
                <StyledSelector
                    onPress={() => router.push(AppRoutes.CATEGORY_SELECTION as any)}
                >
                    <View style={styles.selectorLeft}>
                        <View style={[styles.iconCircle, { backgroundColor: Colors.dark.income }]}>
                            <Ionicons name="cash" size={20} color="white" />
                        </View>
                        <Text style={styles.selectorText}>{vm.category}</Text>
                    </View>
                </StyledSelector>

                {/* Amount and Currency */}
                <View style={styles.row}>
                    <View style={{ flex: 1 }}>
                        <FormLabel>Amount</FormLabel>
                        <StyledTextInput
                            placeholder="|"
                            keyboardType="numeric"
                            value={vm.amount}
                            onChangeText={(text) => vm.setAmount(text)}
                            rightIcon={<Ionicons name="calculator-outline" size={20} color={Colors.dark.icon} style={styles.inputIcon} />}
                        />
                    </View>

                    <View style={[{ width: 100, marginLeft: 16 }]}>
                        <FormLabel>Currency</FormLabel>
                        <StyledSelector text={vm.currency} icon={<Ionicons name="chevron-down" size={16} color={Colors.dark.icon} />} />
                    </View>

                    <View style={[{ marginLeft: 16, alignItems: 'center' }]}>
                        <FormLabel>Paid</FormLabel>
                        <Switch
                            value={vm.isPaid}
                            onValueChange={(val) => vm.setIsPaid(val)}
                            trackColor={{ false: '#2C2C2E', true: Colors.dark.accent }}
                            thumbColor="white"
                        />
                    </View>
                </View>

                {/* Date */}
                <FormLabel>Date</FormLabel>
                <StyledSelector
                    text={vm.formattedDate}
                    icon={
                        <View style={styles.dateSelectorRight}>
                            <Ionicons name="calendar-outline" size={20} color={Colors.dark.icon} />
                            <View style={styles.todayBadge}>
                                <Text style={styles.todayText}>Today</Text>
                                <Ionicons name="chevron-up" size={14} color="white" />
                            </View>
                        </View>
                    }
                />

                {/* Time */}
                <FormLabel>Time</FormLabel>
                <StyledSelector text={vm.time} icon={<Ionicons name="time-outline" size={20} color={Colors.dark.icon} />} />

                {/* Name */}
                <StyledTextInput
                    placeholder="Name"
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
                        <FormLabel>Notes</FormLabel>
                        <TextInput
                            style={styles.notesInput}
                            multiline
                            numberOfLines={3}
                            placeholderTextColor={Colors.dark.icon}
                            value={vm.notes}
                            onChangeText={(text) => vm.setNotes(text)}
                        />

                        {/* Repeat */}
                        <FormLabel>Repeat</FormLabel>
                        <StyledSelector text={vm.repeat} />

                        {/* Remind */}
                        <FormLabel>Remind</FormLabel>
                        <StyledSelector text={vm.remind} />

                        {/* Goal or debt */}
                        <FormLabel>Goal or debt</FormLabel>
                        <StyledSelector text={vm.goalOrDebt || ''} />

                        {/* Color */}
                        <FormLabel>Color</FormLabel>
                        <View style={styles.colorPlaceholder}>
                            <View style={[styles.colorLine, { backgroundColor: vm.color }]} />
                        </View>

                        {/* Icon Color */}
                        <FormLabel>Icon color</FormLabel>
                        <View style={styles.colorPlaceholder}>
                            <View style={[styles.colorLine, { backgroundColor: vm.iconColor }]} />
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
