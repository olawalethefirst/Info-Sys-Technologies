import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';

function HeartIcon({ containerProp, iconProp }) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 32 32"
            fill="none"
            stroke="#000"
            {...containerProp}
        >
            <Path
                d="M4 16C1 12 2 6 7 4s8 2 9 4c1-2 5-6 10-4s5 8 2 12-12 12-12 12-9-8-12-12z"
                fill="red"
                stroke="red"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                {...iconProp}
            />
        </Svg>
    );
}

HeartIcon.propTypes = {
    containerProp: PropTypes.object,
    iconProp: PropTypes.object,
};

export default HeartIcon;
