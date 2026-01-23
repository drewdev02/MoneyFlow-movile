import { Colors } from '@/shared/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Category } from '../../domain/models/Category';

interface CategoryItemProps {
    category: Category;
    onPress?: () => void;
}

export const CategoryItem: React.FC<CategoryItemProps> = ({ category, onPress }) => {
    return (
        <TouchableOpacity style={styles.container} onPress={onPress} activeOpacity={0.7}>
            <View style={[styles.iconContainer, { backgroundColor: 'transparent' }]}>
                <Ionicons name={category.icon as any} size={24} color={category.color} />
            </View>
            <Text style={styles.name}>{category.name}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.dark.surface,
        borderRadius: 12,
        padding: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    iconContainer: {
        width: 32,
        height: 32,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 16,
    },
    name: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
