import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInjection } from '@/shared/hooks/use-injection';
import { SignUpViewModel } from '../viewmodels/SignUpViewModel';
import BudgeLogo from '@/shared/components/BudgeLogo';
import { GlobalGradients } from '@/shared/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const BackButton = observer(() => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  return (
    <TouchableOpacity style={[styles.backButton, { top: insets.top + 4 }]} onPress={() => router.back()}>
      <Ionicons name="arrow-back" size={28} color="#fff" />
    </TouchableOpacity>
  );
});

const Logo = observer(() => <BudgeLogo style={styles.logoContainer} iconStyle={styles.logoIcon} textStyle={styles.logoText} />);
const Title = observer(() => (
  <View style={styles.titleSection}>
    <Text style={styles.title}>Create your account</Text>
    <Text style={styles.subtitle}>Sign up and start transforming your finances</Text>
  </View>
));

const Form = observer(({ children }: { children: React.ReactNode }) => <View style={styles.form}>{children}</View>);

const NameInput = observer(() => {
  const vm = useInjection(SignUpViewModel);
  return (
    <TextInput
      style={styles.input}
      placeholder="Enter your Name"
      placeholderTextColor="#888"
      value={vm.name}
      onChangeText={vm.setName.bind(vm)}
      editable={!vm.loading}
    />
  );
});

const EmailInput = observer(() => {
  const vm = useInjection(SignUpViewModel);
  return (
    <TextInput
      style={styles.input}
      placeholder="Enter your Email"
      placeholderTextColor="#888"
      value={vm.email}
      onChangeText={vm.setEmail.bind(vm)}
      keyboardType="email-address"
      autoCapitalize="none"
      editable={!vm.loading}
    />
  );
});

const PasswordInput = observer(() => {
  const vm = useInjection(SignUpViewModel);
  const [showPassword, setShowPassword] = React.useState(false);
  return (
    <View style={styles.passwordRow}>
      <TextInput
        style={[styles.input, { flex: 1 }]}
        placeholder="Enter your Password"
        placeholderTextColor="#888"
        value={vm.password}
        onChangeText={vm.setPassword.bind(vm)}
        secureTextEntry={!showPassword}
        editable={!vm.loading}
      />
      <TouchableOpacity onPress={() => setShowPassword(v => !v)} disabled={vm.loading}>
        <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#888" />
      </TouchableOpacity>
    </View>
  );
});

const RepeatPasswordInput = observer(() => {
  const vm = useInjection(SignUpViewModel);
  const [showRepeatPassword, setShowRepeatPassword] = React.useState(false);
  return (
    <View style={styles.passwordRow}>
      <TextInput
        style={[styles.input, { flex: 1 }]}
        placeholder="Repeat Password"
        placeholderTextColor="#888"
        value={vm.repeatPassword}
        onChangeText={vm.setRepeatPassword.bind(vm)}
        secureTextEntry={!showRepeatPassword}
        editable={!vm.loading}
      />
      <TouchableOpacity onPress={() => setShowRepeatPassword(v => !v)} disabled={vm.loading}>
        <Ionicons name={showRepeatPassword ? 'eye-off' : 'eye'} size={22} color="#888" />
      </TouchableOpacity>
    </View>
  );
});

const Error = observer(() => {
  const vm = useInjection(SignUpViewModel);
  if (!vm.error) return null;
  return <Text style={styles.error}>{vm.error}</Text>;
});

const SubmitButton = observer(() => {
  const vm = useInjection(SignUpViewModel);
  const handleSubmit = async () => {
    await vm.signUp();
  };
  return (
    <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={vm.loading}>
      {vm.loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
    </TouchableOpacity>
  );
});

const Success = observer(() => {
  const vm = useInjection(SignUpViewModel);
  return vm.success ? <Text style={styles.success}>Registration successful!</Text> : null;
});

const Footer = observer(() => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>
      By using Budge, you agree to the{' '}
      <Text style={styles.footerLink}>Privacy policy</Text> and{' '}
      <Text style={styles.footerLink}>Terms of Use</Text>
    </Text>
  </View>
));

interface SignUpCompound extends React.FC<{ children: React.ReactNode }> {
  BackButton: typeof BackButton;
  Logo: typeof Logo;
  Title: typeof Title;
  Form: typeof Form;
  NameInput: typeof NameInput;
  EmailInput: typeof EmailInput;
  PasswordInput: typeof PasswordInput;
  RepeatPasswordInput: typeof RepeatPasswordInput;
  Error: typeof Error;
  SubmitButton: typeof SubmitButton;
  Success: typeof Success;
  Footer: typeof Footer;
}

const SignUp = observer(({ children }: { children: React.ReactNode }) => {
  useInjection(SignUpViewModel);
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient colors={GlobalGradients.authBackground} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: insets.top + 60, paddingBottom: insets.bottom + 20 },
          ]}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}) as SignUpCompound;

SignUp.BackButton = BackButton;
SignUp.Logo = Logo;
SignUp.Title = Title;
SignUp.Form = Form;
SignUp.NameInput = NameInput;
SignUp.EmailInput = EmailInput;
SignUp.PasswordInput = PasswordInput;
SignUp.RepeatPasswordInput = RepeatPasswordInput;
SignUp.Error = Error;
SignUp.SubmitButton = SubmitButton;
SignUp.Success = Success;
SignUp.Footer = Footer;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24 },
  backButton: { position: 'absolute', left: 0, zIndex: 10, padding: 8 },
  logoContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 80 },
  logoIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  logoInner: { width: 20, height: 10, backgroundColor: 'white', borderRadius: 5, opacity: 0.9 },
  logoText: { color: 'white', fontSize: 28, fontWeight: 'bold', letterSpacing: -0.5 },
  titleSection: { alignItems: 'center', marginBottom: 32 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { color: '#E1E1E1', fontSize: 14, textAlign: 'center', lineHeight: 20 },
  form: { width: '100%' },
  input: { backgroundColor: '#23233A', color: '#fff', borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 16, marginBottom: 16 },
  passwordRow: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#23233A', borderRadius: 12, marginBottom: 16, paddingRight: 10 },
  button: { backgroundColor: '#4C9FFF', borderRadius: 16, width: '100%', paddingVertical: 18, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  error: { color: '#FF6B6B', marginBottom: 8, textAlign: 'center' },
  success: { color: '#4CFFB0', fontWeight: 'bold', marginTop: 10, fontSize: 16, textAlign: 'center' },
  footer: { marginTop: 'auto', alignItems: 'center', paddingTop: 40 },
  footerText: { color: '#687076', fontSize: 12, textAlign: 'center', lineHeight: 18 },
  footerLink: { color: '#3b82f6', textDecorationLine: 'underline' },
});

export { SignUp };
