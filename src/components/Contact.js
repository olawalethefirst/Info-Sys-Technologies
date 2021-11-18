import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Platform } from 'react-native';
import Constants from 'expo-constants';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ModalSelector from 'react-native-modal-selector';
import ContactForm from '../components/ContactForm';
import PropTypes from 'prop-types';

function Contact({ bodyHeight, headerSize, margin, fontFactor }) {
    const { statusBarHeight } = Constants;
    const styles2 = {
        paragraph: {
            fontSize: fontFactor * wp(4.55),
            lineHeight: fontFactor * wp(5.78),
        },
        contactOption: {
            fontSize: fontFactor * wp(4.55),
            lineHeight: fontFactor * wp(5.78),
            color: '#fff',
            backgroundColor: '#1A91D7',
            textAlign: 'center',
            padding: fontFactor * wp(4.55),
        },
    };

    return (
        <View
            style={[
                styles.container,
                {
                    minHeight: bodyHeight - headerSize + statusBarHeight,
                    paddingHorizontal: margin,
                },
            ]}
        >
            <ContactForm
                fontFactor={fontFactor}
                // contactOption={contactOption}
            />
        </View>
    );
}

Contact.propTypes = {
    bodyHeight: PropTypes.number,
    headerSize: PropTypes.number,
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    allText: {
        color: '#fff',
        fontFamily: 'Poppins_500Medium',
    },
    contactOption: {
        fontFamily: 'Poppins_600SemiBold',
    },
});

export default React.memo(Contact);
