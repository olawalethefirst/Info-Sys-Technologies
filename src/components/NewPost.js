import React, { useRef } from 'react';
import { StyleSheet, Pressable, Animated } from 'react-native';
import Icon from 'react-native-vector-icons/Foundation';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';

const NewPost = ({ margin, headerSize, fontFactor }) => {
    const animatedValue = useRef(new Animated.Value(1)).current;
    const onPressIn = () => {
        Animated.timing(animatedValue, {
            toValue: 0.85,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    return (
        <Pressable
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            style={{
                position: 'absolute',
                right: margin,
                bottom: headerSize * 1.25,
                zIndex: 1000,
            }}
        >
            <Animated.View
                style={[
                    styles.container,
                    {
                        width: wp(20) * fontFactor,
                        height: wp(20) * fontFactor,
                        borderRadius: wp(10),
                        transform: [{ scale: animatedValue }],
                        elevation: wp(1) * fontFactor,
                        shadowOffset: {
                            width: wp(0.5) * fontFactor,
                            height: wp(0.5) * fontFactor,
                        },
                        shadowRadius: wp(0.5) * fontFactor,
                    },
                ]}
            >
                <Icon
                    name="plus"
                    style={{
                        fontSize: fontFactor * wp(6),
                        lineHeight: fontFactor * wp(7.7),
                        color: '#fff',
                    }}
                />
            </Animated.View>
        </Pressable>
    );
};

NewPost.propTypes = {
    margin: PropTypes.number,
    headerSize: PropTypes.number,
    fontFactor: PropTypes.number,
};

export default NewPost;

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#1A91D7',
        backgroundColor: '#1A91D7',
        shadowColor: 'black',
        shadowOpacity: 0.3,
    },
});
