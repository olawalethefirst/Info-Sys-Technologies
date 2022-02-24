import React, { useRef } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import SubScreenTemplate from '../components/SubScreenTemplate';
import BriefHistory from '../components/BriefHistory';
import VisionAndMission from '../components/VisionAndMission';
import Objectives from '../components/Objectives';
import Delivery from '../components/Delivery';
import PropTypes from 'prop-types';
import { useScrollToTop } from '@react-navigation/native';

function AboutScreen({
    margin,
    fontFactor,
    deviceWidthClass,
    headerSize,
    effectiveBodyHeight,
}) {
    const columnMode = deviceWidthClass === 'type1';
    const scrollRef = useRef(null);
    useScrollToTop(scrollRef);
    const sectionComponents = [
        {
            key: '0',
            data: (
                <BriefHistory
                    fontFactor={fontFactor}
                    margin={margin}
                    columnMode={columnMode}
                    bodyHeight={effectiveBodyHeight}
                    key="0"
                />
            ),
        },
        {
            key: '1',
            data: (
                <VisionAndMission
                    fontFactor={fontFactor}
                    margin={margin}
                    columnMode={columnMode}
                    bodyHeight={effectiveBodyHeight}
                    key="1"
                />
            ),
        },
        {
            key: '2',
            data: (
                <Objectives
                    fontFactor={fontFactor}
                    margin={margin}
                    columnMode={columnMode}
                    bodyHeight={effectiveBodyHeight}
                    key="2"
                />
            ),
        },
        {
            key: '3',
            data: (
                <Delivery
                    fontFactor={fontFactor}
                    margin={margin}
                    columnMode={columnMode}
                    bodyHeight={effectiveBodyHeight}
                    key="3"
                />
            ),
        },
    ];

    return (
        <SafeAreaView style={styles.container}>
            <SubScreenTemplate
                margin={margin}
                fontFactor={fontFactor}
                deviceWidthClass={deviceWidthClass}
                headerSize={headerSize}
                heading="About Us"
                sectionComponents={sectionComponents}
                scrollRef={scrollRef}
            />
        </SafeAreaView>
    );
}

AboutScreen.propTypes = {
    margin: PropTypes.number,
    effectiveBodyHeight: PropTypes.number,
    fontFactor: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    headerSize: PropTypes.number,
    navigation: PropTypes.object,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

const mapStateToProps = (state) => ({
    margin: state.settingsState.margin,
    effectiveBodyHeight: state.settingsState.effectiveBodyHeight,
    fontFactor: state.settingsState.fontFactor,
    deviceWidthClass: state.settingsState.deviceWidthClass,
    headerSize: state.settingsState.headerSize,
});

export default connect(mapStateToProps)(AboutScreen);
