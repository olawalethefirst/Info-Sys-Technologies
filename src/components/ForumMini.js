/* eslint-disable no-undef*/
import React from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MarginVertical from './MarginVertical';
import { useFonts } from '@expo-google-fonts/poppins';
import Poppins_600SemiBold from '@expo-google-fonts/poppins/Poppins_600SemiBold.ttf';
import Karla_400Regular from '@expo-google-fonts/karla/Karla_400Regular.ttf';
import Karla_500Medium from '@expo-google-fonts/karla/Karla_500Medium.ttf';

import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import checkColumnMode from '../helperFunctions/checkColumnMode';

function ForumMini({ margin, fontFactor, deviceWidthClass, bodyHeight }) {
    const [loaded] = useFonts({
        Poppins_600SemiBold,
        Karla_400Regular,
        Karla_500Medium,
    });

    if (!loaded) {
        return <View />;
    }

    return (
        <View
            style={[
                styles.container,
                {
                    minHeight: bodyHeight,
                },
            ]}
        >
            <ImageBackground
                source={require('../../assets/images/background1.png')}
                resizeMode="cover"
                resizeMethod="resize"
                style={[
                    styles.imageContainer,
                    {
                        minHeight: bodyHeight / 2,
                        padding: margin,
                    },
                ]}
            >
                <MarginVertical size={1} />
                <Text
                    style={[
                        styles.imageHeading,
                        {
                            fontSize: fontFactor * wp(8.5),
                            lineHeight: fontFactor * wp(10.81),
                            maxWidth: wp(70),
                        },
                    ]}
                >
                    Do you like engaging in discussions?{' '}
                </Text>
                <MarginVertical size={1} />
                <Text
                    style={[
                        styles.imageParagraph,
                        {
                            fontSize: fontFactor * wp(5),
                            lineHeight: fontFactor * wp(5.9),
                            maxWidth: wp(80),
                        },
                    ]}
                >
                    Or you simply enjoy reading conversations between random
                    strangers on the internet?
                </Text>
                <MarginVertical size={2} />
            </ImageBackground>
            <View style={[styles.miniContainer, { paddingHorizontal: margin }]}>
                <View
                    style={[
                        styles.microContainer,
                        { padding: 10 / fontFactor },
                    ]}
                >
                    <Text
                        style={[
                            styles.microContent,
                            {
                                fontSize: fontFactor * wp(5),
                                lineHeight: fontFactor * wp(7),
                            },
                        ]}
                    >
                        You will enjoy conversations in areas like IT, Science,
                        History or Business, amongst others.
                    </Text>
                </View>
                <View style={{ flex: fontFactor * 0.02 }} />
                <View
                    style={[
                        styles.microContainer,
                        { padding: 15 / fontFactor },
                    ]}
                >
                    <Text
                        style={[
                            styles.microContent,
                            {
                                fontFamily: 'Poppins_600SemiBold',
                                fontSize: fontFactor * wp(6),
                                lineHeight: fontFactor * wp(7.6),
                            },
                        ]}
                    >
                        Join Us Today.
                    </Text>
                    <MarginVertical size={1} />
                    <TouchableOpacity
                        style={[
                            styles.button,
                            {
                                paddingVertical: fontFactor * wp(5),
                                paddingHorizontal: fontFactor * 2 * wp(5),
                            },
                        ]}
                    >
                        <Text
                            style={[
                                styles.buttonText,
                                {
                                    fontSize: fontFactor * wp(5),
                                    lineHeight: fontFactor * wp(6),
                                },
                            ]}
                        >
                            Join
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

ForumMini.propTypes = {
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    bodyHeight: PropTypes.number,
};

const styles = StyleSheet.create({
    container: {},
    imageContainer: {
        justifyContent: 'center',
    },

    imageHeading: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#fff',
    },
    imageParagraph: {
        fontFamily: 'Karla_400Regular',
        color: '#fff',
    },
    miniContainer: { flex: 1, flexDirection: 'row', top: -hp(4) },
    microContainer: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
    },
    microContent: {
        textAlign: 'center',
        fontFamily: 'Karla_500Medium',
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#1A91D7',
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Poppins_600SemiBold',
    },
});

const mapStateToProps = (state) => ({
    margin: state.settingsState.margin,
    fontFactor: state.settingsState.fontFactor,
    deviceWidthClass: state.settingsState.deviceWidthClass,
    bodyHeight: state.settingsState.bodyHeight,
});

export default connect(mapStateToProps)(ForumMini);
