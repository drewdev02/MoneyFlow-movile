import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SocialButtonProps {
    onPress: () => void;
    loading?: boolean;
}

export const GoogleLoginButton: React.FC<SocialButtonProps> = ({ onPress, loading }) => {
    return (
        <TouchableOpacity
            style={styles.googleButton}
            onPress={onPress}
            disabled={loading}
            activeOpacity={0.8}
        >
            <View style={styles.content}>
                <Image
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg' }}
                    style={styles.googleIcon}
                />
                <Text style={styles.googleText}>Continue with Google</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    googleButton: {
        backgroundColor: '#1E1F26',
        borderRadius: 25,
        height: 54,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.05)',
    },
    content: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    googleIcon: {
        width: 24,
        height: 24,
        marginRight: 12,
    },
    googleText: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600',
    },
});
