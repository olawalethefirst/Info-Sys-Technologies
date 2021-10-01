import React from 'react';
import { StyleSheet, Text, View, Platform, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import Service from './Service';

export default function ServicesGallery({ bodyHeight, margin, headerSize }) {
    const { statusBarHeight } = Constants;
    const galleryHeight = bodyHeight - headerSize + statusBarHeight;

    return (
        <View
            style={[
                styles.container,
                {
                    minHeight: galleryHeight,
                    paddingHorizontal: margin,
                },
            ]}
        ></View>
    );
}

const styles = StyleSheet.create({
    // karla,
});
