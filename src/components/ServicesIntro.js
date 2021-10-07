import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Animated,
    Dimensions,
} from 'react-native';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import DancingDownArrow from './DancingDownArrow';

function ServicesIntro({
    fontFactor,
    arrowWidth,
    menuIconWidth,
    contentContainerWidth,
}) {
    const styles2 = {
        baseFont: {
            fontSize: fontFactor * wp(5),
            lineHeight: fontFactor * wp(6.36),
        },
        heading: {
            fontSize: fontFactor * wp(8.5),
            lineHeight: fontFactor * wp(10.81),
        },
        iconContainer: {
            position: 'absolute',
            width: arrowWidth,
            height: (arrowWidth * 125) / 42,
            right: (menuIconWidth - arrowWidth) / 2,
            bottom: wp(4),
            opacity: 0.8,
        },
        contentContainer: {
            width: contentContainerWidth,
            alignSelf: 'center',
        },
    };

    return (
        <View style={{ flex: 1, backgroundColor: '#161B26' }}>
            <ImageBackground
                source={require('../../assets/images/image8.png')}
                style={{ flex: 1 }}
                resizeMode="cover"
            >
                <View style={[styles2.contentContainer]}>
                    <MarginVertical size={4} />
                    <Text
                        style={[
                            styles.poppins600Font,
                            styles.whiteText,
                            styles2.heading,
                        ]}
                    >
                        Services
                    </Text>
                    <MarginVertical />
                    <Text
                        style={[
                            styles.karla400Font,
                            styles2.baseFont,
                            styles.whiteText,
                        ]}
                    >
                        From proffering innovative solutions to implementing
                        unique structures, Investigating problems to Planning
                        your businesses, or other forms of services we render;
                        We execute every project brilliantly.
                    </Text>
                    <MarginVertical size={2} />
                </View>
                {/* <DancingDownArrow
                    arrowWidth={arrowWidth}
                    menuIconWidth={menuIconWidth}
                /> */}
            </ImageBackground>
        </View>
    );
}

export default React.memo(ServicesIntro);

const styles = StyleSheet.create({
    karla400Font: {
        fontFamily: 'Karla_400Regular',
    },
    whiteText: {
        color: '#fff',
    },
    textWidth: {
        width: '80%',
    },
    poppins600Font: {
        fontFamily: 'Poppins_600SemiBold',
    },
});
