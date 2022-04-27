import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import PropTypes from 'prop-types';
import { Home, About, Services, Contact, ForumStack } from '../constants';

const TabBarIcon = ({ name, size, focused, color }) => {
    switch (name) {
        case Home:
            return (
                <EntypoIcon
                    name="home"
                    size={focused ? size * 1.2 : size}
                    color={color}
                />
            );
        case About:
            return (
                <FontAwesome5Icon
                    name="info-circle"
                    size={focused ? size * 1.2 : size}
                    color={color}
                />
            );
        case Services:
            return (
                <Ionicons
                    name="briefcase"
                    size={focused ? size * 1.2 : size}
                    color={color}
                />
            );
        case Contact:
            return (
                <EntypoIcon
                    name="old-phone"
                    size={focused ? size * 1.2 : size}
                    color={color}
                />
            );
        case ForumStack:
            return (
                <Ionicons
                    name="chatbubbles"
                    size={focused ? size * 1.2 : size}
                    color={color}
                />
            );
        default:
            return <></>;
    }
};

TabBarIcon.propTypes = {
    name: PropTypes.string,
    size: PropTypes.number,
    focused: PropTypes.bool,
    color: PropTypes.string,
};

export default TabBarIcon;
