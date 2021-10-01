import React, { useRef, useCallback } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import Welcome from '../components/Welcome';
import AboutMini from '../components/AboutMini';
import ServicesMini from '../components/ServicesMini';
import ForumMini from '../components/ForumMini';
import ContactMini from '../components/ContactMini';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Footer from '../components/Footer';
import ModalScreen from './ModalScreen';
import scrollToTop from '../helperFunctions/scrollToTop';

function HomeScreen({
    margin,
    bodyHeight,
    fontFactor,
    deviceWidthClass,
    headerSize,
}) {
    const scrollRef = useRef(null);
    const memoizedScrollToTop = useCallback(scrollToTop, []);
    const renderItem = ({ item }) => item.data;
    const sectionComponents = [
        {
            key: 0,
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
            key: 1,
            data: (
                <AboutMini
                    fontFactor={fontFactor}
                    margin={margin}
                    deviceWidthClass={deviceWidthClass}
                />
            ),
        },
        {
            key: 2,
            data: (
                <ServicesMini
                    margin={margin}
                    fontFactor={fontFactor}
                    deviceWidthClass={deviceWidthClass}
                />
            ),
        },
        {
            key: 3,
            data: (
                <ForumMini
                    margin={margin}
                    fontFactor={fontFactor}
                    bodyHeight={bodyHeight}
                />
            ),
        },
        {
            key: 4,
            data: (
                <ContactMini
                    margin={margin}
                    fontFactor={fontFactor}
                    bodyHeight={bodyHeight}
                />
            ),
        },
        {
            key: 5,
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
        {
            key: 6,
            data: <ModalScreen />,
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                contentContainerStyle={styles.list}
                data={sectionComponents}
                renderItem={renderItem}
                keyExtractor={(item, index) => 'keyExtractor' + index}
                ref={scrollRef}
            />
        </SafeAreaView>
    );
}

HomeScreen.propTypes = {
    margin: PropTypes.number,
    bodyHeight: PropTypes.number,
    fontFactor: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    headerSize: PropTypes.number,
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
