import React, { useRef, useEffect, useCallback, useState } from 'react';
import {
    SafeAreaView,
    View,
    Dimensions,
    StyleSheet,
    InteractionManager,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import ServicesIntro from './ServicesIntro';
import ServicesTemplate from './ServicesTemplate';
import { serviceDetails } from '../constants';
import DancingDownArrow from './DancingDownArrow';
import SlideIndicator from './SlideIndicator';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { connect } from 'react-redux';
import useAnimatedPagerScrollHandler from '../hooks/useAnimatedPagerScrollHandler';
import { useRoute, useIsFocused } from '@react-navigation/native';

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

function Services({ headerSize, fontFactor, tabBarHeight }) {
    const { params } = useRoute();
    const page = params?.page;
    const [initialPage] = useState(page ?? 0);
    const { width } = Dimensions.get('window');
    const isFocused = useIsFocused();
    const pageNo = useSharedValue(0);
    const modalAwareAnimatedValue = useSharedValue(0);
    const onPageScroll = useAnimatedPagerScrollHandler({
        onPageScroll: (e) => {
            'worklet';
            pageNo.value = e.position + e.offset;
        },
    });
    const modalAwareAnimatedStyle = useAnimatedStyle(() => {
        ('worklet');
        return {
            transform: [
                {
                    translateY: withTiming(modalAwareAnimatedValue.value),
                },
            ],
        };
    });
    const pagerRef = useRef(null);
    const navigation = useNavigation();
    const drawerIconWidth = useRef(headerSize * 1.1).current; //drawerIcon width is 1.1 * headerSize
    const arrowWidth = useRef(0.25 * drawerIconWidth).current;
    const slideIndicatorWidth = useRef(0.15 * drawerIconWidth).current;
    const contentContainerWidth = useRef(width - 2 * drawerIconWidth).current; //uses drawerIconWidth as marginHorizontal
    const scrollToNextPage = useCallback(() => {
        pagerRef.current?.setPage(pageNo.value + 1);
    }, [pageNo]);
    const scrollToTop = useCallback(() => {
        pagerRef.current?.setPage(0);
    }, []);
    const scheduleScrollToTop = useCallback(() => {
        navigation.addListener('tabPress', () => {
            if (isFocused) {
                scrollToTop();
            }
        });
    }, [navigation, isFocused, scrollToTop]);
    const unSubscribeFromTabPress = useCallback(()=> navigation.removeListener('tabPress'), [navigation])
    const scrollToPage = useCallback(() => {
        if (page) {
            pagerRef.current?.setPage(page);
            navigation.setParams({
                page: null,
            });
        }
    }, [navigation, page]);
    let key = 0;

    useEffect(() => {
        const interaction =
            InteractionManager.runAfterInteractions(scheduleScrollToTop);
        return () => {
            interaction.cancel();
            unSubscribeFromTabPress();
        };
    }, [unSubscribeFromTabPress, scheduleScrollToTop]);

    useEffect(() => {
        const interaction =
            InteractionManager.runAfterInteractions(scrollToPage);
        return interaction.cancel;
    }, [scrollToPage]);

    return (
        <SafeAreaView style={styles.container}>
            <AnimatedPagerView
                onPageScroll={onPageScroll}
                style={{ flex: 1 }}
                initialPage={initialPage}
                orientation="vertical"
                ref={pagerRef}
                overScrollMode="never"
            >
                <View key={`${key++}`} collapsable={false}>
                    <ServicesIntro
                        fontFactor={fontFactor}
                        contentContainerWidth={contentContainerWidth}
                    />
                </View>
                <View key={`${key++}`} collapsable={false}>
                    <ServicesTemplate
                        headerSize={headerSize}
                        body={serviceDetails[0].body}
                        title={serviceDetails[0].title}
                        // eslint-disable-next-line no-undef
                        url={require('../../assets/images/image9.webp')}
                        fontFactor={fontFactor}
                        contentContainerWidth={contentContainerWidth}
                        modalAwareAnimatedValue={modalAwareAnimatedValue}
                        tabBarHeight={tabBarHeight}
                    />
                </View>
                <View key={`${key++}`} collapsable={false}>
                    <ServicesTemplate
                        headerSize={headerSize}
                        body={serviceDetails[1].body}
                        title={serviceDetails[1].title}
                        // eslint-disable-next-line no-undef
                        url={require('../../assets/images/image10.webp')}
                        fontFactor={fontFactor}
                        contentContainerWidth={contentContainerWidth}
                        modalAwareAnimatedValue={modalAwareAnimatedValue}
                        tabBarHeight={tabBarHeight}
                    />
                </View>
                <View key={`${key++}`} collapsable={false}>
                    <ServicesTemplate
                        headerSize={headerSize}
                        body={serviceDetails[2].body}
                        title={serviceDetails[2].title}
                        // eslint-disable-next-line no-undef
                        url={require('../../assets/images/image11.webp')}
                        fontFactor={fontFactor}
                        contentContainerWidth={contentContainerWidth}
                        modalAwareAnimatedValue={modalAwareAnimatedValue}
                        tabBarHeight={tabBarHeight}
                    />
                </View>
                <View key={`${key++}`} collapsable={false}>
                    <ServicesTemplate
                        headerSize={headerSize}
                        body={serviceDetails[3].body}
                        title={serviceDetails[3].title}
                        // eslint-disable-next-line no-undef
                        url={require('../../assets/images/image12.webp')}
                        fontFactor={fontFactor}
                        contentContainerWidth={contentContainerWidth}
                        modalAwareAnimatedValue={modalAwareAnimatedValue}
                        tabBarHeight={tabBarHeight}
                    />
                </View>
                <View key={`${key++}`} collapsable={false}>
                    <ServicesTemplate
                        headerSize={headerSize}
                        body={serviceDetails[4].body}
                        title={serviceDetails[4].title}
                        // eslint-disable-next-line no-undef
                        url={require('../../assets/images/image13.webp')}
                        fontFactor={fontFactor}
                        contentContainerWidth={contentContainerWidth}
                        modalAwareAnimatedValue={modalAwareAnimatedValue}
                        tabBarHeight={tabBarHeight}
                    />
                </View>
                <View key={`${key++}`} collapsable={false}>
                    <ServicesTemplate
                        headerSize={headerSize}
                        body={serviceDetails[5].body}
                        title={serviceDetails[5].title}
                        // eslint-disable-next-line no-undef
                        url={require('../../assets/images/image14.webp')}
                        fontFactor={fontFactor}
                        contentContainerWidth={contentContainerWidth}
                        modalAwareAnimatedValue={modalAwareAnimatedValue}
                        tabBarHeight={tabBarHeight}
                    />
                </View>
                <View key={`${key++}`} collapsable={false}>
                    <ServicesTemplate
                        headerSize={headerSize}
                        body={serviceDetails[6].body}
                        title={serviceDetails[6].title}
                        // eslint-disable-next-line no-undef
                        url={require('../../assets/images/image15.webp')}
                        fontFactor={fontFactor}
                        contentContainerWidth={contentContainerWidth}
                        modalAwareAnimatedValue={modalAwareAnimatedValue}
                        tabBarHeight={tabBarHeight}
                    />
                </View>
            </AnimatedPagerView>
            {
                <DancingDownArrow
                    arrowWidth={arrowWidth}
                    scrollToNextPage={scrollToNextPage}
                    pageNo={pageNo}
                    headerSize={headerSize}
                    drawerIconWidth={drawerIconWidth}
                    modalAwareAnimatedStyle={modalAwareAnimatedStyle}
                />
            }
            <SlideIndicator
                size={slideIndicatorWidth}
                drawerIconWidth={drawerIconWidth}
                pageNo={pageNo}
                modalAwareAnimatedStyle={modalAwareAnimatedStyle}
            />
        </SafeAreaView>
    );
}

Services.propTypes = {
    headerSize: PropTypes.number,
    fontFactor: PropTypes.number,
    tabBarHeight: PropTypes.number,
};

const mapStateToProps = ({
    settingsState: { fontFactor, headerSize, tabBarHeight },
}) => ({
    fontFactor,
    headerSize,
    tabBarHeight,
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

export default connect(mapStateToProps)(React.memo(Services));
