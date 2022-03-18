import React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import Animated, { ZoomIn, ZoomOut } from 'react-native-reanimated';

function PlusICon(props) {
    const AnimatedSvg = Animated.createAnimatedComponent(Svg);

    return (
        <AnimatedSvg
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            {...props}
            exiting={ZoomOut.duration(150)}
            entering={ZoomIn.delay(150).duration(150)}
        >
            <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M7 18L7 0L11 0L11 18H7Z"
                fill="white"
            />
            <Path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M3.49691e-07 7L18 7L18 11L0 11L3.49691e-07 7Z"
                fill="white"
            />
        </AnimatedSvg>
    );
}

PlusICon.propTypes = {
    fontFactor: PropTypes.number,
};

export default React.memo(PlusICon);
