import React from 'react';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import SliderCircle from './SliderCircle';
import MarginVertical from './MarginVertical';
import PropTypes from 'prop-types';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native';

export default function SlideIndicator({
    size,
    pageNo,
    drawerIconWidth,
    modalAwareAnimatedStyle,
}) {
    let index = -1;
    const styles = StyleSheet.create({
        container: {
            position: 'absolute',
            right: (drawerIconWidth - size) / 2, //centralizes indicator along drawer icon center
            top: 4 * wp(4.4) + (wp(10.81) - wp(8.5)) / 2, //header margin + (half of difference between header font size and header line height)
        },
    });

    return (
        <Animated.View
            style={[styles.container, modalAwareAnimatedStyle]}
            index={index++}
        >
            <SliderCircle size={size} pageNo={pageNo} index={index++} />
            <MarginVertical size={0.5} />
            <SliderCircle size={size} pageNo={pageNo} index={index++} />
            <MarginVertical size={0.5} />
            <SliderCircle size={size} pageNo={pageNo} index={index++} />
            <MarginVertical size={0.5} />
            <SliderCircle size={size} pageNo={pageNo} index={index++} />
            <MarginVertical size={0.5} />
            <SliderCircle size={size} pageNo={pageNo} index={index++} />
            <MarginVertical size={0.5} />
            <SliderCircle size={size} pageNo={pageNo} index={index++} />
            <MarginVertical size={0.5} />
            <SliderCircle size={size} pageNo={pageNo} index={index++} />
            <MarginVertical size={0.5} />
            <SliderCircle size={size} pageNo={pageNo} index={index++} />
        </Animated.View>
    );
}

SlideIndicator.propTypes = {
    size: PropTypes.number,
    drawerIconWidth: PropTypes.number,
    modalAwareAnimatedStyle: PropTypes.object,
    pageNo: PropTypes.object,
};
