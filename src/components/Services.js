/* eslint-disable no-undef */
import React, { useRef, useEffect, useCallback } from 'react';
import { SafeAreaView, View, Dimensions, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import ServicesIntro from './ServicesIntro';
import ServicesTemplate from './ServicesTemplate';
import {
    generalInformationTechnologyConsulting,
    accountingSoftwareAndFinancialManagementSystem,
    internalControlAndComplianceAudit,
    fixedAssetsManagement,
    feasibilityAndBusinessPlanning,
    technologyAndManagementDevelopmentTraining,
    cloudAccounting,
} from '../serviceDetails';
import DancingDownArrow from './DancingDownArrow';
import SlideIndicator from './SlideIndicator';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import Animated, {
    useSharedValue,
    useHandler,
    useEvent,
    useAnimatedStyle,
    withTiming,
} from 'react-native-reanimated';
import { connect } from 'react-redux';

function Services({ headerSize, fontFactor, tabBarHeight }) {
    const { width } = Dimensions.get('window');
    const pageNo = useSharedValue(0);
    const modalAwareAnimatedValue = useSharedValue(0);
    const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);
    const useAnimatedPagerScrollHandler = (handlers, dependencies) => {
        const { context, doDependenciesDiffer } = useHandler(
            handlers,
            dependencies
        );

        return useEvent(
            (event) => {
                'worklet';

                const { onPageScroll } = handlers;

                if (onPageScroll && event.eventName.endsWith('onPageScroll')) {
                    onPageScroll(event, context);
                }
            },
            ['onPageScroll'],
            doDependenciesDiffer
        );
    };
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
    const drawerIconWidth = headerSize * 1.1; //drawerIcon width is 1.1 * headerSize
    const arrowWidth = 0.25 * drawerIconWidth;
    const slideIndicatorWidth = 0.15 * drawerIconWidth;
    const contentContainerWidth = width - 2 * drawerIconWidth; //uses drawerIconWidth as marginHorizontal
    const scrollToNextPage = () => {
        pagerRef.current?.setPage(pageNo.value + 1);
    };
    const scrollToTop = useCallback(() => {
        pagerRef.current?.setPage(0);
    }, []);
    let key = 0;

    useEffect(() => {
        navigation.addListener('tabPress', () => {
            if (navigation.isFocused()) {
                scrollToTop();
            }
        });
        return () => navigation.removeListener('');
    }, [navigation, scrollToTop]);

    return (
        <SafeAreaView
            style={styles.container}
        >
            <AnimatedPagerView
                onPageScroll={onPageScroll}
                style={{ flex: 1 }}
                initialPage={0}
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
                        details={generalInformationTechnologyConsulting}
                        title={'General Information Technology Consulting'}
                        url={require('../../assets/images/image9.png')}
                        fontFactor={fontFactor}
                        contentContainerWidth={contentContainerWidth}
                        modalAwareAnimatedValue={modalAwareAnimatedValue}
                        tabBarHeight={tabBarHeight}
                    />
                </View>
                <View key={`${key++}`} collapsable={false}>
                    <ServicesTemplate
                        headerSize={headerSize}
                        details={accountingSoftwareAndFinancialManagementSystem}
                        title={'Accounting Software & Financial Management'}
                        url={require('../../assets/images/image10.png')}
                        fontFactor={fontFactor}
                        contentContainerWidth={contentContainerWidth}
                        modalAwareAnimatedValue={modalAwareAnimatedValue}
                        tabBarHeight={tabBarHeight}
                    />
                </View>
                <View key={`${key++}`} collapsable={false}>
                    <ServicesTemplate
                        headerSize={headerSize}
                        details={internalControlAndComplianceAudit}
                        title={'Internal Control & Compliance Audit'}
                        url={require('../../assets/images/image11.png')}
                        fontFactor={fontFactor}
                        contentContainerWidth={contentContainerWidth}
                        modalAwareAnimatedValue={modalAwareAnimatedValue}
                        tabBarHeight={tabBarHeight}
                    />
                </View>
                <View key={`${key++}`} collapsable={false}>
                    <ServicesTemplate
                        headerSize={headerSize}
                        details={cloudAccounting}
                        title={'Cloud Accounting'}
                        url={require('../../assets/images/image12.png')}
                        fontFactor={fontFactor}
                        contentContainerWidth={contentContainerWidth}
                        modalAwareAnimatedValue={modalAwareAnimatedValue}
                        tabBarHeight={tabBarHeight}
                    />
                </View>
                <View key={`${key++}`} collapsable={false}>
                    <ServicesTemplate
                        headerSize={headerSize}
                        details={technologyAndManagementDevelopmentTraining}
                        title={'Technology & Management Development Training'}
                        url={require('../../assets/images/image13.png')}
                        fontFactor={fontFactor}
                        contentContainerWidth={contentContainerWidth}
                        modalAwareAnimatedValue={modalAwareAnimatedValue}
                        tabBarHeight={tabBarHeight}
                    />
                </View>
                <View key={`${key++}`} collapsable={false}>
                    <ServicesTemplate
                        headerSize={headerSize}
                        details={feasibilityAndBusinessPlanning}
                        title={'Feasibility & Business Planning'}
                        url={require('../../assets/images/image14.png')}
                        fontFactor={fontFactor}
                        contentContainerWidth={contentContainerWidth}
                        modalAwareAnimatedValue={modalAwareAnimatedValue}
                        tabBarHeight={tabBarHeight}
                    />
                </View>
                <View key={`${key++}`} collapsable={false}>
                    <ServicesTemplate
                        headerSize={headerSize}
                        details={fixedAssetsManagement}
                        title={'Fixed Assets Management (FAM)'}
                        url={require('../../assets/images/image15.png')}
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
        flex:1
    }
})

export default connect(mapStateToProps)(React.memo(Services));
