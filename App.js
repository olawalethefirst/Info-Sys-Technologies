import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { Provider } from 'react-redux';
import MainNavigator from './src/components/MainNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import loadAssetsAsync from './src/helperFunctions/loadAssetsAsync';
import * as SplashScreen from 'expo-splash-screen';

export default function App() {
    const [appIsReady, setAppIsReady] = useState(false);

    useEffect(() => {
        async function prepare() {
            try {
                await SplashScreen.preventAutoHideAsync();
                await loadAssetsAsync();
            } catch (e) {
                console.warn(e);
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, []);

    if (!appIsReady) {
        return null;
    }

    return (
        <Provider store={store}>
            <PersistGate persistor={persistor}>
                <SafeAreaProvider>
                    <NavigationContainer>
                        <MainNavigator />
                    </NavigationContainer>
                </SafeAreaProvider>
            </PersistGate>
        </Provider>
    );
}
