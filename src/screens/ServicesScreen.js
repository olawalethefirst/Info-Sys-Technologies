import React, { useRef, useCallback, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import SubScreenTemplate from '../components/SubScreenTemplate';
import Footer from '../components/Footer';
import Services from '../components/Services';
import PropTypes from 'prop-types';
import { CommonActions } from '@react-navigation/native';

function ServicesScreen({
    margin,
    fontFactor,
    headerSize,
    navigation,
}) {
    
    return (
        <SafeAreaView style={styles.container}>
            <Services
                    headerSize={headerSize}
                    margin={margin}
                    fontFactor={fontFactor}
                />
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

const mapStateToProps = (state) => ({
    margin: state.settingsState.margin,
    fontFactor: state.settingsState.fontFactor,
    headerSize: state.settingsState.headerSize,
});

export default connect(mapStateToProps)(
    ServicesScreen
);
