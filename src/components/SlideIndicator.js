import React from 'react';
import { StyleSheet, Animated } from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SliderCircle from './SliderCircle';
import MarginVertical from './MarginVertical';

export default function SlideIndicator({
    size,
    menuIconWidth,
    activeSlide,
    animatedValue,
}) {
    return (
        <Animated.View
            style={{
                position: 'absolute',
                right: (menuIconWidth - size) / 2,
                top: hp(10) + (wp(10.81) - wp(8.5)) / 2,
                opacity: animatedValue,
            }}
        >
            <SliderCircle size={size} active={activeSlide == 0} />
            <MarginVertical size={0.5} />
            <SliderCircle size={size} active={activeSlide == 1} />
            <MarginVertical size={0.5} />
            <SliderCircle size={size} active={activeSlide == 2} />
            <MarginVertical size={0.5} />
            <SliderCircle size={size} active={activeSlide == 3} />
            <MarginVertical size={0.5} />
            <SliderCircle size={size} active={activeSlide == 4} />
            <MarginVertical size={0.5} />
            <SliderCircle size={size} active={activeSlide == 5} />
            <MarginVertical size={0.5} />
            <SliderCircle size={size} active={activeSlide == 6} />
            <MarginVertical size={0.5} />
            <SliderCircle size={size} active={activeSlide == 7} />
        </Animated.View>
    );
}

const styles = StyleSheet.create({});
