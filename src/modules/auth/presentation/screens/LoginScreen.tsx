import BudgeLogo from '@/shared/components/BudgeLogo';
import { GlobalGradients } from '@/shared/constants/theme';
import { useInjection } from '@/shared/hooks/use-injection';
import { AppRoutes } from '@/shared/types/routes';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { observer } from 'mobx-react-lite';
import React from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GoogleLoginButton } from '../components/SocialButtons';
import { LoginViewModel } from '../viewmodels/LoginViewModel';

export const LoginScreen = observer(() => {
    const insets = useSafeAreaInsets();
    const router = useRouter();
    const vm = useInjection(LoginViewModel);

    const handleLogin = async () => {
        const success = await vm.login();
        if (success) {
            router.replace("/(home)/(tabs)");
        }
    };

    const handleGoogleLogin = async () => {
        const success = await vm.loginWithGoogle();
        if (success) {
            router.replace(AppRoutes.HOME as any);
        }
    };

    return (
        <LinearGradient
            colors={GlobalGradients.authBackground}
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
                >
                    {/* Logo Section */}
                    <BudgeLogo
                        style={styles.logoContainer}
                        iconStyle={styles.logoIcon}
                        textStyle={styles.logoText}
                    />

                    {/* Title Section */}
                    <View style={styles.titleSection}>
                        <Text style={styles.title}>Let&apos;s start!</Text>
                        <Text style={styles.subtitle}>
                            Create your account and start transforming your finances
                        </Text>
                    </View>

                    {/* Form Section */}
                    <View style={styles.form}>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter your Email"
                                placeholderTextColor="#687076"
                                value={vm.email}
                                onChangeText={(text) => vm.setEmail(text)}
                                keyboardType="email-address"
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={[styles.inputContainer, styles.passwordContainer]}>
                            <TextInput
                                style={[styles.input, { flex: 1 }]}
                                placeholder="Enter your Password"
                                placeholderTextColor="#687076"
                                value={vm.password}
                                onChangeText={(text) => vm.setPassword(text)}
                                secureTextEntry={!vm.isPasswordVisible}
                            />
                            <TouchableOpacity
                                onPress={() => vm.togglePasswordVisibility()}
                                style={styles.eyeIcon}
                            >
                                <Ionicons
                                    name={vm.isPasswordVisible ? 'eye-off' : 'eye'}
                                    size={22}
                                    color="#687076"
                                />
                            </TouchableOpacity>
                        </View>

                        {vm.error ? <Text style={styles.errorText}>{vm.error}</Text> : null}

                        <TouchableOpacity
                            style={[styles.loginButton, vm.loading && styles.buttonDisabled]}
                            onPress={handleLogin}
                            disabled={vm.loading}
                        >
                            {vm.loading ? (
                                <ActivityIndicator color="white" />
                            ) : (
                                <Text style={styles.loginButtonText}>Log In</Text>
                            )}
                        </TouchableOpacity>

                        <View style={styles.linksRow}>
                            <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
                                <Text style={styles.linkText}>Sign Up</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => router.push('/(auth)/password-recovery')}>
                                <Text style={styles.linkText}>Forgot password?</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.dividerContainer}>
                            <View style={styles.divider} />
                            <Text style={styles.dividerText}>or</Text>
                            <View style={styles.divider} />
                        </View>

                        <GoogleLoginButton onPress={handleGoogleLogin} loading={vm.loading} />
                    </View>

                    {/* Footer Section */}
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>
                            By using Budge, you agree to the{' '}
                            <Text style={styles.footerLink}>Privacy policy</Text> and{' '}
                            <Text style={styles.footerLink}>Terms of Use</Text>
                        </Text>
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
        alignItems: 'center',
        marginBottom: 32,
    },
    title: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    subtitle: {
        color: '#E1E1E1',
        fontSize: 14,
        textAlign: 'center',
        lineHeight: 20,
    },
    form: {
        width: '100%',
    },
    inputContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        borderRadius: 12,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.08)',
        marginBottom: 16,
        height: 56,
        paddingHorizontal: 16,
        justifyContent: 'center',
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        color: 'white',
        fontSize: 16,
    },
    eyeIcon: {
        padding: 8,
    },
    errorText: {
        color: '#FF453A',
        fontSize: 14,
        marginBottom: 16,
        textAlign: 'center',
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
    buttonDisabled: {
        opacity: 0.6,
    },
    loginButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '700',
    },
    linksRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 32,
    },
    linkText: {
        color: '#3b82f6',
        fontSize: 14,
        fontWeight: '600',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
    },
    dividerText: {
        color: '#E1E1E1',
        marginHorizontal: 16,
        fontSize: 14,
    },
    footer: {
        marginTop: 'auto',
        alignItems: 'center',
        paddingTop: 40,
    },
    footerText: {
        color: '#687076',
        fontSize: 12,
        textAlign: 'center',
        lineHeight: 18,
    },
    footerLink: {
        color: '#3b82f6',
        textDecorationLine: 'underline',
    },
});
