import React from 'react';
import { View, StatusBar } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import HeaderLogo from './HeaderLogo';
import MenuIcon from './MenuIcon';
import PropTypes from 'prop-types';
import { SafeAreaView } from 'react-native-safe-area-context';

function HeaderBar({ headerSize, margin, fontFactor }) {
    const headerWidth = wp(100);
    const headerLogoWidth = headerWidth - headerSize;
    const styles = {
        headerWithStatusBar: {
            width: headerWidth,
            height: headerSize,
            backgroundColor: '#1a85c5',
            shadowColor: '#161B26',
            shadowOffset: {
                width: 0,
                height: wp(0.5) * fontFactor,
            },
            shadowOpacity: 0.5,
            shadowRadius: wp(0.5) * fontFactor,
            elevation: wp(2) * fontFactor,
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
    // console.log('menuIconWidth', menuIconWidth);

    return (
        <View style={{ backgroundColor: '#1A91D7' }}>
            <SafeAreaView>
                <View style={[styles.headerWithStatusBar]}>
                    <View style={[styles.headerBar]}>
                        <StatusBar
                            backgroundColor="#1A91D7"
                            barStyle="light-content"
                            animated={true}
                        />
                        <View style={styles.container}>
                            <HeaderLogo
                                style={styles.headerLogo}
                                fontFactor={fontFactor}
                                margin={margin}
                            />
                            <MenuIcon
                                style={styles.menuIcon}
                                width={headerSize}
                                height={headerSize}
                                fontFactor={fontFactor}
                            />
                        </View>
                    </View>
                </View>
            </SafeAreaView>
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
