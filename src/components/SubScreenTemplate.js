import React, { useRef, useCallback } from 'react';
import { StyleSheet, Animated, View, Platform } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import SecondaryHeader from './SecondaryHeader';
import { stickyHeaderHeight } from '../constants';

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
            },
        }
    );
    const scrollYClamped = Animated.diffClamp(
        scrollY.current,
        0,
        stickyHeaderHeight
    );
    const translateY = scrollYClamped.interpolate(
        {
            inputRange: [0, stickyHeaderHeight],
            outputRange: [0, -stickyHeaderHeight],
        },
        {
            useNativeDriver: true,
        }
    );
    const renderItem = useCallback(({ item }) => item.data, []);

    return (
        <View style={[styles.container]}>
            {!noHeader && (
                <SecondaryHeader
                    deeplyNestedScreen={deeplyNestedScreen}
                    heading={heading}
                    headerSize={headerSize}
                    margin={margin}
                    translateY={translateY}
                    fontFactor={fontFactor}
                />
            )}
            {children}
            <Animated.FlatList
                style={{ zIndex: -1 }}
                scrollEventThrottle={16}
                onScroll={handleScroll}
                contentContainerStyle={
                    !noHeader && {
                        paddingTop: stickyHeaderHeight,
                    }
                }
                data={sectionComponents}
                bounces={false}
                renderItem={renderItem}
                keyExtractor={(item, index) => 'keyExtractor' + index}
                ref={scrollRef}
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
});

const mapStateToProps = (state) => ({
    margin: state.settingsState.margin,
    fontFactor: state.settingsState.fontFactor,
    deviceWidthClass: state.settingsState.deviceWidthClass,
});

export default connect(mapStateToProps)(SubScreenTemplate);
