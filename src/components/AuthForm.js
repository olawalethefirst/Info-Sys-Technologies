import React, { useState, useRef, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { useForm, Controller, useWatch } from 'react-hook-form';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import GoogleAuthContainer from './GoogleAuthContainer';
import signUpWithEmailAsync from '../helperFunctions/signUpWithEmailAsync';
import AuthContainer from './AuthContainer';

const AuthForm = ({ fontFactor, createAccount }) => {
    const {
        control,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        mode: 'onBlur',
        reValidateMode: 'onBlur',
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const [securePassword, setSecurePassword] = useState(true);
    const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
    const AnimatedMaterialCommunityIcon = Animated.createAnimatedComponent(
        MaterialCommunityIcon
    );
    const AnimatedTouchableOpacity =
        Animated.createAnimatedComponent(TouchableOpacity);
    const emailAnimatedValue = useRef(new Animated.Value(0)).current;
    const emailBorder = emailAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['#808080', '#1A91D7'],
    });
    const passwordAnimatedValue = useRef(new Animated.Value(0)).current;
    const passwordBorder = passwordAnimatedValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['#808080', '#1A91D7'],
    });
    const onFocusInput = (animatedValue) => {
        return animatedValue.setValue(1);
    };
    const onBlurInput = (animatedValue) => {
        return animatedValue.setValue(0);
    };
    const authButtonAnimatedValue = useRef(new Animated.Value(1)).current;
    const onPressInButton = (animatedValue) => {
        return Animated.timing(animatedValue, {
            toValue: 0.9,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };
    const onPressOutButton = (animatedValue) => {
        return Animated.timing(animatedValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };
    const email = watch('email');
    const password = watch('password');

    const onSubmitFailed = (errors) => {
        console.log('failed', errors);
    };

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
                                style={{
                                    borderWidth: wp(0.5),
                                    borderColor: emailBorder,
                                }}
                            >
                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor="#808080"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onFocus={() => {
                                        onFocusInput(emailAnimatedValue);
                                    }}
                                    onBlur={() => {
                                        onBlurInput(emailAnimatedValue);
                                        onBlur();
                                    }}
                                    onChangeText={onChange}
                                    value={value}
                                    style={{
                                        // borderWidth: wp(0.5),
                                        // borderColor: emailBorder,
                                        padding: wp(4),
                                        fontSize: fontFactor * wp(4.5),
                                        lineHeight: fontFactor * wp(5.72),
                                        fontFamily: 'Poppins_400Regular',
                                        color: '#000000',
                                        flex: 1,
                                    }}
                                />
                            </Animated.View>
                            <MarginVertical size={0.3} />

                            <Text
                                style={{
                                    opacity: error ? 1 : 0,
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
                            <MarginVertical size={0.3} />
                        </View>
                    );
                }}
                name="email"
            />
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
                            <Animated.View
                                style={{
                                    borderWidth: wp(0.5),
                                    borderColor: passwordBorder,
                                    flexDirection: 'row',
                                }}
                            >
                                <TextInput
                                    placeholder="Password"
                                    placeholderTextColor="#808080"
                                    autoCorrect={false}
                                    autoCapitalize="none"
                                    onFocus={() => {
                                        onFocusInput(passwordAnimatedValue);
                                    }}
                                    onBlur={() => {
                                        onBlurInput(passwordAnimatedValue);
                                        onBlur();
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
                                    <TouchableOpacity
                                        onPress={() =>
                                            setSecurePassword(
                                                (oldState) => !oldState
                                            )
                                        }
                                        style={{
                                            justifyContent: 'center',
                                            paddingHorizontal:
                                                fontFactor * wp(2.86),
                                        }}
                                    >
                                        <AnimatedMaterialCommunityIcon
                                            name={
                                                securePassword
                                                    ? 'eye-outline'
                                                    : 'eye-off-outline'
                                            }
                                            size={fontFactor * wp(5.72)}
                                            style={{
                                                color: passwordBorder,
                                            }}
                                        />
                                    </TouchableOpacity>
                                )}
                            </Animated.View>
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
            <AuthContainer
                createAccount={createAccount}
                email={email}
                password={password}
            >
                {(onPress) => (
                    <AnimatedTouchableOpacity
                        activeOpacity={1}
                        disabled={!!Object.keys(errors).length}
                        onPressIn={() => {
                            onPressInButton(authButtonAnimatedValue);
                        }}
                        onPressOut={() =>
                            onPressOutButton(authButtonAnimatedValue)
                        }
                        onPress={handleSubmit(onPress, onSubmitFailed)}
                        style={{
                            backgroundColor: '#1A91D7',
                            padding: fontFactor * wp(4.55),
                            // width: wp(40),
                            alignItems: 'center',
                            borderColor: '#1A91D7',
                            borderWidth: wp(0.25),
                            transform: [
                                {
                                    scale: authButtonAnimatedValue,
                                },
                            ],
                        }}
                    >
                        <Text
                            style={{
                                color: 'white',
                                fontFamily: 'Poppins_600SemiBold',
                                fontSize: fontFactor * wp(4.55),
                                lineHeight: fontFactor * wp(5.78),
                            }}
                        >
                            {createAccount ? 'Sign Up' : 'Sign In'}
                        </Text>
                    </AnimatedTouchableOpacity>
                )}
            </AuthContainer>
            <MarginVertical />
            <GoogleAuthContainer>
                {(onPress, disabled) => (
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
        </View>
    );
};

export default AuthForm;

const styles = StyleSheet.create({});
