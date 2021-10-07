import React, { useRef } from 'react';
import { StyleSheet, Pressable, Animated, Platform } from 'react-native';
import Constants from 'expo-constants';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';

export default function ModalCloseIcon({
    closeModal,
    iconHeight,
    iconWidth,
    notFullScreen,
}) {
    const { statusBarHeight } = Constants;
    const animatedValue = useRef(new Animated.Value(1)).current;
    const onPressIn = () => {
        Animated.spring(animatedValue, {
            toValue: 1.2,
            useNativeDriver: true,
        }).start();
    };
    const onPressOut = () => {
        Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };
    const styles2 = {
        modalCloseIcon: {
            top: notFullScreen
                ? 0
                : Platform.select({ ios: statusBarHeight, android: 0 }),
        },
    };

    return (
        <Pressable
            style={[
                styles.modalCloseIcon,
                styles2.modalCloseIcon,
                {
                    width: iconWidth,
                    height: iconHeight,
                    // borderColor: 'white',
                    // borderWidth: 2,
                },
            ]}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onPress={closeModal}
        >
            <Animated.Text
                style={{
                    transform: [{ scale: animatedValue }],
                }}
            >
                <Icon name="x" color="#fff" size={0.4 * iconWidth} />
            </Animated.Text>
        </Pressable>
    );
}

ModalCloseIcon.propTypes = {
    closeModal: PropTypes.func,
    iconHeight: PropTypes.number,
    iconWidth: PropTypes.number,
};

const styles = StyleSheet.create({
    modalCloseIcon: {
        position: 'absolute',
        right: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
