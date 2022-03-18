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
import PropTypes from 'prop-types';

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

    const styles2 = StyleSheet.create({
        fontStyle1: {
            fontSize: fontFactor * wp(3.75),
            lineHeight: fontFactor * wp(4.77),
        },
        animatedViewParent: {
            height: animatedViewHeight,
        },
        fontStyle2: {
            fontSize: fontFactor * wp(4),
            lineHeight: fontFactor * wp(5.09),
        },
        fontStyle3: {
            fontSize: fontFactor * wp(6),
            lineHeight: fontFactor * wp(7.7),
        },
    });

    return (
        <View>
            <Pressable
                onPress={Keyboard.dismiss}
                style={{
                    paddingHorizontal: margin,
                }}
            >
                <MarginVertical size={2} />
                <Text style={[styles.fontStyle2, styles2.fontStyle3]}>
                    {createAccount ? 'Create Account' : 'Sign In'}
                </Text>
                <MarginVertical size={0.3} />
                <Text style={[styles.fontStyle1, styles2.fontStyle2]}>
                    Share your thoughts with us today.
                </Text>
                <MarginVertical size={2} />
                <View style={styles2.animatedViewParent}>
                    <Animated.View
                        style={[
                            styles.animatedViewContainer,
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
                        <Text style={[styles.fontStyle1, styles2.fontStyle1]}>
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
                            styles.animatedViewContainer,
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

AuthTemplate.propTypes = {
    fontFactor: PropTypes.number,
    margin: PropTypes.number,
    createAccount: PropTypes.bool,
    toggleAuthView: PropTypes.func,
    authUserWithEmail: PropTypes.func,
    uid: PropTypes.string,
    authSuccessful: PropTypes.bool,
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

const styles = StyleSheet.create({
    animatedViewContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
    },
    fontStyle1: {
        fontFamily: 'Poppins_400Regular',
        color: '#808080',
    },
    fontStyle2: {
        fontFamily: 'Poppins_500Medium',
    },
});
