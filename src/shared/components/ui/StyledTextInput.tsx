import { Colors } from '@/shared/constants/theme';
import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';

interface StyledTextInputProps extends TextInputProps {
  rightIcon?: React.ReactNode;
}

export const StyledTextInput = ({ rightIcon, ...props }: StyledTextInputProps) => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        placeholderTextColor={Colors.dark.icon}
        {...props}
      />
      {rightIcon}
    </View>
  );
};

const styles = StyleSheet.create({
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.dark.surface,
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    height: 48,
  },
  input: {
    flex: 1,
    color: 'white',
    fontSize: 16,
    height: '100%',
  },
});
