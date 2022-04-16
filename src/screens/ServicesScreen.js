import React, { Suspense, lazy } from 'react';
import { StyleSheet, SafeAreaView, ActivityIndicator } from 'react-native';
import PropTypes from 'prop-types';
const Services = lazy(() => import('../components/Services'));
// import Services from '../components/Services'

function ServicesScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <Suspense fallback={<ActivityIndicator />}>
                <Services />
            </Suspense>
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
