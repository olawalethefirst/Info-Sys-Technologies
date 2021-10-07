import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet } from 'react-native';

function SvgComponent() {
    return (
        <Svg
            viewBox="0 0 330 180"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={styles.SVG}
        >
            <Path
                d="M15 105h263.787l-49.394 49.394c-5.858 5.857-5.858 15.355 0 21.213A14.957 14.957 0 00240 180a14.95 14.95 0 0010.606-4.394l75-75c5.858-5.857 5.858-15.355 0-21.213l-75-75c-5.857-5.857-15.355-5.857-21.213 0-5.858 5.857-5.858 15.355 0 21.213L278.787 75H15C6.716 75 0 81.716 0 90c0 8.284 6.716 15 15 15z"
                fill="#fff"
            />
        </Svg>
    );
}

export default SvgComponent;

const styles = StyleSheet.create({
    SVG: {
        flex: 1,
    },
});
