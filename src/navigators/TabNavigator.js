import React from 'react';
import HomeScreen from '../screens/HomeScreen';
import AboutScreen from '../screens/AboutScreen';
import ContactScreen from '../screens/ContactScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ForumNavigator from './ForumNavigator';
import { connect } from 'react-redux';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HeaderBackground from '../components/HeaderBackground';
import HeaderLogo from '../components/HeaderLogo';
import MenuIcon from '../components/MenuIcon';
import PropTypes from 'prop-types';
import { Platform } from 'react-native';
import { Home, About, Services, Contact, ForumStack } from '../constants';
import TabBarIcon from '../components/TabBarIcon';

const Tab = createBottomTabNavigator();
const isAndroid = Platform.OS === 'android'; // add padding to app for android to prevent weird shift when keyboard up

const TabNavigator = ({ headerSize }) => {
    return (
        <Tab.Navigator
            initialRouteName={Home}
            backBehavior="none"
            screenOptions={({ route, navigation }) => {
                return {
                    tabBarHideOnKeyboard: isAndroid ? true : false,
                    headerBackground: HeaderBackground,
                    headerTitleAlign: 'left',
                    headerTitle: function headerTitle() {
                        return <HeaderLogo headerSize={headerSize} />;
                    },
                    headerTitleContainerStyle: { width: '100%' },
                    headerRight: function headerRight() {
                        return <MenuIcon headerSize={headerSize} navigation={navigation} />;
                    },
                    headerShadowVisible: true,
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#1A91D7',
                    tabBarInactiveTintColor: '#656566',
                    tabBarInactiveBackgroundColor: '#fff',
                    tabBarActiveBackgroundColor: '#fff',
                    tabBarIcon: (props) => (
                        <TabBarIcon {...props} name={route.name} />
                    ),
                };
            }}
        >
            <Tab.Screen name={Home} component={HomeScreen} />
            <Tab.Screen name={About} component={AboutScreen} />
            <Tab.Screen name={Services} component={ServicesScreen} />
            <Tab.Screen name={Contact} component={ContactScreen} />
            <Tab.Screen name={ForumStack} component={ForumNavigator} />
        </Tab.Navigator>
    );
};

TabNavigator.propTypes = {
    headerSize: PropTypes.number,
};

const mapStateToProps = ({ settingsState: { headerSize } }) => ({
    headerSize,
});

export default connect(mapStateToProps)(TabNavigator);
