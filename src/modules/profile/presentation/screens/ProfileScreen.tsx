import { Colors } from '@/shared/constants/theme';
import { useInjection } from '@/shared/hooks/use-injection';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ProfileOption } from '../components/ProfileOption';
import { ProfileViewModel } from '../viewmodels/ProfileViewModel';

export const ProfileScreen = observer(() => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const vm = useInjection(ProfileViewModel);

    const options = [
        { id: 'categories', label: 'Categories', icon: 'list-outline' },
        { id: 'currency', label: 'Currency', icon: 'cash-outline' },
        { id: 'export', label: 'Export/Import data', icon: 'share-outline' },
        { id: 'contact', label: 'Contact Center', icon: 'chatbox-ellipses-outline' },
        { id: 'rate', label: 'Rate app', icon: 'star-outline' },
        { id: 'settings', label: 'Settings', icon: 'settings-outline' },
        {
            id: 'premium',
            label: 'Get Premium',
            icon: 'ribbon',
            color: '#FFD700', // Gold color
            showChevron: true
        },
    ];

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
                <Text style={styles.headerTitle}>Profile</Text>
                <View style={styles.placeholder} />
            </View>

            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: insets.bottom + 100 } // Space for bottom button
                ]}
                showsVerticalScrollIndicator={false}
            >
                {/* Profile Info */}
                <View style={styles.profileSection}>
                    <View style={styles.avatarGradientContainer}>
                        <LinearGradient
                            colors={['#8B5CF6', '#4D81F7']}
                            style={styles.avatarGradient}
                        >
                            <View style={styles.avatarInner}>
                                <Ionicons name="person" size={50} color="black" />
                            </View>
                        </LinearGradient>
                    </View>
                    <Text style={styles.username}>{vm.username}</Text>
                </View>

                {/* Options List */}
                <View style={styles.optionsContainer}>
                    {options.map((option) => (
                        <ProfileOption
                            key={option.id}
                            icon={option.icon}
                            label={option.label}
                            color={option.color}
                            showChevron={option.showChevron}
                            onPress={() => console.log(`Pressed ${option.label}`)}
                        />
                    ))}
                </View>
            </ScrollView>

            {/* Bottom Login Button */}
            <View style={[styles.footer, { paddingBottom: insets.bottom + 20 }]}>
                <TouchableOpacity style={styles.loginButton} onPress={() => vm.logout()}>
                    <Ionicons name="log-in-outline" size={24} color="#4CAF50" />
                    <Text style={styles.loginText}>Log In</Text>
                    <Ionicons name="chevron-forward" size={20} color="rgba(255, 255, 255, 0.3)" />
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
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        paddingBottom: 20,
    },
    closeButton: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
    placeholder: {
        width: 40,
    },
    scrollContent: {
        paddingHorizontal: 16,
    },
    profileSection: {
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 30,
    },
    avatarGradientContainer: {
        width: 100,
        height: 100,
        borderRadius: 50,
        padding: 4,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginBottom: 16,
    },
    avatarGradient: {
        flex: 1,
        borderRadius: 46,
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarInner: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.9,
    },
    username: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    optionsContainer: {
        marginTop: 10,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: 16,
    },
    loginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.dark.surface,
        borderRadius: 28,
        paddingHorizontal: 20,
        height: 56,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    loginText: {
        flex: 1,
        color: '#4CAF50',
        fontSize: 16,
        fontWeight: '600',
        marginLeft: 12,
    },
});
