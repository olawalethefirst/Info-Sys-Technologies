import * as React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { StyleSheet, View } from 'react-native';

export default function SliderCircle({ size, active }) {
    return (
        <View
            style={{
                width: size,
                height: size,
            }}
        >
            <Svg
                viewBox="0 0 60 60"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={styles.SVG}
            >
                <Circle
                    cx={30}
                    cy={30}
                    r={27.5}
                    stroke="#fff"
                    strokeWidth={5}
                />
                {active && <Circle cx={30} cy={30} r={20} fill="#fff" />}
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    SVG: {
        flex: 1,
    },
});
