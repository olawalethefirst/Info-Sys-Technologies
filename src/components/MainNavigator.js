import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
// import { initializeFirebase } from '../redux/actions/firebaseActions';
import { connect } from 'react-redux';
import { useWindowDimensions } from 'react-native';
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
    const { height, width } = useWindowDimensions();

    // console.log('deviceWidthClass', deviceWidthClass);
    // console.log('fontFactor', fontFactor);

    useEffect(() => {
        updateHeaderSize();
        updateMargin();
        updateAssetsStatus();
        updateDeviceWidthClass(width);
        updateBodyHeight();
        updateFontFactor(width);
    }, [height, width]);

    //To-Do: Disable rerendering on change of height and width - treat each component independently

    if (!headerSize || !margin) {
        return <LandingScreen />;
    }

    return (
        <mainStack.Navigator
            initialRouteName="Home"
            screenOptions={{
                header: () => <HeaderBar />,
            }}
        >
            <mainStack.Screen name="Home" component={HomeScreen} />
            <mainStack.Screen name="About" component={AboutScreen} />
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
