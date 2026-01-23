import { Colors } from '@/shared/constants/theme';
import { useInjection } from '@/shared/hooks/use-injection';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React, { useEffect } from 'react';
import {
    ActivityIndicator,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CategoryItem } from '../components/CategoryItem';
import { CategoryViewModel } from '../viewmodels/CategoryViewModel';
import {FlashList} from "@shopify/flash-list";

export const CategoryScreen = observer(() => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const vm = useInjection(CategoryViewModel);

    useEffect(() => {
        vm.loadCategories();
    }, [vm]);

    return (
        <LinearGradient
            colors={[Colors.dark.gradientStart, Colors.dark.gradientEnd]}
            style={styles.container}
        >
            {/* Header */}
            <View style={[styles.header, { paddingTop: insets.top + 10 }]}>
                <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
                    <Ionicons name="close" size={24} color="white" />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Category</Text>
                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
            </View>

            {vm.loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator color={Colors.dark.primary} size="large" />
                </View>
            ) : (
                <FlashList
                    data={vm.categories}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <CategoryItem
                            category={item}
                            onPress={() => router.back()}
                        />
                    )}
                    contentContainerStyle={[
                        styles.listContent,
                        { paddingBottom: insets.bottom + 20 }
                    ]}
                    showsVerticalScrollIndicator={false}
                />
            )}
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
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    closeButton: {
        width: 60,
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
    editButton: {
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        width: 60,
        alignItems: 'center',
    },
    editButtonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: '600',
    },
    listContent: {
        paddingHorizontal: 16,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
