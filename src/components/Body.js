import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

export default function Body({ fontFactor, body }) {
    const styles2 = StyleSheet.create({
        text: {
            fontSize: fontFactor * wp(4),
            lineHeight: fontFactor * wp(5.09),
        },
    });
    return <Text style={[styles.text, styles2.text]}>{body}</Text>;
}

Body.propTypes = {
    fontFactor: PropTypes.number,
    body: PropTypes.string,
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Poppins_400Regular',
        textAlign: 'left',
    },
});
