import React, { useRef } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import PropTypes from 'prop-types';

export default function ModalCloseIcon({
    closeModal,
    iconHeight,
    iconWidth,
    color,
}) {
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

    return (
        <Pressable
            style={[
                styles.modalCloseIcon,
                {
                    width: iconWidth,
                    height: iconHeight,
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
                <Icon name="x" color={color} size={0.4 * iconWidth} />
            </Animated.Text>
        </Pressable>
    );
}

ModalCloseIcon.propTypes = {
    closeModal: PropTypes.func,
    iconHeight: PropTypes.number,
    iconWidth: PropTypes.number,
    color: PropTypes.string,
};

const styles = StyleSheet.create({
    modalCloseIcon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
