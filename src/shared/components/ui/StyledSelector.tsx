import { Colors, Radii, Spacing, FontSizes, Fonts } from '@/shared/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, TouchableOpacityProps } from 'react-native';
import { useColorScheme } from '@/shared/hooks/use-color-scheme';

interface StyledSelectorProps extends TouchableOpacityProps {
  text?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const StyledSelector = ({ text, icon, children, ...props }: StyledSelectorProps) => {
  const theme = useColorScheme() ?? 'light';
  return (
    <TouchableOpacity style={[styles.selector, {
      backgroundColor: Colors[theme].surface,
      borderRadius: Radii.lg,
      padding: Spacing.md,
      borderColor: Colors[theme].icon,
    }]} {...props}>
      <View style={styles.content}>
        {children ? children : <Text style={[styles.selectorText, {
          color: Colors[theme].text,
          fontSize: FontSizes.md,
          fontFamily: Fonts.sans
        }]}>{text}</Text>}
      </View>
      <View>
        {icon ? icon : <Ionicons name="chevron-down" size={FontSizes.lg} color={Colors[theme].icon} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    height: 48,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorText: {},
});
