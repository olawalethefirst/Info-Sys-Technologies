import React, { useRef, useState } from 'react';
import {
    StyleSheet,
    SafeAreaView,
    View,
    Platform,
    Button,
    Dimensions,
    Animated,
} from 'react-native';
import Constants from 'expo-constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PagerView from 'react-native-pager-view';
import ServicesIntro from './ServicesIntro';
import MarginVertical from './MarginVertical';
import ServicesTemplate from './ServicesTemplate';
import { cloudAccounting } from '../serviceDetails';
import DancingDownArrow from './DancingDownArrow';
import SlideIndicator from './SlideIndicator';

function Services({
    bodyHeight,
    margin,
    headerSize,
    fontFactor,
    pagerRef,
    scrollRef,
    scrollViewOffset,
}) {
    const { statusBarHeight } = Constants;
    const menuIconWidth = headerSize - statusBarHeight / 2;
    const menuIconHeight = headerSize - statusBarHeight;
    const arrowWidth = 0.275 * menuIconWidth;
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
    const animatedValue = new Animated.Value(1);

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
                        details={cloudAccounting}
                        title={'Cloud Accounting'}
                        url={require('../../assets/images/image9.png')}
                        fontFactor={fontFactor}
                        arrowWidth={arrowWidth}
                        menuIconWidth={menuIconWidth}
                        menuIconHeight={menuIconHeight}
                        contentContainerWidth={contentContainerWidth}
                    />
                </View>
                <View>
                    <MarginVertical size={2} />
                </View>
            </PagerView>
            <DancingDownArrow
                arrowWidth={arrowWidth}
                menuIconWidth={menuIconHeight}
                animatedValue={animatedValue}
                scrollToNextPage={scrollToNextPage}
            />
            <SlideIndicator size={arrowWidth} />
        </SafeAreaView>
    );
}

export default React.memo(Services);
