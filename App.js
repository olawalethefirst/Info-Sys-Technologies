import 'react-native-gesture-handler';
import React, { useEffect, useState, useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import loadAssetsAsync from './src/helperFunctions/loadAssetsAsync';
import * as SplashScreen from 'expo-splash-screen';
import updateDeviceWidthClass from './src/redux/actions/updateDeviceWidthClass';
import updateMargin from './src/redux/actions/updateMargin';
import updateBodyHeight from './src/redux/actions/updateBodyHeight';
import updateFontFactor from './src/redux/actions/updateFontFactor';
import updateHeaderSize from './src/redux/actions/updateHeaderSize';
import TabNavigator from './src/navigators/TabNavigator';
import { firebase } from './src/helperFunctions/initializeFirebase';
import updateUser from './src/redux/actions/updateUser';

function PreApp() {
    const [assetsLoaded, setAssetsLoaded] = useState(false);
    const [appIsReady, setAppIsReady] = useState(false);
    const dispatch = useDispatch();
    const { margin, headerSize, deviceWidthClass, bodyHeight, fontFactor } =
        useSelector((state) => {
            return {
                margin: state.settingsState.margin,
                headerSize: state.settingsState.headerSize,
                deviceWidthClass: state.settingsState.deviceWidthClass,
                bodyHeight: state.settingsState.bodyHeight,
                fontFactor: state.settingsState.fontFactor,
            };
        });
    const triggerSynchronousActions = useCallback(() => {
        dispatch(updateHeaderSize());
        dispatch(updateMargin());
        dispatch(updateDeviceWidthClass());
        dispatch(updateBodyHeight());
        dispatch(updateFontFactor());
    }, [dispatch]);

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await loadAssetsAsync();
                setAssetsLoaded(true);
            } catch (e) {
                console.log('assets loading failed');
                prepare();
            }
        }
        prepare();
    }, []);

    useEffect(() => {
        async function prepareSettingsState() {
            if (
                !margin ||
                !headerSize ||
                !deviceWidthClass ||
                !bodyHeight ||
                !fontFactor
            ) {
                console.log('triggered me');
                triggerSynchronousActions();
            }
        }
        prepareSettingsState();
    }, [
        triggerSynchronousActions,
        margin,
        headerSize,
        deviceWidthClass,
        bodyHeight,
        fontFactor,
    ]);

    useEffect(() => {
        if (
            margin &&
            headerSize &&
            deviceWidthClass &&
            bodyHeight &&
            fontFactor &&
            assetsLoaded
        ) {
            setAppIsReady(async () => {
                await SplashScreen.hideAsync();
                return true;
            });
        }
    }, [
        margin,
        headerSize,
        deviceWidthClass,
        bodyHeight,
        fontFactor,
        assetsLoaded,
    ]);

    // console.log(Platform.OS, margin,
    //     headerSize,
    //     deviceWidthClass,
    //     bodyHeight,
    //     fontFactor,
    //     assetsLoaded)

    useEffect(() => {
        const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
            dispatch(updateUser(user));
        });
        return unsubscribe;
    }, [dispatch]);

    if (!appIsReady) {
        return null;
    }

    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <SafeAreaProvider>
                    <PreApp />
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
}
