/* eslint-disable react/prop-types */
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Dimensions, View } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
// import { initializeFirebase } from '../redux/actions/firebaseActions';
import HeaderBar from '../components/HeaderBar';
import AboutScreen from '../screens/AboutScreen';
import { getHeaderTitle } from '@react-navigation/stack/node_modules/@react-navigation/elements';
import ContactScreen from '../screens/ContactScreen';
import ServicesScreen from '../screens/ServicesScreen';
import ForumNavigator from './ForumNavigator';
import { connect } from 'react-redux';
import NavigationScreen from '../screens/NavigationScreen';
import Constants from 'expo-constants';
import { getDefaultHeaderHeight } from '@react-navigation/elements';

const MainStack = createStackNavigator();

function MainNavigator({ headerSize }) {
    const { statusBarHeight } = Constants;

    const { height, width } = Dimensions.get('window');

    return (
        <View style={{ flex: 1 }}>
            <MainStack.Navigator
                initialRouteName="Home"
                screenOptions={{
                    // eslint-disable-next-line react/display-name
                    header: ({ route, options }) => {
                        const title = getHeaderTitle(options, route.name);
                        return <HeaderBar title={title} />;
                    },
                    // need to set a value
                    headerStyle: { height: headerSize },
                    headerMode: 'float',
                }}
            >
                <MainStack.Screen name="Home" component={HomeScreen} />
                <MainStack.Screen name="About" component={AboutScreen} />
                <MainStack.Screen name="Contact" component={ContactScreen} />
                <MainStack.Screen name="Services" component={ServicesScreen} />
                <MainStack.Screen
                    name="ForumStack"
                    component={ForumNavigator}
                />
                <MainStack.Screen
                    name="Navigation"
                    component={NavigationScreen}
                    options={{
                        presentation: 'transparentModal',
                        animation: 'fade',
                        headerStyle: {
                            height: getDefaultHeaderHeight(
                                { height, width },
                                true,
                                statusBarHeight
                            ),
                        },
                    }}
                />
            </MainStack.Navigator>
        </View>
    );
}
const mapStateToProps = ({ settingsState: { headerSize } }) => ({
    headerSize,
});

export default connect(mapStateToProps)(MainNavigator);
