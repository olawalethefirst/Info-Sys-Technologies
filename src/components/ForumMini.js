/* eslint-disable no-undef*/
import React, { useCallback, useRef } from 'react';
import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    Animated,
    View,
} from 'react-native';
import PropTypes from 'prop-types';
import MarginVertical from './MarginVertical';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { ForumStack } from '../constants';

function ForumMini({ margin, fontFactor, bodyHeight, navigate }) {
    const animatedValue = useRef(new Animated.Value(1)).current;
    const onPressIn = useCallback(() => {
        Animated.timing(animatedValue, {
            toValue: 1.1,
            useNativeDriver: true,
            duration: 150,
        }).start();
    }, [animatedValue]);
    const onPressOut = useCallback(() => {
        Animated.timing(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
            duration: 150,
        }).start();
    }, [animatedValue]);
    const onPress = useCallback(() => {
        navigate(ForumStack);
    }, [navigate]);

    return (
        <View style={[styles.container]}>
            <ImageBackground
                source={require('../../assets/images/background1.webp')}
                resizeMode="cover"
                resizeMethod="resize"
                style={[
                    styles.imageContainer,
                    {
                        minHeight: bodyHeight / 2,
                        paddingHorizontal: margin,
                    },
                ]}
            >
                <MarginVertical size={4} />
                <Text
                    style={[
                        styles.imageHeading,
                        {
                            fontSize: fontFactor * wp(9),
                            lineHeight: fontFactor * wp(11.45),
                            maxWidth: wp(70),
                        },
                    ]}
                >
                    Do you like engaging in discussions?{' '}
                </Text>
                <MarginVertical size={2} />
                <Text
                    style={[
                        styles.imageParagraph,
                        {
                            fontSize: fontFactor * wp(5),
                            lineHeight: fontFactor * wp(5.9),
                            maxWidth: wp(80),
                        },
                    ]}
                >
                    Or you simply enjoy reading conversations between random
                    strangers on the internet?
                </Text>
                <MarginVertical size={4} />
            </ImageBackground>
            <View
                style={[
                    styles.miniContainer,
                    { paddingHorizontal: margin, top: -wp(8) * fontFactor },
                ]}
            >
                <View
                    style={[
                        styles.microContainer,
                        { paddingHorizontal: 10 / fontFactor },
                    ]}
                >
                    <MarginVertical size={4} />

                    <Text
                        style={[
                            styles.microContent,
                            {
                                fontSize: fontFactor * wp(5),
                                lineHeight: fontFactor * wp(7),
                            },
                        ]}
                    >
                        You will enjoy conversations in areas like IT, Science,
                        History or Business, amongst others.
                    </Text>
                    <MarginVertical size={4} />
                </View>
                <View style={{ flex: fontFactor * 0.02 }} />
                <View
                    style={[
                        styles.microContainer,
                        { padding: 15 / fontFactor },
                    ]}
                >
                    <Text
                        style={[
                            styles.microContent,
                            {
                                fontFamily: 'Poppins_600SemiBold',
                                fontSize: fontFactor * wp(6),
                                lineHeight: fontFactor * wp(7.6),
                            },
                        ]}
                    >
                        Join Us Today.
                    </Text>
                    <MarginVertical size={1} />
                    <TouchableWithoutFeedback
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                        onPress={onPress}
                    >
                        <Animated.View
                            style={[
                                styles.button,
                                {
                                    paddingVertical: fontFactor * wp(3.5),
                                    paddingHorizontal: 2 * fontFactor * wp(3.5),
                                    transform: [{ scale: animatedValue }],
                                },
                            ]}
                        >
                            <Text
                                style={[
                                    styles.buttonText,
                                    {
                                        fontSize: fontFactor * wp(3.85),
                                    },
                                ]}
                            >
                                Join
                            </Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
            <MarginVertical size={4} />
        </View>
    );
}

ForumMini.propTypes = {
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    bodyHeight: PropTypes.number,
    navigate: PropTypes.func,
};

export default React.memo(ForumMini);

const styles = StyleSheet.create({
    container: {},
    imageContainer: {
        justifyContent: 'center',
    },

    imageHeading: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#fff',
    },
    imageParagraph: {
        fontFamily: 'Karla_400Regular',
        color: '#fff',
    },
    miniContainer: { flex: 1, flexDirection: 'row' },
    microContainer: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        justifyContent: 'center',
    },
    microContent: {
        textAlign: 'center',
        fontFamily: 'Karla_500Medium',
    },
    button: {
        alignSelf: 'center',
        backgroundColor: '#1A91D7',
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Poppins_600SemiBold',
    },
});
