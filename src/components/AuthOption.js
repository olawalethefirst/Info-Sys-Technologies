import React from 'react';
import {
    StyleSheet,
    View,
    TouchableWithoutFeedback,
    Animated,
} from 'react-native';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import EntypoIcon from 'react-native-vector-icons/Entypo';
import GoogleProvider from './GoogleProvider';
import PropTypes from 'prop-types';

const AnimatedEntypoIcon = Animated.createAnimatedComponent(EntypoIcon);
const AnimatedAntDesignIcon = Animated.createAnimatedComponent(AntDesignIcon);

const animatedGB = new Animated.Value(0);
const animatedEB = new Animated.Value(0);

const animatedGBBC = animatedGB.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f7f7f7', '#1A91D7'],
    extrapolate: 'clamp',
});
const animatedGBFC = animatedGB.interpolate({
    inputRange: [0, 1],
    outputRange: ['#1A91D7', '#f7f7f7'],
    extrapolate: 'clamp',
});
const animatedEBBC = animatedEB.interpolate({
    inputRange: [0, 1],
    outputRange: ['#f7f7f7', '#1A91D7'],
    extrapolate: 'clamp',
});
const animatedEBFC = animatedEB.interpolate({
    inputRange: [0, 1],
    outputRange: ['#1A91D7', '#f7f7f7'],
    extrapolate: 'clamp',
});

const onPressIn = (val) => () =>
    Animated.timing(val, {
        toValue: 1,
        duration: 50,
        useNativeDriver: false,
    }).start();
const onPressOut = (val) => () =>
    Animated.timing(val, {
        toValue: 0,
        duration: 50,
        useNativeDriver: false,
    }).start();

const Authoption = ({ fontFactor, animateView }) => {
    const styles2 = {
        buttonContainer: {
            width: fontFactor * wp(40),
            height: fontFactor * wp(40),
        },
        buttonText: {
            fontSize: fontFactor * wp(4),
            lineHeight: fontFactor * wp(5.09),
        },
    };

    return (
        <View style={{ flexDirection: 'row' }}>
            <GoogleProvider fontFactor={fontFactor}>
                {(onPress, disabled) => (
                    <TouchableWithoutFeedback
                        disabled={disabled}
                        onPress={onPress}
                        onPressIn={onPressIn(animatedGB)}
                        onPressOut={onPressOut(animatedGB)}
                    >
                        <Animated.View
                            style={[
                                styles.buttonContainer,
                                styles2.buttonContainer,
                                { backgroundColor: animatedGBBC },
                            ]}
                        >
                            <AnimatedAntDesignIcon
                                name={'google'}
                                size={fontFactor * wp(6)}
                                style={{ color: animatedGBFC }}
                            />
                            <MarginVertical size={0.5} />
                            <Animated.Text
                                style={[
                                    styles.buttonText,
                                    styles2.buttonText,
                                    { color: animatedGBFC },
                                ]}
                            >
                                Google
                            </Animated.Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                )}
            </GoogleProvider>
            <View style={{ width: wp(5) }} />
            <TouchableWithoutFeedback
                onPress={animateView}
                onPressIn={onPressIn(animatedEB)}
                onPressOut={onPressOut(animatedEB)}
            >
                <Animated.View
                    style={[
                        styles.buttonContainer,
                        styles2.buttonContainer,
                        { backgroundColor: animatedEBBC },
                    ]}
                >
                    <AnimatedEntypoIcon
                        name={'mail'}
                        size={fontFactor * wp(6)}
                        style={{ color: animatedEBFC }}
                    />
                    <MarginVertical size={0.5} />
                    <Animated.Text
                        style={[
                            styles.buttonText,
                            styles2.buttonText,
                            { color: animatedEBFC },
                        ]}
                    >
                        Email
                    </Animated.Text>
                </Animated.View>
            </TouchableWithoutFeedback>
        </View>
    );
};

Authoption.propTypes = {
    fontFactor: PropTypes.number,
    animateView: PropTypes.func,
};

export default Authoption;

const styles = StyleSheet.create({
    buttonContainer: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: '#1A91D7',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: 'Poppins_400Regular',
    },
});
