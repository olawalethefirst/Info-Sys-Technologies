import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import {widthPercentageToDP as wp } from 'react-native-responsive-screen'

function HeartIcon({ liked, fontFactor }) {
    return (
        <Svg
            width={fontFactor * wp(6.36)}
            height={fontFactor * wp(6.36)}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#000"
        >
            <Path
                d="M4 16C1 12 2 6 7 4s8 2 9 4c1-2 5-6 10-4s5 8 2 12-12 12-12 12-9-8-12-12z"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill={liked ? 'red' : 'white'}
                stroke={liked ? 'red' : 'black'}
            />
        </Svg>
    );
}

HeartIcon.propTypes = {
    liked: PropTypes.bool,
    fontFactor: PropTypes.number
};

export default HeartIcon;
