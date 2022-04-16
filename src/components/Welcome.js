import React, { useCallback, useRef, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    Animated,
    TouchableWithoutFeedback,
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import PropTypes from 'prop-types';
import checkColumnMode from '../helperFunctions/checkColumnMode';

function Welcome({
    margin,
    bodyHeight,
    fontFactor,
    deviceWidthClass,
    scrollRef,
}) {
    const [offset, setOffset] = useState(0);
    const animatedValue = useRef(new Animated.Value(1)).current;
    const onPressIn = useCallback(() => {
        Animated.timing(animatedValue, {
            toValue: 0.9,
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
        scrollRef.current?.scrollToOffset({ offset, animated: true });
    }, [scrollRef, offset]);
    const columnMode = checkColumnMode(deviceWidthClass);

    return (
        <View
            style={[
                styles.container,
                {
                    minHeight: bodyHeight,
                },
            ]}
            onLayout={({
                nativeEvent: {
                    layout: { height },
                },
            }) => setOffset(height)}
        >
            <ImageBackground
                // eslint-disable-next-line no-undef
                source={require('../../assets/images/background.webp')}
                resizeMode="cover"
                resizeMethod="resize"
                style={[
                    { paddingHorizontal: margin },
                    styles.image,
                    columnMode && { flexDirection: 'row' },
                ]}
            >
                <View
                    style={[
                        styles.contentContainer1,
                        columnMode && styles.contentContainer1ColumnMode,
                    ]}
                >
                    <MarginVertical size={4} />
                    <Text
                        style={[
                            styles.heading,
                            {
                                fontSize: fontFactor * wp(11),
                                lineHeight: fontFactor * wp(14),
                            },
                        ]}
                    >
                        Maximizing productivity, one business at a time.
                    </Text>
                    <MarginVertical size={1} />
                    <Text
                        style={[
                            styles.paragraph,
                            {
                                fontSize: fontFactor * wp(5.5),
                                lineHeight: fontFactor * wp(7),
                            },
                        ]}
                    >
                        Aim, strive and succeed is our approach to problem
                        solving.
                    </Text>
                    <Text
                        style={[
                            styles.paragraph,
                            {
                                fontSize: fontFactor * wp(5.5),
                                lineHeight: fontFactor * wp(7),
                            },
                        ]}
                    >
                        We strive for nothing but the best.
                    </Text>
                    <MarginVertical size={2} />
                    <TouchableWithoutFeedback
                        onPress={onPress}
                        onPressIn={onPressIn}
                        onPressOut={onPressOut}
                    >
                        <Animated.View
                            style={[
                                styles.button,
                                {
                                    padding: fontFactor * wp(3.5),
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
                                Learn more
                            </Text>
                        </Animated.View>
                    </TouchableWithoutFeedback>
                    <MarginVertical size={4} />
                </View>
                <View
                    style={columnMode && styles.contentContainer2ColumnMode}
                ></View>
            </ImageBackground>
        </View>
    );
}

Welcome.propTypes = {
    margin: PropTypes.number,
    bodyHeight: PropTypes.number,
    fontFactor: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    scrollRef: PropTypes.object,
};

export default React.memo(Welcome);

const styles = StyleSheet.create({
    container: {
        margin: 0,
        padding: 0,
        backgroundColor: '#161B26',
    },
    image: {
        flex: 1,
        margin: 0,
        padding: 0,
    },
    heading: {
        fontFamily: 'Poppins_700Bold',
        color: '#fff',
    },
    paragraph: {
        fontFamily: 'Karla_500Medium',
        color: '#fff',
    },
    contentContainer1: {
        justifyContent: 'center',
        flex: 1,
    },
    contentContainer1ColumnMode: {
        flex: 6 / 10,
    },
    contentContainer2ColumnMode: {
        flex: 4 / 10,
    },
    button: {
        backgroundColor: '#1A91D7',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Poppins_600SemiBold',
    },
});
