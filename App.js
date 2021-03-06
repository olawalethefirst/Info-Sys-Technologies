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
import updateAuthState from './src/redux/actions/updateAuthState';
import { LogBox } from 'react-native';
LogBox.ignoreLogs([
    'AsyncStorage has been extracted from react-native core and will be removed in a future release. ',
    '[2022-',
    'Setting a timer for a long period of time, i.e.',
]);
import DrawerNavigator from './src/navigators/DrawerNavigator';

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
        const prep = () => {
            if (
                margin &&
                headerSize &&
                deviceWidthClass &&
                bodyHeight &&
                fontFactor &&
                assetsLoaded
            ) {
                dispatch(updateAuthState());
                setAppIsReady(async () => {
                    await SplashScreen.hideAsync();
                    return true;
                });
            }
        };
        prep();
    }, [
        margin,
        headerSize,
        deviceWidthClass,
        bodyHeight,
        fontFactor,
        assetsLoaded,
        dispatch,
    ]);
    
    if (!appIsReady) {
        return null;
    }

    return (
        <NavigationContainer>
            <DrawerNavigator />
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
