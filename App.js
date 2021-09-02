import 'react-native-gesture-handler';
import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './src/redux/store';
import { Provider } from 'react-redux';
import TabBar from './src/components/TabBar';
import LandingScreen from './src/screens/LandingScreen';
import MainNavigator from './src/components/MainNavigator';

export default function App() {
    return (
        <Provider store={store}>
            <PersistGate loading={<LandingScreen />} persistor={persistor}>
                <NavigationContainer>
                    <MainNavigator />
                </NavigationContainer>
            </PersistGate>
        </Provider>
    );
}
