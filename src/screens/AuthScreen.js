import React, { useRef } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { connect } from 'react-redux';
import SubScreeenTemplate from '../components/SubScreenTemplate';
import Auth from '../components/Auth';
import Constants from 'expo-constants';

const AuthScreen = ({
    headerSize,
    margin,
    fontFactor,
    bodyHeight,
    deviceWidthClass,
    tabBarHeight,
}) => {
    const scrollRef = useRef(null);
    const { statusBarHeight } = Constants;
    const sectionComponents = [
        {
            data: (
                <Auth
                    minHeight={bodyHeight - tabBarHeight}
                    deviceWidthClass={deviceWidthClass}
                />
            ),
        },
    ];

    return (
        //Implement a user already logged in screen when user signed in
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: 'white' }}
            behavior={Platform.select({ ios: 'height', android: null })}
            keyboardVerticalOffset={Platform.select({
                ios: headerSize + statusBarHeight,
                android: null,
            })}
        >
            <SubScreeenTemplate
                margin={margin}
                fontFactor={fontFactor}
                headerSize={headerSize}
                heading={'Join Us'}
                sectionComponents={sectionComponents}
                scrollRef={scrollRef}
                deeplyNestedScreen
            />
        </KeyboardAvoidingView>
    );
};

const mapStateToProps = ({
    settingsState: {
        headerSize,
        margin,
        fontFactor,
        bodyHeight,
        deviceWidthClass,
        tabBarHeight,
    },
}) => {
    return {
        headerSize,
        margin,
        fontFactor,
        bodyHeight,
        deviceWidthClass,
        tabBarHeight,
    };
};

export default connect(mapStateToProps)(AuthScreen);

const styles = StyleSheet.create({});
