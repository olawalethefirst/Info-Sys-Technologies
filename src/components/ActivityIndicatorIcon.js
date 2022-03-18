import React, { useEffect } from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Animated, {
    withRepeat,
    useSharedValue,
    withTiming,
    useAnimatedStyle,
    FadeIn,
    ZoomOut,
} from 'react-native-reanimated';

function ActivityIndicatorIcon(props) {
    const AnimatedSvg = Animated.createAnimatedComponent(Svg);
    const animatedRotation = useSharedValue(0);
    const animatedRotationStyle = useAnimatedStyle(() => {
        return { transform: [{ rotate: `${animatedRotation.value}deg` }] };
    });

    useEffect(() => {
        animatedRotation.value = withRepeat(
            withTiming(360, {
                duration: 600,
            }),
            -1,
            true
        );
    }, [animatedRotation]);

    return (
        <AnimatedSvg
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            style={animatedRotationStyle}
            entering={FadeIn.duration(150).delay(150)}
            exiting={ZoomOut.duration(150)}
        >
            <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11H22C22 17.0751 17.0751 22 11 22C4.92487 22 0 17.0751 0 11C0 4.92487 4.92487 0 11 0V4Z"
                fill="white"
            />
        </AnimatedSvg>
    );
}

ActivityIndicatorIcon.propTypes = {
    fontFactor: PropTypes.number,
};

export default React.memo(ActivityIndicatorIcon);
