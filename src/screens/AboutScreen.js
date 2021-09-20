import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import SubScreenTemplate from '../components/SubScreenTemplate';
import BriefHistory from '../components/BriefHistory';
import VisionAndMission from '../components/VisionAndMission';
import Objectives from '../components/Objectives';
import Delivery from '../components/Delivery';
import Footer from '../components/Footer';
import PropTypes from 'prop-types';
import scrollToTop from '../helperFunctions/scrollToTop';

function AboutScreen({
    margin,
    bodyHeight,
    fontFactor,
    deviceWidthClass,
    headerSize,
}) {
    const columnMode = deviceWidthClass === 'type1';
    const scrollRef = useRef(null);
    const sectionComponents = [
        {
            key: 0,
            data: (
                <BriefHistory
                    fontFactor={fontFactor}
                    margin={margin}
                    columnMode={columnMode}
                    bodyHeight={bodyHeight}
                />
            ),
        },
        {
            key: 1,
            data: (
                <VisionAndMission
                    fontFactor={fontFactor}
                    margin={margin}
                    columnMode={columnMode}
                    bodyHeight={bodyHeight}
                />
            ),
        },
        {
            key: 2,
            data: (
                <Objectives
                    fontFactor={fontFactor}
                    margin={margin}
                    columnMode={columnMode}
                    bodyHeight={bodyHeight}
                />
            ),
        },
        {
            key: 3,
            data: (
                <Delivery
                    fontFactor={fontFactor}
                    margin={margin}
                    columnMode={columnMode}
                    bodyHeight={bodyHeight}
                />
            ),
        },
        {
            key: 4,
            data: (
                <Footer
                    fontFactor={fontFactor}
                    margin={margin}
                    headerSize={headerSize}
                    darkMode={true}
                    scrollToTop={scrollToTop}
                    scrollRef={scrollRef}
                />
            ),
        },
    ];
    return (
        <SafeAreaView style={styles.container}>
            <SubScreenTemplate
                margin={margin}
                bodyHeight={bodyHeight}
                fontFactor={fontFactor}
                deviceWidthClass={deviceWidthClass}
                headerSize={headerSize}
                heading="About Us"
                sectionComponents={sectionComponents}
                scrollRef={scrollRef}
            ></SubScreenTemplate>
        </SafeAreaView>
    );
}

AboutScreen.propTypes = {
    margin: PropTypes.number,
    bodyHeight: PropTypes.number,
    fontFactor: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    headerSize: PropTypes.number,
};

const styles = StyleSheet.create({
    container: {
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

export default connect(mapStateToProps)(AboutScreen);
