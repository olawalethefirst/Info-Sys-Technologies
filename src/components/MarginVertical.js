import React from 'react';
import { View } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

export default function MarginVertical({ size }) {
    const styles = {
        container: {
            height: size * hp(2.5),
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
