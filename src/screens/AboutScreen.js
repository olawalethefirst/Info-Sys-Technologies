import React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import SubScreenTemplate from '../components/SubScreenTemplate';
import BriefHistory from '../components/BriefHistory';
import VisionAndMission from '../components/VisionAndMission';
import Objectives from '../components/Objectives';
import Delivery from '../components/Delivery';
import PropTypes from 'prop-types';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

function AboutScreen({
    margin,
    bodyHeight,
    fontFactor,
    deviceWidthClass,
    headerSize,
}) {
    const columnMode = deviceWidthClass === 'type1';
    const tabBarHeight = useBottomTabBarHeight();
    const effectiveBodyHeight = bodyHeight - tabBarHeight;
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
            />
        </SafeAreaView>
    );
}

AboutScreen.propTypes = {
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
