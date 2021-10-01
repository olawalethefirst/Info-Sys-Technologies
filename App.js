import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { Provider, useDispatch, useSelector } from 'react-redux';
import MainNavigator from './src/components/MainNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import loadAssetsAsync from './src/helperFunctions/loadAssetsAsync';
import * as SplashScreen from 'expo-splash-screen';
import updateDeviceWidthClass from './src/redux/actions/updateDeviceWidthClass';
import updateMargin from './src/redux/actions/updateMargin';
import updateBodyHeight from './src/redux/actions/updateBodyHeight';
import updateFontFactor from './src/redux/actions/updateFontFactor';
import updateHeaderSize from './src/redux/actions/updateHeaderSize';

function PreApp() {
    const [appIsReady, setAppIsReady] = useState(false);
    const dispatch = useDispatch();
    const { margin, headerSize } = useSelector((state) => {
        return {
            margin: state.settingsState.margin,
            headerSize: state.settingsState.headerSize,
        };
    });
    const triggerSynchronousActions = () => {
        dispatch(updateHeaderSize());
        dispatch(updateMargin());
        dispatch(updateDeviceWidthClass());
        dispatch(updateBodyHeight());
        dispatch(updateFontFactor());
    };
    const updateAppState = new Promise((resolve) => {
        if (margin && headerSize) {
            resolve(true);
        }
    });

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                triggerSynchronousActions();
                await loadAssetsAsync();
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(async () => {
                    if (updateAppState == true) {
                        await SplashScreen.hideAsync();
                        return true;
                    }
                });
            }
        }
        prepare();
    }, [margin, headerSize]);

    if (!appIsReady) {
        return null;
    }

    return (
        <NavigationContainer>
            <MainNavigator />
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <SafeAreaProvider>
                    <PreApp />
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
}
