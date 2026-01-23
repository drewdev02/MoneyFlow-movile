import { Colors } from '@/shared/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View, TouchableOpacityProps } from 'react-native';

interface StyledSelectorProps extends TouchableOpacityProps {
  text?: string;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

export const StyledSelector = ({ text, icon, children, ...props }: StyledSelectorProps) => {
  return (
    <TouchableOpacity style={styles.selector} {...props}>
      <View style={styles.content}>
        {children ? children : <Text style={styles.selectorText}>{text}</Text>}
      </View>
      <View>
        {icon ? icon : <Ionicons name="chevron-down" size={20} color={Colors.dark.icon} />}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.dark.surface,
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.05)',
    height: 48,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  selectorText: {
    color: 'white',
    fontSize: 16,
  },
});
