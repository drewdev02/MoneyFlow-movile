import { Colors, Radii, Spacing, FontSizes, Fonts } from '@/shared/constants/theme';
import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';

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
}) => {
  const theme = useColorScheme() ?? 'light';
  return (
    <View style={{ marginBottom: Spacing.sm }}>
      <Text style={{
        color: Colors[theme].icon,
        fontSize: FontSizes.sm,
        fontFamily: Fonts.sans,
        marginBottom: Spacing.xs,
      }}>{label}</Text>
      <View style={styles.row}>
        <TextInput
          style={[styles.input, multiline && { height: 60 }, {
            backgroundColor: Colors[theme].surface,
            borderRadius: Radii.md,
            color: Colors[theme].text,
            paddingHorizontal: Spacing.lg,
            paddingVertical: Spacing.md,
            fontSize: FontSizes.md,
            fontFamily: Fonts.sans,
          }]}
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={Colors[theme].icon}
          keyboardType={keyboardType}
          multiline={multiline}
        />
        {right}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
});
