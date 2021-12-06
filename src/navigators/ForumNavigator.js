import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ForumScreen from '../screens/ForumScreen';
import PostScreen from '../screens/PostScreen';

const forumStack = createStackNavigator();

export default function ForumNavigator() {
    return (
        <forumStack.Navigator
            screenOptions={{
                headerShown: false,
            }}
            initialRouteName="Forum"
        >
            <forumStack.Screen component={ForumScreen} name="Forum" />
            <forumStack.Screen component={PostScreen} name="Post" />
        </forumStack.Navigator>
    );
}
