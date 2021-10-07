import React from 'react';
import { StyleSheet, Animated, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SliderCircle from './SliderCircle';

export default function SlideIndicator({ fontFactor, size }) {
    return (
        <View style={{ position: 'absolute', right: 50, top: 50 }}>
            <SliderCircle size={size} />
        </View>
    );
}

const styles = StyleSheet.create({});
