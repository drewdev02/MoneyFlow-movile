import { useInjection } from '@/shared/hooks/use-injection';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { PasswordRecoveryViewModel } from '../viewmodels/PasswordRecoveryViewModel';

const PasswordRecoveryScreen: React.FC = observer(() => {
    const vm = useInjection(PasswordRecoveryViewModel);
    const insets = useSafeAreaInsets();
    const router = useRouter();

    return (
        <LinearGradient
            colors={['#0F1014', '#1F1235', '#0F1014']}
            style={styles.container}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView
                    contentContainerStyle={[
                        styles.scrollContent,
                        { paddingTop: insets.top + 60, paddingBottom: insets.bottom + 20 },
                    ]}
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps="handled"
                >
                    {/* Botón volver atrás */}
                    <TouchableOpacity
                        style={[styles.backButton, { top: insets.top + 4 }]}
                        onPress={() => router.back()}
                    >
                        <Ionicons name="arrow-back" size={28} color="#fff" />
                    </TouchableOpacity>

                    {/* Logo Section */}
                    <View style={styles.logoContainer}>
                        <LinearGradient
                            colors={['#8E2DE2', '#4A00E0']}
                            style={styles.logoIcon}
                        >
                            <View style={styles.logoInner} />
                        </LinearGradient>
                        <Text style={styles.logoText}>budge</Text>
                    </View>

                    {/* Title Section */}
                    <View style={styles.titleSection}>
                        <Text style={styles.title}>Password recovery</Text>
                    </View>

                    {/* Form Section */}
                    <View style={styles.form}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter your Email"
                            placeholderTextColor="#687076"
                            value={vm.email}
                            onChangeText={vm.setEmail.bind(vm)}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            editable={!vm.loading}
                        />
                        {vm.error ? <Text style={styles.errorText}>{vm.error}</Text> : null}
                        <TouchableOpacity
                            style={[styles.loginButton, vm.loading && styles.buttonDisabled]}
                            onPress={() => vm.recover()}
                            disabled={vm.loading}
                        >
                            <Text style={styles.loginButtonText}>Reset password</Text>
                        </TouchableOpacity>
                        {vm.success ? (
                            <Text style={styles.success}>Check your email for instructions.</Text>
                        ) : null}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </LinearGradient>
    );
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    scrollContent: {
        flexGrow: 1,
        paddingHorizontal: 24,
    },
    backButton: {
        position: 'absolute',
        left: 0,
        zIndex: 10,
        padding: 8,
    },
    logoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 80,
    },
    logoIcon: {
        width: 40,
        height: 40,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 10,
    },
    logoInner: {
        width: 20,
        height: 10,
        backgroundColor: 'white',
        borderRadius: 5,
        opacity: 0.9,
    },
    logoText: {
        color: 'white',
        fontSize: 28,
        fontWeight: 'bold',
        letterSpacing: -0.5,
    },
    titleSection: {
        alignItems: 'flex-start',
        marginBottom: 32,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    form: {
        width: '100%',
    },
    input: {
        backgroundColor: '#23233A',
        color: '#fff',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingVertical: 14,
        fontSize: 16,
        marginBottom: 16,
    },
    loginButton: {
        backgroundColor: '#3b82f6',
        borderRadius: 25,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        shadowColor: '#3b82f6',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
    buttonDisabled: {
        opacity: 0.6,
    },
    errorText: {
        color: '#FF453A',
        fontSize: 14,
        marginBottom: 16,
        textAlign: 'center',
    },
    success: {
        color: '#4CFFB0',
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 16,
        textAlign: 'center',
    },
});

export default PasswordRecoveryScreen;
