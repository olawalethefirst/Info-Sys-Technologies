import React, { useRef, useState, useCallback } from 'react';
import { StyleSheet, View, Dimensions, Text } from 'react-native';
import AuthTemplate from './AuthTemplate';
import checkColumnMode from '../helperFunctions/checkColumnMode';
import { useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Animated, {
    useSharedValue,
    interpolate,
    withTiming,
    useAnimatedStyle,
} from 'react-native-reanimated';

const Auth = ({ minHeight, deviceWidthClass, uid, fontFactor }) => {
    const {
        params: { viewAnimatedValue },
    } = useRoute();
    const columnMode = checkColumnMode(deviceWidthClass);
    const authAnimatedView = useSharedValue(
        viewAnimatedValue ? viewAnimatedValue : 0 //if passed down, use value, else use 0 as default
    );
    const deviceWidth = Dimensions.get('window').width;
    const authAnimatedViewStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: withTiming(
                    interpolate(
                        authAnimatedView.value,
                        [0, 1],
                        [0, -deviceWidth],
                        'clamp'
                    )
                ),
            },
        ],
    }));
    const toggleAuthAnimatedView = useCallback(() => {
        'worklet';
        authAnimatedView.value = authAnimatedView.value === 0 ? 1 : 0;
    }, [authAnimatedView]);

    if (uid) {
        return (
            <View
                style={{
                    minHeight: minHeight,
                    justifyContent: 'center',
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        fontSize: fontFactor * wp(4.5),
                        lineHeight: fontFactor * wp(5.72),
                        fontFamily: 'Poppins_400Regular',
                    }}
                >
                    User logged in
                </Text>
            </View>
        );
    }

    return (
        <Animated.View
            style={[
                {
                    flexDirection: 'row',
                    minHeight: minHeight,
                },
                authAnimatedViewStyle,
            ]}
        >
            <View
                style={{
                    width: '100%',
                    alignContent: 'center',
                }}
            >
                <View style={{ width: columnMode ? '90%' : '100%' }}>
                    <AuthTemplate
                        createAccount
                        toggleAuthView={toggleAuthAnimatedView}
                    />
                </View>
            </View>
            <View
                style={{
                    width: '100%',
                    alignContent: 'center',
                }}
            >
                <View style={{ width: columnMode ? '90%' : '100%' }}>
                    <AuthTemplate toggleAuthView={toggleAuthAnimatedView} />
                </View>
            </View>
        </Animated.View>
    );
};

export default Auth;

const styles = StyleSheet.create({});
