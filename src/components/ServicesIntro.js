import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

function ServicesIntro({ fontFactor, contentContainerWidth }) {
    const styles2 = {
        baseFont: {
            fontSize: fontFactor * wp(5),
            lineHeight: fontFactor * wp(6.36),
        },
        heading: {
            fontSize: fontFactor * wp(8.5),
            lineHeight: fontFactor * wp(10.81),
        },
        contentContainer: {
            width: contentContainerWidth,
            alignSelf: 'center',
        },
    };

    return (
        <View style={[styles.container, { backgroundColor: '#161B26' }]}>
            <ImageBackground
                // eslint-disable-next-line no-undef
                source={require('../../assets/images/image8.png')}
                style={styles.container}
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
            </ImageBackground>
        </View>
    );
}

ServicesIntro.propTypes = {
    fontFactor: PropTypes.number,
    contentContainerWidth: PropTypes.number,
};

export default React.memo(ServicesIntro);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    karla400Font: {
        fontFamily: 'Karla_400Regular',
    },
    whiteText: {
        color: '#fff',
    },
    poppins600Font: {
        fontFamily: 'Poppins_600SemiBold',
    },
});
