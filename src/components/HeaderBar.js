import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
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
        headerWithStatusBar: {
            paddingTop: Platform.OS === 'ios' ? statusBarHeight : null,
            width: headerWidth,
            height: Platform.OS === 'ios' ? headerSize : effectiveHeaderSize,
            backgroundColor: '#1a85c5',
            shadowColor: '#161B26',
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: 0.7,
            shadowRadius: 3,
            zIndex: 10,
        },
        headerBar: {
            flex: 1,
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
        <View style={[styles.headerWithStatusBar]}>
            <View style={[styles.headerBar]}>
                <StatusBar
                    backgroundColor="#1A91D7"
                    animated={true}
                    barStyle={
                        Platform.OS === 'ios'
                            ? 'light-content'
                            : 'light-content'
                    }
                    // hidden={true}
                    style={{ height: 200 }}
                />
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
                        fontFactor={fontFactor}
                    />
                </View>
            </View>
        </View>
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
