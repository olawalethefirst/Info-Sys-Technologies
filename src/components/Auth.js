import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    Animated,
    View,
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    TextInput,
} from 'react-native';
import AuthTemplate from './AuthTemplate';
import checkColumnMode from '../helperFunctions/checkColumnMode';
import { useRoute } from '@react-navigation/native';

const Auth = ({ minHeight, deviceWidthClass }) => {
    const {
        params: { viewAnimatedValue },
    } = useRoute();
    const viewAnimatedNumber = useRef(
        new Animated.Value(viewAnimatedValue)
    ).current;
    const newUserView = viewAnimatedNumber.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -Dimensions.get('window').width],
    });
    const existingUserView = viewAnimatedNumber.interpolate({
        inputRange: [0, 1],
        outputRange: [Dimensions.get('window').width, 0],
    });
    const newUserViewOpacity = viewAnimatedNumber.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
    });
    const existingUserViewOpacity = viewAnimatedNumber.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
    });
    const animateViewToExistingUser = () => {
        console.log('called');
        return Animated.timing(viewAnimatedNumber, {
            toValue: 1,
            duartion: 300,
            useNativeDriver: true,
        }).start();
    };
    const animateViewToNewUser = () => {
        console.log('called');
        return Animated.timing(viewAnimatedNumber, {
            toValue: 0,
            duartion: 300,
            useNativeDriver: true,
        }).start();
    };
    const [containerHeight, setContainerHeight] = useState(minHeight);
    const columnMode = checkColumnMode(deviceWidthClass);
    console.log(viewAnimatedValue);

    return (
        <View
            style={{
                minHeight: containerHeight,
                alignContent: 'center',
            }}
        >
            <View style={{ width: columnMode ? '90%' : '100%' }}>
                <Animated.View
                    style={{
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        transform: [{ translateX: existingUserView }],
                        opacity: existingUserViewOpacity,
                    }}
                    onLayout={({
                        nativeEvent: {
                            layout: { height },
                        },
                    }) =>
                        height > containerHeight
                            ? setContainerHeight(height)
                            : null
                    }
                >
                    <AuthTemplate
                        minHeight={minHeight}
                        toggleAuthView={animateViewToNewUser}
                    />
                </Animated.View>
                <Animated.View
                    style={{
                        width: '100%',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        transform: [{ translateX: newUserView }],
                        opacity: newUserViewOpacity,
                    }}
                    onLayout={({
                        nativeEvent: {
                            layout: { height },
                        },
                    }) =>
                        height > containerHeight
                            ? setContainerHeight(height)
                            : null
                    }
                >
                    <AuthTemplate
                        minHeight={minHeight}
                        createAccount
                        toggleAuthView={animateViewToExistingUser}
                    />
                </Animated.View>
            </View>
        </View>
    );
};

export default Auth;

const styles = StyleSheet.create({});
