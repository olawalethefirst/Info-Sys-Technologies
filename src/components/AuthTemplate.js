import React, { useState, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    Dimensions,
    Keyboard,
} from 'react-native';
import MarginVertical from './MarginVertical';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AuthForm from './AuthForm';
import AuthSwitch from './AuthSwitch';
import AuthOption from './AuthOption';
import authUserWithEmail from '../redux/actions/authUserWithEmail';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    interpolate,
    withTiming,
} from 'react-native-reanimated';

const AuthTemplate = ({
    fontFactor,
    margin,
    createAccount,
    toggleAuthView,
    authUserWithEmail,
    uid,
    authSuccessful,
}) => {
    const [animatedViewHeight, setAnimatedViewHeight] = useState(0);
    const animatedView = useSharedValue(0);
    const deviceHeight = Dimensions.get('window').height;
    const animatedView1Style = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: withTiming(
                    interpolate(
                        animatedView.value,
                        [0, 1],
                        [0, deviceHeight],
                        'clamp'
                    )
                ),
            },
        ],
        opacity: withTiming(
            interpolate(animatedView.value, [0, 1], [1, 0], 'clamp')
        ),
    }));
    const animatedView2Style = useAnimatedStyle(() => ({
        transform: [
            {
                translateY: withTiming(
                    interpolate(
                        animatedView.value,
                        [0, 1],
                        [deviceHeight, 0],
                        'clamp'
                    )
                ),
            },
        ],
        opacity: withTiming(
            interpolate(animatedView.value, [0, 1], [0, 1], 'clamp')
        ),
    }));
    const toggleanimatedView = useCallback(() => {
        'worklet';
        animatedView.value = animatedView.value === 0 ? 1 : 0;
    }, [animatedView]);

    return (
        <View>
            <Pressable
                onPress={Keyboard.dismiss}
                style={{
                    paddingHorizontal: margin,
                }}
            >
                <MarginVertical size={2} />
                <Text
                    style={{
                        fontSize: fontFactor * wp(6),
                        lineHeight: fontFactor * wp(7.7),
                        fontFamily: 'Poppins_500Medium',
                    }}
                >
                    {createAccount ? 'Create Account' : 'Sign In'}
                </Text>
                <MarginVertical size={0.3} />
                <Text
                    style={{
                        fontSize: fontFactor * wp(4),
                        lineHeight: fontFactor * wp(5.09),
                        fontFamily: 'Poppins_400Regular',
                        color: '#808080',
                    }}
                >
                    Share your thoughts with us today.
                </Text>
                <MarginVertical size={2} />
                <View
                    style={{
                        height: animatedViewHeight,
                    }}
                >
                    <Animated.View
                        style={[
                            {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                            },
                            animatedView1Style,
                        ]}
                        onLayout={({
                            nativeEvent: {
                                layout: { height },
                            },
                        }) =>
                            height > animatedViewHeight
                                ? setAnimatedViewHeight(height)
                                : null
                        }
                    >
                        <Text
                            style={{
                                fontSize: fontFactor * wp(3.75),
                                lineHeight: fontFactor * wp(4.77),
                                fontFamily: 'Poppins_400Regular',
                                color: '#808080',
                            }}
                        >
                            Continue with...
                        </Text>
                        <MarginVertical size={0.3} />
                        <AuthOption
                            fontFactor={fontFactor}
                            animateView={toggleanimatedView}
                            uid={uid}
                        />
                        <MarginVertical size={2} />
                        <AuthSwitch
                            fontFactor={fontFactor}
                            createAccount={createAccount}
                            toggleAuthView={toggleAuthView}
                        />
                    </Animated.View>

                    <Animated.View
                        style={[
                            {
                                width: '100%',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                            },
                            animatedView2Style,
                        ]}
                        onLayout={({
                            nativeEvent: {
                                layout: { height },
                            },
                        }) =>
                            height > animatedViewHeight
                                ? setAnimatedViewHeight(height)
                                : null
                        }
                    >
                        <AuthForm
                            fontFactor={fontFactor}
                            createAccount={createAccount}
                            authUserWithEmail={authUserWithEmail}
                            toggleAuthView={toggleAuthView}
                            authSuccessful={authSuccessful}
                        />
                    </Animated.View>
                </View>
            </Pressable>
        </View>
    );
};

const mapStateToProps = ({
    settingsState: { fontFactor, margin },
    forumTempState: { uid, authSuccessful },
}) => ({
    fontFactor,
    margin,
    uid,
    authSuccessful,
});

export default connect(mapStateToProps, { authUserWithEmail })(AuthTemplate);

const styles = StyleSheet.create({});
