import React from 'react';
import { Text, StyleSheet, TextProps } from 'react-native';

export const FormLabel = (props: TextProps) => {
    return <Text style={styles.label} {...props} />;
};

const styles = StyleSheet.create({
    label: {
        color: '#687076',
        fontSize: 14,
        marginBottom: 8,
        marginTop: 16,
    },
});
