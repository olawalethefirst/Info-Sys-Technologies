import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import Services from '../components/Services';
import PropTypes from 'prop-types';

function ServicesScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Services />
        </SafeAreaView>
    );
}

ServicesScreen.propTypes = {
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    headerSize: PropTypes.number,
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161B26',
    },
});

export default ServicesScreen;
