/* eslint-disable no-undef*/
import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import MarginVertical from './MarginVertical';
import { useFonts } from '@expo-google-fonts/poppins';
import Poppins_600SemiBold from '@expo-google-fonts/poppins/Poppins_600SemiBold.ttf';
import Karla_400Regular from '@expo-google-fonts/karla/Karla_400Regular.ttf';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

function ForumMini({ margin, fontFactor, deviceWidthClass, bodyHeight }) {
    const [loaded] = useFonts({
        Poppins_600SemiBold,
        Karla_400Regular,
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
                            fontSize: fontFactor * wp(9.2),
                            lineHeight: fontFactor * wp(11.7),
                        },
                    ]}
                >
                    Do you like engaging{'\n'}in discussions?{' '}
                </Text>
                <MarginVertical size={1} />
                <Text
                    style={[
                        styles.imageParagraph,
                        {
                            fontSize: fontFactor * wp(6),
                            lineHeight: fontFactor * wp(7.6),
                        },
                    ]}
                >
                    Or you simply enjoy reading conversations between random
                    strangers on the internet?
                </Text>
                <MarginVertical size={1} />
            </ImageBackground>
            <View style={[styles.miniContainer, { paddingHorizontal: margin }]}>
                <Text>
                    You can start or respond to conversations in areas such as
                    Information Technology, Science, History,{' '}
                </Text>
                <Text>yes? then Join our Forum Today, </Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {},
    imageContainer: {
        justifyContent: 'center',
    },
    miniContainer: { flex: 1 },
    imageHeading: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#fff',
    },
    imageParagraph: {
        fontFamily: 'Karla_400Regular',
        color: '#fff',
    },
});

ForumMini.propTypes = {
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    bodyHeight: PropTypes.number,
};

const mapStateToProps = (state) => ({
    margin: state.settingsState.margin,
    fontFactor: state.settingsState.fontFactor,
    deviceWidthClass: state.settingsState.deviceWidthClass,
    bodyHeight: state.settingsState.bodyHeight,
});

export default connect(mapStateToProps)(ForumMini);
