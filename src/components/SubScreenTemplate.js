import React, { useRef } from 'react';
import {
    StyleSheet,
    Animated,
    Text,
    View,
    ImageBackground,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

function SubScreenTemplate({
    margin,
    fontFactor,
    headerSize,
    heading,
    sectionComponents,
    scrollRef,
    updateScrollViewOffset,
    children,
    updateContentSize,
    noHeader,
    deeplyNestedScreen,
    updateFooterPosition,
}) {
    const scrollY = useRef(new Animated.Value(0));
    const handleScroll = Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY.current } } }],
        {
            useNativeDriver: true,
            listener: (e) => {
                updateScrollViewOffset &&
                    updateScrollViewOffset(e.nativeEvent.contentOffset.y);
                updateContentSize &&
                    updateContentSize(e.nativeEvent.contentSize.height);
                updateFooterPosition &&
                e.nativeEvent.contentOffset.y >=
                    e.nativeEvent.contentSize.height -
                        e.nativeEvent.layoutMeasurement.height -
                        headerSize
                    ? updateFooterPosition(
                          e.nativeEvent.contentOffset.y -
                              (e.nativeEvent.contentSize.height -
                                  e.nativeEvent.layoutMeasurement.height -
                                  headerSize)
                      )
                    : null;
                // cc
            },
        }
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
    const navigation = useNavigation();
    const AnimatedImageBackground =
        Animated.createAnimatedComponent(ImageBackground);

    return (
        <View style={[styles.container]}>
            {!noHeader && (
                <AnimatedImageBackground
                    //eslint-disable-next-line no-undef
                    source={require('../../assets/images/background2.png')}
                    resizeMode="cover"
                    style={[
                        styles.header,
                        {
                            paddingHorizontal: margin,
                            height: headerSize,
                            transform: [
                                {
                                    translateY,
                                },
                            ],
                        },
                        deeplyNestedScreen && {
                            flexDirection: 'row',
                            justifyContent: 'flex-start',
                        },
                    ]}
                >
                    {deeplyNestedScreen && (
                        <TouchableOpacity
                            style={{
                                width: headerSize,
                                height: '100%',
                                justifyContent: 'center',
                            }}
                            onPress={navigation.goBack}
                        >
                            <Icon
                                name="arrowleft"
                                size={fontFactor * wp(8.5)}
                                color="#fff"
                            />
                        </TouchableOpacity>
                    )}
                    <Text
                        style={[
                            !deeplyNestedScreen && styles.headerText,
                            !deeplyNestedScreen && {
                                fontSize: fontFactor * wp(8.5),
                                lineHeight: fontFactor * wp(10.81),
                            },
                            deeplyNestedScreen && {
                                fontSize: fontFactor * wp(6.8),
                                lineHeight: fontFactor * wp(8.65),
                            },
                            deeplyNestedScreen &&
                                styles.deeplyNestedScreenHeaderText,
                            deeplyNestedScreen && { alignSelf: 'center' },
                        ]}
                    >
                        {heading}
                    </Text>
                </AnimatedImageBackground>
            )}
            {children}
            <Animated.FlatList
                style={{ zIndex: -1 }}
                scrollEventThrottle={16}
                onScroll={handleScroll}
                contentContainerStyle={
                    !noHeader && {
                        paddingTop: headerSize,
                    }
                }
                data={sectionComponents}
                bounces={false}
                renderItem={({ item }) => item.data}
                keyExtractor={(item, index) => 'keyExtractor' + index}
                ref={scrollRef}
                // keyboardDismissMode="on-drag"
                keyboardDismissMode={Platform.select({
                    ios: 'interactive',
                    android: 'on-drag',
                })}
                keyboardShouldPersistTaps="handled"
                nestedScrollEnabled
            />
        </View>
    );
}

SubScreenTemplate.propTypes = {
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    headerSize: PropTypes.number,
    heading: PropTypes.string,
    sectionComponents: PropTypes.array,
    scrollRef: PropTypes.object,
    updateScrollViewOffset: PropTypes.func,
    children: PropTypes.object,
    noHeader: PropTypes.bool,
    updateContentSize: PropTypes.func,
    deeplyNestedScreen: PropTypes.bool,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 0,
        padding: 0,
        // backgroundColor: '#161B26',
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
    deeplyNestedScreenHeaderText: {
        color: '#fff',
        fontFamily: 'Poppins_500Medium',
    },
});

const mapStateToProps = (state) => ({
    margin: state.settingsState.margin,
    fontFactor: state.settingsState.fontFactor,
    deviceWidthClass: state.settingsState.deviceWidthClass,
    bodyHeight: state.settingsState.bodyHeight,
});

export default connect(mapStateToProps)(SubScreenTemplate);
