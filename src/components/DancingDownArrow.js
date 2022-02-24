import React, { useEffect } from 'react';
import { StyleSheet, Pressable } from 'react-native';
import DownArrowIcon from './DownArrowIcon';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import Animated, {
    useAnimatedStyle,
    withTiming,
    withRepeat,
    useSharedValue,
} from 'react-native-reanimated';

export default function DancingDownArrow({
    arrowWidth,
    scrollToNextPage,
    pageNo,
    headerSize,
    drawerIconWidth,
    modalAwareAnimatedStyle,
}) {
    const animatedArrowValue = useSharedValue(0);
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    const animatedArrowStyle = useAnimatedStyle(() => ({
        opacity: withTiming(Math.round(pageNo.value) != 7 + 0),
        transform: [{ translateY: animatedArrowValue.value }],
    }));
    const styles2 = {
        iconContainer: {
            width: arrowWidth,
            height: (arrowWidth * 125) / 42, //maintaining arrowImage aspectRatio
        },
        button: {
            height: (arrowWidth * 125) / 42 + headerSize / 3, //covering complete arrow position during animation
            bottom: headerSize / 2,
            right: 0,
            width: drawerIconWidth * 1.1,
            alignItems: 'center',
        },
    };
    const loopAnimation = withRepeat(withTiming(headerSize / 3), -1, true);
    const initiateAnimation = () => {
        animatedArrowValue.value = loopAnimation;
    };
    const stopAnimation = () => {
        animatedArrowValue.value = withTiming(0, { duration: 50 });
    };
    const reInitiateAnimation = () => {
        console.log(animatedArrowValue.value);
        animatedArrowValue.value = loopAnimation;
    };

    useEffect(() => {
        initiateAnimation();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <AnimatedPressable
            onPress={scrollToNextPage}
            onPressIn={stopAnimation}
            onPressOut={reInitiateAnimation}
            hitSlop={wp(4)}
            style={[styles.button, styles2.button, modalAwareAnimatedStyle]}
        >
            <Animated.View style={[styles2.iconContainer, animatedArrowStyle]}>
                <DownArrowIcon />
            </Animated.View>
        </AnimatedPressable>
    );
}

DancingDownArrow.propTypes = {
    arrowWidth: PropTypes.number,
    scrollToNextPage: PropTypes.func,
    pageNo: PropTypes.object,
    headerSize: PropTypes.number,
    drawerIconWidth: PropTypes.number,
    modalAwareAnimatedStyle: PropTypes.object,
};

const styles = StyleSheet.create({
    button: {
        position: 'absolute',
    },
});
