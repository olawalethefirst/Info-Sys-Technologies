import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

export default function Created({ fontFactor, createdAt }) {
    const styles2 = StyleSheet.create({
        text: {
            fontSize: fontFactor * wp(3.75),
            lineHeight: fontFactor * wp(4.77),
        },
    });
    return <Text style={[styles.text, styles2.text]}>{createdAt}</Text>;
}

Created.propTypes = {
    fontFactor: PropTypes.number,
    createdAt: PropTypes.string,
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Poppins_400Regular',
        color: '#808080',
        textAlign: 'left',
    },
});
