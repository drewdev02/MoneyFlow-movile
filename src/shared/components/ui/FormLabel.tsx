import { Colors, Spacing, FontSizes, Fonts } from '@/shared/constants/theme';
import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';

export const FormLabel = (props: TextProps) => {
    const theme = useColorScheme() ?? 'light';
    return <Text style={[styles.label, {
      color: Colors[theme].icon,
      fontSize: FontSizes.sm,
      fontFamily: Fonts.sans,
      marginBottom: Spacing.sm,
      marginTop: Spacing.md,
    }]} {...props} />;
};

const styles = StyleSheet.create({
    label: {},
});
