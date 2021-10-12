/* eslint-disable react/prop-types */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
// import { initializeFirebase } from '../redux/actions/firebaseActions';
import HeaderBar from './HeaderBar';
import AboutScreen from '../screens/AboutScreen';
import { getHeaderTitle } from '@react-navigation/stack/node_modules/@react-navigation/elements';
import ContactScreen from '../screens/ContactScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ForumScreen from '../screens/ForumScreen';

const mainStack = createStackNavigator();

export default function MainNavigator() {
    return (
        <mainStack.Navigator
            initialRouteName="Home"
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
            <mainStack.Screen name="Services" component={ServicesScreen} />
            <mainStack.Screen name="Forum" component={ForumScreen} />
        </mainStack.Navigator>
    );
}
