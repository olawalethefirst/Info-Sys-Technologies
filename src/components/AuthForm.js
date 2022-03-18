import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableWithoutFeedback,
    TouchableOpacity,
    Animated as Animated2,
    Easing,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
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
        toggleAuthView();
    }, [reset, toggleAuthView]);
    const onSubmitFailed = useCallback((errors) => {
        console.log('failed', errors);
    }, []);
    const submitButtonDisabled = !!Object.keys(errors).length;
    const onPressSubmitButton = handleSubmit((data) => {
        authUserWithEmail({ ...data, createAccount });
    }, onSubmitFailed);

    const styles2 = StyleSheet.create({
        authWithGoogleText: {
            fontSize: fontFactor * wp(3.75),
            lineHeight: fontFactor * wp(4.77),
        },
        buttonText: {
            fontSize: fontFactor * wp(4.55),
            lineHeight: fontFactor * wp(5.78),
            opacity: submitButtonDisabled ? 0.7 : 1,
        },
        buttonContainer: {
            paddingVertical: fontFactor * wp(4.8),
        },
        errorText: (error) => ({
            fontSize: fontFactor * wp(4),
            lineHeight: fontFactor * wp(5.08),
            color: error ? 'red' : 'black',
        }),
        toggleViewPassword: {
            height: fontFactor * wp(13.72),
            paddingHorizontal: wp(4),
        },
        inputText: {
            padding: fontFactor * wp(4),
            fontSize: fontFactor * wp(4.5),
            lineHeight: fontFactor * wp(5.72),
            height: fontFactor * wp(13.72),
        },
        passwordContainer: {
            borderWidth: wp(0.5),
            borderColor: animated2PasswordInputColor,
        },
        emailContainer: { borderWidth: wp(0.5) },
    });

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
                                    styles2.emailContainer,
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
                                        styles.inputText,
                                        styles2.inputText,
                                    ]}
                                />
                            </Animated.View>

                            <MarginVertical size={0.3} />

                            {error && (
                                <Text
                                    style={[
                                        styles.errorText,
                                        styles2.errorText(error),
                                    ]}
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
                    const isLengthError = error?.type === 'minLength';
                    return (
                        <View>
                            <Animated2.View
                                style={[
                                    styles2.passwordContainer,
                                    styles.passwordContainer,
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
                                    style={[
                                        styles.inputText,
                                        styles2.inputText,
                                    ]}
                                />
                                {!!value && (
                                    <TouchableOpacity
                                        style={[
                                            styles.toggleViewPassword,
                                            styles2.toggleViewPassword,
                                        ]}
                                        onPress={() =>
                                            setSecurePassword(
                                                (oldState) => !oldState
                                            )
                                        }
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
                                    </TouchableOpacity>
                                )}
                            </Animated2.View>
                            <MarginVertical size={0.3} />

                            <Text
                                style={[
                                    styles.errorText,
                                    styles2.errorText(error),
                                ]}
                            >
                                {!error || isLengthError
                                    ? 'Minimum of six characters'
                                    : 'This is required'}
                            </Text>

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
                        styles.buttonContainer,
                        styles2.buttonContainer,
                        animatedSubmitButtonStyle,
                    ]}
                >
                    <Text style={[styles.buttonText, styles2.buttonText]}>
                        {createAccount ? 'Sign Up' : 'Sign In'}
                    </Text>
                </Animated.View>
            </TouchableWithoutFeedback>
            <MarginVertical />

            {/* //factor Keyboard dismissal pon button press when flow re-implemeted */}
            <TouchableOpacity onPress={null} disabled={null}>
                <Text
                    style={[
                        styles.authWithGoogleText,
                        styles2.authWithGoogleText,
                    ]}
                >
                    {createAccount
                        ? 'Sign up with google instead'
                        : 'Sign in with google instead'}
                </Text>
            </TouchableOpacity>

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

const styles = StyleSheet.create({
    authWithGoogleText: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#1A91D7',
    },
    buttonText: {
        color: 'white',
        fontFamily: 'Poppins_600SemiBold',
    },
    buttonContainer: {
        backgroundColor: '#1A91D7',
        alignItems: 'center',
        borderColor: '#1A91D7',
    },
    errorText: {
        fontFamily: 'Karla_400Regular',
    },
    toggleViewPassword: {
        justifyContent: 'center',
    },
    inputText: { fontFamily: 'Poppins_400Regular', color: '#000000', flex: 1 },
    passwordContainer: {
        flexDirection: 'row',
    },
});
