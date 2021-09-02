import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Entypo } from 'react-native-vector-icons';
import Svg, { Rect } from 'react-native-svg';

export default function MenuIcon({ width, height }) {
    const svgWidth = 0.4 * width;
    return (
        <TouchableOpacity
            style={[{ width: width, height: height }, styles.container]}
        >
            <Svg
                width={svgWidth}
                viewBox="0 0 200 125"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={styles.icon}
            >
                <Rect x={25} width={150} height={15} rx={5} fill="#161B26" />
                <Rect
                    x={25}
                    y={110}
                    width={150}
                    height={15}
                    rx={5}
                    fill="#161B26"
                />
                <Rect y={55} width={200} height={15} rx={5} fill="#161B26" />
            </Svg>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        aspectRatio: 200 / 125,
    },
});
