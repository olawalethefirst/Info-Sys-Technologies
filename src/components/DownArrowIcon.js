import * as React from 'react';
import { StyleSheet } from 'react-native';
import Svg, { Path } from 'react-native-svg';

export default function SvgComponent() {
    return (
        <Svg
            viewBox="0 0 42 125"
            style={styles.SVG}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                stroke="#fff"
                strokeWidth={6}
                d="M21 0v120M3 102l18 18 18-18"
            />
        </Svg>
    );
}

const styles = StyleSheet.create({
    SVG: {
        flex: 1,
    },
});
