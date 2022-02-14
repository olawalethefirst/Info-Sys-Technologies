import React from 'react';
import { Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import moment from 'moment';

export default function Created({ fontFactor }) {
    return (
        <Text
            style={{
                fontSize: fontFactor * wp(3.75),
                lineHeight: fontFactor * wp(4.77),
                fontFamily: 'Poppins_400Regular',
                color: '#808080',
                textAlign: 'left',
                width: '100%',
            }}
        >
            {moment(new Date()).fromNow()}
        </Text>
    );
}
