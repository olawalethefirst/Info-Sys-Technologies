import React from 'react';
import { StyleSheet, Text, View, Pressable, Animated } from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import ContactSVG from './ContactSVG';
import MarginVertical from './MarginVertical';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import Karla_400Regular from '@expo-google-fonts/karla/Karla_400Regular.ttf';

function ContactMini({ margin, fontFactor, bodyHeight }) {
    const [loaded] = useFonts({
        Poppins_600SemiBold,
        Karla_400Regular,
    });
    const animatedValue = new Animated.Value(1);
    console.log(animatedValue);
    const onPressIn = () => {
        Animated.spring(animatedValue, {
            toValue: 0.8,
            useNativeDriver: true,
        }).start();
    };
    const onPressOut = () => {
        Animated.spring(animatedValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    if (!loaded) {
        return null;
    }

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
            <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
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
};

export default React.memo(ContactMini);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#161B26',
        justifyContent: 'center',
    },
    heading: {
        fontFamily: 'Poppins_600SemiBold',
        color: '#fff',
        textAlign: 'center',
    },
    paragraph: {
        color: '#fff',
        fontFamily: 'Karla_400Regular',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#1A91D7',
        // alignSelf: 'center',
    },
    buttonText: {
        color: '#fff',
        fontFamily: 'Poppins_600SemiBold',
        textAlign: 'center',
    },
});
