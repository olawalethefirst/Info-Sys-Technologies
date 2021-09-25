import React, { useRef } from 'react';
import {
    StyleSheet,
    Animated,
    Text,
    View,
    ImageBackground,
} from 'react-native';
import { connect } from 'react-redux';
import { useFonts, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';

function SubScreenTemplate({
    margin,
    // bodyHeight,
    fontFactor,
    // deviceWidthClass,
    headerSize,
    heading,
    sectionComponents,
    scrollRef,
}) {
    const [loaded] = useFonts({
        Poppins_600SemiBold,
    });
    const scrollY = useRef(new Animated.Value(0));
    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY.current } } }],
        { useNativeDriver: true }
    );
    const scrollYClamped = Animated.diffClamp(scrollY.current, 0, headerSize);
    const translateY = scrollYClamped.interpolate(
        {
            inputRange: [0, headerSize],
            outputRange: [0, -headerSize],
        },
        {
            useNativeDriver: true,
        }
    );

    const AnimatedImageBackground =
        Animated.createAnimatedComponent(ImageBackground);
    const { statusBarHeight } = Constants;

    if (!loaded) {
        return <View style={{ flex: 1 }} />;
    }
    return (
        <View style={styles.container}>
            <AnimatedImageBackground
                //eslint-disable-next-line no-undef
                source={require('../../assets/images/background2.png')}
                resizeMode="cover"
                style={[
                    styles.header,
                    {
                        paddingHorizontal: margin,
                        minHeight: headerSize - statusBarHeight,
                        transform: [
                            {
                                translateY,
                            },
                        ],
                    },
                ]}
            >
                <Text
                    style={[
                        styles.headerText,
                        {
                            fontSize: fontFactor * wp(8.5),
                            lineHeight: fontFactor * wp(10.81),
                        },
                    ]}
                >
                    {heading}
                </Text>
            </AnimatedImageBackground>
            <Animated.FlatList
                style={{ zIndex: -1 }}
                scrollEventThrottle={16}
                onScroll={handleScroll}
                contentContainerStyle={{
                    paddingTop: headerSize - statusBarHeight,
                }}
                data={sectionComponents}
                keyExtractor={(item, index) => 'keyExtractor' + index}
                bounces={false}
                renderItem={({ item }) => item.data}
                ref={scrollRef}
                keyboardDismissMode="on-drag"
                keyboardShouldPersistTaps="never"
            />
        </View>
    );
}

SubScreenTemplate.propTypes = {
    margin: PropTypes.number,
    bodyHeight: PropTypes.number,
    fontFactor: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    headerSize: PropTypes.number,
    heading: PropTypes.string,
    sectionComponents: PropTypes.array,
    scrollRef: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#161B26',
        justifyContent: 'center',
    },
    headerText: {
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

export default connect(mapStateToProps)(SubScreenTemplate);
