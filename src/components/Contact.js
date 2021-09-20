import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';

export default function Contact({ children, bodyHeight, headerSize, margin }) {
    const { statusBarHeight } = Constants;
    return (
        <View
            style={{
                minHeight: bodyHeight - 2 * headerSize + statusBarHeight,
                paddingHorizontal: margin,
            }}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({});
