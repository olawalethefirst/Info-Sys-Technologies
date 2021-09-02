import React from 'react';
import { View, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import HeaderLogo from './HeaderLogo';
import MenuIcon from './MenuIcon';
import Constants from 'expo-constants';
import PropTypes from 'prop-types';

function HeaderBar({ headerSize, margin }) {
    const headerWidth = wp(100);
    const headerLogoWidth = headerWidth - headerSize;
    const statusBarHeight = Constants.statusBarHeight;

    const styles = {
        headerBar: {
            paddingTop: statusBarHeight,
            width: headerWidth,
            height: headerSize,
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
                    margin={margin}
                    headerSize={headerSize - statusBarHeight}
                />
                <MenuIcon
                    style={styles.menuIcon}
                    width={headerSize - statusBarHeight / 2}
                    height={headerSize - statusBarHeight}
                />
            </View>
        </SafeAreaView>
    );
}

HeaderBar.propTypes = {
    headerSize: PropTypes.number,
    margin: PropTypes.number,
};

const mapStateToProps = (state) => ({
    headerSize: state.settingsState.headerSize,
    margin: state.settingsState.margin,
});

export default connect(mapStateToProps)(HeaderBar);
