import React, { useRef } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';
import Svg, { Rect } from 'react-native-svg';
import PropTypes from 'prop-types';

export default function MenuIcon({ headerSize, navigation }) {
    const svgWidth = 0.5 * headerSize;
    const animatedValue = useRef(new Animated.Value(1)).current;
    const onPressModalIconIn = () => {
        Animated.spring(animatedValue, {
            toValue: 0.8,
            useNativeDriver: true,
        }).start();
    };
    const onPressModalIconOut = () => {
        Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Pressable
            style={styles.container}
            onPress={() => navigation.getParent().openDrawer()}
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
                <Svg
                    width={svgWidth}
                    viewBox="0 0 200 130"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={styles.icon}
                >
                    <Rect
                        x={25}
                        width={150}
                        height={12}
                        rx={5}
                        fill="#161B26"
                    />
                    <Rect
                        x={25}
                        y={110}
                        width={150}
                        height={12}
                        rx={5}
                        fill="#161B26"
                    />
                    <Rect
                        y={55}
                        width={200}
                        height={12}
                        rx={5}
                        fill="#161B26"
                    />
                </Svg>
            </Animated.View>
        </Pressable>
    );
}

MenuIcon.propTypes = {
    headerSize: PropTypes.number,
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        aspectRatio: 1.1,
    },
    animatedContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    icon: {
        aspectRatio: 1,
    },
});
