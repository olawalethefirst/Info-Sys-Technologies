import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Service({
    height,
    title,
    imageSource,
    content,
    color,
}) {
    return (
        <View
            style={{
                height: height,
                justifyContent: 'center',
                backgroundColor: color,
            }}
        >
            <Text>Dummy Text</Text>
        </View>
    );
}

const styles = StyleSheet.create({});
