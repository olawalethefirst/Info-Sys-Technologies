import React from 'react';
import { Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Created({ fontFactor, createdAt }) {
    return (
        <Text
            style={{
                fontSize: fontFactor * wp(3.75),
                lineHeight: fontFactor * wp(4.77),
                fontFamily: 'Poppins_400Regular',
                color: '#808080',
                textAlign: 'left',
            }}
        >
            {createdAt}
        </Text>
    );
}
