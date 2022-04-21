import { StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

const SuspenseFallback = ({ color }) => {
    return (
        <ActivityIndicator style={styles.margin} color={color} size={'small'} />
    );
};

SuspenseFallback.defaultProps = {
    color: '#fff',
};

SuspenseFallback.propTypes = {
    color: PropTypes.string,
};

export default SuspenseFallback;

const styles = StyleSheet.create({
    margin: {
        marginTop: 10,
    },
});
