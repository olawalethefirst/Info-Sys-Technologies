import React, { useState, useRef } from 'react';
import { StyleSheet, Animated, Text, View } from 'react-native';
import { connect } from 'react-redux';
import SubScreenTemplate from '../components/SubScreenTemplate';

function AboutScreen({
    margin,
    bodyHeight,
    fontFactor,
    deviceWidthClass,
    headerSize,
}) {
    return (
        <SubScreenTemplate
            margin={margin}
            bodyHeight={bodyHeight}
            fontFactor={fontFactor}
            deviceWidthClass={deviceWidthClass}
            headerSize={headerSize}
        ></SubScreenTemplate>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'pink',
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
