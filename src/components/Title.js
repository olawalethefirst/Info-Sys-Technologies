import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

export default function Title({ fontFactor, title }) {
    const styles2 = StyleSheet.create({
        text: {
            fontSize: fontFactor * wp(4),
            lineHeight: fontFactor * wp(5.09),
        },
    });
    return <Text style={[styles.text, styles2.text]}>{title}</Text>;
}

Title.propTypes = {
    fontFactor: PropTypes.number,
    title: PropTypes.string,
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Poppins_400Regular',
        textAlign: 'left',
    },
});
