import React from 'react';
import { View } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

function MarginVertical({ size, fontFactor }) {
    const styles = {
        container: {
            height: size * wp(4.4) * fontFactor,
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
const mapStateToProps = ({ settingsState: { fontFactor } }) => {
    return {
        fontFactor,
    };
};
export default connect(mapStateToProps)(MarginVertical);
