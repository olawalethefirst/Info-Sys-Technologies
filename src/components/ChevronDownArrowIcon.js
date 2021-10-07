import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleSheet } from 'react-native';

function SvgComponent() {
    return (
        <Svg
            viewBox="0 0 600 350"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={styles.SVG}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M91.946 15.547l208.322 206.226L508.591 15.547c20.939-20.73 54.765-20.73 75.704 0a52.555 52.555 0 010 74.943L337.852 334.453c-20.939 20.729-54.765 20.729-75.704 0L15.705 90.49a52.556 52.556 0 010-74.943c20.94-20.198 55.302-20.73 76.241 0z"
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
