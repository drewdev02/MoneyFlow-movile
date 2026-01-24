import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface Props {
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  loading: boolean;
  error: string | null;
  onNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onPasswordChange: (v: string) => void;
  onRepeatPasswordChange: (v: string) => void;
  onSubmit: () => void;
}

export const SignUpForm: React.FC<Props> = ({
  name,
  email,
  password,
  repeatPassword,
  loading,
  error,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onRepeatPasswordChange,
  onSubmit,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);

  return (
    <View style={styles.formContainer}>
      <TextInput
        style={styles.input}
        placeholder="Enter your Name"
        placeholderTextColor="#888"
        value={name}
        onChangeText={onNameChange}
        editable={!loading}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter your Email"
        placeholderTextColor="#888"
        value={email}
        onChangeText={onEmailChange}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!loading}
      />
      <View style={styles.passwordRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Enter your Password"
          placeholderTextColor="#888"
          value={password}
          onChangeText={onPasswordChange}
          secureTextEntry={!showPassword}
          editable={!loading}
        />
        <TouchableOpacity onPress={() => setShowPassword((v) => !v)} disabled={loading}>
          <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={22} color="#888" />
        </TouchableOpacity>
      </View>
      <View style={styles.passwordRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Repeat Password"
          placeholderTextColor="#888"
          value={repeatPassword}
          onChangeText={onRepeatPasswordChange}
          secureTextEntry={!showRepeatPassword}
          editable={!loading}
        />
        <TouchableOpacity onPress={() => setShowRepeatPassword((v) => !v)} disabled={loading}>
          <Ionicons name={showRepeatPassword ? 'eye-off' : 'eye'} size={22} color="#888" />
        </TouchableOpacity>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={onSubmit} disabled={loading}>
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 30,
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
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#23233A',
    borderRadius: 12,
    marginBottom: 16,
    paddingRight: 10,
  },
  button: {
    backgroundColor: '#4C9FFF',
    borderRadius: 16,
    width: '100%',
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  error: {
    color: '#FF6B6B',
    marginBottom: 8,
    textAlign: 'center',
  },
});

export default SignUpForm;
