import React, { useRef, useState } from 'react';
import { StyleSheet, SafeAreaView, View, Platform, Button } from 'react-native';
import Constants from 'expo-constants';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import PagerView from 'react-native-pager-view';
import ServicesIntro from './ServicesIntro';
import MarginVertical from './MarginVertical';

export default function Services({
    bodyHeight,
    margin,
    headerSize,
    fontFactor,
    pagerRef,
    scrollRef,
    scrollViewOffset,
}) {
    const { statusBarHeight } = Constants;

    return (
        <SafeAreaView
            style={[
                {
                    minHeight: bodyHeight,
                },
            ]}
        >
            <PagerView
                style={{ flex: 1 }}
                initialPage={0}
                orientation="vertical"
                ref={pagerRef}
                scrollEnabled={scrollViewOffset == 0}
            >
                <View collapsable={false}>
                    <ServicesIntro fontFactor={fontFactor} margin={margin} />
                </View>
                <View>
                    <MarginVertical size={2} />
                </View>
                <View>
                    <MarginVertical size={2} />
                </View>
            </PagerView>
        </SafeAreaView>
    );
}
