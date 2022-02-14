import React from 'react';
import { View, Platform, ScrollView } from 'react-native';
import PropTypes from 'prop-types';

const KeyboardViewContainer = ({ children }) => {
    if (Platform.OS === 'android') {
        return (
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="never"
            >
                {children}
            </ScrollView>
        );
    }
    return <View style={{ flex: 1 }}>{children}</View>;
};

export default KeyboardViewContainer;

KeyboardViewContainer.propTypes = {
    children: PropTypes.object,
};
