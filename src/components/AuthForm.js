import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
    TouchableOpacity,
    Animated as Animated2,
    Easing,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import GoogleAuthContainer from './GoogleAuthContainer';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    interpolateColor,
} from 'react-native-reanimated';
import AuthSwitch from './AuthSwitch';
import PropTypes from 'prop-types';

const AuthForm = ({
    fontFactor,
    createAccount,
    authUserWithEmail,
    toggleAuthView,
    authSuccessful,
}) => {
    // const AnimatedMaterialCommunityIcon = Animated.createAnimatedComponent(
    //     MaterialCommunityIcon
    // ); //fails to update icon's animated color correctly
    const Animated2MaterialCommunityIcon = Animated2.createAnimatedComponent(
        MaterialCommunityIcon
    );

    const {
        control,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onChange',
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const [securePassword, setSecurePassword] = useState(true);
    const [keyboardActive, setKeyboardActive] = useState();
    const animatedEmailInput = useSharedValue(0);
    // const animatedPasswordInput = useSharedValue(0);
    const animatedSubmitButton = useSharedValue(1);
    const animated2PasswordInput = useRef(new Animated2.Value(0)).current;

    const animatedEmailInputStyle = useAnimatedStyle(() => ({
        borderColor: interpolateColor(
            animatedEmailInput.value,
            [0, 1],
            ['#000', '#1A91D7']
        ),
    }));
    // const animatedPasswordInputStyle = useAnimatedStyle(() => ({
    //     borderColor: interpolateColor(
    //         animatedPasswordInput.value,
    //         [0, 1],
    //         ['#000', '#1A91D7']
    //     ),
    // }));
    const animatedSubmitButtonStyle = useAnimatedStyle(() => ({
        transform: [
            {
                scale: withTiming(animatedSubmitButton.value, {
                    duration: 150,
                }),
            },
        ],
    }));
    // const animatedTogglePasswordStyle = useAnimatedStyle(() => ({
    //     color: interpolateColor(
    //         animatedPasswordInput.value,
    //         [0, 1],
    //         ['#000', '#1A91D7']
    //     ),
    // }));
    const animated2PasswordInputColor = animated2PasswordInput.interpolate({
        inputRange: [0, 1],
        outputRange: ['#000', '#1A91D7'],
        extrapolate: 'clamp',
    });

    const focusAnimatedValue = useCallback((animatedValue) => {
        'worklet';
        animatedValue.value = withTiming(1, { duration: 150 });
    }, []);
    const blurAnimatedValue = useCallback((animatedValue) => {
        'worklet';
        animatedValue.value = withTiming(0, { duration: 150 });
    }, []);

    const animateSubmitButtonIn = () => {
        'worklet';
        animatedSubmitButton.value = 0.9;
    };
    const animateSubmitButtonOut = () => {
        'worklet';
        animatedSubmitButton.value = 1;
    };
    const FOCUS = 'FOCUS';
    const BLUR = 'BLUR';
    const toggleAnimatedEmail = useCallback(
        (type) => {
            switch (type) {
                case FOCUS:
                    return focusAnimatedValue(animatedEmailInput);
                case BLUR:
                    return blurAnimatedValue(animatedEmailInput);
                default:
                    return;
            }
        },
        [animatedEmailInput, focusAnimatedValue, blurAnimatedValue]
    );
    // const toggleAnimatedPassword = useCallback(
    //     (type) => {
    //         switch (type) {
    //             case FOCUS:
    //                 return focusAnimatedValue(animatedPasswordInput);
    //             case BLUR:
    //                 return blurAnimatedValue(animatedPasswordInput);
    //             default:
    //                 return;
    //         }
    //     },
    //     [animatedPasswordInput, focusAnimatedValue, blurAnimatedValue]
    // );
    const toggleAnimated2Password = useCallback(
        (type) => {
            switch (type) {
                case FOCUS:
                    return (function () {
                        Animated2.timing(animated2PasswordInput, {
                            toValue: 1,
                            duration: 150,
                            useNativeDriver: false,
                            easing: Easing.inOut(Easing.quad),
                        }).start();
                    })();
                case BLUR:
                    return (function () {
                        Animated2.timing(animated2PasswordInput, {
                            toValue: 0,
                            duration: 150,
                            useNativeDriver: false,
                            easing: Easing.inOut(Easing.quad),
                        }).start();
                    })();

                default:
                    return;
            }
        },
        [animated2PasswordInput]
    );
    const toggleAuthViewWithFormReset = useCallback(() => {
        keyboardActive && Keyboard.dismiss();
        reset(null, {
            keepErrors: false,
            keepDirty: false,
            keepValues: false,
            keepDefaultValues: true,
            keepIsSubmitted: false,
            keepTouched: false,
            keepSubmitCount: false,
            keepIsValid: false,
        });
        console.log('called me oooo');
        toggleAuthView();
    }, [reset, toggleAuthView, keyboardActive]);
    const onSubmitFailed = useCallback(
        (errors) => {
            keyboardActive && Keyboard.dismiss();
            console.log('failed', errors);
        },
        [keyboardActive]
    );
    const submitButtonDisabled = !!Object.keys(errors).length;
    const onPressSubmitButton = handleSubmit((data) => {
        keyboardActive && Keyboard.dismiss();
        authUserWithEmail({ ...data, createAccount });
    }, onSubmitFailed);

    useEffect(() => {
        const eventArray = ['keyboardDidShow', 'keyboardDidHide'];
        eventArray.forEach((event) =>
            Keyboard.addListener(event, () =>
                setKeyboardActive(event === 'keyboardDidShow')
            )
        );
        return () => {
            eventArray.forEach((event) => Keyboard.removeAllListeners(event));
        };
    }, []);

    useEffect(() => {
        if (authSuccessful) {
            reset(null, {
                keepErrors: false,
                keepDirty: false,
                keepValues: false,
                keepDefaultValues: true,
                keepIsSubmitted: false,
                keepTouched: false,
                keepSubmitCount: false,
                keepIsValid: false,
            });
        }
    }, [authSuccessful, reset]);

    console.log(
        'submitButtonDisabled',
        submitButtonDisabled,
        !!Object.keys(errors).length,
        errors
    );

    return (
        <View>
            <Controller
                control={control}
                rules={{
                    required: true,
                    pattern:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                }}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                }) => {
                    return (
                        <View>
                            <Animated.View
                                style={[
                                    { borderWidth: wp(0.5) },
                                    animatedEmailInputStyle,
                                ]}
                            >
                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor="#808080"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onFocus={() => toggleAnimatedEmail(FOCUS)}
                                    onBlur={() => {
                                        onBlur();
                                        toggleAnimatedEmail(BLUR);
                                    }}
                                    onChangeText={onChange}
                                    value={value}
                                    style={[
                                        {
                                            padding: wp(4),
                                            fontSize: fontFactor * wp(4.5),
                                            lineHeight: fontFactor * wp(5.72),
                                            fontFamily: 'Poppins_400Regular',
                                            color: '#000000',
                                            flex: 1,
                                        },
                                    ]}
                                />
                            </Animated.View>

                            <MarginVertical size={0.3} />

                            {error && (
                                <Text
                                    style={{
                                        fontSize: fontFactor * wp(4),
                                        lineHeight: fontFactor * wp(5.08),
                                        fontFamily: 'Karla_400Regular',
                                        color: 'red',
                                    }}
                                >
                                    {error?.type === 'pattern'
                                        ? 'Incorrect format'
                                        : 'This is required'}
                                </Text>
                            )}
                            <MarginVertical size={0.3} />
                        </View>
                    );
                }}
                name="email"
            />
            <MarginVertical size={0.5} />
            <Controller
                control={control}
                rules={{
                    required: true,
                    minLength: 6,
                }}
                render={({
                    field: { onChange, onBlur, value },
                    fieldState: { error },
                }) => {
                    return (
                        <View>
                            <Animated2.View
                                style={[
                                    {
                                        borderWidth: wp(0.5),
                                        flexDirection: 'row',
                                        borderColor:
                                            animated2PasswordInputColor,
                                    },
                                    // animatedPasswordInputStyle,
                                ]}
                            >
                                <TextInput
                                    placeholder="Password"
                                    placeholderTextColor="#808080"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onFocus={() =>
                                        toggleAnimated2Password(FOCUS)
                                    }
                                    onBlur={() => {
                                        onBlur();
                                        toggleAnimated2Password(BLUR);
                                    }}
                                    secureTextEntry={securePassword}
                                    onChangeText={onChange}
                                    value={value}
                                    style={{
                                        padding: wp(4),
                                        fontSize: fontFactor * wp(4.5),
                                        lineHeight: fontFactor * wp(5.72),
                                        fontFamily: 'Poppins_400Regular',
                                        color: '#000000',
                                        flex: 1,
                                    }}
                                />
                                {!!value && (
                                    <TouchableWithoutFeedback
                                        onPress={() =>
                                            setSecurePassword(
                                                (oldState) => !oldState
                                            )
                                        }
                                    >
                                        <View
                                            style={{
                                                justifyContent: 'center',
                                                paddingHorizontal:
                                                    fontFactor * wp(2.86),
                                            }}
                                        >
                                            <Animated2MaterialCommunityIcon
                                                name={
                                                    securePassword
                                                        ? 'eye-outline'
                                                        : 'eye-off-outline'
                                                }
                                                size={fontFactor * wp(5.72)}
                                                style={{
                                                    color: animated2PasswordInputColor,
                                                }}
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                )}
                            </Animated2.View>
                            <MarginVertical size={0.3} />

                            {!error || error?.type === 'minLength' ? (
                                <Text
                                    style={{
                                        fontSize: fontFactor * wp(4),
                                        lineHeight: fontFactor * wp(5.08),
                                        fontFamily: 'Karla_400Regular',
                                        color:
                                            error?.type === 'minLength'
                                                ? 'red'
                                                : 'black',
                                    }}
                                >
                                    Minimum of six characters
                                </Text>
                            ) : (
                                <Text
                                    style={{
                                        fontSize: fontFactor * wp(4),
                                        lineHeight: fontFactor * wp(5.08),
                                        fontFamily: 'Karla_400Regular',
                                        color: 'red',
                                    }}
                                >
                                    This is required
                                </Text>
                            )}
                            <MarginVertical size={0.3} />
                        </View>
                    );
                }}
                name="password"
            />
            <MarginVertical />

            <TouchableWithoutFeedback
                disabled={submitButtonDisabled}
                onPressIn={animateSubmitButtonIn}
                onPressOut={animateSubmitButtonOut}
                onPress={onPressSubmitButton}
            >
                <Animated.View
                    style={[
                        {
                            backgroundColor: '#1A91D7',
                            paddingVertical: fontFactor * wp(4.8),
                            alignItems: 'center',
                            borderColor: '#1A91D7',
                        },
                        animatedSubmitButtonStyle,
                    ]}
                >
                    <Text
                        style={{
                            color: 'white',
                            fontFamily: 'Poppins_600SemiBold',
                            fontSize: fontFactor * wp(4.55),
                            lineHeight: fontFactor * wp(5.78),
                            opacity: submitButtonDisabled ? 0.7 : 1,
                        }}
                    >
                        {createAccount ? 'Sign Up' : 'Sign In'}
                    </Text>
                </Animated.View>
            </TouchableWithoutFeedback>
            <MarginVertical />
            <GoogleAuthContainer>
                {(onPress, disabled) => (
                    //factor Keyboard dismissal pon button press when flow re-implemeted
                    <TouchableOpacity onPress={onPress} disabled={disabled}>
                        <Text
                            style={{
                                fontSize: fontFactor * wp(3.75),
                                lineHeight: fontFactor * wp(4.77),
                                fontFamily: 'Poppins_600SemiBold',
                                color: '#1A91D7',
                            }}
                        >
                            {createAccount
                                ? 'Sign up with google instead'
                                : 'Sign in with google instead'}
                        </Text>
                    </TouchableOpacity>
                )}
            </GoogleAuthContainer>
            <MarginVertical size={2} />
            <AuthSwitch
                fontFactor={fontFactor}
                createAccount={createAccount}
                toggleAuthView={toggleAuthViewWithFormReset}
            />
        </View>
    );
};

AuthForm.propTypes = {
    fontFactor: PropTypes.number,
    createAccount: PropTypes.bool,
    authUserWithEmail: PropTypes.func,
    toggleAuthView: PropTypes.func,
    authSuccessful: PropTypes.bool,
};

export default AuthForm;

const styles = StyleSheet.create({});
