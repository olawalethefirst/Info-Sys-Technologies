import React, { useCallback, useRef } from 'react';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ContactSVG from './ContactSVG';
import MarginVertical from './MarginVertical';
import { Contact } from '../constants';

function ContactMini({ margin, fontFactor, bodyHeight, navigate }) {
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
        navigate(Contact);
    }, [navigate]);

    return (
        <View
            style={[
                styles.container,
                {
                    minHeight: bodyHeight,
                    paddingHorizontal: margin,
                },
            ]}
        >
            <MarginVertical size={4} />

            <Text
                style={[
                    styles.heading,
                    {
                        fontSize: fontFactor * wp(9),
                        lineHeight: fontFactor * wp(11.5),
                    },
                ]}
            >
                Are you ready to get onboarded?
            </Text>
            <MarginVertical />
            <View style={{ height: bodyHeight / 2 }}>
                <ContactSVG />
            </View>
            <MarginVertical />
            <Text
                style={[
                    styles.paragraph,
                    {
                        fontSize: fontFactor * wp(4),
                        lineHeight: fontFactor * wp(5.1),
                    },
                ]}
            >
                Or do you simply need more information? {'\n'}
                <Text style={{ color: '#f8b526' }}>
                    Get in touch with us now.
                </Text>
            </Text>
            <MarginVertical size={2} />
            <Pressable
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
                        Contact Us
                    </Text>
                </Animated.View>
            </Pressable>
            <MarginVertical size={4} />
        </View>
    );
}

ContactMini.propTypes = {
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    bodyHeight: PropTypes.number,
    navigate: PropTypes.func,
};

export default React.memo(ContactMini);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f7f7f7',
        justifyContent: 'center',
    },
    heading: {
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
    },
    paragraph: {
        fontFamily: 'Karla_400Regular',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#1A91D7',
        // alignSelf: 'center',
    },
    buttonText: {
        // color: '#fff',
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
    },
});
