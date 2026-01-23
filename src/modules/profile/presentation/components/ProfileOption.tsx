import { Colors } from '@/shared/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ProfileOptionProps {
    icon: string;
    label: string;
    onPress?: () => void;
    color?: string;
    isLast?: boolean;
    showChevron?: boolean;
    rightLabel?: string;
}

export const ProfileOption: React.FC<ProfileOptionProps> = ({
    icon,
    label,
    onPress,
    color = 'white',
    isLast = false,
    showChevron = true,
    rightLabel
}) => {
    return (
        <TouchableOpacity 
            style={[styles.container, isLast && styles.lastItem]} 
            onPress={onPress} 
            activeOpacity={0.7}
        >
            <View style={styles.leftSection}>
                <View style={styles.iconContainer}>
                    <Ionicons name={icon as any} size={20} color={color} />
                </View>
                <Text style={[styles.label, { color }]}>{label}</Text>
            </View>
            
            <View style={styles.rightSection}>
                {rightLabel && <Text style={styles.rightLabel}>{rightLabel}</Text>}
                {showChevron && (
                    <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.3)" />
                )}
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: Colors.dark.surface,
        borderRadius: 24, // More rounded as per image
        padding: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
        height: 56,
    },
    lastItem: {
        marginBottom: 0,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        width: 32,
        height: 32,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 12,
    },
    label: {
        fontSize: 16,
        fontWeight: '500',
    },
    rightSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rightLabel: {
        color: 'rgba(255, 255, 255, 0.5)',
        marginRight: 8,
        fontSize: 14,
    },
});
