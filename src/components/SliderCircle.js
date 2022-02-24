import * as React from 'react';
import Svg, { Circle } from 'react-native-svg';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import Animated, {
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';

export default function SliderCircle({ size, index, pageNo }) {
    const AnimatedCircle = Animated.createAnimatedComponent(Circle);
    const animatedCircleStyle = useAnimatedStyle(() => {
        return {
            opacity: withTiming((Math.round(pageNo.value) === index) + 0), //opacity = 1 when active
        };
    });

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
                    strokeWidth={7}
                />
                <AnimatedCircle
                    cx={30}
                    cy={30}
                    r={20}
                    fill="#fff"
                    style={animatedCircleStyle}
                />
            </Svg>
        </View>
    );
}

SliderCircle.propTypes = {
    size: PropTypes.number,
    index: PropTypes.number,
    pageNo: PropTypes.object,
};

const styles = StyleSheet.create({
    SVG: {
        flex: 1,
    },
});
