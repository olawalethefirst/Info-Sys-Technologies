import React, { useRef, useCallback } from 'react';
import { StyleSheet, SafeAreaView, Text, View } from 'react-native';
import { connect } from 'react-redux';
import SubScreenTemplate from '../components/SubScreenTemplate';
import Footer from '../components/Footer';
import Services from '../components/Services';
import ServicesGallery from '../components/ServicesGallery';

function ServicesScreen({
    margin,
    fontFactor,
    headerSize,
    bodyHeight,
    scrollViewOffset,
}) {
    const pagerRef = useRef(null);
    const scrollRef = useRef(null);
    const scrollToTop = () => {
        scrollRef.current?.scrollToOffset({
            offset: 0,
        });
        pagerRef.current?.setPage(0);
    };
    const memoizedScrollToTop = useCallback(scrollToTop, []);
    let key = -1;
    const sectionComponents = [
        {
            key: key++,
            data: (
                <Services
                    headerSize={headerSize}
                    margin={margin}
                    fontFactor={fontFactor}
                    bodyHeight={bodyHeight}
                    pagerRef={pagerRef}
                    scrollRef={scrollRef}
                    scrollViewOffset={scrollViewOffset}
                />
            ),
        },
        {
            key: key++,
            data: (
                <Footer
                    headerSize={headerSize}
                    darkMode={true}
                    margin={margin}
                    fontFactor={fontFactor}
                    scrollToTop={memoizedScrollToTop}
                    scrollRef={scrollRef}
                />
            ),
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <SubScreenTemplate
                margin={margin}
                fontFactor={fontFactor}
                headerSize={headerSize}
                scrollRef={scrollRef}
                sectionComponents={sectionComponents}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#1A91D7',
    },
});

const mapStateToProps = (state) => ({
    margin: state.settingsState.margin,
    fontFactor: state.settingsState.fontFactor,
    headerSize: state.settingsState.headerSize,
    bodyHeight: state.settingsState.bodyHeight,
    scrollViewOffset: state.settingsState.scrollViewOffset,
});

export default connect(mapStateToProps)(ServicesScreen);
