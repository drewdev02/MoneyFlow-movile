import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

interface Props {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  keyboardType?: 'default' | 'numeric';
  right?: React.ReactNode;
  multiline?: boolean;
}

export const FormInput: React.FC<Props> = ({
  label,
  value,
  onChangeText,
  placeholder,
  keyboardType = 'default',
  right,
  multiline = false,
}) => (
  <View style={{ marginBottom: 8 }}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.row}>
      <TextInput
        style={[styles.input, multiline && { height: 60 }]}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor="#888"
        keyboardType={keyboardType}
        multiline={multiline}
      />
      {right}
    </View>
  </View>
);

const styles = StyleSheet.create({
  label: {
    color: '#aaa',
    fontSize: 14,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#23243A',
    borderRadius: 8,
    color: '#fff',
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    flex: 1,
  },
});
