/* eslint-disable react/prop-types */
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
// import { initializeFirebase } from '../redux/actions/firebaseActions';
import { connect } from 'react-redux';
import HeaderBar from './HeaderBar';
import updateHeaderSize from '../redux/actions/updateHeaderSize';
import updateMargin from '../redux/actions/updateMargin';
import LandingScreen from '../screens/LandingScreen';
import updateAssetsStatus from '../redux/actions/updateAssetsStatus';
import updateDeviceWidthClass from '../redux/actions/updateDeviceWidthClass';
import updateBodyHeight from '../redux/actions/updateBodyHeight';
import PropTypes from 'prop-types';
import updateFontFactor from '../redux/actions/updateFontFactor';
import AboutScreen from '../screens/AboutScreen';
import { getHeaderTitle } from '@react-navigation/stack/node_modules/@react-navigation/elements';
import ContactScreen from '../screens/ContactScreen';

const mainStack = createStackNavigator();

function MainNavigator({
    headerSize,
    margin,
    updateMargin,
    updateHeaderSize,
    assetsLoaded,
    updateAssetsStatus,
    updateDeviceWidthClass,
    deviceWidthClass,
    updateBodyHeight,
    fontFactor,
    updateFontFactor,
}) {
    useEffect(() => {
        updateHeaderSize();
        updateMargin();
        updateAssetsStatus();
        updateDeviceWidthClass();
        updateBodyHeight();
        updateFontFactor();
    }, []);

    //To-Do: Disable rerendering on change of height and width - treat each component independently

    if (!headerSize || !margin || !assetsLoaded) {
        return <LandingScreen />;
    }

    return (
        <mainStack.Navigator
            initialRouteName="Contact"
            screenOptions={{
                // eslint-disable-next-line react/display-name
                header: ({ route, options }) => {
                    const title = getHeaderTitle(options, route.name);
                    return <HeaderBar title={title} />;
                },
            }}
        >
            <mainStack.Screen name="Home" component={HomeScreen} />
            <mainStack.Screen name="About" component={AboutScreen} />
            <mainStack.Screen name="Contact" component={ContactScreen} />
        </mainStack.Navigator>
    );
}

MainNavigator.propTypes = {
    headerSize: PropTypes.number,
    margin: PropTypes.number,
    updateMargin: PropTypes.func,
    updateHeaderSize: PropTypes.func,
    assetsLoaded: PropTypes.bool,
    updateAssetsStatus: PropTypes.func,
    updateDeviceWidthClass: PropTypes.func,
    deviceWidthClass: PropTypes.string,
    updateBodyHeight: PropTypes.func,
    fontFactor: PropTypes.number,
    updateFontFactor: PropTypes.func,
};

const mapStateToProps = (state) => ({
    headerSize: state.settingsState.headerSize,
    margin: state.settingsState.margin,
    assetsLoaded: state.settingsState.assetsLoaded,
    deviceWidthClass: state.settingsState.deviceWidthClass,
    fontFactor: state.settingsState.fontFactor,
});

export default connect(mapStateToProps, {
    updateHeaderSize,
    updateMargin,
    updateAssetsStatus,
    updateDeviceWidthClass,
    updateBodyHeight,
    updateFontFactor,
})(MainNavigator);
