

import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { container } from '@/core/di/container';
import SignUpForm from '../components/SignUpForm';
import { SignUpViewModel } from '../viewmodels/SignUpViewModel';

const SignUpScreen: React.FC = observer(() => {
  const [vm] = useState(() => container.get(SignUpViewModel));
  const insets = useSafeAreaInsets();
  const router = useRouter();
  useEffect(() => {
    // Limpia el estado al desmontar
    return () => {
      vm.setName('');
      vm.setEmail('');
      vm.setPassword('');
      vm.setRepeatPassword('');
      vm.error = null;
      vm.success = false;
    };
  }, [vm]);
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
            <Text style={styles.title}>Create your account</Text>
            <Text style={styles.subtitle}>
              Sign up and start transforming your finances
            </Text>
          </View>

          {/* Form Section */}
          <View style={styles.form}>
            <SignUpForm
              name={vm.name}
              email={vm.email}
              password={vm.password}
              repeatPassword={vm.repeatPassword}
              loading={vm.loading}
              error={vm.error}
              onNameChange={vm.setName.bind(vm)}
              onEmailChange={vm.setEmail.bind(vm)}
              onPasswordChange={vm.setPassword.bind(vm)}
              onRepeatPasswordChange={vm.setRepeatPassword.bind(vm)}
              onSubmit={() => vm.signUp()}
            />
            {vm.success ? (
              <Text style={styles.success}>Registration successful!</Text>
            ) : null}
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
  backButton: {
    position: 'absolute',
    top: 10,
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
  success: {
    color: '#4CFFB0',
    fontWeight: 'bold',
    marginTop: 10,
    fontSize: 16,
    textAlign: 'center',
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

export default SignUpScreen;
