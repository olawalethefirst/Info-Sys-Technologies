import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

function ModalActivityIndicator({ fontFactor }) {
    const styles2 = StyleSheet.create({
        container: {
            paddingVertical: fontFactor * wp(2.2),
            marginBottom: fontFactor * wp(2.2),
        },
        activityIndicator: {
            marginVertical: fontFactor * wp(0.61), //maintain similar lineHeight to fontSize ratio as texts
        },
    });

    return (
        <View style={styles2.container}>
            <ActivityIndicator
                size={fontFactor * wp(4.5)}
                color="#fff"
                style={styles2.activityIndicator}
            />
        </View>
    );
}

ModalActivityIndicator.propTypes = {
    fontFactor: PropTypes.number,
};

const mapStateToProps = ({ settingsState: { fontFactor } }) => ({ fontFactor });

export default connect(mapStateToProps)(ModalActivityIndicator);
