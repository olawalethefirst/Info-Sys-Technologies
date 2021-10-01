import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

export default function ServicesIntro({ fontFactor, margin }) {
    const styles2 = {
        baseFont: {
            fontSize: fontFactor * wp(7),
            // lineHeight: fontFactor * wp(6.36),
        },
    };

    return (
        <View style={{ flex: 1, padding: margin, backgroundColor: '#161B26' }}>
            <MarginVertical size={2} />
            <Text
                style={[
                    styles.karla500Font,
                    styles2.baseFont,
                    styles.whiteText,
                    styles.textWidth,
                ]}
            >
                From Financial Management solutions, to Information Technology
                services, Management Training to Feasibility planning or
                Accounting Services; We execute every project brilliantly.
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    karla500Font: {
        fontFamily: 'Karla_400Regular',
    },
    whiteText: {
        color: '#fff',
    },
    textWidth: {
        width: '80%',
    },
});
