import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function SliderCircle({ fontFactor, active, size }) {
    const indicatorSize = wp(4);
    const indicatorActiveSize = 0.5 * indicatorSize;

    return (
        <View
            style={{
                width: indicatorSize,
                height: indicatorSize,
                borderRadius: indicatorSize / 2,
                borderColor: 'white',
                borderWidth: 2,
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <View
                style={{
                    width: indicatorActiveSize,
                    height: indicatorActiveSize,
                    borderRadius: indicatorActiveSize / 2,
                    // borderColor: 'white',
                    // // borderWidth: 1,
                    backgroundColor: '#fff',
                }}
            ></View>
        </View>
    );
}

const styles = StyleSheet.create({});
