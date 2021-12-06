import React, { useRef, useCallback, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import Welcome from '../components/Welcome';
import AboutMini from '../components/AboutMini';
import ServicesMini from '../components/ServicesMini';
import ForumMini from '../components/ForumMini';
import ContactMini from '../components/ContactMini';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import scrollToTop from '../helperFunctions/scrollToTop';
import { CommonActions } from '@react-navigation/native';

function HomeScreen({
    margin,
    bodyHeight,
    fontFactor,
    deviceWidthClass,
    headerSize,
    navigation,
}) {
    const scrollRef = useRef(null);
    const memoizedScrollToTop = useCallback(scrollToTop, []);
    const renderItem = ({ item }) => item.data;
    const sectionComponents = [
        {
            key: '0',
            data: (
                <Welcome
                    margin={margin}
                    bodyHeight={bodyHeight}
                    fontFactor={fontFactor}
                    deviceWidthClass={deviceWidthClass}
                />
            ),
        },
        {
            key: '1',
            data: (
                <AboutMini
                    fontFactor={fontFactor}
                    margin={margin}
                    deviceWidthClass={deviceWidthClass}
                />
            ),
        },
        {
            key: '2',
            data: (
                <ServicesMini
                    margin={margin}
                    fontFactor={fontFactor}
                    deviceWidthClass={deviceWidthClass}
                />
            ),
        },
        {
            key: '3',
            data: (
                <ForumMini
                    margin={margin}
                    fontFactor={fontFactor}
                    bodyHeight={bodyHeight}
                />
            ),
        },
        {
            key: '4',
            data: (
                <ContactMini
                    margin={margin}
                    fontFactor={fontFactor}
                    bodyHeight={bodyHeight}
                />
            ),
        },
        {
            key: '5',
            data: (
                <Footer
                    fontFactor={fontFactor}
                    margin={margin}
                    headerSize={headerSize}
                    darkMode={true}
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
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.list}
                data={sectionComponents}
                renderItem={renderItem}
                keyExtractor={(item, index) => 'keyExtractor' + index}
                ref={scrollRef}
            />
        </View>
    );
}

HomeScreen.propTypes = {
    margin: PropTypes.number,
    bodyHeight: PropTypes.number,
    fontFactor: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    headerSize: PropTypes.number,
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161B26',
    },
    list: {
        backgroundColor: '#161B26',
    },
    child: {
        flex: 1,
    },
});

const mapStateToProps = (state) => ({
    margin: state.settingsState.margin,
    bodyHeight: state.settingsState.bodyHeight,
    fontFactor: state.settingsState.fontFactor,
    deviceWidthClass: state.settingsState.deviceWidthClass,
    headerSize: state.settingsState.headerSize,
});

export default connect(mapStateToProps, {})(HomeScreen);
