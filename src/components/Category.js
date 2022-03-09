import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

export default function Category({ fontFactor, category }) {
    const styles2 = StyleSheet.create({
        text: {
            fontSize: fontFactor * wp(4),
            lineHeight: fontFactor * wp(5.09),
        },
    });

    return <Text style={[styles.text, styles2.text]}>{category}</Text>;
}

Category.propTypes = {
    fontFactor: PropTypes.number,
    category: PropTypes.string,
};

const styles = StyleSheet.create({
    text: {
        fontFamily: 'Poppins_500Medium',
        textAlign: 'left',
    },
});
