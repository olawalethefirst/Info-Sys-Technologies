import React from 'react';
import { Text } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function Category({ fontFactor, category }) {
    return (
        <Text
            style={{
                fontSize: fontFactor * wp(4),
                lineHeight: fontFactor * wp(5.09),
                fontFamily: 'Poppins_500Medium',
                textAlign: 'left',
            }}
        >
            {category}
        </Text>
    );
}
