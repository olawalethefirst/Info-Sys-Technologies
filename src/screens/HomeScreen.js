import React, { useRef, useEffect, useState, Suspense, lazy } from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
import Welcome from '../components/Welcome';
import AboutMini from '../components/AboutMini';
import ServicesMini from '../components/ServicesMini';
import ServicesMiniPair from '../components/ServicesMiniPair';
import ForumMini from '../components/ForumMini';
import ContactMini from '../components/ContactMini';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useScrollToTop } from '@react-navigation/native';
import updateEffectiveBodyHeight from '../redux/actions/updateEffectiveBodyHeight';
import ServicesMiniIntro from '../components/ServicesMiniIntro';
import checkColumnMode from '../helperFunctions/checkColumnMode';
import { serviceDetails } from '../constants';
import SuspenseFallback from '../components/SuspenseFallback';
const Home = lazy(() => import('../components/Home'));

function HomeScreen({ bodyHeight, updateEffectiveBodyHeight }) {
    const [effectiveBodyHeight, setEffectiveBodyHeight] = useState(0);
    const tabBarHeight = useBottomTabBarHeight();

    useEffect(() => {
        if (bodyHeight && tabBarHeight && !effectiveBodyHeight) {
            setEffectiveBodyHeight(() => {
                const effectiveBodyHeight = bodyHeight - tabBarHeight;
                updateEffectiveBodyHeight({
                    effectiveBodyHeight,
                    tabBarHeight,
                });
                return effectiveBodyHeight;
            });
        }
    }, [
        bodyHeight,
        tabBarHeight,
        updateEffectiveBodyHeight,
        effectiveBodyHeight,
    ]);

    if (!effectiveBodyHeight) {
        return <View style={{ flex: 1 }} />;
    }

    return (
        <View style={styles.container}>
            <Suspense fallback={<ActivityIndicator color={'#1A91D7'} />}>
                <Home />
            </Suspense>
        </View>
    );
}

HomeScreen.propTypes = {
    margin: PropTypes.number,
    bodyHeight: PropTypes.number,
    fontFactor: PropTypes.number,
    deviceWidthClass: PropTypes.string,
    headerSize: PropTypes.number,
    navigation: PropTypes.object,
    updateEffectiveBodyHeight: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#161B26',
    },
    list: {
        backgroundColor: '#161B26',
    },
});

const mapStateToProps = (state) => ({
    margin: state.settingsState.margin,
    bodyHeight: state.settingsState.bodyHeight,
    fontFactor: state.settingsState.fontFactor,
    deviceWidthClass: state.settingsState.deviceWidthClass,
    headerSize: state.settingsState.headerSize,
});

export default connect(mapStateToProps, {
    updateEffectiveBodyHeight,
})(HomeScreen);
