import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
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
                d="M315 75H51.214l49.393-49.394c5.858-5.857 5.858-15.355 0-21.213-5.858-5.857-15.356-5.857-21.213 0l-75 75c-5.859 5.857-5.859 15.355 0 21.213l75 75A14.956 14.956 0 0090 180c3.84 0 7.678-1.465 10.607-4.394 5.858-5.857 5.858-15.355 0-21.213L51.214 105H315c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15z"
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
