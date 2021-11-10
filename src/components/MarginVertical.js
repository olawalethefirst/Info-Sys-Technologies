import React from 'react';
import { View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

export default function MarginVertical({ size }) {
    const styles = {
        container: {
            height: size * wp(4.4),
        },
    };

    return <View style={styles.container} />;
}

MarginVertical.propTypes = {
    size: PropTypes.number,
};

MarginVertical.defaultProps = {
    size: 1,
};
