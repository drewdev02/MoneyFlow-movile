import { Colors } from '@/shared/constants/theme';
import { useInjection } from '@/shared/hooks/use-injection';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { ScrollView, StyleSheet, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CreateGoalViewModel } from '../viewmodels/CreateGoalViewModel';

export const CreateGoalScreen = observer(() => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const vm = useInjection(CreateGoalViewModel);

    const formatDate = (date: Date) => {
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
        });
    };

    return (
        <LinearGradient
            colors={[Colors.dark.gradientStart, Colors.dark.gradientEnd]}
            style={[styles.container, { paddingTop: insets.top }]}
        >
            {/* Header */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Create a goal</Text>
            </View>

            <ScrollView
                contentContainerStyle={[styles.content, { paddingBottom: 100 + insets.bottom }]}
                showsVerticalScrollIndicator={false}
            >
                {/* Name */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Name</Text>
                    <TextInput
                        style={styles.input}
                        placeholderTextColor="#687076"
                        value={vm.name}
                        onChangeText={(text) => vm.setName(text)}
                    />
                    <View style={styles.underline} />
                </View>

                {/* Notes */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Notes</Text>
                    <TextInput
                        style={[styles.boxInput, { height: 80, textAlignVertical: 'top' }]}
                        multiline
                        numberOfLines={3}
                        value={vm.notes}
                        onChangeText={(text) => vm.setNotes(text)}
                    />
                </View>

                {/* Category */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Category</Text>
                    <TouchableOpacity style={styles.dropdownInput}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Ionicons name={vm.icon as any} size={20} color={vm.color} style={{ marginRight: 10 }} />
                            <Text style={styles.inputText}>{vm.category}</Text>
                        </View>
                        <Ionicons name="caret-down-outline" size={16} color="white" />
                    </TouchableOpacity>
                </View>

                {/* Choose an icon (placeholder for now) */}
                <TouchableOpacity style={styles.dropdownInput}>
                    <Text style={[styles.inputText, { color: '#9BA1A6' }]}>Choose an icon</Text>
                    <Ionicons name="caret-down-outline" size={16} color="white" />
                </TouchableOpacity>

                {/* Color (visual placeholder) */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Color</Text>
                    <View style={styles.colorBarContainer}>
                        <LinearGradient
                            colors={[Colors.dark.primary, Colors.dark.secondary]}
                            style={styles.colorBar}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        />
                    </View>
                </View>

                {/* Required Amount */}
                <View style={styles.inputGroup}>
                    <View style={styles.row}>
                        <View style={{ flex: 1 }}>
                            <TextInput
                                style={styles.boxInput}
                                placeholder="Required amount"
                                placeholderTextColor="#687076"
                                keyboardType="numeric"
                                value={vm.targetAmount}
                                onChangeText={(text) => vm.setTargetAmount(text)}
                            />
                            <Ionicons name="keypad" size={20} color="white" style={styles.inputIcon} />
                        </View>
                        <View style={{ width: 12 }} />
                        <View style={[styles.boxInput, { width: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                            <Text style={styles.inputText}>USD</Text>
                            <Ionicons name="caret-down-outline" size={16} color="white" />
                        </View>
                    </View>
                </View>

                {/* Add Progress */}
                <View style={styles.switchRow}>
                    <Text style={styles.switchLabel}>Add progress</Text>
                    <Switch
                        value={vm.addProgress}
                        onValueChange={(val) => vm.setAddProgress(val)}
                        trackColor={{ false: '#3E3E3E', true: '#aa00ff' }}
                        thumbColor={'white'}
                    />
                </View>

                {/* Accumulated Amount */}
                {vm.addProgress && (
                    <View style={styles.inputGroup}>
                        <View style={styles.row}>
                            <View style={{ flex: 1 }}>
                                <TextInput
                                    style={styles.boxInput}
                                    placeholder="Accumulated amount"
                                    placeholderTextColor="#687076"
                                    keyboardType="numeric"
                                    value={vm.accumulatedAmount}
                                    onChangeText={(text) => vm.setAccumulatedAmount(text)}
                                />
                                <Ionicons name="keypad" size={20} color="white" style={styles.inputIcon} />
                            </View>
                            <View style={{ width: 12 }} />
                            <View style={[styles.boxInput, { width: 100, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                                <Text style={styles.inputText}>USD</Text>
                                <Ionicons name="caret-down-outline" size={16} color="white" />
                            </View>
                        </View>
                    </View>
                )}


                {/* Date */}
                <View style={styles.inputGroup}>
                    <Text style={styles.label}>Date</Text>
                    <TouchableOpacity style={[styles.boxInput, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                        <Text style={styles.inputText}>{formatDate(vm.date)}</Text>
                        <Ionicons name="calendar-outline" size={20} color="#9BA1A6" />
                    </TouchableOpacity>
                </View>

                {/* Image */}
                <View style={styles.inputGroup}>
                    <View style={styles.rowCenter}>
                        <Text style={styles.headerTitle}>Image</Text>
                        <TouchableOpacity style={styles.addImageButton}>
                            <Text style={styles.addImageText}>Add</Text>
                            <Ionicons name="camera" size={20} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

            </ScrollView>

            {/* Footer Buttons */}
            <View style={[styles.footer, { paddingBottom: insets.bottom + 10 }]}>
                <TouchableOpacity style={styles.createButton} onPress={() => vm.create()}>
                    <Text style={styles.createButtonText}>{vm.loading ? 'Creating...' : 'Create'}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelButton} onPress={() => router.back()}>
                    <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
            </View>
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
        paddingVertical: 12,
    },
    backButton: {
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 20,
        marginRight: 10,
    },
    headerTitle: {
        color: 'white',
        fontSize: 20,
        fontWeight: '700',
    },
    content: {
        padding: 16,
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        color: '#9BA1A6',
        fontSize: 14,
        marginBottom: 8,
    },
    input: {
        color: 'white',
        fontSize: 16,
        paddingVertical: 8,
    },
    underline: {
        height: 1,
        backgroundColor: 'white',
        marginTop: 4,
    },
    boxInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 16,
        color: 'white',
        fontSize: 16,
    },
    dropdownInput: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 16,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    inputText: {
        color: 'white',
        fontSize: 16,
    },
    colorBarContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: 16,
        padding: 8,
    },
    colorBar: {
        height: 12,
        borderRadius: 6,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inputIcon: {
        position: 'absolute',
        right: 16,
        top: 16,
    },
    switchRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 20,
    },
    switchLabel: {
        color: '#9BA1A6',
        fontSize: 14,
        marginRight: 12,
    },
    rowCenter: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    addImageButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
    },
    addImageText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
        marginRight: 8,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: Colors.dark.background, // or gradient end color
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    createButton: {
        backgroundColor: '#4dabf7', // Blue color from screenshot
        paddingVertical: 16,
        borderRadius: 24,
        alignItems: 'center',
        marginBottom: 12,
    },
    createButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '700',
    },
    cancelButton: {
        alignItems: 'center',
        paddingVertical: 10,
    },
    cancelButtonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
