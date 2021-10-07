import React, { useEffect, useRef } from 'react';
import {
    StyleSheet,
    Text,
    Pressable,
    View,
    Animated,
    Easing,
} from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import RightArrowIcon from './RightArrowIcon';

export default function ServiceTemplate({
    columnMode,
    children,
    serviceTitle,
    fontFactor,
    serviceBody,
}) {
    const AnimatedPressable = Animated.createAnimatedComponent(Pressable);
    const animatedValue = useRef(new Animated.Value(0)).current;
    const animatedValue1 = useRef(new Animated.Value(1)).current;
    const animatedValue2 = useRef(new Animated.Value(1)).current;
    const animatedValue3 = useRef(new Animated.Value(0)).current;

    const indefiniteSpring = useRef(
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: 4,
                    duration: 250,
                    useNativeDriver: true,
                    easing: Easing.in,
                }),
                Animated.timing(animatedValue, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                    easing: Easing.in,
                }),
            ])
        )
    ).current;
    const onPressIn = useRef(
        Animated.parallel([
            Animated.spring(animatedValue1, {
                toValue: 0.6,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue2, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue3, {
                toValue: 0.7,
                duration: 300,
                useNativeDriver: true,
            }),
        ])
    ).current;
    const onPressOut = useRef(
        Animated.parallel([
            Animated.spring(animatedValue1, {
                toValue: 1,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue2, {
                toValue: 1,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(animatedValue3, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
        ])
    ).current;

    useEffect(() => {
        indefiniteSpring.start();
    });
    console.log(animatedValue2);

    return (
        <View
            style={[
                styles.container,
                {
                    paddingHorizontal: 30,
                    paddingTop: 30,
                    paddingBottom: 20,
                },
                columnMode && {},
            ]}
        >
            <Animated.View style={[styles.iconContainer]}>
                {children}
            </Animated.View>
            <MarginVertical size={1.5} />

            <Text
                style={[
                    styles.heading,
                    {
                        fontSize: fontFactor * wp(4.6),
                        lineHeight: fontFactor * wp(5.85),
                    },
                ]}
            >
                {serviceTitle}
            </Text>
            <MarginVertical size={1} />
            <Text
                style={[
                    styles.paragraph,
                    {
                        fontSize: fontFactor * wp(4.6),
                        lineHeight: fontFactor * wp(5.85),
                    },
                ]}
                numberOfLines={3}
                ellipsizeMode="tail"
            >
                {serviceBody}
            </Text>
            <MarginVertical size={1} />

            <AnimatedPressable
                hitSlop={wp(2)}
                onPressIn={() => onPressIn.start()}
                onPressOut={() => onPressOut.start()}
                style={[
                    styles.button,
                    {
                        paddingVertical: fontFactor * wp(3.58),
                        paddingHorizontal: fontFactor * wp(4.55),
                        marginLeft: -(fontFactor * wp(4.55)),
                        opacity: animatedValue1,
                    },
                ]}
            >
                <Text
                    style={[
                        styles.buttonText,
                        {
                            fontSize: fontFactor * wp(3.58),
                            lineHeight: fontFactor * wp(4.55),
                        },
                    ]}
                >
                    Learn more{'   '}
                </Text>
                <Animated.View
                    style={[
                        styles.buttonText,
                        {
                            height: fontFactor * wp(2.6),
                            width: (fontFactor * wp(2.6) * 330) / 180,
                            alignSelf: 'center',
                        },
                        {
                            opacity: animatedValue3,
                        },
                    ]}
                >
                    <RightArrowIcon />
                </Animated.View>
                <Animated.View
                    style={[
                        styles.buttonText,
                        {
                            height: fontFactor * wp(2.6),
                            width: (fontFactor * wp(2.6) * 330) / 180,
                            alignSelf: 'center',
                            position: 'relative',
                            left: -(fontFactor * wp(2.6) * 330) / 180,
                        },
                        {
                            transform: [{ translateX: animatedValue }],
                            opacity: animatedValue2,
                        },
                    ]}
                >
                    <RightArrowIcon />
                </Animated.View>
            </AnimatedPressable>
        </View>
    );
}

ServiceTemplate.propTypes = {
    children: PropTypes.object,
    serviceTitle: PropTypes.string,
    serviceBody: PropTypes.string,
    columnMode: PropTypes.bool,
    fontFactor: PropTypes.number,
};

const styles = StyleSheet.create({
    container: {
        borderWidth: 1,
        borderColor: 'rgba(247, 247, 247, 0.6)',
        flex: 1,
    },
    iconContainer: {
        height: 45,
        width: 45,
        backgroundColor: '#1A91D7',
        borderRadius: 45 / 2,
        padding: '4%',
    },
    heading: {
        color: '#fff',
        fontFamily: 'Poppins_600SemiBold',
    },
    paragraph: {
        color: '#fff',
        fontFamily: 'Karla_400Regular',
    },
    button: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Poppins_600SemiBold',
    },
});
