import React, { useState, useRef } from 'react';
import { StyleSheet, Pressable, Animated, Platform } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import ModalScreen from '../screens/ModalScreen';
import PropTypes from 'prop-types';

export default function MenuIcon({ width, height, fontFactor }) {
    const svgWidth = 0.4 * width;
    const [showModal, setShowModal] = useState(false);
    const animatedValue = useRef(new Animated.Value(1)).current;
    const onPressModalIconIn = () => {
        Animated.spring(animatedValue, {
            toValue: 1.2,
            useNativeDriver: true,
        }).start();
    };
    const onPressModalIconOut = () => {
        Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    const closeModal = () => {
        setShowModal(false);
    };
    const isWeb = Platform.OS === 'web';

    return (
        <Pressable
            style={[{ width: width, height: height }, styles.container]}
            onPress={() => setShowModal(!showModal)}
            onPressIn={onPressModalIconIn}
            onPressOut={onPressModalIconOut}
        >
            <Animated.View
                style={[
                    styles.animatedContainer,
                    {
                        transform: [{ scale: animatedValue }],
                    },
                ]}
            >
                {!isWeb && (
                    <ModalScreen
                        visible={showModal}
                        closeModal={closeModal}
                        iconWidth={width}
                        iconHeight={height}
                        fontFactor={fontFactor}
                    />
                )}
                <Svg
                    width={svgWidth}
                    viewBox="0 0 200 125"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={styles.icon}
                >
                    <Rect
                        x={25}
                        width={150}
                        height={15}
                        rx={5}
                        fill="#161B26"
                    />
                    <Rect
                        x={25}
                        y={110}
                        width={150}
                        height={15}
                        rx={5}
                        fill="#161B26"
                    />
                    <Rect
                        y={55}
                        width={200}
                        height={15}
                        rx={5}
                        fill="#161B26"
                    />
                </Svg>
            </Animated.View>
        </Pressable>
    );
}

MenuIcon.propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    fontFactor: PropTypes.number,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    animatedContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    icon: {
        aspectRatio: 200 / 125,
    },
});
