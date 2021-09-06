import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import HeaderLogo from './HeaderLogo';
import MenuIcon from './MenuIcon';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';

function HeaderBar({ headerSize, margin, fontFactor }) {
    const headerWidth = wp(100);
    const statusBarHeight = Constants.statusBarHeight;
    const menuIconWidth = headerSize - statusBarHeight / 2;
    const headerLogoWidth = headerWidth - menuIconWidth;
    const effectiveHeaderSize = headerSize - statusBarHeight;

    const styles = {
        headerBar: {
            marginTop: statusBarHeight,
            width: headerWidth,
            height: effectiveHeaderSize,
            backgroundColor: '#1A91D7',
        },
        container: {
            flex: 1,
            flexDirection: 'row',
        },
        headerLogo: {
            flex: headerLogoWidth,
        },
        menuIcon: {
            flex: headerSize,
        },
    };

    return (
        <SafeAreaView style={[styles.headerBar]}>
            <View style={styles.container}>
                <HeaderLogo
                    style={styles.headerLogo}
                    fontFactor={fontFactor}
                    margin={margin}
                />
                <MenuIcon
                    style={styles.menuIcon}
                    width={menuIconWidth}
                    height={effectiveHeaderSize}
                />
            </View>
        </SafeAreaView>
    );
}

HeaderBar.propTypes = {
    headerSize: PropTypes.number,
    margin: PropTypes.number,
    fontFactor: PropTypes.number,
};

const mapStateToProps = (state) => ({
    headerSize: state.settingsState.headerSize,
    margin: state.settingsState.margin,
    fontFactor: state.settingsState.fontFactor,
});

export default connect(mapStateToProps)(HeaderBar);
