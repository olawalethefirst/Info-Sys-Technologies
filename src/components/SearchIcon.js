import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import { StyleSheet } from 'react-native';

function SvgComponent(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            style={styles.icon}
            {...props}
        >
            <Circle cx={11} cy={11} r={8} />
            <Path d="M21 21l-4.35-4.35" />
        </Svg>
    );
}

const styles = StyleSheet.create({
    icon: {
        flex: 1,
    },
});

export default SvgComponent;
