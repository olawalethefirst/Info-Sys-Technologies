/* eslint-disable no-undef */
import React, { useRef, useState } from 'react';
import { SafeAreaView, View, Dimensions, Animated } from 'react-native';
import Constants from 'expo-constants';
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

function Services({
    bodyHeight,
    headerSize,
    fontFactor,
    pagerRef,
    scrollViewOffset,
}) {
    const { statusBarHeight } = Constants;
    const menuIconWidth = headerSize - statusBarHeight / 2;
    const menuIconHeight = headerSize - statusBarHeight;
    const arrowWidth = 0.25 * menuIconWidth;
    const { width } = Dimensions.get('window');
    const contentContainerWidth = width - 2 * menuIconWidth;
    const [page, setPage] = useState(0);
    const updatePage = (page) => {
        setPage(page);
    };
    const scrollToNextPage = () => {
        console.log('called');
        pagerRef.current?.setPage(page + 1);
    };
    const animatedValue = useRef(new Animated.Value(1)).current;
    const fadeOut = useRef(
        Animated.timing(animatedValue, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
        })
    ).current;
    const fadeIn = useRef(
        Animated.timing(animatedValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        })
    ).current;

    return (
        <SafeAreaView
            style={[
                {
                    height: bodyHeight,
                },
            ]}
        >
            <PagerView
                style={{ flex: 1 }}
                initialPage={0}
                orientation="vertical"
                ref={pagerRef}
                scrollEnabled={scrollViewOffset == 0}
                onPageSelected={({ nativeEvent: { position } }) =>
                    updatePage(position)
                }
                overScrollMode="never"
            >
                <View collapsable={false}>
                    <ServicesIntro
                        fontFactor={fontFactor}
                        arrowWidth={arrowWidth}
                        menuIconWidth={menuIconWidth}
                        contentContainerWidth={contentContainerWidth}
                    />
                </View>
                <View>
                    <ServicesTemplate
                        headerSize={headerSize}
                        details={generalInformationTechnologyConsulting}
                        title={'General Information Technology Consulting'}
                        url={require('../../assets/images/image9.png')}
                        fontFactor={fontFactor}
                        arrowWidth={arrowWidth}
                        menuIconWidth={menuIconWidth}
                        menuIconHeight={menuIconHeight}
                        contentContainerWidth={contentContainerWidth}
                        fadeIn={fadeIn}
                        fadeOut={fadeOut}
                    />
                </View>
                <View>
                    <ServicesTemplate
                        headerSize={headerSize}
                        details={accountingSoftwareAndFinancialManagementSystem}
                        title={'Accounting Software & Financial Management'}
                        url={require('../../assets/images/image10.png')}
                        fontFactor={fontFactor}
                        arrowWidth={arrowWidth}
                        menuIconWidth={menuIconWidth}
                        menuIconHeight={menuIconHeight}
                        contentContainerWidth={contentContainerWidth}
                        fadeIn={fadeIn}
                        fadeOut={fadeOut}
                    />
                </View>
                <View>
                    <ServicesTemplate
                        headerSize={headerSize}
                        details={internalControlAndComplianceAudit}
                        title={'Internal Control & Compliance Audit'}
                        url={require('../../assets/images/image11.png')}
                        fontFactor={fontFactor}
                        arrowWidth={arrowWidth}
                        menuIconWidth={menuIconWidth}
                        menuIconHeight={menuIconHeight}
                        contentContainerWidth={contentContainerWidth}
                        fadeIn={fadeIn}
                        fadeOut={fadeOut}
                    />
                </View>
                <View>
                    <ServicesTemplate
                        headerSize={headerSize}
                        details={cloudAccounting}
                        title={'Cloud Accounting'}
                        url={require('../../assets/images/image12.png')}
                        fontFactor={fontFactor}
                        arrowWidth={arrowWidth}
                        menuIconWidth={menuIconWidth}
                        menuIconHeight={menuIconHeight}
                        contentContainerWidth={contentContainerWidth}
                        fadeIn={fadeIn}
                        fadeOut={fadeOut}
                    />
                </View>
                <View>
                    <ServicesTemplate
                        headerSize={headerSize}
                        details={technologyAndManagementDevelopmentTraining}
                        title={'Technology & Management Development Training'}
                        url={require('../../assets/images/image13.png')}
                        fontFactor={fontFactor}
                        arrowWidth={arrowWidth}
                        menuIconWidth={menuIconWidth}
                        menuIconHeight={menuIconHeight}
                        contentContainerWidth={contentContainerWidth}
                        fadeIn={fadeIn}
                        fadeOut={fadeOut}
                    />
                </View>
                <View>
                    <ServicesTemplate
                        headerSize={headerSize}
                        details={feasibilityAndBusinessPlanning}
                        title={'Feasibility & Business Planning'}
                        url={require('../../assets/images/image14.png')}
                        fontFactor={fontFactor}
                        arrowWidth={arrowWidth}
                        menuIconWidth={menuIconWidth}
                        menuIconHeight={menuIconHeight}
                        contentContainerWidth={contentContainerWidth}
                        fadeIn={fadeIn}
                        fadeOut={fadeOut}
                    />
                </View>
                <View>
                    <ServicesTemplate
                        headerSize={headerSize}
                        details={fixedAssetsManagement}
                        title={'Fixed Assets Management (FAM)'}
                        url={require('../../assets/images/image15.png')}
                        fontFactor={fontFactor}
                        arrowWidth={arrowWidth}
                        menuIconWidth={menuIconWidth}
                        menuIconHeight={menuIconHeight}
                        contentContainerWidth={contentContainerWidth}
                        fadeIn={fadeIn}
                        fadeOut={fadeOut}
                    />
                </View>
            </PagerView>
            {page !== 7 && (
                <DancingDownArrow
                    arrowWidth={arrowWidth}
                    menuIconWidth={menuIconHeight}
                    animatedValue={animatedValue}
                    scrollToNextPage={scrollToNextPage}
                />
            )}
            <SlideIndicator
                size={0.6 * arrowWidth}
                menuIconWidth={menuIconHeight}
                activeSlide={page}
                animatedValue={animatedValue}
            />
        </SafeAreaView>
    );
}

Services.propTypes = {
    bodyHeight: PropTypes.number,
    headerSize: PropTypes.number,
    fontFactor: PropTypes.number,
    pagerRef: PropTypes.object,
    scrollViewOffset: PropTypes.number,
};

export default React.memo(Services);
