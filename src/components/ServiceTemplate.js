import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import { useFonts } from '@expo-google-fonts/poppins';
import Poppins_600SemiBold from '@expo-google-fonts/poppins/Poppins_600SemiBold.ttf';
import Karla_400Regular from '@expo-google-fonts/karla/Karla_400Regular.ttf';
import Icon from 'react-native-vector-icons/Entypo';

export default function ServiceTemplate({
    columnMode,
    children,
    serviceTitle,
    fontFactor,
}) {
    const [loaded] = useFonts({
        Poppins_600SemiBold,
        Karla_400Regular,
    });

    const animatedValue = new Animated.Value(0);
    useEffect(() => {
        Animated.loop(
            Animated.sequence([
                Animated.timing(animatedValue, {
                    toValue: -(fontFactor * wp(0.5)),
                    useNativeDriver: true,
                    duration: 600,
                }),
                Animated.timing(animatedValue, {
                    toValue: fontFactor * wp(0.5),
                    useNativeDriver: true,
                    duration: 600,
                }),
            ])
        ).start();
    });

    if (!loaded) {
        return <View style={{ flex: 1 }} />;
    }

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

            <Animated.Text
                style={[
                    styles.heading,
                    {
                        fontSize: fontFactor * wp(4.6),
                        lineHeight: fontFactor * wp(5.85),
                    },
                ]}
            >
                {serviceTitle}
            </Animated.Text>
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
                {
                    'Dummy service body paragraph, to be replaced Dummy service body paragraph, to be replaced Dummy service body paragraph, to be replaced Dummy service body paragraph, to be replaced Dummy service body paragraph, to be replacedDummy service body paragraph, to be replaced Dummy service body paragraph, to be replaced Dummy service body paragraph, to be replaced'
                }
            </Text>
            <MarginVertical size={1} />

            <TouchableOpacity
                style={[
                    styles.button,
                    {
                        paddingVertical: fontFactor * wp(3.58),
                        paddingHorizontal: fontFactor * wp(4.55),
                        marginLeft: -(fontFactor * wp(4.55)),
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
                <Animated.Text
                    style={[
                        styles.buttonText,
                        {
                            fontSize: fontFactor * wp(3.58),
                            lineHeight: fontFactor * wp(4.55),
                        },
                        {
                            transform: [{ translateX: animatedValue }],
                        },
                    ]}
                >
                    <Icon
                        name="arrow-long-right"
                        style={{
                            fontSize: fontFactor * wp(3.58),
                            lineHeight: fontFactor * wp(4.55),
                        }}
                    />
                </Animated.Text>
            </TouchableOpacity>
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
        padding: 10,
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
