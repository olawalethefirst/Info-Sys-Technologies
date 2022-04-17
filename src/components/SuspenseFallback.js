import { StyleSheet, ActivityIndicator } from 'react-native';
import React from 'react';

const SuspenseFallback = () => {
    return (
        <ActivityIndicator style={styles.margin} color="#fff" size={'small'} />
    );
};

export default SuspenseFallback;

const styles = StyleSheet.create({
    margin: {
        marginTop: 10,
    },
});
