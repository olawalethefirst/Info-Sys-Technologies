import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageBackground,
    TouchableWithoutFeedback,
    Animated,
} from 'react-native';
import { useFonts } from '@expo-google-fonts/poppins';
import Poppins_700Bold from '@expo-google-fonts/poppins/Poppins_700Bold.ttf';
import Poppins_600SemiBold from '@expo-google-fonts/poppins/Poppins_600SemiBold.ttf';
import Karla_500Medium from '@expo-google-fonts/karla/Karla_500Medium.ttf';
import {
    // heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import checkColumnMode from '../helperFunctions/checkColumnMode';

/*global require*/
/*eslint no-undef: "error"*/

function Welcome({ margin, bodyHeight, fontFactor, deviceWidthClass }) {
    const [loaded] = useFonts({
        Poppins_700Bold,
        Karla_500Medium,
        Poppins_600SemiBold,
    });
    const animatedValue = new Animated.Value(1);
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
    const columnMode = checkColumnMode(deviceWidthClass);

    if (!loaded || !fontFactor) {
        return <View style={{ flex: 1 }} />;
    }

    return (
        <View style={[styles.container, { minHeight: bodyHeight }]}>
            <ImageBackground
                source={require('../../assets/images/background.png')}
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
                    <MarginVertical size={3} />
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
                    <MarginVertical size={1.5} />
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
                    <MarginVertical size={3} />
                    <TouchableWithoutFeedback
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
                    <MarginVertical size={3} />
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
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        margin: 0,
        padding: 0,
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

const mapStateToProps = (state) => ({
    margin: state.settingsState.margin,
    bodyHeight: state.settingsState.bodyHeight,
    fontFactor: state.settingsState.fontFactor,
    deviceWidthClass: state.settingsState.deviceWidthClass,
});

export default connect(mapStateToProps, {})(Welcome);
