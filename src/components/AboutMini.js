import React, { useCallback } from 'react';
import {
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
    Animated,
} from 'react-native';
import PropTypes from 'prop-types';
import AboutMiniSVG from './AboutMiniSVG';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import MarginVertical from './MarginVertical';
import checkColumnMode from '../helperFunctions/checkColumnMode';
import { About } from '../constants';

const animatedValue = new Animated.Value(1);
const onPressIn = (animatedValue) => () => {
    Animated.timing(animatedValue, {
        toValue: 0.9,
        useNativeDriver: true,
        duration: 150,
    }).start();
};
const onPressOut = (animatedValue) => () => {
    Animated.timing(animatedValue, {
        toValue: 1,
        useNativeDriver: true,
        duration: 150,
    }).start();
};

function AboutMini({ fontFactor, margin, deviceWidthClass, navigate }) {
    const onPress = useCallback(() => navigate(About), [navigate]);
    const columnMode = checkColumnMode(deviceWidthClass);

    return (
        <View
            style={[
                { paddingHorizontal: margin },
                styles.container,
                columnMode && styles.containerColumnMode,
            ]}
        >
            <View
                style={[
                    styles.contentContainer1,
                    columnMode && styles.contentContainer1ColumnMode,
                ]}
            >
                <MarginVertical size={3} />
                <AboutMiniSVG width={columnMode ? wp(80) / 2 : wp(80)} />
                {columnMode && <MarginVertical size={3} />}
            </View>
            {!columnMode && <MarginVertical />}
            <View
                style={[
                    styles.contentContainer2,
                    columnMode && styles.contentContainer2ColumnMode,
                ]}
            >
                {columnMode && <MarginVertical size={4} />}
                <Text
                    style={[
                        styles.heading,
                        {
                            fontSize: fontFactor * wp(9.2),
                            lineHeight: fontFactor * wp(11.7),
                        },
                    ]}
                >
                    Who are we?
                </Text>
                <MarginVertical size={1} />
                <Text
                    style={[
                        styles.paragraph,
                        {
                            fontSize: fontFactor * wp(6),
                            lineHeight: fontFactor * wp(7.7),
                        },
                    ]}
                >
                    Info-Sys Technologies was founded in the year 2002 by Mr.
                    G.A Bashiru. The company started as an ICT training
                    institute, but has since expanded its services over the
                    years into consultations, proffering high quality solutions
                    in accounting and information Technology areas amongst other
                    services.
                </Text>
                <MarginVertical size={2} />
                <TouchableWithoutFeedback
                    onPressIn={onPressIn(animatedValue)}
                    onPressOut={onPressOut(animatedValue)}
                    onPress={onPress}
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
                            Read more
                        </Text>
                    </Animated.View>
                </TouchableWithoutFeedback>
                <MarginVertical size={4} />
            </View>
        </View>
    );
}

AboutMini.propTypes = {
    fontFactor: PropTypes.number,
    margin: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    navigate: PropTypes.func,
};

export default React.memo(AboutMini);

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F7F7F7',
    },
    containerColumnMode: {
        flexDirection: 'row',
    },
    contentContainer1: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer2: {
        justifyContent: 'center',
    },
    contentContainer1ColumnMode: {
        flex: 1,
    },
    contentContainer2ColumnMode: {
        flex: 1,
    },
    heading: {
        color: '#161B26',
        fontFamily: 'Poppins_600SemiBold',
    },
    paragraph: {
        color: '#161B26',
        fontFamily: 'Karla_400Regular',
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
