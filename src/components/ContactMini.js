import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ContactSVG from './ContactSVG';
import MarginVertical from './MarginVertical';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Karla_400Regular from '@expo-google-fonts/karla/Karla_400Regular.ttf';

function ContactMini({ margin, fontFactor, deviceWidthClass, bodyHeight }) {
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
                    paddingHorizontal: margin,
                },
            ]}
        >
            <MarginVertical size={2} />

            <Text
                style={[
                    styles.heading,
                    {
                        fontSize: fontFactor * wp(9),
                        lineHeight: fontFactor * wp(11.5),
                    },
                ]}
            >
                Are you ready to get onboarded?
            </Text>
            <MarginVertical size={1.2} />
            <View style={{ height: bodyHeight / 2 }}>
                <ContactSVG />
            </View>
            <MarginVertical size={1.2} />
            <Text
                style={[
                    styles.paragraph,
                    {
                        fontSize: fontFactor * wp(4),
                        lineHeight: fontFactor * wp(5.1),
                    },
                ]}
            >
                Or do you simply need more information? {'\n'}
                <Text style={{ color: '#f8b526' }}>
                    Get in touch with us now.
                </Text>
            </Text>
            <MarginVertical size={0.5} />
            <TouchableOpacity
                style={[
                    styles.button,
                    {
                        paddingVertical: fontFactor * wp(4),
                        paddingHorizontal: fontFactor * 2 * wp(4),
                    },
                ]}
            >
                <Text
                    style={[
                        styles.buttonText,
                        {
                            fontSize: fontFactor * wp(4),
                            lineHeight: fontFactor * wp(5.1),
                        },
                    ]}
                >
                    Contact Us
                </Text>
            </TouchableOpacity>
            <MarginVertical size={2} />
        </View>
    );
}

ContactMini.propTypes = {
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    bodyHeight: PropTypes.number,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#161B26',
        justifyContent: 'center',
    },
    heading: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#fff',
        textAlign: 'center',
    },
    paragraph: {
        color: '#fff',
        fontFamily: 'Karla_400Regular',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#1A91D7',
        alignSelf: 'center',
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

export default connect(mapStateToProps)(ContactMini);
