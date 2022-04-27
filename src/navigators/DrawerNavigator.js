import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DrawerScreen from '../screens/DrawerScreen';
import TabNavigator from './TabNavigator';

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
    return (
        <Drawer.Navigator
            useLegacyImplementation={true}
            initialRouteName={'TabStack'}
            screenOptions={{
                drawerPosition: 'right',
                headerShown: false,
            }}
            drawerContent={(props) => <DrawerScreen {...props} />}
        >
            <Drawer.Screen name={'TabStack'} component={TabNavigator} />
        </Drawer.Navigator>
    );
}

export default DrawerNavigation;
