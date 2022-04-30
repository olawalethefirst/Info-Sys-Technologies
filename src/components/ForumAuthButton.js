import { StyleSheet, TouchableWithoutFeedback, Animated } from 'react-native';
import React, { useRef } from 'react';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

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
    const animatedB = useRef(new Animated.Value(0)).current;
    const animatedBBC = animatedB.interpolate({
        inputRange: [0, 1],
        outputRange: [backgroundColor, activeBackgroundColor],
        extrapolate: 'clamp',
    });
    const animatedBFC = animatedB.interpolate({
        inputRange: [0, 1],
        outputRange: [textColor, activeTextColor],
        extrapolate: 'clamp',
    });

    const styles2 = {
        buttonText: {
            fontSize: fontFactor * wp(4),
            lineHeight: fontFactor * wp(5.13),
            color: animatedBFC,
        },
        button: {
            width: fontFactor * wp(25),
            height: fontFactor * wp(12.5),
            borderWidth: wp(0.2) * fontFactor,
            borderColor: borderColor,
            backgroundColor: animatedBBC,
        },
    };

    return (
        <TouchableWithoutFeedback
            onPress={onPress}
            onPressIn={onPressIn(animatedB)}
            onPressOut={onPressOut(animatedB)}
        >
            <Animated.View style={[styles.button, styles2.button]}>
                <Animated.Text style={[styles.buttonText, styles2.buttonText]}>
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
