import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

export default function Likes({ fontFactor }) {
    const styles2 = StyleSheet.create({
        text: {
            fontSize: fontFactor * wp(3.75),
            lineHeight: fontFactor * wp(4.77),
        },
    });

    return <Text style={[styles.text, styles2.text]}>0 likes</Text>;
}

Likes.propTypes = {
    fontFactor: PropTypes.number,
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Poppins_400Regular',
        color: '#808080',
        textAlign: 'left',
    },
});
