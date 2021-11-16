import React from 'react';
import { View, Platform, ScrollView } from 'react-native';

const KeyboardViewContainer = ({ children }) => {
    return Platform.select({
        ios: <View style={{ flex: 1 }}>{children}</View>,
        android: (
            <ScrollView
                showsVerticalScrollIndicator={false}
                keyboardDismissMode="on-drag"
            >
                {children}
            </ScrollView>
        ),
    });
};

export default KeyboardViewContainer;
