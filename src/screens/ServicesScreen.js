import React, { useRef, useCallback, useEffect } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import SubScreenTemplate from '../components/SubScreenTemplate';
import Footer from '../components/Footer';
import Services from '../components/Services';
import PropTypes from 'prop-types';
import updateServicesScrollViewOffset from '../redux/actions/updateServicesScrollViewOffset';
import { CommonActions } from '@react-navigation/native';

function ServicesScreen({
    margin,
    fontFactor,
    headerSize,
    bodyHeight,
    updateServicesScrollViewOffset,
    navigation,
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
            key: String(key++),
            data: (
                <Services
                    headerSize={headerSize}
                    margin={margin}
                    fontFactor={fontFactor}
                    bodyHeight={bodyHeight}
                    pagerRef={pagerRef}
                    scrollRef={scrollRef}
                />
            ),
        },
        {
            key: String(key++),
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

    useEffect(() => {
        navigation.dispatch((state) => {
            const routes = state.routes.filter((r) => r.name !== 'Navigation');
            return CommonActions.reset({
                ...state,
                routes,
                index: routes.length - 1,
            });
        });

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <SubScreenTemplate
                margin={margin}
                fontFactor={fontFactor}
                headerSize={headerSize}
                scrollRef={scrollRef}
                sectionComponents={sectionComponents}
                requireScrollPosition
                noHeader
                heading={'Services'}
                updateScrollViewOffset={updateServicesScrollViewOffset}
            />
        </SafeAreaView>
    );
}

ServicesScreen.propTypes = {
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
    headerSize: PropTypes.number,
    bodyHeight: PropTypes.number,
    updateServicesScrollViewOffset: PropTypes.func,
    navigation: PropTypes.objects,
};

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
});

export default connect(mapStateToProps, { updateServicesScrollViewOffset })(
    ServicesScreen
);
