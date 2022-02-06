/* eslint-disable no-undef */
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { SafeAreaView, View, Dimensions, Animated } from 'react-native';
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

function Services({ headerSize, fontFactor }) {
    const pagerRef = useRef(null);
    const navigation = useNavigation();
    const arrowWidth = 0.25 * headerSize;
    const { width } = Dimensions.get('window');
    const contentContainerWidth = width - 2 * headerSize;
    const [page, setPage] = useState(0);
    const updatePage = (page) => {
        setPage(page);
    };
    const scrollToNextPage = () => {
        pagerRef.current?.setPage(page + 1);
    };
    const scrollToTop = useCallback(() => {
        pagerRef.current?.setPage(0);
    }, []);
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
            style={[
                {
                    flex: 1,
                },
            ]}
        >
            <PagerView
                style={{ flex: 1 }}
                initialPage={0}
                orientation="vertical"
                ref={pagerRef}
                onPageSelected={({ nativeEvent: { position } }) =>
                    updatePage(position)
                }
                overScrollMode="never"
            >
                <View key={`${key++}`} collapsable={false}>
                    <ServicesIntro
                        fontFactor={fontFactor}
                        arrowWidth={arrowWidth}
                        menuIconWidth={headerSize}
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
                        arrowWidth={arrowWidth}
                        menuIconWidth={headerSize}
                        menuIconHeight={headerSize}
                        contentContainerWidth={contentContainerWidth}
                        fadeIn={fadeIn}
                        fadeOut={fadeOut}
                    />
                </View>
                <View key={`${key++}`} collapsable={false}>
                    <ServicesTemplate
                        headerSize={headerSize}
                        details={accountingSoftwareAndFinancialManagementSystem}
                        title={'Accounting Software & Financial Management'}
                        url={require('../../assets/images/image10.png')}
                        fontFactor={fontFactor}
                        arrowWidth={arrowWidth}
                        menuIconWidth={headerSize}
                        menuIconHeight={headerSize}
                        contentContainerWidth={contentContainerWidth}
                        fadeIn={fadeIn}
                        fadeOut={fadeOut}
                    />
                </View>
                <View key={`${key++}`} collapsable={false}>
                    <ServicesTemplate
                        headerSize={headerSize}
                        details={internalControlAndComplianceAudit}
                        title={'Internal Control & Compliance Audit'}
                        url={require('../../assets/images/image11.png')}
                        fontFactor={fontFactor}
                        arrowWidth={arrowWidth}
                        menuIconWidth={headerSize}
                        menuIconHeight={headerSize}
                        contentContainerWidth={contentContainerWidth}
                        fadeIn={fadeIn}
                        fadeOut={fadeOut}
                    />
                </View>
                <View key={`${key++}`} collapsable={false}>
                    <ServicesTemplate
                        headerSize={headerSize}
                        details={cloudAccounting}
                        title={'Cloud Accounting'}
                        url={require('../../assets/images/image12.png')}
                        fontFactor={fontFactor}
                        arrowWidth={arrowWidth}
                        menuIconWidth={headerSize}
                        menuIconHeight={headerSize}
                        contentContainerWidth={contentContainerWidth}
                        fadeIn={fadeIn}
                        fadeOut={fadeOut}
                    />
                </View>
                <View key={`${key++}`} collapsable={false}>
                    <ServicesTemplate
                        headerSize={headerSize}
                        details={technologyAndManagementDevelopmentTraining}
                        title={'Technology & Management Development Training'}
                        url={require('../../assets/images/image13.png')}
                        fontFactor={fontFactor}
                        arrowWidth={arrowWidth}
                        menuIconWidth={headerSize}
                        menuIconHeight={headerSize}
                        contentContainerWidth={contentContainerWidth}
                        fadeIn={fadeIn}
                        fadeOut={fadeOut}
                    />
                </View>
                <View key={`${key++}`} collapsable={false}>
                    <ServicesTemplate
                        headerSize={headerSize}
                        details={feasibilityAndBusinessPlanning}
                        title={'Feasibility & Business Planning'}
                        url={require('../../assets/images/image14.png')}
                        fontFactor={fontFactor}
                        arrowWidth={arrowWidth}
                        menuIconWidth={headerSize}
                        menuIconHeight={headerSize}
                        contentContainerWidth={contentContainerWidth}
                        fadeIn={fadeIn}
                        fadeOut={fadeOut}
                    />
                </View>
                <View key={`${key++}`} collapsable={false}>
                    <ServicesTemplate
                        headerSize={headerSize}
                        details={fixedAssetsManagement}
                        title={'Fixed Assets Management (FAM)'}
                        url={require('../../assets/images/image15.png')}
                        fontFactor={fontFactor}
                        arrowWidth={arrowWidth}
                        menuIconWidth={headerSize}
                        menuIconHeight={headerSize}
                        contentContainerWidth={contentContainerWidth}
                        fadeIn={fadeIn}
                        fadeOut={fadeOut}
                    />
                </View>
            </PagerView>
            {page !== 7 && (
                <DancingDownArrow
                    arrowWidth={arrowWidth}
                    menuIconWidth={headerSize}
                    animatedValue={animatedValue}
                    scrollToNextPage={scrollToNextPage}
                />
            )}
            <SlideIndicator
                size={0.6 * arrowWidth}
                menuIconWidth={headerSize}
                activeSlide={page}
                animatedValue={animatedValue}
            />
        </SafeAreaView>
    );
}

Services.propTypes = {
    headerSize: PropTypes.number,
    fontFactor: PropTypes.number,
    pagerRef: PropTypes.object,
};

export default React.memo(Services);
