import React, { useCallback } from 'react';
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
    FadeOut,
    FadeIn,
} from 'react-native-reanimated';
import PropTypes from 'prop-types';

const Auth = ({ minHeight, deviceWidthClass, uid, fontFactor }) => {
    const {
        params: { viewAnimatedValue },
    } = useRoute();

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

    const columnMode = checkColumnMode(deviceWidthClass);

    const styles2 = StyleSheet.create({
        animatedView: {
            minHeight: minHeight,
            width: 2 * deviceWidth,
        },
        responsiveContainerParent: {
            width: deviceWidth,
        },
        responsiveContainer: {
            width: columnMode ? '90%' : '100%',
        },
        signedInText: {
            fontSize: fontFactor * wp(4.5),
            lineHeight: fontFactor * wp(5.72),
        },
        signedInContainer: {
            minHeight: minHeight,
        },
    });

    if (uid) {
        return (
            <Animated.View
                entering={FadeIn.delay(150).duration(150)} //failed text on expoGO
                style={[styles.signedInContainer, styles2.signedInContainer]}
            >
                <Text style={[styles2.signedInText, styles.signedInText]}>
                    User logged in
                </Text>
            </Animated.View>
        );
    }

    return (
        <Animated.View
            exiting={FadeOut.duration(150)} //feels hacky but fixes the unmounted unInspectable persistent child el
            style={[
                authAnimatedViewStyle,
                styles.animatedView,
                styles2.animatedView,
            ]}
        >
            <Animated.View
                exiting={FadeOut.duration(150)} //feels hacky but fixes the unmounted unInspectable persistent child el
                style={[
                    styles2.responsiveContainerParent,
                    styles.responsiveContainerParent,
                ]}
            >
                <View style={styles2.responsiveContainer}>
                    <AuthTemplate
                        createAccount
                        toggleAuthView={toggleAuthAnimatedView}
                    />
                </View>
            </Animated.View>
            <Animated.View
                exiting={FadeOut.duration(150)} //feels hacky but fixes the unmounted unInspectable persistent child el
                style={[
                    styles2.responsiveContainerParent,
                    styles.responsiveContainerParent,
                ]}
            >
                <View style={styles2.responsiveContainer}>
                    <AuthTemplate toggleAuthView={toggleAuthAnimatedView} />
                </View>
            </Animated.View>
        </Animated.View>
    );
};

Auth.propTypes = {
    minHeight: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    uid: PropTypes.string,
    fontFactor: PropTypes.number,
};

export default Auth;

const styles = StyleSheet.create({
    animatedView: { flexDirection: 'row' },
    signedInText: { textAlign: 'center', fontFamily: 'Poppins_400Regular' },
    signedInContainer: {
        justifyContent: 'center',
    },
    responsiveContainerParent: {
        alignContent: 'center',
    },
});
