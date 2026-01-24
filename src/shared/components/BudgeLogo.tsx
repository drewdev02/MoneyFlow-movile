import { GlobalGradients } from '@/shared/constants/theme';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import { StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native';

interface BudgeLogoProps {
  style?: ViewStyle;
  textStyle?: TextStyle;
  iconStyle?: ViewStyle;
  showText?: boolean;
}

const BudgeLogo: React.FC<BudgeLogoProps> = ({ style, textStyle, iconStyle, showText = true }) => (
  <View style={[styles.logoContainer, style]}>
    <LinearGradient colors={GlobalGradients.logo} style={[styles.logoIcon, iconStyle]}>
      <View style={styles.logoInner} />
    </LinearGradient>
    {showText && <Text style={[styles.logoText, textStyle]}>budge</Text>}
  </View>
);

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  logoInner: {
    width: 20,
    height: 10,
    backgroundColor: 'white',
    borderRadius: 5,
    opacity: 0.9,
  },
  logoText: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
});

export default BudgeLogo;
