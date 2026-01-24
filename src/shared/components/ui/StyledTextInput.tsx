import { Colors, Radii, Spacing, FontSizes, Fonts } from '@/shared/constants/theme';
import React from 'react';
import { View, TextInput, StyleSheet, TextInputProps } from 'react-native';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';

interface StyledTextInputProps extends TextInputProps {
  rightIcon?: React.ReactNode;
}

export const StyledTextInput = ({ rightIcon, ...props }: StyledTextInputProps) => {
  const theme = useColorScheme() ?? 'light';
  return (
    <View style={[styles.inputWrapper, {backgroundColor: Colors[theme].surface, borderColor: Colors[theme].icon, borderRadius: Radii.lg, paddingHorizontal: Spacing.md}]}> 
      <TextInput
        style={[styles.input, {color: Colors[theme].text, fontSize: FontSizes.md, fontFamily: Fonts.sans}]}
        placeholderTextColor={Colors[theme].icon}
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
    borderWidth: 1,
    height: 48,
  },
  input: {
    flex: 1,
    height: '100%',
  },
});
