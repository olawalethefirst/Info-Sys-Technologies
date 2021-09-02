import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ContactScreen from '../screens/ContactScreen';
import ForumScreen from '../screens/ForumScreen';
import { initializeFirebase } from '../redux/actions/firebaseActions';
import { connect } from 'react-redux';
import { StyleSheet } from 'react-native';
import { useEffect } from 'react';
import LandingScreen from '../screens/LandingScreen';

const Tab = createMaterialBottomTabNavigator();
function TabBar({ initializeFirebase, firebaseLoaded }) {
    useEffect(() => {
        initializeFirebase();
    }, []);

    if (!firebaseLoaded) {
        return <LandingScreen />;
    }

    return (
        <Tab.Navigator
            style={styles.container}
            initialRouteName="Home"
            barStyle={{
                backgroundColor: '#1A91D7',
                elevation: 0,
                padding: 20,
            }}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Services" component={ServicesScreen} />
            <Tab.Screen name="Contact" component={ContactScreen} />
            <Tab.Screen name="Forum" component={ForumScreen} />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    container: { backgroundColor: '#F7F7F7' },
});

const mapStateToProps = (state) => ({
    firebaseLoaded: state.settingsState.firebaseLoaded,
});

export default connect(mapStateToProps, { initializeFirebase })(TabBar);
