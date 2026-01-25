
## Skill: compound-components-pattern

**Base directory**: /Users/Andrew/WorkSpace/adrewdev/MoneyFlow/.opencode/skills/compound-components

# Crear Componentes Usando Compound Components Pattern (MobX + DI + useInjection)

## Propósito
Permitir la creación de componentes compuestos en React/MobX donde la lógica y el estado central viven en un ViewModel inyectado por DI mediante el hook `useInjection`. Tanto el componente padre como los subcomponentes obtienen el mismo ViewModel automáticamente y desacoplado, igual que en el resto de tus pantallas.

## Cuándo Usar
- Componentes con partes relacionadas (Tabs, Accordion, Form, etc) que deben compartir estado/lógica, evitando Context y prop drilling.
- Cuando en el proyecto se usa inyección de dependencias y patrones tipo hook (`useInjection`) para ViewModels.
- Cuando se busca una API declarativa, coherente y fácilmente testeable.

## Proceso Paso a Paso
1. **Registra el ViewModel como singleton/scopado en tu container**
   - Por ejemplo: `container.register(TabsViewModel, ...)`.
2. **El componente padre obtiene el ViewModel con el hook useInjection**
   - Ejemplo: `const vm = useInjection(TabsViewModel);`
3. **Los Compound Components (hijos) también obtienen el ViewModel con useInjection**
   - Ejemplo: `const vm = useInjection(TabsViewModel);`
   - No requiere pasar el ViewModel por props.
4. **Haz los subcomponentes accesibles vía propiedad estática del padre**
   - Por ejemplo: `Tabs.List = List;`.
5. **Marca padre e hijos como `observer` para reactividad MobX**
6. **La API es compacta/declarativa**
   - `<Tabs><Tabs.List/><Tabs.Panel when={0}/></Tabs>`
   - Los hijos usan siempre el mismo ViewModel del parent DI.
7. **Valida el ciclo de vida (opcional)**
   - El hook y container deben asegurar que el VM vive el tiempo requerido/alcance adecuado.
8. **Agrega ejemplos y docs**

## Ejemplo Simplificado: Tabs con useInjection

```tsx
// TabsViewModel.ts
import { makeAutoObservable } from 'mobx';

export class TabsViewModel {
  index = 0;
  constructor(defaultIndex = 0) {
    this.index = defaultIndex;
    makeAutoObservable(this);
  }
  setIndex(idx) { this.index = idx; }
}
```

```tsx
// Tabs.tsx
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInjection } from '@/shared/hooks/use-injection';
import { TabsViewModel } from './TabsViewModel';

export const Tabs = observer(({ children }) => {
  // Usa el hook para obtener la instancia
  const vm = useInjection(TabsViewModel);
  // No es necesario pasar vm explícito a los hijos
  return <div>{children}</div>;
});

const List = observer(({ children }) => {
  const vm = useInjection(TabsViewModel);
  return (
    <div>
      {React.Children.map(children, (child, i) =>
        React.cloneElement(child, {
          selected: vm.index === i,
          onClick: () => vm.setIndex(i)
        })
      )}
    </div>
  );
});

const Panel = observer(({ when, children }) => {
  const vm = useInjection(TabsViewModel);
  return vm.index === when ? <div>{children}</div> : null;
});

Tabs.List = List;
Tabs.Panel = Panel;

// Uso ejemplo:
// <Tabs>
//   <Tabs.List>
//     <button>Tab1</button>
//     <button>Tab2</button>
//   </Tabs.List>
//   <Tabs.Panel when={0}>Contenido 1</Tabs.Panel>
//   <Tabs.Panel when={1}>Contenido 2</Tabs.Panel>
// </Tabs>
```


```tsx
import React from 'react';
import { observer } from 'mobx-react-lite';
import { useInjection } from '@/shared/hooks/use-injection';
import { LoginViewModel } from '../viewmodels/LoginViewModel';
import BudgeLogo from '@/shared/components/BudgeLogo';
import { GlobalGradients } from '@/shared/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { ActivityIndicator, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { GoogleLoginButton } from './SocialButtons';

const Logo = observer(() => <BudgeLogo style={styles.logoContainer} iconStyle={styles.logoIcon} textStyle={styles.logoText} />);
const Title = observer(() => (
  <View style={styles.titleSection}>
    <Text style={styles.title}>Let’s start!</Text>
    <Text style={styles.subtitle}>Create your account and start transforming your finances</Text>
  </View>
));
const Form = observer(({ children }: { children: React.ReactNode }) => (
  <View style={styles.form}>{children}</View>
));
const EmailInput = observer(() => {
  const vm = useInjection(LoginViewModel);
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        placeholderTextColor="#687076"
        value={vm.email}
        onChangeText={vm.setEmail.bind(vm)}
        keyboardType="email-address"
        autoCapitalize="none"
      />
    </View>
  );
});
const PasswordInput = observer(() => {
  const vm = useInjection(LoginViewModel);
  return (
    <View style={[styles.inputContainer, styles.passwordContainer]}>
      <TextInput
        style={[styles.input, { flex: 1 }]}
        placeholder="Enter your Password"
        placeholderTextColor="#687076"
        value={vm.password}
        onChangeText={vm.setPassword.bind(vm)}
        secureTextEntry={!vm.isPasswordVisible}
      />
      <TouchableOpacity onPress={() => vm.togglePasswordVisibility()} style={styles.eyeIcon}>
        <Ionicons name={vm.isPasswordVisible ? 'eye-off' : 'eye'} size={22} color="#687076" />
      </TouchableOpacity>
    </View>
  );
});
const Error = observer(() => {
  const vm = useInjection(LoginViewModel);
  if (!vm.error) return null;
  return <Text style={styles.errorText}>{vm.error}</Text>;
});
const SubmitButton = observer(() => {
  const vm = useInjection(LoginViewModel);
  const router = useRouter();
  const handleLogin = async () => {
    const success = await vm.login();
    if (success) {
      router.replace("/(home)/(tabs)");
    }
  };
  return (
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
  );
});
const Links = observer(() => {
  const router = useRouter();
  return (
    <View style={styles.linksRow}>
      <TouchableOpacity onPress={() => router.push('/(auth)/sign-up')}>
        <Text style={styles.linkText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push('/(auth)/password-recovery')}>
        <Text style={styles.linkText}>Forgot password?</Text>
      </TouchableOpacity>
    </View>
  );
});
const Divider = observer(() => (
  <View style={styles.dividerContainer}>
    <View style={styles.divider} />
    <Text style={styles.dividerText}>or</Text>
    <View style={styles.divider} />
  </View>
));
const GoogleButton = observer(() => {
  const vm = useInjection(LoginViewModel);
  const router = useRouter();
  const handleGoogleLogin = async () => {
    const success = await vm.loginWithGoogle();
    if (success) {
      router.replace("/(home)/(tabs)");
    }
  };
  return <GoogleLoginButton onPress={handleGoogleLogin} loading={vm.loading} />;
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

interface LoginCompound extends React.FC<{ children: React.ReactNode }> {
  Logo: typeof Logo;
  Title: typeof Title;
  Form: typeof Form;
  EmailInput: typeof EmailInput;
  PasswordInput: typeof PasswordInput;
  Error: typeof Error;
  SubmitButton: typeof SubmitButton;
  Links: typeof Links;
  Divider: typeof Divider;
  GoogleLoginButton: typeof GoogleButton;
  Footer: typeof Footer;
}

const Login = observer(({ children }: { children: React.ReactNode }) => {
  useInjection(LoginViewModel);
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient colors={GlobalGradients.authBackground} style={styles.container}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollContent,
            { paddingTop: insets.top + 60, paddingBottom: insets.bottom + 20 }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}) as LoginCompound;

Login.Logo = Logo;
Login.Title = Title;
Login.Form = Form;
Login.EmailInput = EmailInput;
Login.PasswordInput = PasswordInput;
Login.Error = Error;
Login.SubmitButton = SubmitButton;
Login.Links = Links;
Login.Divider = Divider;
Login.GoogleLoginButton = GoogleButton;
Login.Footer = Footer;

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingHorizontal: 24 },
  logoContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 80 },
  logoIcon: { width: 40, height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginRight: 10 },
  logoInner: { width: 20, height: 10, backgroundColor: 'white', borderRadius: 5, opacity: 0.9 },
  logoText: { color: 'white', fontSize: 28, fontWeight: 'bold', letterSpacing: -0.5 },
  titleSection: { alignItems: 'center', marginBottom: 32 },
  title: { color: 'white', fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  subtitle: { color: '#E1E1E1', fontSize: 14, textAlign: 'center', lineHeight: 20 },
  form: { width: '100%' },
  inputContainer: { backgroundColor: 'rgba(255, 255, 255, 0.03)', borderRadius: 12, borderWidth: 1, borderColor: 'rgba(255, 255, 255, 0.08)', marginBottom: 16, height: 56, paddingHorizontal: 16, justifyContent: 'center' },
  passwordContainer: { flexDirection: 'row', alignItems: 'center' },
  input: { color: 'white', fontSize: 16 },
  eyeIcon: { padding: 8 },
  errorText: { color: '#FF453A', fontSize: 14, marginBottom: 16, textAlign: 'center' },
  loginButton: { backgroundColor: '#3b82f6', borderRadius: 25, height: 54, justifyContent: 'center', alignItems: 'center', marginBottom: 16, shadowColor: '#3b82f6', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.3, shadowRadius: 8, elevation: 4 },
  buttonDisabled: { opacity: 0.6 },
  loginButtonText: { color: 'white', fontSize: 18, fontWeight: '700' },
  linksRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 32 },
  linkText: { color: '#3b82f6', fontSize: 14, fontWeight: '600' },
  dividerContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 24 },
  divider: { flex: 1, height: 1, backgroundColor: 'rgba(255, 255, 255, 0.1)' },
  dividerText: { color: '#E1E1E1', marginHorizontal: 16, fontSize: 14 },
  footer: { marginTop: 'auto', alignItems: 'center', paddingTop: 40 },
  footerText: { color: '#687076', fontSize: 12, textAlign: 'center', lineHeight: 18 },
  footerLink: { color: '#3b82f6', textDecorationLine: 'underline' }
});

export { Login };

```

## Checklist de Verificación
- [ ] El ViewModel está correctamente registrado en el container
- [ ] Todos los Compound Components (hijos) usan `useInjection` para obtener el ViewModel
- [ ] Todos los componentes relevantes son `observer`
- [ ] La API es declarativa y consistente
- [ ] Hay tests para el ciclo de vida/alcance del ViewModel
- [ ] Documentación clara de patrón y ciclo de uso

## Buenas Prácticas y Advertencias
- Usa siempre el hook useInjection en vez de llamar al container directamente
- Si hay más de un Tabs en la página, cada uno debe tener su ViewModel aislado por scope/configuración del container
- Evita state global accidental (cada instancia debe estar correctamente gestionada por el container/hook)
- Limpia y desregistra el ViewModel según el ciclo de vida del componentes si es necesario

---

**Fin del skill para Compound Components Pattern con MobX, DI y useInjection**
