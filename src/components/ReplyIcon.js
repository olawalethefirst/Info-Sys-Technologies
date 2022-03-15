import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

function ReplyIcon({ fontFactor }) {
    return (
        <Svg
            id="prefix__Icons"
            xmlns="http://www.w3.org/2000/svg"
            x={0}
            y={0}
            viewBox="0 0 32 32"
            xmlSpace="preserve"
            width={fontFactor * wp(6.36)}
            height={fontFactor * wp(6.36)}
        >
            <Path
                d="M11.7 8.1V6c0-.8-.9-1.3-1.5-.8l-6.8 6c-.5.4-.5 1.2 0 1.6l6.8 6c.6.5 1.5 0 1.5-.8v-2h.9c7.1 0 13.5 4.3 16.5 11C29 16.8 21.3 8.6 11.7 8.1z"
                fill="none"
                stroke="#000"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
            />
        </Svg>
    );
}

ReplyIcon.propTypes = {
    fontFactor: PropTypes.number,
};

export default ReplyIcon;
