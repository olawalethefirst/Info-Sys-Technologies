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
import Ionicons from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';

const Tab = createBottomTabNavigator();

const TabNavigator = ({ headerSize }) => {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            screenOptions={{
                headerBackground: HeaderBackground,
                headerTitleAlign: 'left',
                headerTitle: function headerTitle() {
                    return <HeaderLogo headerSize={headerSize} />;
                },
                headerTitleContainerStyle: { width: '100%' },
                headerRight: function headerRight() {
                    return <MenuIcon headerSize={headerSize} />;
                },
                headerShadowVisible: true,
                tabBarShowLabel: false,
                tabBarStyle: {
                    backgroundColor: '#fff',
                },
                tabBarActiveBackgroundColor: '#f7f7f7',
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: function tabBarIcon({ size, color, focused }) {
                        return (
                            <EntypoIcon
                                name="home"
                                size={focused ? size * 1.2 : size}
                                color={focused ? '#1A91D7' : color}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="About"
                component={AboutScreen}
                options={{
                    tabBarIcon: function tabBarIcon({ size, color, focused }) {
                        return (
                            <FontAwesome5Icon
                                name="info-circle"
                                size={focused ? size * 1.2 : size}
                                color={focused ? '#1A91D7' : color}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Services"
                component={ServicesScreen}
                options={{
                    tabBarIcon: function tabBarIcon({ size, color, focused }) {
                        return (
                            <Ionicons
                                name="briefcase"
                                size={focused ? size * 1.2 : size}
                                color={focused ? '#1A91D7' : color}
                            />
                        );
                    },
                }}
            />
            <Tab.Screen
                name="Contact"
                component={ContactScreen}
                options={{
                    tabBarIcon: function tabBarIcon({ size, color, focused }) {
                        return (
                            <EntypoIcon
                                name="old-phone"
                                size={focused ? size * 1.2 : size}
                                color={focused ? '#1A91D7' : color}
                            />
                        );
                    },
                }}
            />

            <Tab.Screen
                name="ForumStack"
                component={ForumNavigator}
                options={{
                    tabBarIcon: function tabBarIcon({ size, color, focused }) {
                        return (
                            <Ionicons
                                name="chatbubbles"
                                size={focused ? size * 1.2 : size}
                                color={focused ? '#1A91D7' : color}
                            />
                        );
                    },
                }}
            />
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
