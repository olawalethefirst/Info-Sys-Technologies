import { StyleSheet, TouchableWithoutFeedback } from 'react-native';
import React, { useCallback } from 'react';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withTiming,
    interpolateColor,
} from 'react-native-reanimated';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

const ForumAuthButton = ({
    text,
    backgroundColor,
    activeBackgroundColor,
    textColor,
    activeTextColor,
    borderColor,
    onPress,
    fontFactor,
}) => {
    const styles2 = {
        buttonText: {
            fontSize: fontFactor * wp(4),
            lineHeight: fontFactor * wp(5.13),
        },
        button: {
            width: fontFactor * wp(20),
            height: fontFactor * wp(10),
            borderWidth: wp(0.2) * fontFactor,
            borderColor: borderColor,
        },
    };
    const animatedButton = useSharedValue(0);
    const onPressIn = useCallback(() => {
        'worklet';
        animatedButton.value = withTiming(1, { duration: 150 });
    }, [animatedButton]);
    const onPressOut = useCallback(() => {
        'worklet';
        animatedButton.value = withTiming(0, { duration: 150 });
    }, [animatedButton]);

    const animatedButonStyle = useAnimatedStyle(() => ({
        backgroundColor: interpolateColor(
            animatedButton.value,
            [0, 1],
            [backgroundColor, activeBackgroundColor]
        ),
    }));
    const animatedButtonTextStyle = useAnimatedStyle(() => ({
        color: interpolateColor(
            animatedButton.value,
            [0, 1],
            [textColor, activeTextColor]
        ),
    }));

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
        >
            <Animated.View
                style={[styles.button, styles2.button, animatedButonStyle]}
            >
                <Animated.Text
                    style={[
                        styles.buttonText,
                        styles2.buttonText,
                        animatedButtonTextStyle,
                    ]}
                >
                    {text}
                </Animated.Text>
            </Animated.View>
        </TouchableWithoutFeedback>
    );
};

const mapStateToProps = ({ settingsState: { fontFactor } }) => ({ fontFactor });

ForumAuthButton.propTypes = {
    text: PropTypes.string,
    backgroundColor: PropTypes.string,
    activeBackgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    activeTextColor: PropTypes.string,
    borderColor: PropTypes.string,
    onPress: PropTypes.func,
    fontFactor: PropTypes.number,
};

export default connect(mapStateToProps)(ForumAuthButton);

const styles = StyleSheet.create({
    buttonText: {
        fontFamily: 'Poppins_400Regular',
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
