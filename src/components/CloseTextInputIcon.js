import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
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
            className="prefix__feather prefix__feather-x"
            style={styles.icon}
            {...props}
        >
            <Path d="M18 6L6 18M6 6l12 12" />
        </Svg>
    );
}

const styles = StyleSheet.create({
    icon: {
        flex: 1,
    },
});

export default SvgComponent;
