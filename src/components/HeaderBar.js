import React from 'react';
import { View, StatusBar, Platform } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';
import HeaderLogo from './HeaderLogo';
import MenuIcon from './MenuIcon';
import PropTypes from 'prop-types';
import Constants from 'expo-constants';

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
            shadowOpacity: 0.25,
            shadowRadius: wp(0.5) * fontFactor,
            elevation: wp(2) * fontFactor,
            // zIndex: 10,
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
            alignItems: 'flex-start',
            justifyContent: 'center',
        },
        menuIcon: {
            flex: headerSize,
        },
    };
    const { statusBarHeight } = Constants;

    return (
        <View style={{ backgroundColor: '#1A91D7' }}>
            <View
                style={{
                    marginTop: Platform.select({
                        ios: statusBarHeight,
                        android: 0,
                    }),
                }}
            >
                <View style={[styles.headerWithStatusBar]}>
                    <View style={[styles.headerBar]}>
                        <StatusBar
                            backgroundColor="#1A91D7"
                            barStyle="light-content"
                            animated={true}
                        />
                        <View style={styles.container}>
                            <View style={styles.headerLogo}>
                                <HeaderLogo
                                    fontFactor={fontFactor}
                                    margin={margin}
                                    headerSize={headerSize}
                                />
                            </View>

                            <View style={styles.menuIcon}>
                                <MenuIcon
                                    width={headerSize}
                                    height={headerSize}
                                    fontFactor={fontFactor}
                                />
                            </View>
                        </View>
                    </View>
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
