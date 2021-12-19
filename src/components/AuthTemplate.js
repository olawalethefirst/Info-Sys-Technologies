import React, { useState, useRef } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Pressable,
    TouchableOpacity,
    Animated,
    TextInput,
    Dimensions,
    Keyboard,
} from 'react-native';
import MarginVertical from './MarginVertical';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useForm, Controller } from 'react-hook-form';
import AuthForm from './AuthForm';
import AuthSwitch from './AuthSwitch';
import AuthOption from './AuthOption';

const AuthTemplate = ({
    minHeight,
    fontFactor,
    margin,
    createAccount,
    toggleAuthView,
    headerSize,
}) => {
    const viewAnimatedNumber = useRef(new Animated.Value(0)).current;
    const selectOptionView = viewAnimatedNumber.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -Dimensions.get('window').height],
    });
    const formView = viewAnimatedNumber.interpolate({
        inputRange: [0, 1],
        outputRange: [Dimensions.get('window').height, 0],
    });
    const selectOptionViewOpacity = viewAnimatedNumber.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });
    const formViewOpacity = viewAnimatedNumber.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
    const animateView = () => {
        return Animated.timing(viewAnimatedNumber, {
            toValue: 1,
            duartion: 300,
            useNativeDriver: true,
        }).start();
    };
    const [authFormcontainerHeight, setAuthFormContainerHeight] = useState(0);
    const containerRef = useRef(null);

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
                        minHeight: authFormcontainerHeight,
                    }}
                >
                    <Animated.View
                        style={{
                            width: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            transform: [{ translateY: selectOptionView }],
                            opacity: selectOptionViewOpacity,
                        }}
                        onLayout={({
                            nativeEvent: {
                                layout: { height },
                            },
                        }) =>
                            height > authFormcontainerHeight
                                ? setAuthFormContainerHeight(height)
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
                            animateView={animateView}
                        />
                        <MarginVertical size={2} />
                        <AuthSwitch
                            fontFactor={fontFactor}
                            createAccount={createAccount}
                            toggleAuthView={toggleAuthView}
                        />
                    </Animated.View>

                    <Animated.View
                        style={{
                            width: '100%',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            transform: [{ translateY: formView }],
                            opacity: formViewOpacity,
                        }}
                        onLayout={({
                            nativeEvent: {
                                layout: { height },
                            },
                        }) =>
                            height > authFormcontainerHeight
                                ? setAuthFormContainerHeight(height)
                                : null
                        }
                    >
                        <AuthForm
                            fontFactor={fontFactor}
                            createAccount={createAccount}
                        />
                        <MarginVertical size={2} />
                        <AuthSwitch
                            fontFactor={fontFactor}
                            createAccount={createAccount}
                            toggleAuthView={toggleAuthView}
                        />
                    </Animated.View>
                </View>
            </Pressable>
        </View>
    );
};

const mapStateToProps = ({
    settingsState: { fontFactor, margin, headerSize },
}) => ({
    fontFactor,
    margin,
    headerSize,
});

export default connect(mapStateToProps)(AuthTemplate);

const styles = StyleSheet.create({});
